import React, { useState } from "react";
import { useAssets } from "../context/AssetContext";
import {
  HardDrive,
  Key,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  formatCurrency,
  formatDisplayDate,
  daysUntilRenewal,
} from "../utils/helpers";

const Dashboard = () => {
  const {
    assets,
    licenses,
    ventures,
    getAssetsByVenture,
    getAssetsByCategory,
    getExpiringLicenses,
  } = useAssets();

  const [selectedVenture, setSelectedVenture] = useState("All Ventures");
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const totalAssets = assets.length;
  const totalLicenses = licenses.length;
  const totalValue = assets.reduce((sum, asset) => sum + (asset.cost || 0), 0);
  const expiringLicenses = getExpiringLicenses(parseInt(selectedPeriod));

  const ventureStats = ventures.map((venture) => ({
    name: venture,
    count: getAssetsByVenture(venture).length,
    value: getAssetsByVenture(venture).reduce(
      (sum, asset) => sum + (asset.cost || 0),
      0
    ),
  }));

  const categoryStats = [
    "Laptop",
    "Desktop",
    "Server",
    "Network",
    "Mobile",
    "Peripheral",
    "Software",
    "Other",
  ]
    .map((category) => ({
      name: category,
      count: getAssetsByCategory(category).length,
    }))
    .filter((stat) => stat.count > 0);

  const recentActivities = [...assets, ...licenses]
    .flatMap((item) =>
      (item.history || []).map((history) => ({
        ...history,
        itemName: item.name,
        itemType: item.software ? "License" : "Asset",
        date: new Date(history.date),
      }))
    )
    .sort((a, b) => b.date - a.date)
    .slice(0, 10);

  return (
    <div className="space-y-8">
      <div className="mb-8">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle text-lg">
          Overview of your SVH Configuration Management Database
        </p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
            <HardDrive />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {totalAssets}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-500">
              Total Assets
            </div>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
            <Key />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {totalLicenses}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-500">
              Active Licenses
            </div>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
            <DollarSign />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {formatCurrency(totalValue)}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-500">
              Total Asset Value
            </div>
          </div>
        </div>
        <div className="card p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center">
            <AlertTriangle />
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-800">
              {expiringLicenses.length}
            </div>
            <div className="text-xs uppercase tracking-wider text-slate-500">
              Licenses Expiring Soon
            </div>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Venture
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedVenture}
              onChange={(e) => setSelectedVenture(e.target.value)}
            >
              <option value="All Ventures">All Ventures</option>
              {ventures.map((venture) => (
                <option key={venture} value={venture}>
                  {venture}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-700 font-medium mb-2">
              Expiration Period
            </label>
            <select
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7">Next 7 days</option>
              <option value="30">Next 30 days</option>
              <option value="90">Next 90 days</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Asset Distribution by Venture
            </h3>
            <div className="space-y-3">
              {ventureStats.map((venture, index) => (
                <div key={venture.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700">
                      {venture.name}
                    </span>
                    <span className="text-slate-500">
                      {venture.count} assets
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded">
                    <div
                      className="h-2 rounded"
                      style={{
                        width: `${
                          (venture.count /
                            Math.max(...ventureStats.map((v) => v.count))) *
                          100
                        }%`,
                        backgroundColor: `hsl(${index * 60}, 70%, 60%)`,
                      }}
                    />
                  </div>
                  <div className="text-right text-xs font-medium text-slate-700">
                    {formatCurrency(venture.value)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Asset Distribution by Category
            </h3>
            <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {categoryStats.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center gap-3 p-3 rounded-md bg-slate-50 border border-slate-200"
                >
                  <div className="text-xl w-8 text-center">
                    {getCategoryIcon(category.name)}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-700">
                      {category.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {category.count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <AlertTriangle size={18} />
              Licenses Expiring Soon
            </h3>
            <div className="space-y-3">
              {expiringLicenses.length > 0 ? (
                expiringLicenses.map((license) => {
                  const daysLeft = daysUntilRenewal(license.renewalDate);
                  return (
                    <div
                      key={license.id}
                      className="p-3 rounded-md bg-slate-50 border border-slate-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-slate-700">
                            {license.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {license.venture}
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded ${
                              daysLeft <= 7
                                ? "bg-rose-100 text-rose-800"
                                : daysLeft <= 30
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {daysLeft} days
                          </span>
                          <div className="text-xs text-slate-500 mt-1">
                            {formatDisplayDate(license.renewalDate)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-center text-slate-500 italic">
                  No licenses expiring soon
                </div>
              )}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp size={18} />
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-md bg-slate-50 border border-slate-200"
                >
                  <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center">
                    {activity.itemType === "License" ? (
                      <Key size={16} />
                    ) : (
                      <HardDrive size={16} />
                    )}
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-slate-700">
                      {activity.action}
                    </div>
                    <div className="text-slate-500">{activity.itemName}</div>
                    <div className="text-xs text-slate-400">
                      {formatDisplayDate(activity.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button className="btn btn-primary">Add New Asset</button>
              <button className="btn btn-secondary">Add New License</button>
              <button className="btn btn-success">Generate Report</button>
              <button className="btn btn-info">Export Data</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const getCategoryIcon = (category) => {
  const icons = {
    Laptop: "💻",
    Desktop: "🖥️",
    Server: "🖥️",
    Network: "🌐",
    Mobile: "📱",
    Peripheral: "🖱️",
    Software: "💾",
    Other: "📦",
  };
  return icons[category] || "📦";
};

export default Dashboard;
