import React from "react";
import {
  X,
  Edit,
  HardDrive,
  Key,
  DollarSign,
  Tag,
  Server,
  History,
} from "lucide-react";
import {
  formatCurrency,
  formatDisplayDate,
  getStatusColor,
  getCategoryIcon,
} from "../utils/helpers";

const AssetDetails = ({ asset, onClose, onEdit }) => {
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

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
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
                  <dd>
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadgeClass(
                        asset.status
                      )}`}
                    >
                      {asset.status}
                    </span>
                  </dd>
                  <dt className="text-slate-500">Asset Tag</dt>
                  <dd className="font-mono text-slate-800">{asset.assetTag}</dd>
                  <dt className="text-slate-500">Serial Number</dt>
                  <dd className="font-mono text-slate-800">
                    {asset.serialNumber || "N/A"}
                  </dd>
                  <dt className="text-slate-500">Supplier</dt>
                  <dd className="text-slate-800">{asset.supplier || "N/A"}</dd>
                </dl>
              </section>

              <section className="p-4 rounded-lg border border-slate-200 bg-white">
                <h4 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                  <Server size={18} /> Technical Details
                </h4>
                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-slate-500">Hostname</dt>
                  <dd className="font-mono text-slate-800">
                    {asset.hostname || "N/A"}
                  </dd>
                  <dt className="text-slate-500">IP Address</dt>
                  <dd className="font-mono text-slate-800">
                    {asset.ipAddress || "N/A"}
                  </dd>
                  <dt className="text-slate-500">Operating System</dt>
                  <dd className="text-slate-800">
                    {asset.operatingSystem || "N/A"}
                  </dd>
                  <dt className="text-slate-500">Parent Asset</dt>
                  <dd className="text-slate-800">
                    {asset.parentAssetId || "None"}
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

              <section className="p-4 rounded-lg border border-slate-200 bg-white">
                <h4 className="text-slate-800 font-semibold mb-4 flex items-center gap-2">
                  <History size={18} /> Change History
                </h4>
                <div className="space-y-2 text-sm">
                  {asset.history && asset.history.length > 0 ? (
                    asset.history.map((entry, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-md bg-slate-50 border border-slate-200"
                      >
                        <div className="text-slate-500 min-w-[90px]">
                          {formatDateField(entry.date)}
                        </div>
                        <div className="text-slate-800 flex-1">
                          {entry.action}
                        </div>
                        <div className="text-slate-500 italic">
                          by {entry.user}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-slate-500 italic">
                      No change history available
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>
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
