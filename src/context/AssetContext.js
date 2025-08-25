import React, { createContext, useContext, useReducer, useEffect } from "react";
import { formatDate } from "../utils/helpers";
import { useMsal } from "@azure/msal-react";
import {
  getAssetsFromSharePoint,
  createAssetInSharePoint,
  updateAssetInSharePoint,
  deleteAssetFromSharePoint,
  acquireToken,
  defaultScopes,
  getCategoriesFromSharePoint,
  createCategoryInSharePoint,
  deleteCategoryFromSharePoint,
  updateCategoryInSharePoint,
  getVenturesFromSharePoint,
  createVentureInSharePoint,
  deleteVentureFromSharePoint,
  updateVentureInSharePoint,
  getDepartmentsFromSharePoint,
  createDepartmentInSharePoint,
  deleteDepartmentFromSharePoint,
  updateDepartmentInSharePoint,
  getStatusesFromSharePoint,
  createStatusInSharePoint,
  deleteStatusFromSharePoint,
  updateStatusInSharePoint,
  getSuppliersFromSharePoint,
  createSupplierInSharePoint,
  getTagsFromSharePoint,
  createTagInSharePoint,
  getSoftwareCatalogFromSharePoint,
  createSoftwareInSharePoint,
  updateSupplierInSharePoint,
  deleteSupplierFromSharePoint,
  updateSoftwareInSharePoint,
  deleteSoftwareFromSharePoint,
  loadLicensesFromSharePoint,
  createLicenseInSharePoint,
  updateLicenseInSharePoint,
  deleteLicenseFromSharePoint,
  createAssetHistoryInSharePoint,
  createLicenseHistoryInSharePoint,
  createAssetTagInSharePoint,
  deleteAssetTagFromSharePoint,
  createAssetSoftwareInSharePoint,
  deleteAssetSoftwareFromSharePoint,
  createAssetRelationInSharePoint,
  deleteAssetRelationFromSharePoint,
  getAssetHistoryFromSharePoint,
  getLicenseHistoryFromSharePoint,
  getAssetTagsFromSharePoint,
  getAssetSoftwareFromSharePoint,
  getAssetRelationsFromSharePoint,
} from "../services/sharepoint";

const AssetContext = createContext();

// Normalized state designed for SharePoint Lists (atomic fields only)
// - All relationships use numeric IDs (simulating SharePoint built-in IDs)
// - Multi-valued fields are modeled as separate lists with FK references
const initialState = {
  // Lookup tables (SharePoint lists)
  venturesTable: [], // { id, name }
  departmentsTable: [], // { id, name }
  categoriesTable: [], // { id, name }
  statusesTable: [], // { id, name }
  suppliersTable: [], // { id, name }
  tagsTable: [], // { id, name }
  softwareTable: [], // { id, name }

  // Core entity tables
  assetsCore: [], // normalized assets: use lookup IDs and atomic fields
  licensesCore: [], // normalized licenses: use lookup IDs and atomic fields

  // Join/child tables
  assetTags: [], // { id, assetId, tagId }
  assetSoftware: [], // { id, assetId, softwareId }
  assetHistory: [], // { id, assetId, date, action, user }
  licenseHistory: [], // { id, licenseId, date, action, user }
  assetRelations: [], // { id, parentAssetId, childAssetId }

  // UI option lists (strings) for compatibility with existing components
  ventures: [],
  departments: [],
  categories: [],
  statuses: [],
  suppliers: [],
  tags: [],
  software: [],

  loading: true, // Start with loading true
  error: null,
};

const assetReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "SET_ASSETS":
      return { ...state, assetsCore: action.payload };

    case "ADD_ASSET":
      return { ...state, assetsCore: [...state.assetsCore, action.payload] };

    case "UPDATE_ASSET":
      return {
        ...state,
        assetsCore: state.assetsCore.map((a) =>
          a.id === action.payload.id ? action.payload : a
        ),
      };

    case "DELETE_ASSET": {
      const remainingAssets = state.assetsCore.filter(
        (a) => a.id !== action.payload
      );
      const remainingAssetTags = state.assetTags.filter(
        (x) => x.assetId !== action.payload
      );
      const remainingAssetSoftware = state.assetSoftware.filter(
        (x) => x.assetId !== action.payload
      );
      const remainingAssetHistory = state.assetHistory.filter(
        (x) => x.assetId !== action.payload
      );
      const remainingRelations = state.assetRelations.filter(
        (x) =>
          x.parentAssetId !== action.payload &&
          x.childAssetId !== action.payload
      );
      return {
        ...state,
        assetsCore: remainingAssets,
        assetTags: remainingAssetTags,
        assetSoftware: remainingAssetSoftware,
        assetHistory: remainingAssetHistory,
        assetRelations: remainingRelations,
      };
    }

    case "SET_LICENSES":
      return { ...state, licensesCore: action.payload };

    case "ADD_LICENSE":
      return {
        ...state,
        licensesCore: [...state.licensesCore, action.payload],
      };

    case "UPDATE_LICENSE":
      return {
        ...state,
        licensesCore: state.licensesCore.map((l) =>
          l.id === action.payload.id ? action.payload : l
        ),
      };

    case "DELETE_LICENSE": {
      const remaining = state.licensesCore.filter(
        (l) => l.id !== action.payload
      );
      const remainingHistory = state.licenseHistory.filter(
        (h) => h.licenseId !== action.payload
      );
      return {
        ...state,
        licensesCore: remaining,
        licenseHistory: remainingHistory,
      };
    }

    case "ADD_ASSET_HISTORY":
      return {
        ...state,
        assetHistory: [...state.assetHistory, action.payload],
      };

    case "ADD_LICENSE_HISTORY":
      return {
        ...state,
        licenseHistory: [...state.licenseHistory, action.payload],
      };

    // Data table initializations
    case "INIT_TABLES":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export const AssetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(assetReducer, initialState);
  const { instance, accounts } = useMsal();
  const siteUrl = process.env.REACT_APP_SHAREPOINT_SITE_URL;

  // Hoisted loader to be callable from multiple effects and helpers
  async function loadData(retryCount = 0) {
    if (siteUrl) {
      try {
        // Wait a bit for MSAL to fully initialize (exponential backoff)
        const delay = Math.min(1000 * Math.pow(2, retryCount), 5000);
        await new Promise((resolve) => setTimeout(resolve, delay));

        // More robust MSAL readiness check
        const isMsalReady =
          instance &&
          typeof instance.getActiveAccount === "function" &&
          typeof instance.acquireTokenSilent === "function" &&
          typeof instance.acquireTokenPopup === "function";

        if (!isMsalReady) {
          if (retryCount < 3) {
            console.warn(
              `[SharePoint] MSAL not ready (attempt ${
                retryCount + 1
              }/3), retrying...`
            );
            setTimeout(() => loadData(retryCount + 1), delay);
            return;
          } else {
            console.warn(
              "[SharePoint] MSAL not ready after retries, setting error state"
            );
            dispatch({
              type: "SET_ERROR",
              payload: "MSAL initialization failed",
            });
            dispatch({ type: "SET_LOADING", payload: false });
            return;
          }
        }

        // Additional delay to allow MSAL to populate account info

        await new Promise((resolve) => setTimeout(resolve, 500));

        // Check if user is authenticated using multiple MSAL methods
        const activeAccount = instance.getActiveAccount();
        const allAccounts = instance.getAllAccounts();

        // Use any available account (active or first available)
        const account =
          activeAccount || (allAccounts.length > 0 ? allAccounts[0] : null);

        if (!account) {
          dispatch({
            type: "SET_ERROR",
            payload: "No authenticated user found",
          });
          dispatch({ type: "SET_LOADING", payload: false });
          return;
        }

        // Additional delay to ensure authentication state is stable

        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Test token acquisition before attempting SharePoint loading
        try {
          await acquireToken(instance, defaultScopes());
        } catch (tokenError) {
          console.warn("[SharePoint] Token acquisition failed:", tokenError);
          dispatch({
            type: "SET_ERROR",
            payload: "Token acquisition failed",
          });
          dispatch({ type: "SET_LOADING", payload: false });
          return;
        }

        // Only proceed with SharePoint if token acquisition was successful
        try {
          // Clear any previous errors
          dispatch({ type: "SET_ERROR", payload: null });

          await loadAssetsFromSharePoint();
          await loadCategoriesFromSharePoint();
          await loadVenturesFromSharePoint();
          await loadDepartmentsFromSharePoint();
          await loadStatusesFromSharePoint();
          await loadSuppliersFromSharePoint();
          await loadTagsFromSharePoint();
          await loadSoftwareCatalogFromSharePoint();
          await loadLicensesFromSharePointContext(); // Load licenses from SharePoint

          // Load relationship and history data
          await loadAssetHistoryFromSharePoint();
          await loadLicenseHistoryFromSharePoint();
          await loadAssetTagsFromSharePoint();
          await loadAssetSoftwareFromSharePoint();
          await loadAssetRelationsFromSharePoint();

          // Set loading to false after successful data load
          dispatch({ type: "SET_LOADING", payload: false });
        } catch (sharePointError) {
          console.warn(
            "[SharePoint] SharePoint loading failed:",
            sharePointError
          );
          dispatch({
            type: "SET_ERROR",
            payload: "Failed to load data from SharePoint",
          });
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } catch (error) {
        if (
          error.message.includes("MSAL not fully initialized") &&
          retryCount < 3
        ) {
          console.warn(
            `[SharePoint] MSAL initialization error (attempt ${
              retryCount + 1
            }/3), retrying...`
          );
          setTimeout(() => loadData(retryCount + 1), 1000);
          return;
        }

        console.warn("[SharePoint] Auto-load failed:", error);
        dispatch({ type: "SET_ERROR", payload: "Data loading failed" });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: "SharePoint URL not configured",
      });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }

  // Helper function to ensure lookup IDs exist
  const ensureLookupId = async (tableKey, name) => {
    if (!name) return undefined;

    const table = state[tableKey] || [];
    const existing = table.find((t) => t.name === name);
    if (existing) return existing.id;

    // If we have SharePoint access, try to create the lookup item there
    if (siteUrl) {
      try {
        let newItem;
        switch (tableKey) {
          case "categoriesTable":
            newItem = await createCategoryInSharePoint(instance, siteUrl, name);
            break;
          case "venturesTable":
            newItem = await createVentureInSharePoint(instance, siteUrl, name);
            break;
          case "departmentsTable":
            newItem = await createDepartmentInSharePoint(
              instance,
              siteUrl,
              name
            );
            break;
          case "statusesTable":
            newItem = await createStatusInSharePoint(instance, siteUrl, name);
            break;
          case "suppliersTable":
            newItem = await createSupplierInSharePoint(instance, siteUrl, name);
            break;
          case "tagsTable":
            newItem = await createTagInSharePoint(instance, siteUrl, name);
            break;
          case "softwareTable":
            newItem = await createSoftwareInSharePoint(instance, siteUrl, name);
            break;
          default:
            throw new Error(`Unknown table key: ${tableKey}`);
        }

        // Update local state with the new item
        const updatedTable = [...table, newItem];
        dispatch({
          type: "INIT_TABLES",
          payload: { [tableKey]: updatedTable },
        });

        // Also update the UI lists for the main lookup fields
        if (tableKey === "categoriesTable") {
          const categoryNames = updatedTable.map((cat) => cat.name);
          dispatch({
            type: "INIT_TABLES",
            payload: { categories: categoryNames },
          });
        } else if (tableKey === "venturesTable") {
          const ventureNames = updatedTable.map((v) => v.name);
          dispatch({
            type: "INIT_TABLES",
            payload: { ventures: ventureNames },
          });
        } else if (tableKey === "departmentsTable") {
          const departmentNames = updatedTable.map((d) => d.name);
          dispatch({
            type: "INIT_TABLES",
            payload: { departments: departmentNames },
          });
        } else if (tableKey === "statusesTable") {
          const statusNames = updatedTable.map((s) => s.name);
          dispatch({ type: "INIT_TABLES", payload: { statuses: statusNames } });
        } else if (tableKey === "suppliersTable") {
          const supplierNames = updatedTable.map((s) => s.name);
          dispatch({
            type: "INIT_TABLES",
            payload: { suppliers: supplierNames },
          });
        }

        return newItem.id;
      } catch (error) {
        console.warn(
          `[SharePoint] Failed to create ${tableKey.replace(
            "Table",
            ""
          )} '${name}' in SharePoint:`,
          error
        );
        // Fall back to local creation
      }
    }

    // Local fallback
    const newId = (table[table.length - 1]?.id || 0) + 1;
    const updated = [...table, { id: newId, name }];
    dispatch({ type: "INIT_TABLES", payload: { [tableKey]: updated } });
    return newId;
  };

  // Load data on mount and when authentication state changes
  useEffect(() => {
    // Don't load data if no SharePoint URL or if MSAL instance is not ready
    if (!siteUrl || !instance) {
      if (!siteUrl) {
        console.warn("[SharePoint] No SharePoint URL configured");
        // Initialize with sample data for local development
        dispatch({
          type: "INIT_TABLES",
          payload: {
            tagsTable: [
              { id: 1, name: "Critical" },
              { id: 2, name: "Production" },
              { id: 3, name: "Development" },
              { id: 4, name: "Testing" },
              { id: 5, name: "Backup" },
              { id: 6, name: "Network" },
              { id: 7, name: "Security" },
              { id: 8, name: "Legacy" },
            ],
            tags: [
              "Critical",
              "Production",
              "Development",
              "Testing",
              "Backup",
              "Network",
              "Security",
              "Legacy",
            ],
            categoriesTable: [
              { id: 1, name: "Laptop" },
              { id: 2, name: "Desktop" },
              { id: 3, name: "Server" },
              { id: 4, name: "Network" },
              { id: 5, name: "Mobile" },
              { id: 6, name: "Peripheral" },
              { id: 7, name: "Software" },
              { id: 8, name: "Other" },
            ],
            categories: [
              "Laptop",
              "Desktop",
              "Server",
              "Network",
              "Mobile",
              "Peripheral",
              "Software",
              "Other",
            ],
            statusesTable: [
              { id: 1, name: "In Use" },
              { id: 2, name: "In Repair" },
              { id: 3, name: "In Stock" },
              { id: 4, name: "Retired" },
            ],
            statuses: ["In Use", "In Repair", "In Stock", "Retired"],
            venturesTable: [
              { id: 1, name: "Venture A" },
              { id: 2, name: "Venture B" },
              { id: 3, name: "Venture C" },
            ],
            ventures: ["Venture A", "Venture B", "Venture C"],
            departmentsTable: [
              { id: 1, name: "IT" },
              { id: 2, name: "Finance" },
              { id: 3, name: "HR" },
              { id: 4, name: "Operations" },
            ],
            departments: ["IT", "Finance", "HR", "Operations"],
            softwareTable: [
              { id: 1, name: "Windows 11" },
              { id: 2, name: "Office 365" },
              { id: 3, name: "Adobe Creative Suite" },
              { id: 4, name: "Visual Studio Code" },
              { id: 5, name: "Chrome" },
              { id: 6, name: "Firefox" },
              { id: 7, name: "Slack" },
              { id: 8, name: "Teams" },
            ],
            software: [
              "Windows 11",
              "Office 365",
              "Adobe Creative Suite",
              "Visual Studio Code",
              "Chrome",
              "Firefox",
              "Slack",
              "Teams",
            ],
            loading: false,
          },
        });
      }
      if (!instance) {
        console.warn("[SharePoint] MSAL instance not ready");
      }
      return;
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siteUrl, instance, accounts]);

  // Separate effect to handle authentication state changes
  useEffect(() => {
    if (siteUrl && instance && accounts && accounts.length > 0) {
      console.log("[SharePoint] Authentication state changed, reloading data");
      // Clear any existing errors when authentication state changes
      dispatch({ type: "SET_ERROR", payload: null });
      // Set loading state to show progress
      dispatch({ type: "SET_LOADING", payload: true });
      // Longer delay to ensure MSAL state is fully stable
      setTimeout(() => {
        loadData();
      }, 500);
    } else if (accounts && accounts.length === 0) {
      // User logged out, clear data and errors
      console.log("[SharePoint] User logged out, clearing data");
      dispatch({ type: "SET_ERROR", payload: null });
      dispatch({ type: "SET_LOADING", payload: false });
    }
  }, [accounts, siteUrl, instance]);

  // Denormalize helpers for UI views
  // Note: These functions are not currently used but kept for future reference
  // const buildAssetsView = () => { ... };
  // const buildLicensesView = () => { ... };

  // Function to check if user is authenticated
  const isAuthenticated = () => {
    return instance && instance.getAllAccounts().length > 0;
  };

  // Function to manually refresh all data
  const refreshData = async () => {
    if (siteUrl && instance) {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });
      try {
        await loadData();
      } catch (error) {
        console.error("[SharePoint] Manual refresh failed:", error);
        dispatch({ type: "SET_ERROR", payload: String(error) });
      }
    }
  };

  // SharePoint integration (incremental start with Assets list)
  const loadAssetsFromSharePoint = async () => {
    if (!siteUrl) {
      console.warn("[SharePoint] REACT_APP_SHAREPOINT_SITE_URL is not set");
      return;
    }
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const assets = await getAssetsFromSharePoint(instance, siteUrl, "Assets");
      // Replace local assetsCore with remote data
      dispatch({ type: "SET_ASSETS", payload: assets });
    } catch (error) {
      console.error("[SharePoint] Failed to load Assets:", error);
      dispatch({ type: "SET_ERROR", payload: String(error) });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  // Load categories from SharePoint
  const loadCategoriesFromSharePoint = async () => {
    if (!siteUrl) {
      console.warn("[SharePoint] REACT_APP_SHAREPOINT_SITE_URL is not set");
      return;
    }
    try {
      const categories = await getCategoriesFromSharePoint(
        instance,
        siteUrl,
        "Categories"
      );

      // Update the categories table with SharePoint data
      dispatch({
        type: "INIT_TABLES",
        payload: { categoriesTable: categories },
      });

      // Also update the UI categories list - ensure we have valid names
      const categoryNames = categories
        .filter((cat) => cat && cat.name)
        .map((cat) => cat.name);
      dispatch({
        type: "INIT_TABLES",
        payload: { categories: categoryNames },
      });

      return categories;
    } catch (error) {
      console.error("[SharePoint] Failed to load Categories:", error);
      // Fall back to sample data if SharePoint fails
      return null;
    }
  };

  // Load ventures from SharePoint
  const loadVenturesFromSharePoint = async () => {
    if (!siteUrl) return null;
    try {
      const ventures = await getVenturesFromSharePoint(
        instance,
        siteUrl,
        "Ventures"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { venturesTable: ventures },
      });

      const ventureNames = ventures
        .filter((ven) => ven && ven.name)
        .map((ven) => ven.name);
      dispatch({
        type: "INIT_TABLES",
        payload: { ventures: ventureNames },
      });

      return ventures;
    } catch (error) {
      console.error("[SharePoint] Failed to load Ventures:", error);
      return null;
    }
  };

  // Load departments from SharePoint
  const loadDepartmentsFromSharePoint = async () => {
    if (!siteUrl) return null;
    try {
      const departments = await getDepartmentsFromSharePoint(
        instance,
        siteUrl,
        "Departments"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { departmentsTable: departments },
      });

      const departmentNames = departments
        .filter((dept) => dept && dept.name)
        .map((dept) => dept.name);
      dispatch({
        type: "INIT_TABLES",
        payload: { departments: departmentNames },
      });

      return departments;
    } catch (error) {
      console.error("[SharePoint] Failed to load Departments:", error);
      return null;
    }
  };

  // Load statuses from SharePoint
  const loadStatusesFromSharePoint = async () => {
    if (!siteUrl) return null;
    try {
      const statuses = await getStatusesFromSharePoint(
        instance,
        siteUrl,
        "Statuses"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { statusesTable: statuses },
      });

      const statusNames = statuses
        .filter((status) => status && status.name)
        .map((status) => status.name);
      dispatch({
        type: "INIT_TABLES",
        payload: { statuses: statusNames },
      });

      return statuses;
    } catch (error) {
      console.error("[SharePoint] Failed to load Statuses:", error);
      return null;
    }
  };

  // Load suppliers from SharePoint
  const loadSuppliersFromSharePoint = async () => {
    if (!siteUrl) return null;
    try {
      const suppliers = await getSuppliersFromSharePoint(
        instance,
        siteUrl,
        "Suppliers"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { suppliersTable: suppliers },
      });

      const supplierNames = suppliers
        .filter((supp) => supp && supp.name)
        .map((supp) => supp.name);
      dispatch({
        type: "INIT_TABLES",
        payload: { suppliers: supplierNames },
      });

      return suppliers;
    } catch (error) {
      console.error("[SharePoint] Failed to load Suppliers:", error);
      return null;
    }
  };

  // Load tags from SharePoint
  const loadTagsFromSharePoint = async () => {
    if (!siteUrl) return null;
    try {
      const tags = await getTagsFromSharePoint(instance, siteUrl, "Tags");

      dispatch({
        type: "INIT_TABLES",
        payload: { tagsTable: tags },
      });

      return tags;
    } catch (error) {
      console.error("[SharePoint] Failed to load Tags:", error);
      return null;
    }
  };

  // Load Software_Catalog from SharePoint
  const loadSoftwareCatalogFromSharePoint = async () => {
    if (!siteUrl) return null;
    try {
      const software = await getSoftwareCatalogFromSharePoint(
        instance,
        siteUrl,
        "Software_Catalog"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { softwareTable: software },
      });

      return software;
    } catch (error) {
      console.error("[SharePoint] Failed to load Software_Catalog:", error);
      return null;
    }
  };

  // Load licenses from SharePoint
  const loadLicensesFromSharePointContext = async () => {
    try {
      const licenses = await loadLicensesFromSharePoint(
        instance,
        siteUrl,
        "Licenses"
      );

      dispatch({
        type: "SET_LICENSES",
        payload: licenses,
      });

      return licenses;
    } catch (error) {
      console.error("[SharePoint] Failed to load Licenses:", error);
      return null;
    }
  };

  // Load asset history from SharePoint
  const loadAssetHistoryFromSharePoint = async () => {
    try {
      const assetHistory = await getAssetHistoryFromSharePoint(
        instance,
        siteUrl,
        "Asset_History"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetHistory },
      });

      return assetHistory;
    } catch (error) {
      console.error("[SharePoint] Failed to load Asset_History:", error);
      return [];
    }
  };

  // Load license history from SharePoint
  const loadLicenseHistoryFromSharePoint = async () => {
    try {
      const licenseHistory = await getLicenseHistoryFromSharePoint(
        instance,
        siteUrl,
        "License_History"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { licenseHistory },
      });

      return licenseHistory;
    } catch (error) {
      console.error("[SharePoint] Failed to load License_History:", error);
      return [];
    }
  };

  // Load asset tags from SharePoint
  const loadAssetTagsFromSharePoint = async () => {
    try {
      const assetTags = await getAssetTagsFromSharePoint(
        instance,
        siteUrl,
        "Asset_Tags"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetTags },
      });

      return assetTags;
    } catch (error) {
      console.error("[SharePoint] Failed to load Asset_Tags:", error);
      return [];
    }
  };

  // Load asset software from SharePoint
  const loadAssetSoftwareFromSharePoint = async () => {
    try {
      const assetSoftware = await getAssetSoftwareFromSharePoint(
        instance,
        siteUrl,
        "Asset_Software"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetSoftware },
      });

      return assetSoftware;
    } catch (error) {
      console.error("[SharePoint] Failed to load Asset_Software:", error);
      return [];
    }
  };

  // Load asset relations from SharePoint
  const loadAssetRelationsFromSharePoint = async () => {
    try {
      const assetRelations = await getAssetRelationsFromSharePoint(
        instance,
        siteUrl,
        "Asset_Relations"
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetRelations },
      });

      return assetRelations;
    } catch (error) {
      console.error("[SharePoint] Failed to load Asset_Relations:", error);
      return [];
    }
  };

  // CRUD functions for Categories
  const addCategory = async (categoryName) => {
    if (!categoryName?.trim()) return null;

    try {
      if (siteUrl) {
        const newCategory = await createCategoryInSharePoint(
          instance,
          siteUrl,
          categoryName
        );
        dispatch({
          type: "INIT_TABLES",
          payload: {
            categoriesTable: [...state.categoriesTable, newCategory],
            categories: [...state.categories, newCategory.name],
          },
        });
        return newCategory;
      } else {
        // Local fallback
        const newId =
          (state.categoriesTable[state.categoriesTable.length - 1]?.id || 0) +
          1;
        const newCategory = { id: newId, name: categoryName };
        dispatch({
          type: "INIT_TABLES",
          payload: {
            categoriesTable: [...state.categoriesTable, newCategory],
            categories: [...state.categories, categoryName],
          },
        });
        return newCategory;
      }
    } catch (error) {
      console.error("[SharePoint] Failed to create category:", error);
      // Fall back to local creation
      const newId =
        (state.categoriesTable[state.categoriesTable.length - 1]?.id || 0) + 1;
      const newCategory = { id: newId, name: categoryName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          categoriesTable: [...state.categoriesTable, newCategory],
          categories: [...state.categories, categoryName],
        },
      });
      return newCategory;
    }
  };

  const updateCategory = async (categoryId, newName) => {
    if (!newName?.trim()) return null;

    try {
      if (siteUrl) {
        const updatedCategory = await updateCategoryInSharePoint(
          instance,
          siteUrl,
          categoryId,
          newName
        );
        const updatedTable = state.categoriesTable.map((cat) =>
          cat.id === categoryId ? updatedCategory : cat
        );
        const updatedNames = updatedTable.map((cat) => cat.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            categoriesTable: updatedTable,
            categories: updatedNames,
          },
        });
        return updatedCategory;
      } else {
        // Local fallback
        const updatedTable = state.categoriesTable.map((cat) =>
          cat.id === categoryId ? { ...cat, name: newName } : cat
        );
        const updatedNames = updatedTable.map((cat) => cat.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            categoriesTable: updatedTable,
            categories: updatedNames,
          },
        });
        return { id: categoryId, name: newName };
      }
    } catch (error) {
      console.error("[SharePoint] Failed to update category:", error);
      // Fall back to local update
      const updatedTable = state.categoriesTable.map((cat) =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
      );
      const updatedNames = updatedTable.map((cat) => cat.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          categoriesTable: updatedTable,
          categories: updatedNames,
        },
      });
      return { id: categoryId, name: newName };
    }
  };

  const deleteCategory = async (categoryId) => {
    if (!categoryId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        categoryId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteCategoryFromSharePoint(instance, siteUrl, categoryId);
      }

      const updatedTable = state.categoriesTable.filter(
        (cat) => cat.id !== categoryId
      );
      const updatedNames = updatedTable.map((cat) => cat.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          categoriesTable: updatedTable,
          categories: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete category:", error);
      return false;
    }
  };

  // CRUD functions for Ventures
  const addVenture = async (ventureName) => {
    if (!ventureName?.trim()) return null;

    try {
      if (siteUrl) {
        const newVenture = await createVentureInSharePoint(
          instance,
          siteUrl,
          ventureName
        );
        dispatch({
          type: "INIT_TABLES",
          payload: {
            venturesTable: [...state.venturesTable, newVenture],
            ventures: [...state.ventures, newVenture.name],
          },
        });
        return newVenture;
      } else {
        // Local fallback
        const newId =
          (state.venturesTable[state.venturesTable.length - 1]?.id || 0) + 1;
        const newVenture = { id: newId, name: ventureName };
        dispatch({
          type: "INIT_TABLES",
          payload: {
            venturesTable: [...state.venturesTable, newVenture],
            ventures: [...state.ventures, ventureName],
          },
        });
        return newVenture;
      }
    } catch (error) {
      console.error("[SharePoint] Failed to create venture:", error);
      // Fall back to local creation
      const newId =
        (state.venturesTable[state.venturesTable.length - 1]?.id || 0) + 1;
      const newVenture = { id: newId, name: ventureName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          venturesTable: [...state.venturesTable, newVenture],
          ventures: [...state.ventures, ventureName],
        },
      });
      return newVenture;
    }
  };

  const updateVenture = async (ventureId, newName) => {
    if (!newName?.trim()) return null;

    try {
      if (siteUrl) {
        const updatedVenture = await updateVentureInSharePoint(
          instance,
          siteUrl,
          ventureId,
          newName
        );
        const updatedTable = state.venturesTable.map((ven) =>
          ven.id === ventureId ? updatedVenture : ven
        );
        const updatedNames = updatedTable.map((ven) => ven.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            venturesTable: updatedTable,
            ventures: updatedNames,
          },
        });
        return updatedVenture;
      } else {
        // Local fallback
        const updatedTable = state.venturesTable.map((ven) =>
          ven.id === ventureId ? { ...ven, name: newName } : ven
        );
        const updatedNames = updatedTable.map((ven) => ven.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            venturesTable: updatedTable,
            ventures: updatedNames,
          },
        });
        return { id: ventureId, name: newName };
      }
    } catch (error) {
      console.error("[SharePoint] Failed to update venture:", error);
      // Fall back to local update
      const updatedTable = state.venturesTable.map((ven) =>
        ven.id === ventureId ? { ...ven, name: newName } : ven
      );
      const updatedNames = updatedTable.map((ven) => ven.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          venturesTable: updatedTable,
          ventures: updatedNames,
        },
      });
      return { id: ventureId, name: newName };
    }
  };

  const deleteVenture = async (ventureId) => {
    if (!ventureId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        ventureId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteVentureFromSharePoint(instance, siteUrl, ventureId);
      }

      const updatedTable = state.venturesTable.filter(
        (ven) => ven.id !== ventureId
      );
      const updatedNames = updatedTable.map((ven) => ven.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          venturesTable: updatedTable,
          ventures: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete venture:", error);
      return false;
    }
  };

  // CRUD functions for Departments
  const addDepartment = async (departmentName) => {
    if (!departmentName?.trim()) return null;

    try {
      if (siteUrl) {
        const newDepartment = await createDepartmentInSharePoint(
          instance,
          siteUrl,
          departmentName
        );
        dispatch({
          type: "INIT_TABLES",
          payload: {
            departmentsTable: [...state.departmentsTable, newDepartment],
            departments: [...state.departments, newDepartment.name],
          },
        });
        return newDepartment;
      } else {
        // Local fallback
        const newId =
          (state.departmentsTable[state.departmentsTable.length - 1]?.id || 0) +
          1;
        const newDepartment = { id: newId, name: departmentName };
        dispatch({
          type: "INIT_TABLES",
          payload: {
            departmentsTable: [...state.departmentsTable, newDepartment],
            departments: [...state.departments, departmentName],
          },
        });
        return newDepartment;
      }
    } catch (error) {
      console.error("[SharePoint] Failed to create department:", error);
      // Fall back to local creation
      const newId =
        (state.departmentsTable[state.departmentsTable.length - 1]?.id || 0) +
        1;
      const newDepartment = { id: newId, name: departmentName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          departmentsTable: [...state.departmentsTable, newDepartment],
          departments: [...state.departments, departmentName],
        },
      });
      return newDepartment;
    }
  };

  const updateDepartment = async (departmentId, newName) => {
    if (!newName?.trim()) return null;

    try {
      if (siteUrl) {
        const updatedDepartment = await updateDepartmentInSharePoint(
          instance,
          siteUrl,
          departmentId,
          newName
        );
        const updatedTable = state.departmentsTable.map((dept) =>
          dept.id === departmentId ? updatedDepartment : dept
        );
        const updatedNames = updatedTable.map((dept) => dept.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            departmentsTable: updatedTable,
            departments: updatedNames,
          },
        });
        return updatedDepartment;
      } else {
        // Local fallback
        const updatedTable = state.departmentsTable.map((dept) =>
          dept.id === departmentId ? { ...dept, name: newName } : dept
        );
        const updatedNames = updatedTable.map((dept) => dept.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            departmentsTable: updatedTable,
            departments: updatedNames,
          },
        });
        return { id: departmentId, name: newName };
      }
    } catch (error) {
      console.error("[SharePoint] Failed to update department:", error);
      // Fall back to local update
      const updatedTable = state.departmentsTable.map((dept) =>
        dept.id === departmentId ? { ...dept, name: newName } : dept
      );
      const updatedNames = updatedTable.map((dept) => dept.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          departmentsTable: updatedTable,
          departments: updatedNames,
        },
      });
      return { id: departmentId, name: newName };
    }
  };

  const deleteDepartment = async (departmentId) => {
    if (!departmentId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        departmentId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteDepartmentFromSharePoint(instance, siteUrl, departmentId);
      }

      const updatedTable = state.departmentsTable.filter(
        (dept) => dept.id !== departmentId
      );
      const updatedNames = updatedTable.map((dept) => dept.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          departmentsTable: updatedTable,
          departments: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete department:", error);
      return false;
    }
  };

  // CRUD functions for Statuses
  const addStatus = async (statusName) => {
    if (!statusName?.trim()) return null;

    try {
      if (siteUrl) {
        const newStatus = await createStatusInSharePoint(
          instance,
          siteUrl,
          statusName
        );
        dispatch({
          type: "INIT_TABLES",
          payload: {
            statusesTable: [...state.statusesTable, newStatus],
            statuses: [...state.statuses, newStatus.name],
          },
        });
        return newStatus;
      } else {
        // Local fallback
        const newId =
          (state.statusesTable[state.statusesTable.length - 1]?.id || 0) + 1;
        const newStatus = { id: newId, name: statusName };
        dispatch({
          type: "INIT_TABLES",
          payload: {
            statusesTable: [...state.statusesTable, newStatus],
            statuses: [...state.statuses, statusName],
          },
        });
        return newStatus;
      }
    } catch (error) {
      console.error("[SharePoint] Failed to create status:", error);
      // Fall back to local creation
      const newId =
        (state.statusesTable[state.statusesTable.length - 1]?.id || 0) + 1;
      const newStatus = { id: newId, name: statusName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          statusesTable: [...state.statusesTable, newStatus],
          statuses: [...state.statuses, statusName],
        },
      });
      return newStatus;
    }
  };

  const updateStatus = async (statusId, newName) => {
    if (!newName?.trim()) return null;

    try {
      if (siteUrl) {
        const updatedStatus = await updateStatusInSharePoint(
          instance,
          siteUrl,
          statusId,
          newName
        );
        const updatedTable = state.statusesTable.map((status) =>
          status.id === statusId ? updatedStatus : status
        );
        const updatedNames = updatedTable.map((status) => status.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            statusesTable: updatedTable,
            statuses: updatedNames,
          },
        });
        return updatedStatus;
      } else {
        // Local fallback
        const updatedTable = state.statusesTable.map((status) =>
          status.id === statusId ? { ...status, name: newName } : status
        );
        const updatedNames = updatedTable.map((status) => status.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            statusesTable: updatedTable,
            statuses: updatedNames,
          },
        });
        return { id: statusId, name: newName };
      }
    } catch (error) {
      console.error("[SharePoint] Failed to update status:", error);
      // Fall back to local update
      const updatedTable = state.statusesTable.map((status) =>
        status.id === statusId ? { ...status, name: newName } : status
      );
      const updatedNames = updatedTable.map((status) => status.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          statusesTable: updatedTable,
          statuses: updatedNames,
        },
      });
      return { id: statusId, name: newName };
    }
  };

  const deleteStatus = async (statusId) => {
    if (!statusId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        statusId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteStatusFromSharePoint(instance, siteUrl, statusId);
      }

      const updatedTable = state.statusesTable.filter(
        (status) => status.id !== statusId
      );
      const updatedNames = updatedTable.map((status) => status.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          statusesTable: updatedTable,
          statuses: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete status:", error);
      return false;
    }
  };

  // CRUD functions for Suppliers
  const addSupplier = async (supplierName) => {
    if (!supplierName?.trim()) return null;

    try {
      if (siteUrl) {
        const newSupplier = await createSupplierInSharePoint(
          instance,
          siteUrl,
          supplierName
        );
        dispatch({
          type: "INIT_TABLES",
          payload: {
            suppliersTable: [...state.suppliersTable, newSupplier],
            suppliers: [...state.suppliers, newSupplier.name],
          },
        });
        return newSupplier;
      } else {
        // Local fallback
        const newId =
          (state.suppliersTable[state.suppliersTable.length - 1]?.id || 0) + 1;
        const newSupplier = { id: newId, name: supplierName };
        dispatch({
          type: "INIT_TABLES",
          payload: {
            suppliersTable: [...state.suppliersTable, newSupplier],
            suppliers: [...state.suppliers, supplierName],
          },
        });
        return newSupplier;
      }
    } catch (error) {
      console.error("[SharePoint] Failed to create supplier:", error);
      // Fall back to local creation
      const newId =
        (state.suppliersTable[state.suppliersTable.length - 1]?.id || 0) + 1;
      const newSupplier = { id: newId, name: supplierName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          suppliersTable: [...state.suppliersTable, newSupplier],
          suppliers: [...state.suppliers, supplierName],
        },
      });
      return newSupplier;
    }
  };

  const updateSupplier = async (supplierId, newName) => {
    if (!newName?.trim()) return null;

    try {
      if (siteUrl) {
        const updatedSupplier = await updateSupplierInSharePoint(
          instance,
          siteUrl,
          supplierId,
          newName
        );
        const updatedTable = state.suppliersTable.map((supp) =>
          supp.id === supplierId ? updatedSupplier : supp
        );
        const updatedNames = updatedTable.map((supp) => supp.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            suppliersTable: updatedTable,
            suppliers: updatedNames,
          },
        });
        return updatedSupplier;
      } else {
        // Local fallback
        const updatedTable = state.suppliersTable.map((supp) =>
          supp.id === supplierId ? { ...supp, name: newName } : supp
        );
        const updatedNames = updatedTable.map((supp) => supp.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            suppliersTable: updatedTable,
            suppliers: updatedNames,
          },
        });
        return { id: supplierId, name: newName };
      }
    } catch (error) {
      console.error("[SharePoint] Failed to update supplier:", error);
      // Fall back to local update
      const updatedTable = state.suppliersTable.map((supp) =>
        supp.id === supplierId ? { ...supp, name: newName } : supp
      );
      const updatedNames = updatedTable.map((supp) => supp.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          suppliersTable: updatedTable,
          suppliers: updatedNames,
        },
      });
      return { id: supplierId, name: newName };
    }
  };

  const deleteSupplier = async (supplierId) => {
    if (!supplierId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        supplierId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteSupplierFromSharePoint(instance, siteUrl, supplierId);
      }

      const updatedTable = state.suppliersTable.filter(
        (supp) => supp.id !== supplierId
      );
      const updatedNames = updatedTable.map((supp) => supp.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          suppliersTable: updatedTable,
          suppliers: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete supplier:", error);
      return false;
    }
  };

  // CRUD functions for Software
  const addSoftware = async (softwareName) => {
    if (!softwareName?.trim()) return null;

    try {
      if (siteUrl) {
        const newSoftware = await createSoftwareInSharePoint(
          instance,
          siteUrl,
          softwareName
        );
        dispatch({
          type: "INIT_TABLES",
          payload: {
            softwareTable: [...state.softwareTable, newSoftware],
            software: [...state.software, newSoftware.name],
          },
        });
        return newSoftware;
      } else {
        // Local fallback
        const newId =
          (state.softwareTable[state.softwareTable.length - 1]?.id || 0) + 1;
        const newSoftware = { id: newId, name: softwareName };
        dispatch({
          type: "INIT_TABLES",
          payload: {
            softwareTable: [...state.softwareTable, newSoftware],
            software: [...state.software, softwareName],
          },
        });
        return newSoftware;
      }
    } catch (error) {
      console.error("[SharePoint] Failed to create software:", error);
      // Fall back to local creation
      const newId =
        (state.softwareTable[state.softwareTable.length - 1]?.id || 0) + 1;
      const newSoftware = { id: newId, name: softwareName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          softwareTable: [...state.softwareTable, newSoftware],
          software: [...state.software, softwareName],
        },
      });
      return newSoftware;
    }
  };

  const updateSoftware = async (softwareId, newName) => {
    if (!newName?.trim()) return null;

    try {
      if (siteUrl) {
        const updatedSoftware = await updateSoftwareInSharePoint(
          instance,
          siteUrl,
          softwareId,
          newName
        );
        const updatedTable = state.softwareTable.map((sw) =>
          sw.id === softwareId ? updatedSoftware : sw
        );
        const updatedNames = updatedTable.map((sw) => sw.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            softwareTable: updatedTable,
            software: updatedNames,
          },
        });
        return updatedSoftware;
      } else {
        // Local fallback
        const updatedTable = state.softwareTable.map((sw) =>
          sw.id === softwareId ? { ...sw, name: newName } : sw
        );
        const updatedNames = updatedTable.map((sw) => sw.name);
        dispatch({
          type: "INIT_TABLES",
          payload: {
            softwareTable: updatedTable,
            software: updatedNames,
          },
        });
        return { id: softwareId, name: newName };
      }
    } catch (error) {
      console.error("[SharePoint] Failed to update software:", error);
      // Fall back to local update
      const updatedTable = state.softwareTable.map((sw) =>
        sw.id === softwareId ? { ...sw, name: newName } : sw
      );
      const updatedNames = updatedTable.map((sw) => sw.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          softwareTable: updatedTable,
          software: updatedNames,
        },
      });
      return { id: softwareId, name: newName };
    }
  };

  const deleteSoftware = async (softwareId) => {
    if (!softwareId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        softwareId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteSoftwareFromSharePoint(instance, siteUrl, softwareId);
      }

      const updatedTable = state.softwareTable.filter(
        (sw) => sw.id !== softwareId
      );
      const updatedNames = updatedTable.map((sw) => sw.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          softwareTable: updatedTable,
          software: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete software:", error);
      return false;
    }
  };

  // CRUD functions for Tags
  const addTag = async (tagName) => {
    if (!tagName?.trim()) return null;

    try {
      // Local fallback
      const newId = (state.tagsTable[state.tagsTable.length - 1]?.id || 0) + 1;
      const newTag = { id: newId, name: tagName };
      dispatch({
        type: "INIT_TABLES",
        payload: {
          tagsTable: [...state.tagsTable, newTag],
          tags: [...state.tags, tagName],
        },
      });
      return newTag;
    } catch (error) {
      console.error("[Tags] Failed to create tag:", error);
      return null;
    }
  };

  const updateTag = async (tagId, newName) => {
    if (!newName?.trim()) return null;

    try {
      // Local fallback
      const updatedTable = state.tagsTable.map((tag) =>
        tag.id === tagId ? { ...tag, name: newName } : tag
      );
      const updatedNames = updatedTable.map((tag) => tag.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          tagsTable: updatedTable,
          tags: updatedNames,
        },
      });
      return { id: tagId, name: newName };
    } catch (error) {
      console.error("[Tags] Failed to update tag:", error);
      return null;
    }
  };

  const deleteTag = async (tagId) => {
    if (!tagId) {
      console.warn("[Tags] Attempted to delete item with invalid ID:", tagId);
      return false;
    }

    try {
      // Remove all asset-tag relationships first
      const updatedAssetTags = state.assetTags.filter(
        (at) => at.tagId !== tagId
      );
      dispatch({
        type: "INIT_TABLES",
        payload: { assetTags: updatedAssetTags },
      });

      // Then remove the tag
      const updatedTable = state.tagsTable.filter((tag) => tag.id !== tagId);
      const updatedNames = updatedTable.map((tag) => tag.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          tagsTable: updatedTable,
          tags: updatedNames,
        },
      });
      return true;
    } catch (error) {
      console.error("[Tags] Failed to delete tag:", error);
      return false;
    }
  };

  // CRUD functions for Asset Tags
  const addAssetTag = async (assetId, tagId) => {
    if (!assetId || !tagId) return null;

    try {
      // Check if relationship already exists
      const existing = state.assetTags.find(
        (at) => at.assetId === assetId && at.tagId === tagId
      );
      if (existing) return existing;

      const newId = (state.assetTags[state.assetTags.length - 1]?.id || 0) + 1;
      let newAssetTag = { id: newId, assetId, tagId };

      // Create in SharePoint if configured
      if (siteUrl) {
        try {
          const createdAssetTag = await createAssetTagInSharePoint(
            instance,
            siteUrl,
            newAssetTag
          );
          if (createdAssetTag) {
            newAssetTag = createdAssetTag;
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetTags] SharePoint creation failed, keeping local only:",
            sharePointError
          );
        }
      }

      dispatch({
        type: "INIT_TABLES",
        payload: { assetTags: [...state.assetTags, newAssetTag] },
      });

      return newAssetTag;
    } catch (error) {
      console.error("[AssetTags] Failed to add asset tag:", error);
      return null;
    }
  };

  const removeAssetTag = async (assetId, tagId) => {
    if (!assetId || !tagId) return false;

    try {
      // Delete from SharePoint if configured
      if (siteUrl) {
        try {
          const assetTag = state.assetTags.find(
            (at) => at.assetId === assetId && at.tagId === tagId
          );
          if (assetTag) {
            await deleteAssetTagFromSharePoint(instance, siteUrl, assetTag.id);
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetTags] SharePoint deletion failed, keeping local only:",
            sharePointError
          );
        }
      }

      const updatedTags = state.assetTags.filter(
        (at) => !(at.assetId === assetId && at.tagId === tagId)
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetTags: updatedTags },
      });

      return true;
    } catch (error) {
      console.error("[AssetTags] Failed to remove asset tag:", error);
      return false;
    }
  };

  const getAssetTags = (assetId) => {
    return state.assetTags
      .filter((at) => at.assetId === assetId)
      .map((at) => state.tagsTable.find((tag) => tag.id === at.tagId))
      .filter(Boolean);
  };

  const getAssetsByTag = (tagId) => {
    return state.assetTags
      .filter((at) => at.tagId === tagId)
      .map((at) => state.assetsCore.find((asset) => asset.id === at.assetId))
      .filter(Boolean);
  };

  // CRUD functions for Asset Software
  const addAssetSoftware = async (assetId, softwareId) => {
    if (!assetId || !softwareId) return null;

    try {
      // Check if relationship already exists
      const existing = state.assetSoftware.find(
        (as) => as.assetId === assetId && as.softwareId === softwareId
      );
      if (existing) return existing;

      const newId =
        (state.assetSoftware[state.assetSoftware.length - 1]?.id || 0) + 1;
      let newAssetSoftware = { id: newId, assetId, softwareId };

      // Create in SharePoint if configured
      if (siteUrl) {
        try {
          const createdAssetSoftware = await createAssetSoftwareInSharePoint(
            instance,
            siteUrl,
            newAssetSoftware
          );
          if (createdAssetSoftware) {
            newAssetSoftware = createdAssetSoftware;
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetSoftware] SharePoint creation failed, keeping local only:",
            sharePointError
          );
        }
      }

      dispatch({
        type: "INIT_TABLES",
        payload: { assetSoftware: [...state.assetSoftware, newAssetSoftware] },
      });

      return newAssetSoftware;
    } catch (error) {
      console.error("[AssetSoftware] Failed to add asset software:", error);
      return null;
    }
  };

  const removeAssetSoftware = async (assetId, softwareId) => {
    if (!assetId || !softwareId) return false;

    try {
      // Delete from SharePoint if configured
      if (siteUrl) {
        try {
          const assetSoftware = state.assetSoftware.find(
            (as) => as.assetId === assetId && as.softwareId === softwareId
          );
          if (assetSoftware) {
            await deleteAssetSoftwareFromSharePoint(
              instance,
              siteUrl,
              assetSoftware.id
            );
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetSoftware] SharePoint deletion failed, keeping local only:",
            sharePointError
          );
        }
      }

      const updatedSoftware = state.assetSoftware.filter(
        (as) => !(as.assetId === assetId && as.softwareId === softwareId)
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetSoftware: updatedSoftware },
      });

      return true;
    } catch (error) {
      console.error("[AssetSoftware] Failed to remove asset software:", error);
      return false;
    }
  };

  const getAssetSoftware = (assetId) => {
    return state.assetSoftware
      .filter((as) => as.assetId === assetId)
      .map((as) =>
        state.softwareTable.find((software) => software.id === as.softwareId)
      )
      .filter(Boolean);
  };

  const getAssetsBySoftware = (softwareId) => {
    return state.assetSoftware
      .filter((as) => as.softwareId === softwareId)
      .map((as) => state.assetsCore.find((asset) => asset.id === as.assetId))
      .filter(Boolean);
  };

  // CRUD functions for Asset Relations
  const createAssetRelation = async (parentAssetId, childAssetId) => {
    if (!parentAssetId || !childAssetId || parentAssetId === childAssetId)
      return null;

    try {
      // Check if relationship already exists
      const existing = state.assetRelations.find(
        (ar) =>
          ar.parentAssetId === parentAssetId && ar.childAssetId === childAssetId
      );
      if (existing) return existing;

      const newId =
        (state.assetRelations[state.assetRelations.length - 1]?.id || 0) + 1;
      let newRelation = { id: newId, parentAssetId, childAssetId };

      // Create in SharePoint if configured
      if (siteUrl) {
        try {
          const createdRelation = await createAssetRelationInSharePoint(
            instance,
            siteUrl,
            newRelation
          );
          if (createdRelation) {
            newRelation = createdRelation;
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetRelations] SharePoint creation failed, keeping local only:",
            sharePointError
          );
        }
      }

      dispatch({
        type: "INIT_TABLES",
        payload: { assetRelations: [...state.assetRelations, newRelation] },
      });

      return newRelation;
    } catch (error) {
      console.error("[AssetRelations] Failed to create asset relation:", error);
      return null;
    }
  };

  const removeAssetRelation = async (parentAssetId, childAssetId) => {
    if (!parentAssetId || !childAssetId) return false;

    try {
      // Delete from SharePoint if configured
      if (siteUrl) {
        try {
          const assetRelation = state.assetRelations.find(
            (ar) =>
              ar.parentAssetId === parentAssetId &&
              ar.childAssetId === childAssetId
          );
          if (assetRelation) {
            await deleteAssetRelationFromSharePoint(
              instance,
              siteUrl,
              assetRelation.id
            );
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetRelations] SharePoint deletion failed, keeping local only:",
            sharePointError
          );
        }
      }

      const updatedRelations = state.assetRelations.filter(
        (ar) =>
          !(
            ar.parentAssetId === parentAssetId &&
            ar.childAssetId === childAssetId
          )
      );

      dispatch({
        type: "INIT_TABLES",
        payload: { assetRelations: updatedRelations },
      });

      return true;
    } catch (error) {
      console.error("[AssetRelations] Failed to remove asset relation:", error);
      return false;
    }
  };

  const getAssetChildren = (assetId) => {
    return state.assetRelations
      .filter((ar) => ar.parentAssetId === assetId)
      .map((ar) =>
        state.assetsCore.find((asset) => asset.id === ar.childAssetId)
      )
      .filter(Boolean);
  };

  const getAssetParents = (assetId) => {
    return state.assetRelations
      .filter((ar) => ar.childAssetId === assetId)
      .map((ar) =>
        state.assetsCore.find((asset) => asset.id === ar.parentAssetId)
      )
      .filter(Boolean);
  };

  const getAssetHierarchy = (assetId) => {
    const children = getAssetChildren(assetId);
    const parents = getAssetParents(assetId);

    return {
      children,
      parents,
      hasRelations: children.length > 0 || parents.length > 0,
    };
  };

  // Enhanced History Management
  const addAssetHistoryEntry = async (
    assetId,
    action,
    actorName = "System"
  ) => {
    if (!assetId || !action) return null;

    try {
      const newId =
        (state.assetHistory[state.assetHistory.length - 1]?.id || 0) + 1;
      let newEntry = {
        id: newId,
        assetId,
        date: new Date().toISOString(), // Full ISO datetime for SharePoint
        action,
        user: actorName,
      };

      // Create in SharePoint if configured
      if (siteUrl) {
        try {
          const createdEntry = await createAssetHistoryInSharePoint(
            instance,
            siteUrl,
            newEntry
          );
          if (createdEntry) {
            newEntry = createdEntry;
          }
        } catch (sharePointError) {
          console.warn(
            "[AssetHistory] SharePoint creation failed, keeping local only:",
            sharePointError
          );
        }
      }

      dispatch({
        type: "ADD_ASSET_HISTORY",
        payload: newEntry,
      });

      return newEntry;
    } catch (error) {
      console.error("[AssetHistory] Failed to add history entry:", error);
      return null;
    }
  };

  const addLicenseHistoryEntry = async (
    licenseId,
    action,
    actorName = "System"
  ) => {
    if (!licenseId || !action) return null;

    try {
      const newId =
        (state.licenseHistory[state.licenseHistory.length - 1]?.id || 0) + 1;
      let newEntry = {
        id: newId,
        licenseId,
        date: new Date().toISOString(), // Full ISO datetime for SharePoint
        action,
        user: actorName,
      };

      // Create in SharePoint if configured
      if (siteUrl) {
        try {
          const createdEntry = await createLicenseHistoryInSharePoint(
            instance,
            siteUrl,
            newEntry
          );
          if (createdEntry) {
            newEntry = createdEntry;
          }
        } catch (sharePointError) {
          console.warn(
            "[LicenseHistory] SharePoint creation failed, keeping local only:",
            sharePointError
          );
        }
      }

      dispatch({
        type: "ADD_LICENSE_HISTORY",
        payload: newEntry,
      });

      return newEntry;
    } catch (error) {
      console.error("[LicenseHistory] Failed to add history entry:", error);
      return null;
    }
  };

  const getAssetHistory = (assetId) => {
    const filtered = state.assetHistory.filter((h) => h.assetId === assetId);
    return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const getLicenseHistory = (licenseId) => {
    return state.licenseHistory
      .filter((h) => h.licenseId === licenseId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // CRUD helpers (UI → normalized persistence)
  const addAsset = async (assetData) => {
    // when SharePoint configured, create remotely first
    if (siteUrl) {
      try {
        // Try to get a write token first to check permissions
        let canWrite = false;
        try {
          await acquireToken(instance, ["Sites.ReadWrite.All"]);
          canWrite = true;
        } catch (scopeError) {
          console.warn(
            "[SharePoint] Write scope not available, creating locally only"
          );
          canWrite = false;
        }

        if (canWrite) {
          dispatch({ type: "SET_LOADING", payload: true });
          const created = await createAssetInSharePoint(instance, siteUrl, {
            name: assetData.name,
            categoryId: await ensureLookupId(
              "categoriesTable",
              assetData.category
            ),
            statusId: await ensureLookupId("statusesTable", assetData.status),
            ventureId: await ensureLookupId("venturesTable", assetData.venture),
            departmentId: await ensureLookupId(
              "departmentsTable",
              assetData.department
            ),
            ownerName: assetData.ownerName || "",
            assignedToName: assetData.assignedToName || "",
            userTitle: assetData.userTitle || "",
            assignedDate: assetData.assignedDate || formatDate(new Date()),
            location: assetData.location || "",
            assetTag: assetData.assetTag || "",
            serialNumber: assetData.serialNumber || "",
            supplierId: assetData.supplier
              ? await ensureLookupId("suppliersTable", assetData.supplier)
              : undefined,
            cost: assetData.cost || 0,
            depreciationRate: assetData.depreciationRate || 0,
            acquiredDate: assetData.acquiredDate || "",
            warrantyEndDate: assetData.warrantyEndDate || "",
            hostname: assetData.hostname || "",
            ipAddress: assetData.ipAddress || "",
            operatingSystem: assetData.operatingSystem || "",
            parentAssetId: assetData.parentAssetId || null,
            notes: assetData.notes || "",
          });
          // store the created as-is (already normalized id from SP)
          dispatch({ type: "ADD_ASSET", payload: created });

          // Add history entry
          await addAssetHistoryEntry(created.id, "Asset created", "System");

          // joins (tags/software) would be separate lists; defer for now
          return created;
        }
      } catch (error) {
        console.error(
          "[SharePoint] Create asset failed, falling back to local:",
          error
        );
        dispatch({ type: "SET_ERROR", payload: String(error) });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    // local fallback
    const newId = (state.assetsCore[state.assetsCore.length - 1]?.id || 0) + 1;
    const normalized = {
      id: newId,
      name: assetData.name,
      categoryId: await ensureLookupId("categoriesTable", assetData.category),
      statusId: await ensureLookupId("statusesTable", assetData.status),
      ventureId: await ensureLookupId("venturesTable", assetData.venture),
      departmentId: await ensureLookupId(
        "departmentsTable",
        assetData.department
      ),
      ownerName: assetData.ownerName || "",
      assignedToName: assetData.assignedToName || "",
      userTitle: assetData.userTitle || "",
      assignedDate: assetData.assignedDate || formatDate(new Date()),
      location: assetData.location || "",
      assetTag: assetData.assetTag || "",
      serialNumber: assetData.serialNumber || "",
      supplierId: assetData.supplier
        ? await ensureLookupId("suppliersTable", assetData.supplier)
        : undefined,
      cost: assetData.cost || 0,
      depreciationRate: assetData.depreciationRate || 0,
      acquiredDate: assetData.acquiredDate || "",
      warrantyEndDate: assetData.warrantyEndDate || "",
      hostname: assetData.hostname || "",
      ipAddress: assetData.ipAddress || "",
      operatingSystem: assetData.operatingSystem || "",
      parentAssetId: assetData.parentAssetId || null,
      notes: assetData.notes || "",
    };
    dispatch({ type: "ADD_ASSET", payload: normalized });

    // Add history entry
    await addAssetHistoryEntry(normalized.id, "Asset created", "System");

    return normalized;
  };

  const updateAsset = async (assetId, updates) => {
    const existing = state.assetsCore.find((a) => a.id === assetId);
    if (!existing) return null;

    // Check if we have SharePoint configured and try to update there first
    if (siteUrl) {
      try {
        // Try to get a write token first to check permissions
        let canWrite = false;
        try {
          await acquireToken(instance, ["Sites.ReadWrite.All"]);
          canWrite = true;
        } catch (scopeError) {
          console.warn(
            "[SharePoint] Write scope not available, updating locally only"
          );
          canWrite = false;
        }

        if (canWrite) {
          dispatch({ type: "SET_LOADING", payload: true });
          const updatedRemote = await updateAssetInSharePoint(
            instance,
            siteUrl,
            assetId,
            {
              name: updates.name,
              categoryId:
                updates.category &&
                (await ensureLookupId("categoriesTable", updates.category)),
              statusId:
                updates.status &&
                (await ensureLookupId("statusesTable", updates.status)),
              ventureId:
                updates.venture &&
                (await ensureLookupId("venturesTable", updates.venture)),
              departmentId:
                updates.department &&
                (await ensureLookupId("departmentsTable", updates.department)),
              ownerName: updates.ownerName,
              assignedToName: updates.assignedToName,
              userTitle: updates.userTitle,
              assignedDate: updates.assignedDate,
              location: updates.location,
              assetTag: updates.assetTag,
              serialNumber: updates.serialNumber,
              supplierId:
                updates.supplier &&
                (await ensureLookupId("suppliersTable", updates.supplier)),
              cost: updates.cost,
              depreciationRate: updates.depreciationRate,
              acquiredDate: updates.acquiredDate,
              warrantyEndDate: updates.warrantyEndDate,
              hostname: updates.hostname,
              ipAddress: updates.ipAddress,
              operatingSystem: updates.operatingSystem,
              parentAssetId: updates.parentAssetId,
              notes: updates.notes,
            }
          );
          dispatch({ type: "UPDATE_ASSET", payload: updatedRemote });

          // Add history entry
          const action = `Asset updated: ${Object.keys(updates).join(", ")}`;

          await addAssetHistoryEntry(assetId, action, "System");

          return updatedRemote;
        }
      } catch (error) {
        console.error(
          "[SharePoint] Update asset failed, keeping local:",
          error
        );
        dispatch({ type: "SET_ERROR", payload: String(error) });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }

    const updated = {
      ...existing,
      ...(updates.name !== undefined && { name: updates.name }),
      ...(updates.category && {
        categoryId: await ensureLookupId("categoriesTable", updates.category),
      }),
      ...(updates.status && {
        statusId: await ensureLookupId("statusesTable", updates.status),
      }),
      ...(updates.venture && {
        ventureId: await ensureLookupId("venturesTable", updates.venture),
      }),
      ...(updates.department && {
        departmentId: await ensureLookupId(
          "departmentsTable",
          updates.department
        ),
      }),
      ...(updates.ownerName !== undefined && { ownerName: updates.ownerName }),
      ...(updates.assignedToName !== undefined && {
        assignedToName: updates.assignedToName,
      }),
      ...(updates.userTitle !== undefined && { userTitle: updates.userTitle }),
      ...(updates.assignedDate && { assignedDate: updates.assignedDate }),
      ...(updates.location !== undefined && { location: updates.location }),
      ...(updates.assetTag !== undefined && { assetTag: updates.assetTag }),
      ...(updates.serialNumber !== undefined && {
        serialNumber: updates.serialNumber,
      }),
      ...(updates.supplier && {
        supplierId: await ensureLookupId("suppliersTable", updates.supplier),
      }),
      ...(updates.cost !== undefined && { cost: updates.cost }),
      ...(updates.depreciationRate !== undefined && {
        depreciationRate: updates.depreciationRate,
      }),
      ...(updates.acquiredDate && { acquiredDate: updates.acquiredDate }),
      ...(updates.warrantyEndDate && {
        warrantyEndDate: updates.warrantyEndDate,
      }),
      ...(updates.hostname !== undefined && { hostname: updates.hostname }),
      ...(updates.ipAddress !== undefined && { ipAddress: updates.ipAddress }),
      ...(updates.operatingSystem !== undefined && {
        operatingSystem: updates.operatingSystem,
      }),
      ...(updates.parentAssetId !== undefined && {
        parentAssetId: updates.parentAssetId,
      }),
      ...(updates.notes !== undefined && { notes: updates.notes }),
    };

    dispatch({ type: "UPDATE_ASSET", payload: updated });

    // Add history entry
    const action = `Asset updated: ${Object.keys(updates).join(", ")}`;

    await addAssetHistoryEntry(assetId, action, "System");

    return updated;
  };

  const deleteAsset = async (assetId) => {
    if (!assetId) {
      console.warn(
        "[SharePoint] Attempted to delete asset with invalid ID:",
        assetId
      );
      return false;
    }

    try {
      // Try to delete from SharePoint first if available
      if (siteUrl) {
        try {
          // Ensure we have write permissions
          await acquireToken(instance, ["Sites.ReadWrite.All"]);
          await deleteAssetFromSharePoint(instance, siteUrl, assetId);
        } catch (sharePointError) {
          console.warn(
            "[SharePoint] Failed to delete asset from SharePoint:",
            sharePointError
          );
          // Continue with local deletion even if SharePoint fails
        }
      }

      // Always delete locally
      dispatch({ type: "DELETE_ASSET", payload: assetId });

      // Note: History entries are automatically cleaned up by the DELETE_ASSET reducer

      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete asset:", error);
      return false;
    }
  };

  const addLicense = async (licenseData) => {
    try {
      // Prepare normalized payload
      const normalized = {
        name: licenseData.name,
        softwareId:
          licenseData.softwareId !== undefined && licenseData.softwareId !== ""
            ? Number(licenseData.softwareId)
            : licenseData.software
            ? await ensureLookupId("softwareTable", licenseData.software)
            : undefined,
        licenseNumber: licenseData.licenseNumber,
        renewalDate: licenseData.renewalDate,
        cost: licenseData.cost || 0,
        quantity: licenseData.quantity || 0,
        used: licenseData.used || 0,
        ventureId: await ensureLookupId("venturesTable", licenseData.venture),
        departmentId: await ensureLookupId(
          "departmentsTable",
          licenseData.department
        ),
        supplierId: licenseData.supplier
          ? await ensureLookupId("suppliersTable", licenseData.supplier)
          : undefined,
        notes: licenseData.notes || "",
      };

      let created = null;
      if (siteUrl) {
        // Ensure write scope, otherwise fail fast
        await acquireToken(instance, ["Sites.ReadWrite.All"]);
        created = await createLicenseInSharePoint(
          instance,
          siteUrl,
          normalized
        );
      } else {
        // Local fallback id
        const newId =
          (state.licensesCore[state.licensesCore.length - 1]?.id || 0) + 1;
        created = { id: newId, ...normalized };
      }

      dispatch({ type: "ADD_LICENSE", payload: created });

      // Add history entry
      await addLicenseHistoryEntry(created.id, "License created", "System");

      return created;
    } catch (error) {
      console.error("[SharePoint] Failed to add license:", error);
      throw error;
    }
  };

  const updateLicense = async (licenseId, updates) => {
    const existing = state.licensesCore.find((l) => l.id === licenseId);
    if (!existing) return null;

    try {
      const updated = {
        ...existing,
        ...(updates.name !== undefined && { name: updates.name }),
        ...(updates.softwareId !== undefined &&
          updates.softwareId !== "" && {
            softwareId: Number(updates.softwareId),
          }),
        ...(updates.software &&
          updates.softwareId === undefined && {
            softwareId: await ensureLookupId("softwareTable", updates.software),
          }),
        ...(updates.licenseNumber !== undefined && {
          licenseNumber: updates.licenseNumber,
        }),
        ...(updates.renewalDate && { renewalDate: updates.renewalDate }),
        ...(updates.cost !== undefined && { cost: updates.cost }),
        ...(updates.quantity !== undefined && { quantity: updates.quantity }),
        ...(updates.used !== undefined && { used: updates.used }),
        ...(updates.venture && {
          ventureId: await ensureLookupId("venturesTable", updates.venture),
        }),
        ...(updates.department && {
          departmentId: await ensureLookupId(
            "departmentsTable",
            updates.department
          ),
        }),
        ...(updates.supplier && {
          supplierId: await ensureLookupId("suppliersTable", updates.supplier),
        }),
        ...(updates.notes !== undefined && { notes: updates.notes }),
      };

      // Update in SharePoint if available
      let finalUpdated = updated;
      if (siteUrl) {
        finalUpdated = await updateLicenseInSharePoint(
          instance,
          siteUrl,
          licenseId,
          updated
        );
      }

      dispatch({ type: "UPDATE_LICENSE", payload: finalUpdated });

      // Add history entry
      const action = `License updated: ${Object.keys(updates).join(", ")}`;
      await addLicenseHistoryEntry(licenseId, action, "System");

      return updated;
    } catch (error) {
      console.error("[SharePoint] Failed to update license:", error);
      throw error;
    }
  };

  const deleteLicense = async (licenseId) => {
    if (!licenseId) {
      console.warn(
        "[SharePoint] Attempted to delete item with invalid ID:",
        licenseId
      );
      return false;
    }

    try {
      if (siteUrl) {
        await deleteLicenseFromSharePoint(instance, siteUrl, licenseId);
      }

      const updatedTable = state.licensesCore.filter((l) => l.id !== licenseId);
      const updatedNames = updatedTable.map((l) => l.name);
      dispatch({
        type: "INIT_TABLES",
        payload: {
          licensesCore: updatedTable,
          licenses: updatedNames,
        },
      });

      // Note: History entries are automatically cleaned up by the DELETE_LICENSE reducer

      return true;
    } catch (error) {
      console.error("[SharePoint] Failed to delete license:", error);
      return false;
    }
  };

  // Query helpers using views
  const getAssetsView = () => {
    return state.assetsCore.map((asset) => {
      const category = state.categoriesTable.find(
        (c) => c && c.id === asset.categoryId
      );
      const status = state.statusesTable.find(
        (s) => s && s.id === asset.statusId
      );
      const venture = state.venturesTable.find(
        (v) => v && v.id === asset.ventureId
      );
      const department = state.departmentsTable.find(
        (d) => d && d.id === asset.departmentId
      );
      const supplier = state.suppliersTable.find(
        (s) => s && s.id === asset.supplierId
      );

      // Get related data
      const tags = getAssetTags(asset.id);
      const software = getAssetSoftware(asset.id);
      const history = getAssetHistory(asset.id);
      const hierarchy = getAssetHierarchy(asset.id);

      return {
        ...asset,
        category: category?.name || "",
        status: status?.name || "",
        venture: venture?.name || "",
        department: department?.name || "",
        supplier: supplier?.name || "",
        tags: (tags || []).map((tag) => tag.name),
        software: (software || []).map((sw) => sw.name),
        history: history,
        children: hierarchy.children,
        parents: hierarchy.parents,
        hasRelations: hierarchy.hasRelations,
      };
    });
  };

  const getLicensesView = () => {
    return state.licensesCore.map((license) => {
      const software = state.softwareTable.find(
        (s) => s && s.id === license.softwareId
      );
      const venture = state.venturesTable.find(
        (v) => v && v.id === license.ventureId
      );
      const department = state.departmentsTable.find(
        (d) => d && d.id === license.departmentId
      );
      const supplier = state.suppliersTable.find(
        (s) => s && s.id === license.supplierId
      );

      // Get history
      const history = getLicenseHistory(license.id);

      return {
        ...license,
        softwareId: license.softwareId,
        software: software?.name || "",
        venture: venture?.name || "",
        department: department?.name || "",
        supplier: supplier?.name || "",
        history: history,
      };
    });
  };

  const getAssetsByVenture = (venture) =>
    getAssetsView().filter((a) => a.venture === venture);
  const getAssetsByCategory = (category) =>
    getAssetsView().filter((a) => a.category === category);
  const getAssetsByStatus = (status) =>
    getAssetsView().filter((a) => a.status === status);

  const getExpiringLicenses = (days = 30) => {
    const today = new Date();
    const threshold = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
    return getLicensesView().filter(
      (l) => new Date(l.renewalDate) <= threshold
    );
  };

  const searchAssets = (query) => {
    const lower = query.toLowerCase();
    return getAssetsView().filter(
      (asset) =>
        (asset.name && asset.name.toLowerCase().includes(lower)) ||
        (asset.assignedToName &&
          asset.assignedToName.toLowerCase().includes(lower)) ||
        (asset.venture && asset.venture.toLowerCase().includes(lower)) ||
        (asset.department && asset.department.toLowerCase().includes(lower)) ||
        (asset.assetTag && asset.assetTag.toLowerCase().includes(lower))
    );
  };

  const value = {
    // Authentication helper
    isAuthenticated,

    // Expose UI-ready views under the same keys used by components
    assets: getAssetsView(),
    licenses: getLicensesView(),

    // Expose option lists (strings) for compatibility
    ventures: state.ventures,
    departments: state.departments,
    categories: state.categories,
    statuses: state.statuses,
    suppliers: state.suppliers,
    software: state.software,

    // Expose normalized tables with real SharePoint IDs for Settings
    venturesTable: state.venturesTable,
    departmentsTable: state.departmentsTable,
    categoriesTable: state.categoriesTable,
    statusesTable: state.statusesTable,
    suppliersTable: state.suppliersTable,
    tagsTable: state.tagsTable,
    softwareTable: state.softwareTable,

    loading: state.loading,
    error: state.error,

    // CRUD
    addAsset,
    updateAsset,
    deleteAsset,
    addLicense,
    updateLicense,
    deleteLicense,

    // Queries
    getAssetsByVenture,
    getAssetsByCategory,
    getAssetsByStatus,
    getExpiringLicenses,
    searchAssets,

    // SharePoint (incremental)
    refreshData,
    loadAssetsFromSharePoint,
    loadCategoriesFromSharePoint,
    loadVenturesFromSharePoint,
    loadDepartmentsFromSharePoint,
    loadStatusesFromSharePoint,
    loadSuppliersFromSharePoint,
    loadTagsFromSharePoint,
    loadSoftwareCatalogFromSharePoint,
    loadLicensesFromSharePointContext,
    loadAssetHistoryFromSharePoint,
    loadLicenseHistoryFromSharePoint,
    loadAssetTagsFromSharePoint,
    loadAssetSoftwareFromSharePoint,
    loadAssetRelationsFromSharePoint,
    addCategory,
    updateCategory,
    deleteCategory,
    addVenture,
    updateVenture,
    deleteVenture,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    addStatus,
    updateStatus,
    deleteStatus,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    addSoftware,
    updateSoftware,
    deleteSoftware,
    addAssetTag,
    removeAssetTag,
    getAssetTags,
    getAssetsByTag,
    addAssetSoftware,
    removeAssetSoftware,
    getAssetSoftware,
    getAssetsBySoftware,
    createAssetRelation,
    removeAssetRelation,
    getAssetChildren,
    getAssetParents,
    getAssetHierarchy,
    addAssetHistoryEntry,
    addLicenseHistoryEntry,
    getAssetHistory,
    getLicenseHistory,
    addTag,
    updateTag,
    deleteTag,
  };

  return (
    <AssetContext.Provider value={value}>{children}</AssetContext.Provider>
  );
};

export const useAssets = () => {
  const context = useContext(AssetContext);
  if (!context) {
    throw new Error("useAssets must be used within an AssetProvider");
  }
  return context;
};
