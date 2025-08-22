import React, { useState } from "react";
import { useAssets } from "../context/AssetContext";
import LoadingSpinner from "./LoadingSpinner";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Building2,
  Users,
  Tag,
  Activity,
  Truck,
  Code,
  Loader,
} from "lucide-react";

const Settings = () => {
  const {
    // Table data with proper IDs
    categoriesTable,
    venturesTable,
    departmentsTable,
    statusesTable,
    suppliersTable,
    softwareTable,
    // Loading and error states
    loading,
    error,
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
  } = useAssets();

  const [activeTab, setActiveTab] = useState("categories");
  const [editingItem, setEditingItem] = useState(null);
  const [newItemName, setNewItemName] = useState("");

  // State for tracking deleting items for each type
  const [deletingItems, setDeletingItems] = useState({
    categories: new Set(),
    ventures: new Set(),
    departments: new Set(),
    statuses: new Set(),
    suppliers: new Set(),
    software: new Set(),
  });

  const handleAdd = async (type) => {
    if (!newItemName.trim()) return;

    try {
      switch (type) {
        case "categories":
          await addCategory(newItemName);
          break;
        case "ventures":
          await addVenture(newItemName);
          break;
        case "departments":
          await addDepartment(newItemName);
          break;
        case "statuses":
          await addStatus(newItemName);
          break;
        case "suppliers":
          await addSupplier(newItemName);
          break;
        case "software":
          await addSoftware(newItemName);
          break;
        default:
          break;
      }
      setNewItemName("");
    } catch (error) {
      console.error(`Failed to add ${type}:`, error);
    }
  };

  const handleUpdate = async (type, itemId, newName) => {
    if (!newName?.trim()) return null;

    try {
      switch (type) {
        case "categories":
          await updateCategory(itemId, newName);
          break;
        case "ventures":
          await updateVenture(itemId, newName);
          break;
        case "departments":
          await updateDepartment(itemId, newName);
          break;
        case "statuses":
          await updateStatus(itemId, newName);
          break;
        case "suppliers":
          await updateSupplier(itemId, newName);
          break;
        case "software":
          await updateSoftware(itemId, newName);
          break;
        default:
          break;
      }
      setEditingItem(null);
    } catch (error) {
      console.error(`Failed to update ${type}:`, error);
    }
  };

  const handleDelete = async (type, itemId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      // Set loading state for this specific item
      setDeletingItems((prev) => ({
        ...prev,
        [type]: new Set(prev[type]).add(itemId),
      }));

      switch (type) {
        case "categories":
          await deleteCategory(itemId);
          break;
        case "ventures":
          await deleteVenture(itemId);
          break;
        case "departments":
          await deleteDepartment(itemId);
          break;
        case "statuses":
          await deleteStatus(itemId);
          break;
        case "suppliers":
          await deleteSupplier(itemId);
          break;
        case "software":
          await deleteSoftware(itemId);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(`Failed to delete ${type}:`, error);
    } finally {
      // Clear loading state for this item
      setDeletingItems((prev) => ({
        ...prev,
        [type]: new Set([...prev[type]].filter((id) => id !== itemId)),
      }));
    }
  };

  const getItems = (type) => {
    switch (type) {
      case "categories":
        // Only return items with real IDs from the normalized tables
        return categoriesTable || [];
      case "ventures":
        return venturesTable || [];
      case "departments":
        return departmentsTable || [];
      case "statuses":
        return statusesTable || [];
      case "suppliers":
        return suppliersTable || [];
      case "software":
        return softwareTable || [];
      default:
        return [];
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "categories":
        return <Tag className="w-5 h-5" />;
      case "ventures":
        return <Building2 className="w-5 h-5" />;
      case "departments":
        return <Users className="w-5 h-5" />;
      case "statuses":
        return <Activity className="w-5 h-5" />;
      case "suppliers":
        return <Truck className="w-5 h-5" />;
      case "software":
        return <Code className="w-5 h-5" />;
      default:
        return <Tag className="w-5 h-5" />;
    }
  };

  const getTitle = (type) => {
    switch (type) {
      case "categories":
        return "Categories";
      case "ventures":
        return "Ventures";
      case "departments":
        return "Departments";
      case "statuses":
        return "Statuses";
      case "suppliers":
        return "Suppliers";
      case "software":
        return "Software_Catalog";
      default:
        return "Settings";
    }
  };

  const isItemDeleting = (type, itemId) => {
    return deletingItems[type].has(itemId);
  };

  if (loading) {
    return <LoadingSpinner text="Loading settings..." />;
  }

  const renderTabContent = () => {
    const items = getItems(activeTab);
    const icon = getIcon(activeTab);
    const title = getTitle(activeTab);

    // Show loading state
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading {title.toLowerCase()}...
              </span>
            </div>
          </div>
        </div>
      );
    }

    // Show error state
    if (error) {
      return (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            {icon}
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="text-center">
              <div className="text-red-600 mb-2">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Error Loading Data
              </h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Filter out any null/undefined items - show items that have a name
    const validItems = items.filter((item) => item && item.name);

    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </div>

        {/* Add New Item Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder={`Add new ${activeTab.slice(0, -1)}...`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === "Enter" && handleAdd(activeTab)}
            />
            <button
              onClick={() => handleAdd(activeTab)}
              disabled={!newItemName.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {validItems.map((item, index) => (
                  <tr key={item.id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingItem?.id === item.id ? (
                        <input
                          type="text"
                          value={editingItem?.name ?? ""}
                          onChange={(e) =>
                            setEditingItem((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdate(
                                activeTab,
                                item.id,
                                editingItem?.name ?? ""
                              );
                            }
                          }}
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900">
                          {item.name}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {editingItem?.id === item.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              handleUpdate(activeTab, item.id, editingItem.name)
                            }
                            className="text-green-600 hover:text-green-900 p-1"
                          >
                            <Save className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingItem(null)}
                            className="text-gray-600 hover:text-gray-900 p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() =>
                              setEditingItem({
                                id: item.id,
                                name: item.name,
                              })
                            }
                            className={`text-blue-600 hover:text-blue-900 p-1 ${
                              !item.id
                                ? "opacity-40 cursor-not-allowed pointer-events-none"
                                : ""
                            }`}
                            disabled={!item.id}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(activeTab, item.id)}
                            className={`text-red-600 hover:text-red-900 p-1 ${
                              !item.id
                                ? "opacity-40 cursor-not-allowed pointer-events-none"
                                : ""
                            }`}
                            disabled={
                              !item.id || isItemDeleting(activeTab, item.id)
                            }
                          >
                            {isItemDeleting(activeTab, item.id) ? (
                              <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {validItems.length === 0 && (
                  <tr>
                    <td
                      colSpan="2"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No {activeTab} found. Add your first one above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your CMDB configuration and lookup values.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { id: "categories", label: "Categories", icon: Tag },
              { id: "ventures", label: "Ventures", icon: Building2 },
              { id: "departments", label: "Departments", icon: Users },
              { id: "statuses", label: "Statuses", icon: Activity },
              { id: "suppliers", label: "Suppliers", icon: Truck },
              { id: "software", label: "Software_Catalog", icon: Code },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 border border-blue-200"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
