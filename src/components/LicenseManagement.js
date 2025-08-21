import React, { useState, useMemo } from "react";
import { useAssets } from "../context/AssetContext";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  Key,
  AlertTriangle,
  Calendar,
} from "lucide-react";
import {
  formatCurrency,
  formatDisplayDate,
  daysUntilRenewal,
  exportToCSV,
  exportToJSON,
} from "../utils/helpers";
import LicenseForm from "./LicenseForm";

const LicenseManagement = () => {
  const { licenses, ventures, departments, deleteLicense } = useAssets();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVenture, setSelectedVenture] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedExpiryFilter, setSelectedExpiryFilter] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [showLicenseForm, setShowLicenseForm] = useState(false);
  const [editingLicense, setEditingLicense] = useState(null);

  const filteredLicenses = useMemo(() => {
    let filtered = licenses;
    if (searchQuery) {
      filtered = filtered.filter(
        (license) =>
          license.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          license.licenseNumber
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          license.venture.toLowerCase().includes(searchQuery.toLowerCase()) ||
          license.department.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedVenture)
      filtered = filtered.filter((l) => l.venture === selectedVenture);
    if (selectedDepartment)
      filtered = filtered.filter((l) => l.department === selectedDepartment);
    if (selectedExpiryFilter) {
      const days = parseInt(selectedExpiryFilter);
      filtered = filtered.filter((l) => {
        const daysLeft = daysUntilRenewal(l.renewalDate);
        return daysLeft !== null && daysLeft <= days;
      });
    }

    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      if (sortField === "renewalDate") {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (typeof aValue === "string") {
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
    licenses,
    searchQuery,
    selectedVenture,
    selectedDepartment,
    selectedExpiryFilter,
    sortField,
    sortDirection,
  ]);

  const handleSort = (field) => {
    if (sortField === field)
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDelete = (licenseId) => {
    if (window.confirm("Are you sure you want to delete this license?"))
      deleteLicense(licenseId);
  };

  const handleExport = (format) => {
    if (format === "csv") exportToCSV(filteredLicenses, "svh-licenses");
    else exportToJSON(filteredLicenses, "svh-licenses");
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedVenture("");
    setSelectedDepartment("");
    setSelectedExpiryFilter("");
  };

  const getSortIcon = (field) =>
    sortField === field ? (sortDirection === "asc" ? "↑" : "↓") : null;

  const getExpiryStatusClass = (renewalDate) => {
    const daysLeft = daysUntilRenewal(renewalDate);
    if (daysLeft === null) return "bg-slate-200 text-slate-700";
    if (daysLeft <= 7) return "bg-rose-100 text-rose-800";
    if (daysLeft <= 30) return "bg-amber-100 text-amber-800";
    if (daysLeft <= 90) return "bg-blue-100 text-blue-800";
    return "bg-emerald-100 text-emerald-800";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">License Management</h1>
        <p className="page-subtitle">
          Manage software licenses and track renewal dates across all SVH
          ventures
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center bg-white border border-slate-300 rounded-md px-3 py-2 max-w-md w-full">
          <Search size={20} className="text-slate-400" />
          <input
            type="text"
            placeholder="Search licenses..."
            className="ml-2 w-full outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="btn btn-secondary">
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
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingLicense(null);
              setShowLicenseForm(true);
            }}
          >
            <Plus size={16} />
            <span className="ml-2">Add License</span>
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
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Expiry Filter</label>
            <select
              className="form-select"
              value={selectedExpiryFilter}
              onChange={(e) => setSelectedExpiryFilter(e.target.value)}
            >
              <option value="">All Licenses</option>
              <option value="7">Expiring in 7 days</option>
              <option value="30">Expiring in 30 days</option>
              <option value="90">Expiring in 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="text-slate-500 text-sm">
        Showing {filteredLicenses.length} of {licenses.length} licenses
      </div>

      <div className="card overflow-x-auto">
        <table className="table min-w-[900px]">
          <thead>
            <tr>
              <th className="cursor-pointer" onClick={() => handleSort("name")}>
                License Name {getSortIcon("name")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("licenseNumber")}
              >
                License Number {getSortIcon("licenseNumber")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("venture")}
              >
                Venture {getSortIcon("venture")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("department")}
              >
                Department {getSortIcon("department")}
              </th>
              <th
                className="cursor-pointer"
                onClick={() => handleSort("renewalDate")}
              >
                Renewal Date {getSortIcon("renewalDate")}
              </th>
              <th className="cursor-pointer" onClick={() => handleSort("cost")}>
                Cost {getSortIcon("cost")}
              </th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLicenses.length > 0 ? (
              filteredLicenses.map((license) => {
                const daysLeft = daysUntilRenewal(license.renewalDate);
                return (
                  <tr key={license.id} className="">
                    <td>
                      <div className="flex items-center gap-3">
                        <span className="text-xl w-6 text-center">🔑</span>
                        <div className="leading-tight">
                          <div className="font-medium text-slate-800">
                            {license.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {license.software}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono">{license.licenseNumber}</td>
                    <td>
                      <span className="px-2 py-1 rounded bg-sky-100 text-sky-800 text-xs font-medium">
                        {license.venture}
                      </span>
                    </td>
                    <td>
                      <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-medium">
                        {license.department}
                      </span>
                    </td>
                    <td>
                      <div className="leading-tight">
                        <div className="text-slate-800 text-sm">
                          {formatDisplayDate(license.renewalDate)}
                        </div>
                        <div
                          className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${getExpiryStatusClass(
                            license.renewalDate
                          )}`}
                        >
                          {daysLeft !== null ? `${daysLeft} days` : "Unknown"}
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-emerald-700 font-semibold">
                      {formatCurrency(license.cost)}
                    </td>
                    <td>
                      <div className="min-w-[120px]">
                        <div className="text-xs text-slate-500 text-center">
                          {license.used} / {license.quantity}
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded">
                          <div
                            className="h-1.5 bg-emerald-600 rounded"
                            style={{
                              width: `${
                                (license.used / license.quantity) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${getExpiryStatusClass(
                          license.renewalDate
                        )}`}
                      >
                        {daysLeft !== null &&
                          (daysLeft <= 7 ? (
                            <AlertTriangle size={16} />
                          ) : (
                            <Calendar size={16} />
                          ))}
                        <span className="ml-1">
                          {daysLeft !== null
                            ? daysLeft <= 7
                              ? "urgent"
                              : daysLeft <= 30
                              ? "warning"
                              : daysLeft <= 90
                              ? "notice"
                              : "normal"
                            : "unknown"}
                        </span>
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-secondary"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-primary"
                          title="Edit License"
                          onClick={() => {
                            setEditingLicense(license);
                            setShowLicenseForm(true);
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(license.id)}
                          title="Delete License"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" className="px-3 py-8">
                  <div className="text-center text-slate-500">
                    <Key size={48} className="mx-auto mb-2 text-slate-300" />
                    <p>No licenses found matching your criteria</p>
                    <button className="btn btn-primary mt-3">
                      Add Your First License
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showLicenseForm && (
        <LicenseForm
          license={editingLicense}
          onClose={() => {
            setShowLicenseForm(false);
            setEditingLicense(null);
          }}
        />
      )}
    </div>
  );
};

export default LicenseManagement;
