import React, { useState } from "react";
import { useAssets } from "../context/AssetContext";
import {
  X,
  Edit,
  HardDrive,
  DollarSign,
  Tag,
  Server,
  History,
  GitBranch,
  Monitor,
} from "lucide-react";
import {
  formatCurrency,
  formatDisplayDate,
  getStatusColor,
  getCategoryIcon,
} from "../utils/helpers";
import AssetTags from "./AssetTags";
import AssetSoftware from "./AssetSoftware";
import AssetRelations from "./AssetRelations";
import AssetHistory from "./AssetHistory";

const AssetDetails = ({ asset, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState("history");
  const { getAssetHistory } = useAssets();

  if (!asset) return null;

  const getStatusBadgeClass = (status) => {
    const color = getStatusColor(status);
    switch (color) {
      case "success":
        return "bg-emerald-100 text-emerald-800";
      case "warning":
        return "bg-amber-100 text-amber-800";
      case "danger":
        return "bg-rose-100 text-rose-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  const formatArrayField = (field) =>
    Array.isArray(field) ? field.join(", ") : field || "N/A";
  const formatDateField = (date) => (date ? formatDisplayDate(date) : "N/A");
  const formatCurrencyField = (amount) =>
    amount ? formatCurrency(amount) : "N/A";

  const tabs = [
    { id: "details", label: "Details", icon: HardDrive },
    { id: "tags", label: "Tags", icon: Tag },
    { id: "software", label: "Software", icon: Monitor },
    { id: "relations", label: "Relations", icon: GitBranch },
    { id: "history", label: "History", icon: History },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "details":
        return (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div className="space-y-6">
              <section className="p-4 rounded-lg border border-slate-200 bg-white">
                <h4 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                  <HardDrive size={18} /> Basic Information
                </h4>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-slate-500">Asset Name</dt>
                  <dd className="text-slate-800">{asset.name}</dd>
                  <dt className="text-slate-500">Category</dt>
                  <dd className="text-slate-800">{asset.category}</dd>
                  <dt className="text-slate-500">Status</dt>
                  <dd className="text-slate-800">{asset.status}</dd>
                  <dt className="text-slate-500">Venture</dt>
                  <dd className="text-slate-800">{asset.venture}</dd>
                  <dt className="text-slate-500">Department</dt>
                  <dd className="text-slate-800">{asset.department}</dd>
                  <dt className="text-slate-500">Asset Tag</dt>
                  <dd className="text-slate-800 font-mono">
                    {asset.assetTag || "N/A"}
                  </dd>
                </dl>
              </section>

              <section className="p-4 rounded-lg border border-slate-200 bg-white">
                <h4 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                  <Server size={18} /> Technical Information
                </h4>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-slate-500">Serial Number</dt>
                  <dd className="text-slate-800">
                    {asset.serialNumber || "N/A"}
                  </dd>
                  <dt className="text-slate-500">Hostname</dt>
                  <dd className="text-slate-800">{asset.hostname || "N/A"}</dd>
                  <dt className="text-slate-500">IP Address</dt>
                  <dd className="text-slate-800">{asset.ipAddress || "N/A"}</dd>
                  <dt className="text-slate-500">Operating System</dt>
                  <dd className="text-slate-800">
                    {asset.operatingSystem || "N/A"}
                  </dd>
                  <dt className="text-slate-500">Location</dt>
                  <dd className="text-slate-800">{asset.location || "N/A"}</dd>
                </dl>
              </section>
            </div>

            <div className="space-y-6">
              <section className="p-4 rounded-lg border border-slate-200 bg-white">
                <h4 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                  <DollarSign size={18} /> Financial Information
                </h4>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-slate-500">Purchase Cost</dt>
                  <dd className="font-mono text-emerald-700 font-semibold">
                    {formatCurrencyField(asset.cost)}
                  </dd>
                  <dt className="text-slate-500">Depreciation Rate</dt>
                  <dd className="text-slate-800">
                    {asset.depreciationRate
                      ? `${asset.depreciationRate}%`
                      : "N/A"}
                  </dd>
                  <dt className="text-slate-500">Acquired Date</dt>
                  <dd className="text-slate-800">
                    {formatDateField(asset.acquiredDate)}
                  </dd>
                  <dt className="text-slate-500">Warranty End Date</dt>
                  <dd className="text-slate-800">
                    {formatDateField(asset.warrantyEndDate)}
                  </dd>
                </dl>
              </section>

              <section className="p-4 rounded-lg border border-slate-200 bg-white">
                <h4 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                  <Tag size={18} /> Additional Information
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="text-slate-500">Tags</div>
                    <div className="text-slate-800">
                      {formatArrayField(asset.tags)}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Installed Software</div>
                    <div className="text-slate-800">
                      {formatArrayField(asset.software)}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-500">Notes</div>
                    <div className="text-slate-800 whitespace-pre-wrap">
                      {asset.notes || "No notes available"}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        );

      case "tags":
        return <AssetTags assetId={asset.id} assetName={asset.name} />;

      case "software":
        return <AssetSoftware assetId={asset.id} assetName={asset.name} />;

      case "relations":
        return <AssetRelations assetId={asset.id} assetName={asset.name} />;

      case "history":
        return <AssetHistory assetId={asset.id} assetName={asset.name} />;

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <HardDrive size={22} /> Asset Details
          </h2>
          <div className="flex items-center gap-2">
            <button className="btn btn-primary btn-sm" onClick={onEdit}>
              <Edit size={16} />
              <span className="ml-1">Edit</span>
            </button>
            <button
              className="p-2 rounded-md text-slate-500 hover:bg-slate-100"
              onClick={onClose}
            >
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Asset Header */}
          <div className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 bg-slate-50">
            <div className="text-4xl w-16 h-16 flex items-center justify-center rounded-xl bg-white shadow-sm">
              {getCategoryIcon(asset.category)}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-slate-800">
                {asset.name}
              </h3>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="px-2 py-1 rounded bg-indigo-100 text-indigo-700 text-sm font-mono">
                  {asset.assetTag}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeClass(
                    asset.status
                  )}`}
                >
                  {asset.status}
                </span>
                <span className="px-2 py-1 rounded bg-sky-100 text-sky-800 text-xs font-medium">
                  {asset.category}
                </span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                    {tab.id === "history" && (
                      <span className="ml-1 px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full text-xs">
                        {asset.id ? getAssetHistory(asset.id).length : 0}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">{renderTabContent()}</div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4 mt-6">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={onEdit}>
            <Edit size={16} />
            <span className="ml-2">Edit Asset</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssetDetails;
