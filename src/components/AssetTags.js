import React, { useState } from "react";
import { useAssets } from "../context/AssetContext";
import { Tag, Plus, X } from "lucide-react";

const AssetTags = ({ assetId, assetName }) => {
  const { tags, tagsTable, getAssetTags, addAssetTag, removeAssetTag, addTag } =
    useAssets();

  const [isAddingTag, setIsAddingTag] = useState(false);
  const [, setNewTagName] = useState("");
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newCustomTag, setNewCustomTag] = useState("");

  const assetTags = getAssetTags(assetId) || [];
  const availableTags = (tags || []).filter(
    (tag) => !assetTags.find((at) => at.name === tag)
  );

  const handleAddExistingTag = async (tagName) => {
    // Find the tag object from tagsTable to get the ID
    const tag = (tagsTable || []).find((t) => t.name === tagName);
    if (tag) {
      await addAssetTag(assetId, tag.id);
      setIsAddingTag(false);
      setNewTagName("");
    }
  };

  const handleCreateAndAddTag = async () => {
    if (!newCustomTag.trim()) return;

    setIsCreatingTag(true);
    try {
      const newTag = await addTag(newCustomTag);
      if (newTag) {
        await addAssetTag(assetId, newTag.id);
        setNewCustomTag("");
        setIsAddingTag(false);
      }
    } catch (error) {
      console.error("Failed to create and add tag:", error);
    } finally {
      setIsCreatingTag(false);
    }
  };

  const handleRemoveTag = async (tagName) => {
    const tag = (tagsTable || []).find((t) => t.name === tagName);
    if (tag) {
      await removeAssetTag(assetId, tag.id);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Tag size={18} />
          Asset Tags
        </h3>
        <button
          onClick={() => setIsAddingTag(!isAddingTag)}
          className="btn btn-sm btn-secondary"
        >
          <Plus size={16} />
          <span className="ml-1">Add Tag</span>
        </button>
      </div>

      {/* Current Tags */}
      <div className="flex flex-wrap gap-2">
        {assetTags.length > 0 ? (
          assetTags.map((tag) => (
            <span
              key={tag.name}
              className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              <Tag size={14} />
              {tag.name}
              <button
                onClick={() => handleRemoveTag(tag.name)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                title="Remove tag"
              >
                <X size={12} />
              </button>
            </span>
          ))
        ) : (
          <p className="text-slate-500 italic">No tags assigned</p>
        )}
      </div>

      {/* Add Tag Interface */}
      {isAddingTag && (
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-medium text-slate-700 mb-3">
            Add Tag to {assetName}
          </h4>

          {/* Existing Tags */}
          {availableTags.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select from existing tags:
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddExistingTag(tag)}
                    className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-full text-sm transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Create New Tag */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              Or create a new tag:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCustomTag}
                onChange={(e) => setNewCustomTag(e.target.value)}
                placeholder="Enter tag name..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === "Enter" && handleCreateAndAddTag()}
              />
              <button
                onClick={handleCreateAndAddTag}
                disabled={!newCustomTag.trim() || isCreatingTag}
                className="btn btn-sm btn-primary"
              >
                {isCreatingTag ? "Creating..." : "Create & Add"}
              </button>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => {
                setIsAddingTag(false);
                setNewTagName("");
                setNewCustomTag("");
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

export default AssetTags;
