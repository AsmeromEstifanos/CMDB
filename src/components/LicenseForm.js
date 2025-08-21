import React, { useEffect, useState } from "react";
import { useAssets } from "../context/AssetContext";
import { X, Save, Key } from "lucide-react";

const LicenseForm = ({ license, onClose }) => {
  const {
    ventures,
    departments,
    suppliers,
    softwareTable,
    addLicense,
    updateLicense,
  } = useAssets();

  const [formData, setFormData] = useState({
    name: "",
    softwareId: "",
    licenseNumber: "",
    renewalDate: "",
    cost: "",
    quantity: "1",
    used: "0",
    venture: "",
    department: "",
    supplier: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!license) return;
    setFormData({
      name: license.name || "",
      softwareId:
        license.softwareId !== undefined && license.softwareId !== null
          ? String(license.softwareId)
          : "",
      licenseNumber: license.licenseNumber || "",
      renewalDate: license.renewalDate
        ? String(license.renewalDate).slice(0, 10)
        : "",
      cost: license.cost != null ? String(license.cost) : "",
      quantity: license.quantity != null ? String(license.quantity) : "1",
      used: license.used != null ? String(license.used) : "0",
      venture: license.venture || "",
      department: license.department || "",
      supplier: license.supplier || "",
      notes: license.notes || "",
    });
  }, [license]);

  const validateForm = () => {
    const next = {};
    if (!formData.name.trim()) next.name = "License name is required";
    if (!formData.licenseNumber.trim())
      next.licenseNumber = "License number is required";
    if (!formData.renewalDate) next.renewalDate = "Renewal date is required";
    if (!formData.venture) next.venture = "Venture is required";
    if (!formData.department) next.department = "Department is required";
    if (
      parseInt(formData.used || "0", 10) >
      parseInt(formData.quantity || "0", 10)
    ) {
      next.used = "Used quantity cannot exceed total quantity";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        cost: parseFloat(formData.cost) || 0,
        quantity: parseInt(formData.quantity || "1", 10),
        used: parseInt(formData.used || "0", 10),
      };
      if (license) await updateLicense(license.id, payload);
      else await addLicense(payload);
      onClose();
    } catch (err) {
      console.error("Failed to save license", err);
      setErrors({ submit: "Failed to save license. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">
              {license ? "Edit License" : "Add License"}
            </h2>
          </div>
          <button
            className="text-slate-400 hover:text-slate-600"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-6">
          {errors.submit && (
            <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm">
              {errors.submit}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="form-label">
                License Name <span className="text-rose-500">*</span>
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "border-rose-500" : ""}`}
                placeholder="e.g., Office 365"
              />
              {errors.name && (
                <p className="text-rose-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="form-label">Software</label>
              <select
                name="softwareId"
                value={formData.softwareId}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Software</option>
                {softwareTable.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">
                License Number <span className="text-rose-500">*</span>
              </label>
              <input
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                className={`form-input ${
                  errors.licenseNumber ? "border-rose-500" : ""
                }`}
                placeholder="LIC-0001"
              />
              {errors.licenseNumber && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.licenseNumber}
                </p>
              )}
            </div>
            <div>
              <label className="form-label">
                Renewal Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                name="renewalDate"
                value={formData.renewalDate}
                onChange={handleChange}
                className={`form-input ${
                  errors.renewalDate ? "border-rose-500" : ""
                }`}
              />
              {errors.renewalDate && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.renewalDate}
                </p>
              )}
            </div>
            <div>
              <label className="form-label">Cost</label>
              <input
                type="number"
                step="0.01"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                className="form-input"
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="form-label">Quantity</label>
              <input
                type="number"
                min="1"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div>
              <label className="form-label">Used</label>
              <input
                type="number"
                min="0"
                name="used"
                value={formData.used}
                onChange={handleChange}
                className={`form-input ${errors.used ? "border-rose-500" : ""}`}
              />
              {errors.used && (
                <p className="text-rose-500 text-sm mt-1">{errors.used}</p>
              )}
            </div>
            <div>
              <label className="form-label">
                Venture <span className="text-rose-500">*</span>
              </label>
              <select
                name="venture"
                value={formData.venture}
                onChange={handleChange}
                className={`form-select ${
                  errors.venture ? "border-rose-500" : ""
                }`}
              >
                <option value="">Select Venture</option>
                {ventures.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              {errors.venture && (
                <p className="text-rose-500 text-sm mt-1">{errors.venture}</p>
              )}
            </div>
            <div>
              <label className="form-label">
                Department <span className="text-rose-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`form-select ${
                  errors.department ? "border-rose-500" : ""
                }`}
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
              {errors.department && (
                <p className="text-rose-500 text-sm mt-1">
                  {errors.department}
                </p>
              )}
            </div>
            <div>
              <label className="form-label">Supplier</label>
              <select
                name="supplier"
                value={formData.supplier}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="form-textarea"
              rows="3"
              placeholder="Additional details..."
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
            <button
              type="button"
              className="btn btn-secondary"
              disabled={isSubmitting}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting
                ? "Saving..."
                : license
                ? "Update License"
                : "Add License"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LicenseForm;
