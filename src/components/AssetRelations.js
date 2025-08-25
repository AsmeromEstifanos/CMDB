import React, { useState } from "react";
import { useAssets } from "../context/AssetContext";
import { GitBranch, Plus, X, ArrowUp, ArrowDown } from "lucide-react";

const AssetRelations = ({ assetId, assetName }) => {
  const { 
    assets, 
    getAssetChildren, 
    getAssetParents, 
    createAssetRelation, 
    removeAssetRelation 
  } = useAssets();
  
  const [isAddingRelation, setIsAddingRelation] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState("");
  const [relationType, setRelationType] = useState("child"); // "child" or "parent"

  const children = getAssetChildren(assetId);
  const parents = getAssetParents(assetId);
  
  // Available assets for creating relations (exclude self and existing relations)
  const availableAssets = assets.filter(asset => 
    asset.id !== assetId && 
    !children.find(child => child.id === asset.id) &&
    !parents.find(parent => parent.id === asset.id)
  );

  const handleCreateRelation = async () => {
    if (!selectedAssetId) return;
    
    try {
      if (relationType === "child") {
        await createAssetRelation(assetId, selectedAssetId);
      } else {
        await createAssetRelation(selectedAssetId, assetId);
      }
      
      setIsAddingRelation(false);
      setSelectedAssetId("");
      setRelationType("child");
    } catch (error) {
      console.error("Failed to create relation:", error);
    }
  };

  const handleRemoveRelation = async (relatedAssetId, isChild) => {
    try {
      if (isChild) {
        await removeAssetRelation(assetId, relatedAssetId);
      } else {
        await removeAssetRelation(relatedAssetId, assetId);
      }
    } catch (error) {
      console.error("Failed to remove relation:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <GitBranch size={18} />
          Asset Relations
        </h3>
        <button
          onClick={() => setIsAddingRelation(!isAddingRelation)}
          className="btn btn-sm btn-secondary"
        >
          <Plus size={16} />
          <span className="ml-1">Add Relation</span>
        </button>
      </div>

      {/* Current Relations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Parent Assets */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <ArrowUp size={16} />
            Parent Assets
          </h4>
          {parents.length > 0 ? (
            parents.map((parent) => (
              <div
                key={parent.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {parent.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">{parent.name}</div>
                    <div className="text-xs text-slate-500">{parent.category}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveRelation(parent.id, false)}
                  className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                  title="Remove parent relation"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic text-sm">No parent assets</p>
          )}
        </div>

        {/* Child Assets */}
        <div className="space-y-3">
          <h4 className="font-medium text-slate-700 flex items-center gap-2">
            <ArrowDown size={16} />
            Child Assets
          </h4>
          {children.length > 0 ? (
            children.map((child) => (
              <div
                key={child.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {child.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium text-slate-700">{child.name}</div>
                    <div className="text-xs text-slate-500">{child.category}</div>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveRelation(child.id, true)}
                  className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
                  title="Remove child relation"
                >
                  <X size={16} />
                </button>
              </div>
            ))
          ) : (
            <p className="text-slate-500 italic text-sm">No child assets</p>
          )}
        </div>
      </div>

      {/* Add Relation Interface */}
      {isAddingRelation && (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-700 mb-3">Create Asset Relation</h4>
          
          <div className="space-y-4">
            {/* Relation Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Relation Type:
              </label>
              <div className="flex gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="child"
                    checked={relationType === "child"}
                    onChange={(e) => setRelationType(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Add as Child Asset</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="parent"
                    checked={relationType === "parent"}
                    onChange={(e) => setRelationType(e.target.value)}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Add as Parent Asset</span>
                </label>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {relationType === "child" 
                  ? `${assetName} will be the parent of the selected asset`
                  : `The selected asset will be the parent of ${assetName}`
                }
              </p>
            </div>

            {/* Asset Selection */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Asset:
              </label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an asset...</option>
                {availableAssets.map((asset) => (
                  <option key={asset.id} value={asset.id}>
                    {asset.name} ({asset.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsAddingRelation(false);
                  setSelectedAssetId("");
                  setRelationType("child");
                }}
                className="text-sm text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRelation}
                disabled={!selectedAssetId}
                className="btn btn-sm btn-primary"
              >
                Create Relation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetRelations;
