// Lightweight Microsoft Graph client for SharePoint Lists (frontend-only)
// Only uses Microsoft Graph per project preferences. No SharePoint REST.

const GRAPH_BASE = "https://graph.microsoft.com/v1.0";

export const defaultScopes = () => {
  const envScopes = (process.env.REACT_APP_GRAPH_SCOPES || "").trim();
  if (envScopes) return envScopes.split(/[\s,]+/).filter(Boolean);
  // Default minimal read scope for SharePoint Sites; add write when needed by caller
  return ["Sites.Read.All"];
};

export async function acquireToken(instance, scopes) {
  // Check if MSAL is initialized
  if (!instance || !instance.getActiveAccount) {
    throw new Error("MSAL instance not initialized");
  }

  // Get all available accounts first
  const allAccounts = instance.getAllAccounts();
  const activeAccount = instance.getActiveAccount();

  // If we have any accounts, ONLY use silent acquisition - NO POPUPS
  if (allAccounts.length > 0 || activeAccount) {
    const accountToUse = activeAccount || allAccounts[0];
    console.log(
      "[SharePoint] Using existing account for silent token acquisition:",
      accountToUse?.username
    );

    try {
      const request = {
        scopes: scopes && scopes.length ? scopes : defaultScopes(),
        account: accountToUse,
      };
      const result = await instance.acquireTokenSilent(request);
      console.log("[SharePoint] Silent token acquisition successful");
      return result.accessToken;
    } catch (silentError) {
      console.warn(
        "[SharePoint] Silent token acquisition failed:",
        silentError
      );
      // If silent fails with existing account, don't try popup - just fail
      throw new Error(
        `Token acquisition failed: ${silentError.message}. Please sign out and sign in again.`
      );
    }
  }

  // Only if NO accounts exist at all, then try popup (this should never happen in our case)
  console.warn(
    "[SharePoint] No accounts found, this should not happen if user is authenticated"
  );
  const request = {
    scopes: scopes && scopes.length ? scopes : defaultScopes(),
  };

  try {
    const result = await instance.acquireTokenSilent(request);
    return result.accessToken;
  } catch (silentError) {
    // Even here, don't show popup - just fail
    throw new Error("No authenticated accounts found. Please sign in first.");
  }
}

function parseSiteUrl(siteUrl) {
  try {
    const u = new URL(siteUrl);
    const hostname = u.hostname; // e.g., easeint1.sharepoint.com
    // path after hostname, ensure starts with /sites or /teams
    const path = u.pathname.startsWith("/") ? u.pathname : `/${u.pathname}`;
    return { hostname, path };
  } catch (e) {
    throw new Error(`Invalid SharePoint site URL: ${siteUrl}`);
  }
}

async function graphGet(url, token) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GET ${url} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function graphPost(url, token, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${url} failed: ${res.status} ${text}`);
  }
  return res.json();
}

async function graphPatch(url, token, body) {
  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PATCH ${url} failed: ${res.status} ${text}`);
  }
  return res.json ? res.json() : {};
}

export async function getSiteId(instance, siteUrl) {
  const token = await acquireToken(instance, defaultScopes());
  const { hostname, path } = parseSiteUrl(siteUrl);
  const url = `${GRAPH_BASE}/sites/${hostname}:${path}?$select=id`;
  const data = await graphGet(url, token);
  return data.id;
}

export async function getListIdByName(instance, siteId, listName) {
  const token = await acquireToken(instance, defaultScopes());
  const url = `${GRAPH_BASE}/sites/${siteId}/lists?$filter=displayName eq '${listName.replace(
    /'/g,
    "''"
  )}'&$select=id,displayName`;
  const data = await graphGet(url, token);
  const list = (data.value || []).find((l) => l.displayName === listName);
  if (!list) throw new Error(`List not found: ${listName}`);
  return list.id;
}

const assetFieldSelect = [
  "Title",
  "CategoryId",
  "StatusId",
  "VentureId",
  "DepartmentId",
  "OwnerName",
  "AssignedToName",
  "UserTitle",
  "AssignedDate",
  "Location",
  "AssetTag",
  "SerialNumber",
  "SupplierId",
  "Cost",
  "DepreciationRate",
  "AcquiredDate",
  "WarrantyEndDate",
  "Hostname",
  "IPAddress",
  "OperatingSystem",
  "Notes",
  "ParentAssetId",
];

