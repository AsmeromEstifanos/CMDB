import React, { useState, useEffect } from "react";
import { useAssets } from "../context/AssetContext";
import {
  X,
  Save,
  HardDrive,
  Building,
  DollarSign,
  Tag,
  Server,
} from "lucide-react";
import { formatDate, generateAssetTag } from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

const AssetForm = ({ asset, onClose }) => {
  const {
    addAsset,
    updateAsset,
    ventures,
    departments,
    categories,
    statuses,
    assets,
    loading,
  } = useAssets();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "",
    venture: "",
    department: "",
    owner: "",
    assignedToName: "",
    userTitle: "",
    assignedDate: "",
    location: "",
    assetTag: "",
    serialNumber: "",
    supplier: "",
    cost: "",
    depreciationRate: "",
    acquiredDate: "",
    warrantyEndDate: "",
    hostname: "",
    ipAddress: "",
    operatingSystem: "",
    parentAssetId: "",
    tags: "",
    software: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (asset) {
      setFormData({
        name: asset.name || "",
        category: asset.category || "",
        status: asset.status || "",
        venture: asset.venture || "",
        department: asset.department || "",
        owner: asset.ownerName || "",
        assignedToName: asset.assignedToName || "",
        userTitle: asset.userTitle || "",
        assignedDate: asset.assignedDate || formatDate(new Date()),
        location: asset.location || "",
        assetTag: asset.assetTag || "",
        serialNumber: asset.serialNumber || "",
        supplier: asset.supplier || "",
        cost: asset.cost || "",
        depreciationRate: asset.depreciationRate || "",
        acquiredDate: asset.acquiredDate || "",
        warrantyEndDate: asset.warrantyEndDate || "",
        hostname: asset.hostname || "",
        ipAddress: asset.ipAddress || "",
        operatingSystem: asset.operatingSystem || "",
        parentAssetId: asset.parentAssetId || "",
        tags: Array.isArray(asset.tags)
          ? asset.tags.join(", ")
          : asset.tags || "",
        software: Array.isArray(asset.software)
          ? asset.software.join(", ")
          : asset.software || "",
        notes: asset.notes || "",
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        status: "In Stock",
        assignedDate: formatDate(new Date()),
        depreciationRate: "20",
      }));
    }
  }, [asset]);

  useEffect(() => {
    if (!asset && formData.category && !formData.assetTag) {
      const categoryAssets = assets.filter(
        (a) => a.category === formData.category
      );
      const newTag = generateAssetTag(formData.category, categoryAssets.length);
      setFormData((prev) => ({ ...prev, assetTag: newTag }));
    }
  }, [formData.category, asset, assets]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Asset name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.status) newErrors.status = "Status is required";
    if (!formData.venture) newErrors.venture = "Venture is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.assignedToName.trim())
      newErrors.assignedToName = "Assigned user is required";
    if (!formData.assignedDate)
      newErrors.assignedDate = "Assigned date is required";
    if (formData.cost && isNaN(formData.cost))
      newErrors.cost = "Cost must be a valid number";
    if (formData.depreciationRate && isNaN(formData.depreciationRate))
      newErrors.depreciationRate = "Depreciation rate must be a valid number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const assetData = {
        ...formData,
        cost: formData.cost ? parseFloat(formData.cost) : null,
        depreciationRate: formData.depreciationRate
          ? parseFloat(formData.depreciationRate)
          : null,
        tags: formData.tags
          ? formData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter(Boolean)
          : [],
        software: formData.software
          ? formData.software
              .split(",")
              .map((sw) => sw.trim())
              .filter(Boolean)
          : [],
        parentAssetId: formData.parentAssetId || null,
      };
      if (asset) await updateAsset(asset.id, assetData);
      else await addAsset(assetData);
      onClose();
    } catch (error) {
      console.error("Error saving asset:", error);
      setErrors({ submit: "Failed to save asset. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getParentAssetOptions = () => {
    return assets
      .filter((a) => a.id !== asset?.id && a.category !== "Software")
      .map((a) => ({ value: a.id, label: `${a.name} (${a.assetTag})` }));
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
        <LoadingSpinner text="Loading form data..." />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HardDrive size={22} />
            {asset ? "Edit Asset" : "Add New Asset"}
          </h2>
          <button
            className="p-2 rounded-md text-slate-500 hover:bg-slate-100"
            onClick={onClose}
          >
            <X size={22} />
          </button>
        </div>

        {errors.submit && (
          <div className="border border-rose-300 bg-rose-50 text-rose-800 rounded-md p-3 mb-4 text-sm">
            {errors.submit}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                <HardDrive size={18} /> Basic Information
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="form-label">Asset Name *</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-input ${
                      errors.name ? "border-rose-400 ring-rose-100 ring-2" : ""
                    }`}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Dell Latitude 5520"
                  />
                  {errors.name && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    className={`form-select ${
                      errors.category
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.category}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Status *</label>
                  <select
                    name="status"
                    className={`form-select ${
                      errors.status
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="">Select Status</option>
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {errors.status && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.status}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Asset Tag</label>
                  <input
                    type="text"
                    name="assetTag"
                    className="form-input"
                    value={formData.assetTag}
                    onChange={handleChange}
                    placeholder="Auto-generated"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                <Building size={18} /> Venture & Assignment
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="form-label">Venture *</label>
                  <select
                    name="venture"
                    className={`form-select ${
                      errors.venture
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.venture}
                    onChange={handleChange}
                  >
                    <option value="">Select Venture</option>
                    {ventures.map((venture) => (
                      <option key={venture} value={venture}>
                        {venture}
                      </option>
                    ))}
                  </select>
                  {errors.venture && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.venture}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Department *</label>
                  <select
                    name="department"
                    className={`form-select ${
                      errors.department
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.department}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Owner</label>
                  <input
                    type="text"
                    name="owner"
                    className="form-input"
                    value={formData.owner}
                    onChange={handleChange}
                    placeholder="Business ownerNameor cost center head"
                  />
                </div>
                <div>
                  <label className="form-label">Assigned To *</label>
                  <input
                    type="text"
                    name="assignedToName"
                    className={`form-input ${
                      errors.assignedToName
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.assignedToName}
                    onChange={handleChange}
                    placeholder="User name"
                  />
                  {errors.assignedToName && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.assignedToName}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">User Title</label>
                  <input
                    type="text"
                    name="userTitle"
                    className="form-input"
                    value={formData.userTitle}
                    onChange={handleChange}
                    placeholder="Position of assigned user"
                  />
                </div>
                <div>
                  <label className="form-label">Assigned Date *</label>
                  <input
                    type="date"
                    name="assignedDate"
                    className={`form-input ${
                      errors.assignedDate
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.assignedDate}
                    onChange={handleChange}
                  />
                  {errors.assignedDate && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.assignedDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                <Server size={18} /> Technical Details
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="form-label">Serial Number</label>
                  <input
                    type="text"
                    name="serialNumber"
                    className="form-input"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    placeholder="Manufacturer serial number"
                  />
                </div>
                <div>
                  <label className="form-label">Hostname</label>
                  <input
                    type="text"
                    name="hostname"
                    className="form-input"
                    value={formData.hostname}
                    onChange={handleChange}
                    placeholder="Network name"
                  />
                </div>
                <div>
                  <label className="form-label">IP Address</label>
                  <input
                    type="text"
                    name="ipAddress"
                    className="form-input"
                    value={formData.ipAddress}
                    onChange={handleChange}
                    placeholder="192.168.1.100"
                  />
                </div>
                <div>
                  <label className="form-label">Operating System</label>
                  <input
                    type="text"
                    name="operatingSystem"
                    className="form-input"
                    value={formData.operatingSystem}
                    onChange={handleChange}
                    placeholder="e.g., Windows 11 Pro"
                  />
                </div>
                <div>
                  <label className="form-label">Parent Asset</label>
                  <select
                    name="parentAssetId"
                    className="form-select"
                    value={formData.parentAssetId}
                    onChange={handleChange}
                  >
                    <option value="">No parent asset</option>
                    {getParentAssetOptions().map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                <DollarSign size={18} /> Financial & Location
              </h3>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="form-label">Cost</label>
                  <input
                    type="number"
                    name="cost"
                    className={`form-input ${
                      errors.cost ? "border-rose-400 ring-rose-100 ring-2" : ""
                    }`}
                    value={formData.cost}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                  {errors.cost && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.cost}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Depreciation Rate (%)</label>
                  <input
                    type="number"
                    name="depreciationRate"
                    className={`form-input ${
                      errors.depreciationRate
                        ? "border-rose-400 ring-rose-100 ring-2"
                        : ""
                    }`}
                    value={formData.depreciationRate}
                    onChange={handleChange}
                    placeholder="20"
                    step="0.1"
                    min="0"
                    max="100"
                  />
                  {errors.depreciationRate && (
                    <span className="text-rose-600 text-xs mt-1 block">
                      {errors.depreciationRate}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Physical or virtual location"
                  />
                </div>
                <div>
                  <label className="form-label">Supplier</label>
                  <input
                    type="text"
                    name="supplier"
                    className="form-input"
                    value={formData.supplier}
                    onChange={handleChange}
                    placeholder="Vendor or supplier name"
                  />
                </div>
                <div>
                  <label className="form-label">Acquired Date</label>
                  <input
                    type="date"
                    name="acquiredDate"
                    className="form-input"
                    value={formData.acquiredDate}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="form-label">Warranty End Date</label>
                  <input
                    type="date"
                    name="warrantyEndDate"
                    className="form-input"
                    value={formData.warrantyEndDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <h3 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                <Tag size={18} /> Additional Information
              </h3>
              <div className="grid gap-4 grid-cols-1">
                <div>
                  <label className="form-label">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    className="form-input"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Comma-separated tags (e.g., development, engineering)"
                  />
                </div>
                <div>
                  <label className="form-label">Installed Software</label>
                  <input
                    type="text"
                    name="software"
                    className="form-input"
                    value={formData.software}
                    onChange={handleChange}
                    placeholder="Comma-separated software list"
                  />
                </div>
                <div>
                  <label className="form-label">Notes</label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="form-input"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Additional comments or notes"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <Save size={16} />
              <span className="ml-2">
                {isSubmitting
                  ? "Saving..."
                  : asset
                  ? "Update Asset"
                  : "Create Asset"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetForm;
