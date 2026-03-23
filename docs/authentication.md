### CMDB Authentication Guide (MSAL + Microsoft Graph)

This guide explains how authentication works in this app using MSAL for React and how access tokens are acquired and used with Microsoft Graph for SharePoint data. It is designed as a hands-on tutorial you can follow and teach from.

## 1) Big picture

- **Identity provider**: Azure Active Directory (Entra ID)
- **Library**: `@azure/msal-browser` + `@azure/msal-react`
- **Auth flow**: SPA with MSAL, popup login and popup logout
- **Tokens**: Access tokens acquired silently for Graph scopes
- **Data access**: Microsoft Graph calls to SharePoint lists (frontend-only)

Flow at a glance:

1. App starts → MSAL configured from environment → `MsalProvider` wraps React tree.
2. User clicks Sign in → MSAL popup prompts for `loginRequest.scopes`.
3. After login, `useIsAuthenticated()` becomes true and protected routes render.
4. Data functions call `acquireTokenSilent` with appropriate scopes and send `Authorization: Bearer <token>` to Graph.
5. User signs out → MSAL clears cache and redirects back.

## 2) Where the pieces live in this app

- `src/auth/msal.js`: MSAL configuration, instance, and default login scopes
- `src/index.js`: Registers `MsalProvider` at the root
- `src/components/AuthButtons.js`: Sign-in/sign-out UI
- `src/App.js`: Route protection via `useIsAuthenticated()`
- `src/auth/AuthenticatedView.js`: Optional wrapper to guard sections of UI
- `src/services/sharepoint.js`: Token acquisition and all Microsoft Graph calls

## 3) MSAL configuration and environment variables

Key settings are resolved from `.env` so you can deploy across environments. Fallbacks exist to keep the app usable in development.

Important env vars (preferred names first, with aliases the code accepts):

- `REACT_APP_AZURE_CLIENT_ID` | `REACT_APP_AAD_CLIENT_ID` | `REACT_APP_MSAL_CLIENT_ID` | `REACT_APP_CLIENT_ID`
- `REACT_APP_AZURE_AUTHORITY` | `REACT_APP_AAD_AUTHORITY` | `REACT_APP_MSAL_AUTHORITY`
- `REACT_APP_AAD_TENANT_ID` | `REACT_APP_TENANT_ID` | `REACT_APP_AAD_TENANT_DOMAIN`
- `REACT_APP_REDIRECT_URI` | `REACT_APP_AAD_REDIRECT_URI` (defaults to `window.location.origin`)
- `REACT_APP_POST_LOGOUT_REDIRECT_URI` | `REACT_APP_AAD_POST_LOGOUT_REDIRECT_URI` (defaults to `window.location.origin`)
- `REACT_APP_AAD_SCOPES` (overrides default login scopes)

Behavior:

- If a full `authority` isn’t provided, it is constructed using `tenantId/domain`; otherwise it falls back to `https://login.microsoftonline.com/common` with a warning.
- Cache is stored in `localStorage` and `storeAuthStateInCookie: true` is enabled for compatibility.

## 4) Bootstrapping MSAL in React

At startup, the app creates a single `PublicClientApplication` and provides it to React via `MsalProvider`:

```12:16:src/index.js
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./auth/msal";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
```

The MSAL instance is configured in `src/auth/msal.js` and also defines the `loginRequest.scopes` used at sign-in:

```54:67:src/auth/msal.js
const msalConfig = {
  auth: {
    clientId: envClientId || "",
    authority,
    redirectUri,
    postLogoutRedirectUri,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
```

Default login scopes can be overridden by env:

```69:76:src/auth/msal.js
export const loginRequest = {
  scopes: (
    process.env.REACT_APP_AAD_SCOPES ||
    "User.Read openid profile email Sites.Read.All"
  )
    .split(/[\s,]+/)
    .filter(Boolean),
};
```

## 5) Sign-in and sign-out UX