function toAssetCore(item) {
  const f = item.fields || {};
  return {
    id: Number(item.id),
    name: f.Title || "",
    categoryId: f.CategoryId ?? undefined,
    statusId: f.StatusId ?? undefined,
    ventureId: f.VentureId ?? undefined,
    departmentId: f.DepartmentId ?? undefined,
    ownerName: f.OwnerName || "",
    assignedToName: f.AssignedToName || "",
    userTitle: f.UserTitle || "",
    assignedDate: f.AssignedDate || "",
    location: f.Location || "",
    assetTag: f.AssetTag || "",
    serialNumber: f.SerialNumber || "",
    supplierId: f.SupplierId ?? undefined,
    cost: f.Cost ?? 0,
    depreciationRate: f.DepreciationRate ?? 0,
    acquiredDate: f.AcquiredDate || "",
    warrantyEndDate: f.WarrantyEndDate || "",
    hostname: f.Hostname || "",
    ipAddress: f.IPAddress || "",
    operatingSystem: f.OperatingSystem || "",
    parentAssetId: f.ParentAssetId ?? null,
    notes: f.Notes || "",
  };
}

export async function getAssetsFromSharePoint(
  instance,
  siteUrl,
  listName = "Assets"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=${assetFieldSelect.join(
    ","
  )})&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map(toAssetCore);
}

