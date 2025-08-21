import React, { useState, useMemo } from "react";
import { useAssets } from "../context/AssetContext";
import {
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
  HardDrive,
  FileJson,
  AlertTriangle,
  Upload,
} from "lucide-react";
import {
  formatCurrency,
  formatDisplayDate,
  getStatusColor,
  getCategoryIcon,
  exportToCSV,
  exportToJSON,
} from "../utils/helpers";
import AssetForm from "./AssetForm";
import AssetDetails from "./AssetDetails";

const AssetManagement = () => {
  const {
    assets,
    ventures,
    categories,
    statuses,
    deleteAsset,
    searchAssets,
    loading,
    error,
  } = useAssets();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVenture, setSelectedVenture] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);
  const [viewingAsset, setViewingAsset] = useState(null);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  const filteredAssets = useMemo(() => {
    let filtered = assets;
    if (searchTerm) filtered = searchAssets(searchTerm);
    if (selectedVenture)
      filtered = filtered.filter((a) => a.venture === selectedVenture);
    if (selectedCategory)
      filtered = filtered.filter((a) => a.category === selectedCategory);
    if (selectedStatus)
      filtered = filtered.filter((a) => a.status === selectedStatus);

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      return sortDirection === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
        ? 1
        : -1;
    });

    return filtered;
  }, [
    assets,
    searchTerm,
    selectedVenture,
    selectedCategory,
    selectedStatus,
    sortField,
    sortDirection,
    searchAssets,
  ]);

  const handleSort = (field) => {
    if (sortField === field)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setShowForm(true);
  };

  const handleView = (asset) => setViewingAsset(asset);

  const handleDelete = (assetId) => {
    if (window.confirm("Are you sure you want to delete this asset?")) {
      deleteAsset(assetId);
    }
  };

  const handleExport = (format) => {
    if (format === "csv") exportToCSV(filteredAssets, "svh-assets");
    else exportToJSON(filteredAssets, "svh-assets");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedVenture("");
    setSelectedCategory("");
    setSelectedStatus("");
  };

  const getSortIcon = (field) =>
    sortField === field ? (sortDirection === "asc" ? "↑" : "↓") : null;

  return (
    <div className="space-y-6">
      <div className="mb-2 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="page-title">Asset Management</h1>
          <p className="page-subtitle">
            Manage hardware and software assets across all SVH ventures
          </p>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
          <AlertTriangle size={16} />
          <span className="text-sm">{error}</span>
        </div>
      )}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            className="btn btn-secondary"
            onClick={() => setShowForm(true)}
          >
            <Upload size={16} />
            <span className="ml-2">Import</span>
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleExport("csv")}
          >
            <Download size={16} />
            <span className="ml-2">Export CSV</span>
          </button>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            <Plus size={16} />
            <span className="ml-2">Add Asset</span>
          </button>
        </div>
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-slate-800 font-semibold flex items-center gap-2">
            <Filter size={18} /> Filters
          </h3>
          <button className="btn btn-sm btn-secondary" onClick={clearFilters}>
            Clear All
          </button>
        </div>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="form-label">Venture</label>
            <select
              className="form-select"
              value={selectedVenture}
              onChange={(e) => setSelectedVenture(e.target.value)}
            >
              <option value="">All Ventures</option>
              {ventures.map((venture) => (
                <option key={venture} value={venture}>
                  {venture}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Status</label>
            <select
              className="form-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="text-slate-500 text-sm">
        {loading ? (
          <span>Loading from SharePoint...</span>
        ) : (
          <>
            Showing {filteredAssets.length} of {assets.length} assets
          </>
        )}
      </div>

      <div className="card overflow-x-auto">
        <table className="table min-w-[800px]">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={() => handleSort("name")}>
                Asset Name {getSortIcon("name")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("category")}
              >
                Category {getSortIcon("category")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status {getSortIcon("status")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("venture")}
              >
                Venture {getSortIcon("venture")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("assignedToName")}
              >
                Assigned To {getSortIcon("assignedToName")}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort("cost")}>
                Cost {getSortIcon("cost")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("assignedDate")}
              >
                Assigned Date {getSortIcon("assignedDate")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="">
                  <td>
                    <div className="flex items-center gap-3">
                      <span className="text-xl w-6 text-center">
                        {getCategoryIcon(asset.category)}
                      </span>
                      <div className="leading-tight">
                        <div className="font-medium text-slate-800 flex items-baseline gap-1">
                          <span>{asset.name}</span>
                          {asset.assetTag && (
                            <span className="text-xs text-slate-500 font-mono">
                              ({asset.assetTag})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 font-mono">
                          {asset.serialNumber || ""}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="inline-block text-xs font-medium px-2 py-1 rounded bg-indigo-100 text-indigo-700">
                      {asset.category}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-1 rounded uppercase tracking-wide ${
                        getStatusColor(asset.status) === "success"
                          ? "bg-emerald-100 text-emerald-800"
                          : getStatusColor(asset.status) === "warning"
                          ? "bg-amber-100 text-amber-800"
                          : getStatusColor(asset.status) === "danger"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td>
                    <span className="inline-block text-xs font-medium px-2 py-1 rounded bg-sky-100 text-sky-800">
                      {asset.venture}
                    </span>
                  </td>
                  <td>
                    <div className="leading-tight">
                      <div className="text-slate-800">
                        {asset.assignedToName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {asset.userTitle}
                      </div>
                    </div>
                  </td>
                  <td className="font-mono text-emerald-700 font-semibold">
                    {formatCurrency(asset.cost)}
                  </td>
                  <td className="text-slate-600">
                    {formatDisplayDate(asset.assignedDate)}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-secondary"
                        title="View Details"
                        onClick={() => handleView(asset)}
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        title="Edit Asset"
                        onClick={() => handleEdit(asset)}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        title="Delete Asset"
                        onClick={() => handleDelete(asset.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-3 py-8">
                  <div className="text-center text-slate-500">
                    <HardDrive
                      size={48}
                      className="mx-auto mb-2 text-slate-300"
                    />
                    <p>No assets found matching your criteria</p>
                    <button
                      className="btn btn-primary mt-3"
                      onClick={() => setShowForm(true)}
                    >
                      Add Your First Asset
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <AssetForm
          asset={editingAsset}
          onClose={() => {
            setShowForm(false);
            setEditingAsset(null);
          }}
        />
      )}

      {viewingAsset && (
        <AssetDetails
          asset={viewingAsset}
          onClose={() => setViewingAsset(null)}
          onEdit={() => {
            setViewingAsset(null);
            setEditingAsset(viewingAsset);
            setShowForm(true);
          }}
        />
      )}
    </div>
  );
};

export default AssetManagement;
