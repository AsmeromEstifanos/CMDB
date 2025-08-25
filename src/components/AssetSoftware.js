import React, { useState } from "react";
import { useAssets } from "../context/AssetContext";
import { Monitor, Plus, X, Package } from "lucide-react";

const AssetSoftware = ({ assetId, assetName }) => {
  const {
    software,
    softwareTable,
    getAssetSoftware,
    addAssetSoftware,
    removeAssetSoftware,
    addSoftware,
  } = useAssets();

  const [isAddingSoftware, setIsAddingSoftware] = useState(false);
  const [, setNewSoftwareName] = useState("");
  const [isCreatingSoftware, setIsCreatingSoftware] = useState(false);
  const [newCustomSoftware, setNewCustomSoftware] = useState("");

  const assetSoftware = getAssetSoftware(assetId) || [];
  const availableSoftware = (software || []).filter(
    (sw) => !assetSoftware.find((as) => as.name === sw)
  );

  const handleAddExistingSoftware = async (softwareName) => {
    const sw = (softwareTable || []).find((s) => s.name === softwareName);
    if (sw) {
      await addAssetSoftware(assetId, sw.id);
      setIsAddingSoftware(false);
      setNewSoftwareName("");
    }
  };

  const handleCreateAndAddSoftware = async () => {
    if (!newCustomSoftware.trim()) return;

    setIsCreatingSoftware(true);
    try {
      const newSw = await addSoftware(newCustomSoftware);
      if (newSw) {
        await addAssetSoftware(assetId, newSw.id);
        setNewCustomSoftware("");
        setIsAddingSoftware(false);
      }
    } catch (error) {
      console.error("Failed to create and add software:", error);
    } finally {
      setIsCreatingSoftware(false);
    }
  };

  const handleRemoveSoftware = async (softwareName) => {
    const sw = (softwareTable || []).find((s) => s.name === softwareName);
    if (sw) {
      await removeAssetSoftware(assetId, sw.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Monitor size={18} />
          Installed Software
        </h3>
        <button
          onClick={() => setIsAddingSoftware(!isAddingSoftware)}
          className="btn btn-sm btn-secondary"
        >
          <Plus size={16} />
          <span className="ml-1">Add Software</span>
        </button>
      </div>

      {/* Current Software */}
      <div className="space-y-2">
        {assetSoftware.length > 0 ? (
          assetSoftware.map((sw) => (
            <div
              key={sw.name}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              <div className="flex items-center gap-3">
                <Package size={16} className="text-slate-600" />
                <span className="font-medium text-slate-700">{sw.name}</span>
              </div>
              <button
                onClick={() => handleRemoveSoftware(sw.name)}
                className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                title="Remove software"
              >
                <X size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-slate-500 italic">No software installed</p>
        )}
      </div>

      {/* Add Software Interface */}
      {isAddingSoftware && (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-700 mb-3">
            Add Software to {assetName}
          </h4>

          {/* Existing Software */}
          {availableSoftware.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select from existing software:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableSoftware.map((sw) => (
                  <button
                    key={sw}
                    onClick={() => handleAddExistingSoftware(sw)}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-md text-sm transition-colors text-left"
                  >
                    {sw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Create New Software */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Or create new software:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomSoftware}
                onChange={(e) => setNewCustomSoftware(e.target.value)}
                placeholder="Enter software name..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleCreateAndAddSoftware()
                }
              />
              <button
                onClick={handleCreateAndAddSoftware}
                disabled={!newCustomSoftware.trim() || isCreatingSoftware}
                className="btn btn-sm btn-primary"
              >
                {isCreatingSoftware ? "Creating..." : "Create & Add"}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setIsAddingSoftware(false);
                setNewSoftwareName("");
                setNewCustomSoftware("");
              }}
              className="text-sm text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetSoftware;
