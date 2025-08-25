import React from "react";
import { useAssets } from "../context/AssetContext";
import { History, User, Calendar, Activity } from "lucide-react";
import { formatDisplayDate } from "../utils/helpers";

const AssetHistory = ({ assetId, assetName }) => {
  const { getAssetHistory } = useAssets();
  
  const history = getAssetHistory(assetId);

  const getActionIcon = (action) => {
    if (action.includes("created")) return "🆕";
    if (action.includes("updated")) return "✏️";
    if (action.includes("deleted")) return "🗑️";
    if (action.includes("assigned")) return "👤";
    if (action.includes("moved")) return "📦";
    if (action.includes("tag")) return "🏷️";
    if (action.includes("software")) return "💾";
    if (action.includes("relation")) return "🔗";
    return "📝";
  };

  const getActionColor = (action) => {
    if (action.includes("created")) return "bg-green-100 text-green-800";
    if (action.includes("updated")) return "bg-blue-100 text-blue-800";
    if (action.includes("deleted")) return "bg-red-100 text-red-800";
    if (action.includes("assigned")) return "bg-purple-100 text-purple-800";
    if (action.includes("moved")) return "bg-orange-100 text-orange-800";
    if (action.includes("tag")) return "bg-indigo-100 text-indigo-800";
    if (action.includes("software")) return "bg-cyan-100 text-cyan-800";
    if (action.includes("relation")) return "bg-pink-100 text-pink-800";
    return "bg-slate-100 text-slate-800";
  };

  if (history.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <History size={18} />
          <h3 className="text-lg font-semibold text-slate-800">Asset History</h3>
        </div>
        <div className="text-center py-8 text-slate-500">
          <Activity size={48} className="mx-auto mb-4 text-slate-300" />
          <p className="text-lg font-medium">No history available</p>
          <p className="text-sm">This asset hasn't been modified yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <History size={18} />
        <h3 className="text-lg font-semibold text-slate-800">Asset History</h3>
        <span className="ml-2 px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
          {history.length} entries
        </span>
      </div>

      <div className="space-y-3">
        {history.map((entry, index) => (
          <div
            key={entry.id}
            className={`p-4 rounded-lg border ${
              index === 0 
                ? "bg-blue-50 border-blue-200" 
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className="flex items-start gap-3">
              {/* Action Icon */}
              <div className="text-2xl">
                {getActionIcon(entry.action)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(entry.action)}`}>
                    {entry.action}
                  </span>
                  {index === 0 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Latest
                    </span>
                  )}
                </div>

                {/* Action Details */}
                <div className="text-sm text-slate-700 mb-2">
                  {entry.action.includes("updated") && entry.action.includes(":") ? (
                    <div>
                      <span className="font-medium">Fields updated:</span>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {entry.action.split(": ")[1]?.split(", ").map((field, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-slate-200 text-slate-700 rounded text-xs"
                          >
                            {field}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span>{entry.action}</span>
                  )}
                </div>

                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span>{entry.user}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    <span>{formatDisplayDate(entry.date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-medium text-slate-700 mb-2">History Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-slate-500">Total Entries</div>
            <div className="font-medium text-slate-700">{history.length}</div>
          </div>
          <div>
            <div className="text-slate-500">Last Modified</div>
            <div className="font-medium text-slate-700">
              {history.length > 0 ? formatDisplayDate(history[0].date) : "Never"}
            </div>
          </div>
          <div>
            <div className="text-slate-500">Most Active User</div>
            <div className="font-medium text-slate-700">
              {(() => {
                const userCounts = {};
                history.forEach(entry => {
                  userCounts[entry.user] = (userCounts[entry.user] || 0) + 1;
                });
                const mostActive = Object.entries(userCounts)
                  .sort(([,a], [,b]) => b - a)[0];
                return mostActive ? mostActive[0] : "None";
              })()}
            </div>
          </div>
          <div>
            <div className="text-slate-500">Update Frequency</div>
            <div className="font-medium text-slate-700">
              {history.length > 1 
                ? `${Math.round(history.length / Math.max(1, (new Date() - new Date(history[history.length - 1].date)) / (1000 * 60 * 60 * 24)))} per day`
                : "New asset"
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetHistory;