`AuthButtons` uses MSAL React hooks for login/logout and shows the current user if authenticated:

```5:23:src/components/AuthButtons.js
const { instance, accounts } = useMsal();
const isAuthed = accounts && accounts.length > 0;

const handleLogin = async () => {
  await instance.loginPopup(loginRequest);
};

const handleLogout = async () => {
  await instance.logoutPopup();
};
```

- Login flow pops a Microsoft login/consent window using `loginRequest.scopes`.
- Logout pops a confirmation and clears MSAL cache, then navigates to `postLogoutRedirectUri`.

## 6) Protecting routes and views

- `useIsAuthenticated()` gates rendering of the main routes in `App.js`.
- If not authenticated, the app shows a welcome message prompting the user to sign in from the sidebar.

```31:53:src/App.js
const isAuthenticated = useIsAuthenticated();
...
{isAuthenticated ? (
  <Routes>
    <Route path="/cmdb/" element={<Dashboard />} />
    <Route path="/cmdb/assets" element={<AssetManagement />} />
    <Route path="/cmdb/licenses" element={<LicenseManagement />} />
    <Route path="/cmdb/reports" element={<Reports />} />
    <Route path="/cmdb/settings" element={<Settings />} />
  </Routes>
) : (
  ...
)}
```

You can also use `AuthenticatedView` to protect specific components or sections:

```1:7:src/auth/AuthenticatedView.js
import { useIsAuthenticated } from "@azure/msal-react";

const AuthenticatedView = ({ children, fallback = null }) => {
  const isAuthenticated = useIsAuthenticated();
  return isAuthenticated ? children : fallback;
};
```

## 7) Acquiring tokens for Microsoft Graph (SharePoint)

All SharePoint calls are made through Microsoft Graph and originate from the browser. Token acquisition is centralized in `services/sharepoint.js`.

Core rules:

- If an account is present, tokens are acquired silently (`acquireTokenSilent`).
- If silent acquisition fails, functions throw a clear error and do not show popups in data calls.
- Default read scope is `Sites.Read.All`. Write operations explicitly request `Sites.ReadWrite.All` and will fail if consent hasn’t been granted.

```32:61:src/services/sharepoint.js
export async function acquireToken(instance, scopes) {
  if (!instance || !instance.getActiveAccount) {
    throw new Error("MSAL instance not initialized");
  }

  const allAccounts = instance.getAllAccounts();
  const activeAccount = instance.getActiveAccount();

  if (allAccounts.length > 0 || activeAccount) {
    const accountToUse = activeAccount || allAccounts[0];
    const request = {
      scopes: scopes && scopes.length ? scopes : defaultScopes(),
      account: accountToUse,
    };
    const result = await instance.acquireTokenSilent(request);
    return result.accessToken;
  }

  throw new Error("No authenticated accounts found. Please sign in first.");
}
```

## 8) Scope strategy (what and when)

- Login scopes (`loginRequest.scopes`): baseline identity and Graph read (`User.Read openid profile email Sites.Read.All` by default; override via env if needed).
- Read-only list operations: `defaultScopes()` → `Sites.Read.All` unless overridden by `REACT_APP_GRAPH_SCOPES`.
- Write operations (create/update/delete): request `Sites.ReadWrite.All` inside the specific data function. If not granted, a friendly error is thrown.

Tips for teaching:

- Keep login scopes minimal and add elevated scopes only where they are truly required.
- If you add new Graph APIs, confirm the exact scope needed and update the relevant function.

## 9) SharePoint via Graph in practice

Example: loading assets reads with `Sites.Read.All` and maps Graph list item fields to the app’s model:

```278:291:src/services/sharepoint.js
export async function getAssetsFromSharePoint(instance, siteUrl, listName = "Assets") {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=${assetFieldSelect.join(",")})&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map(toAssetCore);
}
```

Example: creating an asset requests `Sites.ReadWrite.All` and sends only defined fields:

```534:589:src/services/sharepoint.js
export async function createAssetInSharePoint(instance, siteUrl, asset, listName = "Assets") {
  let token;
  try {
    token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  } catch (error) {
    throw new Error("Insufficient permissions: Sites.ReadWrite.All required for creating assets");
  }
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const fields = pickDefined({ /* Title, CategoryId, ... */ });
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const created = await graphPost(url, token, { fields });
  // fetch created item expanded, then normalize
}
```

## 10) Error handling and UX considerations

- Silent token acquisition failures are logged and surfaced with actionable messages (e.g., “Please sign out and sign in again”).
- Write operations produce explicit errors when scopes are insufficient.
- Network/Graph errors include status codes and response text for debugging.
- Session persists using `localStorage`; users remain signed in across refreshes until they explicitly sign out.

Recommended UX niceties to add (optional):

- Show a banner when the token is expired or consent is insufficient.
- Provide a “Re-authenticate” button that calls `logoutPopup()` then `loginPopup()`.

## 11) Setup checklist for a new environment

1. Create an Azure AD app registration (SPA).
2. Configure redirect URIs: `${ORIGIN}` (and any additional deployment origins).
3. Expose required API permissions to Microsoft Graph:
   - Delegated: `User.Read` (baseline)
   - Delegated: `Sites.Read.All` (reads)
   - Delegated: `Sites.ReadWrite.All` (writes)
4. Grant admin consent (as needed) and ensure users can consent.
5. Create a `.env` with:
   - `REACT_APP_AZURE_CLIENT_ID=...`
   - `REACT_APP_AAD_TENANT_ID=...` (or a full `REACT_APP_AZURE_AUTHORITY`)
   - Optional: `REACT_APP_REDIRECT_URI`, `REACT_APP_POST_LOGOUT_REDIRECT_URI`, `REACT_APP_AAD_SCOPES`
6. Build and run; confirm sign-in, route access, and data reads.
7. Attempt a write operation; if it fails, grant `Sites.ReadWrite.All` consent.

## 12) Common issues and fixes

- Missing client ID or tenant: verify `.env` values and that the app was rebuilt (CRA only exposes `REACT_APP_*` at build time).
- Redirect URI mismatch: ensure the URI in Azure AD matches exactly what the app uses.
- Silent token acquisition fails: sign out/in to refresh the session; ensure scopes are correct.
- Insufficient permissions on write: add or consent to `Sites.ReadWrite.All`.
- Wrong list schema: use the helper in history creation to detect required columns, or adjust env overrides for field names if your site differs.

## 13) Extending the system

- Add a new Graph call: implement the function in `services/sharepoint.js`, pick the minimal scope, and reuse `acquireToken`.
- Protect a new route: use `useIsAuthenticated()` or wrap content with `AuthenticatedView`.
- Force a specific account: call `msalInstance.setActiveAccount(account)` after login to avoid ambiguity when multiple accounts are present.
- Switch popup to redirect: change `loginPopup`/`logoutPopup` to `loginRedirect`/`logoutRedirect` if your environment blocks popups.

## 14) Security notes for instructors

- Keep login scopes minimal; request elevated scopes only where needed.
- Never commit real tenant IDs, client IDs, or secrets.
- This is a pure-frontend app: tokens reside in the browser; avoid storing anything sensitive beyond what MSAL manages.

## 15) Quick glossary

- MSAL: Microsoft Authentication Library
- Authority: Issuer URL for your tenant (e.g., `https://login.microsoftonline.com/<tenant>`)
- Scope: Permission the token grants (e.g., `Sites.Read.All`)
- Access token: Short-lived token used to call Microsoft Graph
- Silent token acquisition: Getting a token without user interaction using cached account/session

---

If you’re teaching this module: open each referenced file, walk through the cited snippets, then run the app and demonstrate login, viewing protected routes, and executing a read and a write to show how scopes affect behavior.