export async function getCategoriesFromSharePoint(
  instance,
  siteUrl,
  listName = "Categories"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function getVenturesFromSharePoint(
  instance,
  siteUrl,
  listName = "Ventures"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function getDepartmentsFromSharePoint(
  instance,
  siteUrl,
  listName = "Departments"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function getStatusesFromSharePoint(
  instance,
  siteUrl,
  listName = "Statuses"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function getSuppliersFromSharePoint(
  instance,
  siteUrl,
  listName = "Suppliers"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function getTagsFromSharePoint(
  instance,
  siteUrl,
  listName = "Tags"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function getSoftwareCatalogFromSharePoint(
  instance,
  siteUrl,
  listName = "Software_Catalog"
) {
  const token = await acquireToken(instance, defaultScopes());
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=Title)&$select=id`;
  const data = await graphGet(url, token);
  return (data.value || []).map((item) => ({
    id: Number(item.id),
    name: item.fields?.Title || "",
  }));
}

export async function createVentureInSharePoint(
  instance,
  siteUrl,
  ventureName,
  listName = "Ventures"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: ventureName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: ventureName,
  };
}

export async function createDepartmentInSharePoint(
  instance,
  siteUrl,
  departmentName,
  listName = "Departments"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: departmentName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: departmentName,
  };
}

export async function createStatusInSharePoint(
  instance,
  siteUrl,
  statusName,
  listName = "Statuses"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: statusName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: statusName,
  };
}

export async function createSupplierInSharePoint(
  instance,
  siteUrl,
  supplierName,
  listName = "Suppliers"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: supplierName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: supplierName,
  };
}

export async function createTagInSharePoint(
  instance,
  siteUrl,
  tagName,
  listName = "Tags"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: tagName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: tagName,
  };
}

export async function createSoftwareInSharePoint(
  instance,
  siteUrl,
  softwareName,
  listName = "Software_Catalog"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: softwareName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: softwareName,
  };
}

function pickDefined(obj) {
  const out = {};
  Object.keys(obj).forEach((k) => {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "")
      out[k] = obj[k];
  });
  return out;
}

export async function createAssetInSharePoint(
  instance,
  siteUrl,
  asset,
  listName = "Assets"
) {
  // Try write scope first, fall back to read if not granted
  let token;
  try {
    token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  } catch (error) {
    console.warn(
      "[SharePoint] Write scope not granted, falling back to read-only"
    );
    throw new Error(
      "Insufficient permissions: Sites.ReadWrite.All required for creating assets"
    );
  }

  // Only send provided fields (Title + any defined), per user preference
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const fields = pickDefined({
    Title: asset.name,
    CategoryId: asset.categoryId,
    StatusId: asset.statusId,
    VentureId: asset.ventureId,
    DepartmentId: asset.departmentId,
    OwnerName: asset.ownerName,
    AssignedToName: asset.assignedToName,
    UserTitle: asset.userTitle,
    AssignedDate: asset.assignedDate,
    Location: asset.location,
    AssetTag: asset.assetTag,
    SerialNumber: asset.serialNumber,
    SupplierId: asset.supplierId,
    Cost: asset.cost,
    DepreciationRate: asset.depreciationRate,
    AcquiredDate: asset.acquiredDate,
    WarrantyEndDate: asset.warrantyEndDate,
    Hostname: asset.hostname,
    IPAddress: asset.ipAddress,
    OperatingSystem: asset.operatingSystem,
    ParentAssetId: asset.parentAssetId,
    Notes: asset.notes,
  });
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields };
  const created = await graphPost(url, token, body);
  // Fetch the created item with fields expanded to normalize response
  const getUrl = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${
    created.id
  }?expand=fields($select=${assetFieldSelect.join(",")})&$select=id`;
  const createdExpanded = await graphGet(getUrl, token);
  return toAssetCore(createdExpanded);
}

export async function updateAssetInSharePoint(
  instance,
  siteUrl,
  itemId,
  partial,
  listName = "Assets"
) {
  // Try write scope first, fall back to read if not granted
  let token;
  try {
    token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  } catch (error) {
    console.warn(
      "[SharePoint] Write scope not granted, falling back to read-only"
    );
    throw new Error(
      "Insufficient permissions: Sites.ReadWrite.All required for updating assets"
    );
  }

  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const fields = pickDefined({
    Title: partial.name,
    CategoryId: partial.categoryId,
    StatusId: partial.statusId,
    VentureId: partial.ventureId,
    DepartmentId: partial.departmentId,
    OwnerName: partial.ownerName,
    AssignedToName: partial.assignedToName,
    UserTitle: partial.userTitle,
    AssignedDate: partial.assignedDate,
    Location: partial.location,
    AssetTag: partial.assetTag,
    SerialNumber: partial.serialNumber,
    SupplierId: partial.supplierId,
    Cost: partial.cost,
    DepreciationRate: partial.depreciationRate,
    AcquiredDate: partial.acquiredDate,
    WarrantyEndDate: partial.warrantyEndDate,
    Hostname: partial.hostname,
    IPAddress: partial.ipAddress,
    OperatingSystem: partial.operatingSystem,
    ParentAssetId: partial.parentAssetId,
    Notes: partial.notes,
  });
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${itemId}/fields`;
  await graphPatch(url, token, fields);
  // Return latest
  const getUrl = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${itemId}?expand=fields($select=${assetFieldSelect.join(
    ","
  )})&$select=id`;
  const updated = await graphGet(getUrl, token);
  return toAssetCore(updated);
}

export async function createCategoryInSharePoint(
  instance,
  siteUrl,
  categoryName,
  listName = "Categories"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
  const body = { fields: { Title: categoryName } };
  const created = await graphPost(url, token, body);
  return {
    id: Number(created.id),
    name: categoryName,
  };
}

export async function deleteCategoryFromSharePoint(
  instance,
  siteUrl,
  categoryId,
  listName = "Categories"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${categoryId}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateCategoryInSharePoint(
  instance,
  siteUrl,
  categoryId,
  newName,
  listName = "Categories"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${categoryId}/fields`;
  const body = { Title: newName };
  await graphPatch(url, token, body);
  return {
    id: categoryId,
    name: newName,
  };
}

export async function deleteVentureFromSharePoint(
  instance,
  siteUrl,
  ventureId,
  listName = "Ventures"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${ventureId}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateVentureInSharePoint(
  instance,
  siteUrl,
  ventureId,
  newName,
  listName = "Ventures"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${ventureId}/fields`;
  const body = { Title: newName };
  await graphPatch(url, token, body);
  return {
    id: ventureId,
    name: newName,
  };
}

export async function deleteDepartmentFromSharePoint(
  instance,
  siteUrl,
  departmentId,
  listName = "Departments"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${departmentId}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateDepartmentInSharePoint(
  instance,
  siteUrl,
  departmentId,
  newName,
  listName = "Departments"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${departmentId}/fields`;
  const body = { Title: newName };
  await graphPatch(url, token, body);
  return {
    id: departmentId,
    name: newName,
  };
}

export async function deleteStatusFromSharePoint(
  instance,
  siteUrl,
  statusId,
  listName = "Statuses"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${statusId}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateStatusInSharePoint(
  instance,
  siteUrl,
  statusId,
  newName,
  listName = "Statuses"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${statusId}/fields`;
  const body = { Title: newName };
  await graphPatch(url, token, body);
  return {
    id: statusId,
    name: newName,
  };
}

export async function updateSupplierInSharePoint(
  instance,
  siteUrl,
  supplierId,
  newName,
  listName = "Suppliers"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${supplierId}/fields`;
  const body = { Title: newName };
  await graphPatch(url, token, body);
  return {
    id: supplierId,
    name: newName,
  };
}

export async function deleteSupplierFromSharePoint(
  instance,
  siteUrl,
  supplierId,
  listName = "Suppliers"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${supplierId}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateSoftwareInSharePoint(
  instance,
  siteUrl,
  softwareId,
  newName,
  listName = "Software_Catalog"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${softwareId}/fields`;
  const body = { Title: newName };
  await graphPatch(url, token, body);
  return {
    id: softwareId,
    name: newName,
  };
}

export async function deleteSoftwareFromSharePoint(
  instance,
  siteUrl,
  softwareId,
  listName = "Software_Catalog"
) {
  const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
  const siteId = await getSiteId(instance, siteUrl);
  const listId = await getListIdByName(instance, siteId, listName);
  const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${softwareId}`;
  await fetch(url, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

// License Management Functions
const licenseFieldSelect = [
  "Title",
  "SoftwareId",
  "LicenseNumber",
  "RenewalDate",
  "Cost",
  "Quantity",
  "Used",
  "VentureId",
  "DepartmentId",
  "SupplierId",
  "Notes",
];

function toLicenseCore(item) {
  const f = item.fields || {};
  return {
    id: Number(item.id),
    name: f.Title || "",
    softwareId: f.SoftwareId ?? undefined,
    licenseNumber: f.LicenseNumber || "",
    renewalDate: f.RenewalDate || "",
    cost: f.Cost ?? 0,
    quantity: f.Quantity ?? 0,
    used: f.Used ?? 0,
    ventureId: f.VentureId ?? undefined,
    departmentId: f.DepartmentId ?? undefined,
    supplierId: f.SupplierId ?? undefined,
    notes: f.Notes || "",
  };
}

export async function loadLicensesFromSharePoint(
  instance,
  siteUrl,
  listName = "Licenses"
) {
  try {
    const token = await acquireToken(instance, defaultScopes());
    const siteId = await getSiteId(instance, siteUrl);
    const listId = await getListIdByName(instance, siteId, listName);
    const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items?expand=fields($select=${licenseFieldSelect.join(
      ","
    )})&$select=id`;
    const data = await graphGet(url, token);
    return (data.value || []).map(toLicenseCore);
  } catch (error) {
    console.error("[SharePoint] Failed to load Licenses:", error);
    throw error;
  }
}

export async function createLicenseInSharePoint(
  instance,
  siteUrl,
  license,
  listName = "Licenses"
) {
  try {
    const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
    const siteId = await getSiteId(instance, siteUrl);
    const listId = await getListIdByName(instance, siteId, listName);
    const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items`;
    const fields = pickDefined({
      Title: license.name,
      SoftwareId: license.softwareId,
      LicenseNumber: license.licenseNumber,
      RenewalDate: license.renewalDate,
      Cost: license.cost,
      Quantity: license.quantity,
      Used: license.used,
      VentureId: license.ventureId,
      DepartmentId: license.departmentId,
      SupplierId: license.supplierId,
      Notes: license.notes,
    });
    const created = await graphPost(url, token, { fields });
    // fetch created item expanded
    const getUrl = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${
      created.id
    }?expand=fields($select=${licenseFieldSelect.join(",")})&$select=id`;
    const createdExpanded = await graphGet(getUrl, token);
    return toLicenseCore(createdExpanded);
  } catch (error) {
    console.error("[SharePoint] Failed to create license:", error);
    throw error;
  }
}

export async function updateLicenseInSharePoint(
  instance,
  siteUrl,
  licenseId,
  partial,
  listName = "Licenses"
) {
  try {
    const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
    const siteId = await getSiteId(instance, siteUrl);
    const listId = await getListIdByName(instance, siteId, listName);
    const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${licenseId}/fields`;
    const fields = pickDefined({
      Title: partial.name,
      SoftwareId: partial.softwareId,
      LicenseNumber: partial.licenseNumber,
      RenewalDate: partial.renewalDate,
      Cost: partial.cost,
      Quantity: partial.quantity,
      Used: partial.used,
      VentureId: partial.ventureId,
      DepartmentId: partial.departmentId,
      SupplierId: partial.supplierId,
      Notes: partial.notes,
    });
    await graphPatch(url, token, fields);
    // return latest
    const getUrl = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${licenseId}?expand=fields($select=${licenseFieldSelect.join(
      ","
    )})&$select=id`;
    const updated = await graphGet(getUrl, token);
    return toLicenseCore(updated);
  } catch (error) {
    console.error("[SharePoint] Failed to update license:", error);
    throw error;
  }
}

export async function deleteLicenseFromSharePoint(
  instance,
  siteUrl,
  licenseId,
  listName = "Licenses"
) {
  try {
    const token = await acquireToken(instance, ["Sites.ReadWrite.All"]);
    const siteId = await getSiteId(instance, siteUrl);
    const listId = await getListIdByName(instance, siteId, listName);
    const url = `${GRAPH_BASE}/sites/${siteId}/lists/${listId}/items/${licenseId}`;
    await fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("[SharePoint] Failed to delete license:", error);
    throw error;
  }
}
