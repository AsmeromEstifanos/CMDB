### Modern Authentication in a React SPA with Azure AD (MSAL) — A Practical Tutorial

This tutorial teaches end-to-end authentication for any React Single-Page Application (SPA) using Microsoft Entra ID (Azure AD) and MSAL. It is app-agnostic and focuses on the concepts, setup, and code patterns you can reuse in any project.

## 1) Concepts you must know

- **OIDC (OpenID Connect)**: identity layer on top of OAuth 2.0; provides login and user info.
- **OAuth 2.0**: authorization framework; issues access tokens for APIs (e.g., Microsoft Graph/your backend).
- **Authority**: the issuer URL for your tenant (e.g., `https://login.microsoftonline.com/<tenant-id-or-domain>`).
- **Scopes**: permissions requested for an API (e.g., `User.Read`, `api://<app-id>/Files.Read`).
- **ID token**: proves user authentication to the client.
- **Access token**: authorizes calls to a resource API.
- **Silent token acquisition**: getting new tokens without user interaction using cached sessions.

## 2) What we will build

You will:

1. Register a SPA in Azure AD.
2. Configure a React app with MSAL.
3. Add Sign in/Sign out UX.
4. Protect routes/components.
5. Acquire access tokens for an API (Microsoft Graph or your own API) and call it.

## 3) Prerequisites

- Azure AD tenant and permission to create app registrations
- Node.js 18+ and a React app (CRA, Vite, or Next.js SPA mode)
- A redirect URI reachable during local dev (e.g., `http://localhost:3000`)

## 4) Azure AD app registration

1. Go to Entra ID (Azure AD) → App registrations → New registration.
2. Name: any (e.g., "React SPA").
3. Supported account types: choose based on who will sign in (single-tenant or multi-tenant).
4. Redirect URI: type = "Single-page application (SPA)", value `http://localhost:3000`.
5. After creation, copy the Application (client) ID.
6. Under "Authentication": ensure your redirect URI is listed; enable implicit flow not required (PKCE is used by MSAL browser).
7. Under "API permissions":
   - Add delegated permissions you need (e.g., Microsoft Graph `User.Read`).
   - If calling a custom API, add its delegated scopes.
   - Grant admin consent if required.

## 5) Install MSAL for React

```bash
npm install @azure/msal-browser @azure/msal-react
```

## 6) Configure MSAL

Create `msalConfig.js`:

```javascript
import { PublicClientApplication } from "@azure/msal-browser";

const tenantIdOrDomain = import.meta.env.VITE_AAD_TENANT || "common"; // or process.env.REACT_APP_AAD_TENANT

export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AAD_CLIENT_ID || "", // required
    authority: `https://login.microsoftonline.com/${tenantIdOrDomain}`,
    redirectUri: import.meta.env.VITE_REDIRECT_URI || window.location.origin,
    postLogoutRedirectUri:
      import.meta.env.VITE_POST_LOGOUT_REDIRECT_URI || window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true, // safer for older browsers/IT-managed environments
  },
};

export const loginRequest = {
  // Keep minimal: identity + the first API you intend to call
  scopes: (
    import.meta.env.VITE_LOGIN_SCOPES || "openid profile email User.Read"
  )
    .split(/[,\s]+/)
    .filter(Boolean),
};

export const msalInstance = new PublicClientApplication(msalConfig);
```

Notes:

- Use your framework’s env convention (`VITE_` for Vite, `REACT_APP_` for CRA).
- For multi-tenant apps, `tenant = common` is fine during dev; for production, prefer a specific tenant.

## 7) Provide MSAL to React

Wrap your app with `MsalProvider` in your root entry:

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./msalConfig";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);
```

## 8) Sign in / Sign out buttons

```javascript
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./msalConfig";

export function AuthButtons() {
  const { instance, accounts } = useMsal();
  const isAuthed = accounts.length > 0;

  const signIn = async () => {
    await instance.loginPopup(loginRequest); // or loginRedirect(loginRequest)
  };

  const signOut = async () => {
    await instance.logoutPopup(); // or logoutRedirect()
  };

  return (
    <div>
      {isAuthed ? (
        <>
          <span>{accounts[0].username}</span>
          <button onClick={signOut}>Sign out</button>
        </>
      ) : (
        <button onClick={signIn}>Sign in with Microsoft</button>
      )}
    </div>
  );
}
```

Popup vs Redirect:

- Use popup in dev for convenience.
- Use redirect in environments that block popups or when required by policy.

## 9) Protect routes and components

With React Router:

```javascript
import { useIsAuthenticated } from "@azure/msal-react";
import { Routes, Route, Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthed = useIsAuthenticated();
  return isAuthed ? children : <Navigate to="/welcome" replace />;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/welcome" element={<div>Welcome! Please sign in.</div>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div>Dashboard</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

For smaller UI sections, a simple guard component works:

```javascript
import { useIsAuthenticated } from "@azure/msal-react";

export function AuthenticatedView({ children, fallback = null }) {
  const isAuthed = useIsAuthenticated();
  return isAuthed ? children : fallback;
}
```

## 10) Acquire access tokens and call an API

Centralize token acquisition to keep UI code clean:

```javascript
import { default as msal } from "@azure/msal-browser";

export async function acquireToken(instance, scopes) {
  const accounts = instance.getAllAccounts();
  const account = instance.getActiveAccount() || accounts[0];
  if (!account) throw new Error("Please sign in first.");

  const request = { scopes: scopes.length ? scopes : ["User.Read"], account };
  const { accessToken } = await instance.acquireTokenSilent(request);
  return accessToken;
}

export async function callGraphMe(instance) {
  const token = await acquireToken(instance, ["User.Read"]);
  const res = await fetch("https://graph.microsoft.com/v1.0/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Graph error: ${res.status}`);
  return res.json();
}
```

If you call your own API, replace the URL and scopes with your API’s values (e.g., `api://<app-id>/My.Scope`).

## 11) Scope strategy (best practices)

- Keep login scopes minimal (identity + the first API you truly need).
- Request elevated scopes at the point of need (e.g., write scope when saving data).
- Avoid asking for broad scopes too early; it improves consent acceptance.

## 12) Troubleshooting

- "No account" or silent acquisition fails: sign out and sign in again.
- 401/403 from API: verify the access token’s scopes and audience (use `jwt.ms` to inspect).
- Redirect URI mismatch: ensure the URI in Entra ID exactly matches your app’s configured URI.
- Multi-tenant issues: test with `common` then lock down to your tenant for production.
- Popup blocked: switch to `loginRedirect`/`logoutRedirect`.

## 13) Security notes

- SPA tokens live in the browser. Do not store secrets in the frontend.
- Prefer least-privilege scopes and short token lifetimes (issuer-controlled).
- Use HTTPS everywhere; never develop or deploy over plain HTTP.

## 14) Quick checklist

1. App registration created; redirect URI added; client ID copied
2. Permissions added and consent granted (Graph or your API)
3. MSAL installed and configured with tenant/authority and redirect URIs
4. `MsalProvider` wraps your app
5. Sign in/out buttons implemented
6. Protected routes in place
7. Token acquisition helper written and used by your API calls

You now have a reusable, production-ready pattern for authentication in any React SPA using Azure AD and MSAL.

