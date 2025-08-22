import React, { useState, useMemo } from "react";
import { useAssets } from "../context/AssetContext";
import {
  Download,
  PieChart,
  TrendingUp,
  Calendar,
  DollarSign,
  HardDrive,
  Key,
  Building,
  Filter,
} from "lucide-react";
import {
  formatCurrency,
  formatDisplayDate,
  daysUntilRenewal,
} from "../utils/helpers";
import { exportToCSV, exportToJSON } from "../utils/helpers";
import LoadingSpinner from "./LoadingSpinner";

const Reports = () => {
  const {
    assets,
    licenses,
    ventures,
    departments,
    categories,
    statuses,
    loading,
    getAssetsByVenture,
    getAssetsByCategory,
    getExpiringLicenses,
  } = useAssets();

  const [selectedVenture, setSelectedVenture] = useState("All Ventures");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [reportType, setReportType] = useState("overview");

  const stats = useMemo(() => {
    if (loading) {
      return {
        totalAssets: 0,
        totalLicenses: 0,
        totalAssetValue: 0,
        expiringLicenses: [],
        ventureStats: [],
        categoryStats: [],
        statusStats: [],
        departmentStats: [],
        monthlyCosts: {},
      };
    }

    // Filter assets and licenses based on selected filters
    const filteredAssets = assets.filter((asset) => {
      const ventureMatch =
        selectedVenture === "All Ventures" || asset.venture === selectedVenture;
      const departmentMatch =
        selectedDepartment === "All Departments" ||
        asset.department === selectedDepartment;
      return ventureMatch && departmentMatch;
    });

    const filteredLicenses = licenses.filter((license) => {
      const ventureMatch =
        selectedVenture === "All Ventures" ||
        license.venture === selectedVenture;
      const departmentMatch =
        selectedDepartment === "All Departments" ||
        license.department === selectedDepartment;
      return ventureMatch && departmentMatch;
    });

    const totalAssets = filteredAssets.length;
    const totalLicenses = filteredLicenses.length;
    const totalAssetValue = filteredAssets.reduce(
      (sum, asset) => sum + (asset.cost || 0),
      0
    );
    const expiringLicenses = getExpiringLicenses(parseInt(selectedPeriod));

    const ventureStats = ventures.map((venture) => ({
      name: venture,
      assetCount: getAssetsByVenture(venture).filter((asset) => {
        const departmentMatch =
          selectedDepartment === "All Departments" ||
          asset.department === selectedDepartment;
        return departmentMatch;
      }).length,
      assetValue: getAssetsByVenture(venture)
        .filter((asset) => {
          const departmentMatch =
            selectedDepartment === "All Departments" ||
            asset.department === selectedDepartment;
          return departmentMatch;
        })
        .reduce((sum, asset) => sum + (asset.cost || 0), 0),
      licenseCount: filteredLicenses.filter(
        (license) => license.venture === venture
      ).length,
    }));

    const categoryStats = categories
      .map((category) => ({
        name: category,
        count: getAssetsByCategory(category).filter((asset) => {
          const ventureMatch =
            selectedVenture === "All Ventures" ||
            asset.venture === selectedVenture;
          const departmentMatch =
            selectedDepartment === "All Departments" ||
            asset.department === selectedDepartment;
          return ventureMatch && departmentMatch;
        }).length,
        value: getAssetsByCategory(category)
          .filter((asset) => {
            const ventureMatch =
              selectedVenture === "All Ventures" ||
              asset.venture === selectedVenture;
            const departmentMatch =
              selectedDepartment === "All Departments" ||
              asset.department === selectedDepartment;
            return ventureMatch && departmentMatch;
          })
          .reduce((sum, asset) => sum + (asset.cost || 0), 0),
      }))
      .filter((stat) => stat.count > 0);

    const statusStats = statuses
      .map((status) => ({
        name: status,
        count: filteredAssets.filter((asset) => asset.status === status).length,
      }))
      .filter((stat) => stat.count > 0);

    const departmentStats = departments
      .map((dept) => ({
        name: dept,
        assetCount: filteredAssets.filter((asset) => asset.department === dept)
          .length,
        licenseCount: filteredLicenses.filter(
          (license) => license.department === dept
        ).length,
      }))
      .filter((stat) => stat.assetCount > 0 || stat.licenseCount > 0);

    const monthlyCosts = {};
    filteredAssets.forEach((asset) => {
      if (asset.acquiredDate) {
        const month = asset.acquiredDate.substring(0, 7);
        monthlyCosts[month] = (monthlyCosts[month] || 0) + (asset.cost || 0);
      }
    });

    return {
      totalAssets,
      totalLicenses,
      totalAssetValue,
      expiringLicenses,
      ventureStats,
      categoryStats,
      statusStats,
      departmentStats,
      monthlyCosts,
    };
  }, [
    assets,
    licenses,
    ventures,
    departments,
    categories,
    statuses,
    selectedPeriod,
    selectedVenture,
    selectedDepartment,
    getAssetsByVenture,
    getAssetsByCategory,
    getExpiringLicenses,
    loading,
  ]);

  const generateReport = () => {
    const reportData = {
      reportType,
      generatedAt: new Date().toISOString(),
      filters: {
        venture: selectedVenture,
        department: selectedDepartment,
        period: selectedPeriod,
      },
      statistics: stats,
    };

    if (reportType === "csv") exportToCSV([reportData], "svh-cmdb-report");
    else exportToJSON(reportData, "svh-cmdb-report");
  };

  const getVentureColor = (index) => {
    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
    ];
    return colors[index % colors.length];
  };

  const getCategoryColor = (index) => {
    const colors = [
      "#3b82f6",
      "#10b981",
      "#f59e0b",
      "#ef4444",
      "#8b5cf6",
      "#06b6d4",
      "#84cc16",
      "#f97316",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return <LoadingSpinner text="Loading reports..." />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="page-title">Reports & Analytics</h1>
        <p className="page-subtitle">
          Comprehensive insights into your SVH Configuration Management Database
        </p>
      </div>

      <div className="card p-6">
        <div className="border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Filter size={18} /> Report Filters
            </h3>
            {(selectedVenture !== "All Ventures" ||
              selectedDepartment !== "All Departments" ||
              selectedPeriod !== "30") && (
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                Filters Active
              </span>
            )}
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="form-label">Venture</label>
            <select
              className="form-select"
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
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="All Departments">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Expiration Period</label>
            <select
              className="form-select"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="7">Next 7 days</option>
              <option value="30">Next 30 days</option>
              <option value="90">Next 90 days</option>
            </select>
          </div>
          <div>
            <label className="form-label">Report Type</label>
            <select
              className="form-select"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <option value="overview">Overview Report</option>
              <option value="financial">Financial Report</option>
              <option value="inventory">Inventory Report</option>
              <option value="licenses">License Report</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => {
              setSelectedVenture("All Ventures");
              setSelectedDepartment("All Departments");
              setSelectedPeriod("30");
              setReportType("overview");
            }}
            className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
          >
            Clear Filters
          </button>
          <button className="btn btn-primary" onClick={generateReport}>
            <Download size={16} />
            <span className="ml-2">Generate Report</span>
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Key Metrics
        </h3>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <HardDrive />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {stats.totalAssets}
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
                {stats.totalLicenses}
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
                {formatCurrency(stats.totalAssetValue)}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Total Asset Value
              </div>
            </div>
          </div>
          <div className="card p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <Calendar />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">
                {stats.expiringLicenses.length}
              </div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Licenses Expiring Soon
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="card p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Building size={18} /> Asset Distribution by Venture
          </h4>
          <div className="space-y-3">
            {stats.ventureStats.map((venture, index) => (
              <div key={venture.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {venture.name}
                  </span>
                  <span className="text-slate-500">
                    {venture.assetCount} assets
                  </span>
                </div>
                <div className="h-2 bg-slate-200 rounded">
                  <div
                    className="h-2 rounded"
                    style={{
                      width: `${
                        (venture.assetCount /
                          Math.max(
                            ...stats.ventureStats.map((v) => v.assetCount)
                          )) *
                        100
                      }%`,
                      backgroundColor: getVentureColor(index),
                    }}
                  />
                </div>
                <div className="text-right text-xs font-medium text-slate-700">
                  {formatCurrency(venture.assetValue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card p-6">
          <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <PieChart size={18} /> Asset Distribution by Category
          </h4>
          <div className="space-y-2">
            {stats.categoryStats.map((category, index) => (
              <div
                key={category.name}
                className="flex items-center gap-3 p-2 rounded-md bg-slate-50 border border-slate-200"
              >
                <div
                  className="w-3 h-3 rounded bg-slate-400"
                  style={{ backgroundColor: getCategoryColor(index) }}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-slate-700">
                    {category.name}
                  </div>
                </div>
                <div className="text-xs text-slate-500 mr-2">
                  {category.count}
                </div>
                <div className="text-xs font-medium text-slate-700 min-w-[80px] text-right">
                  {formatCurrency(category.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <TrendingUp size={18} /> Department Overview
        </h4>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stats.departmentStats.map((dept) => (
            <div
              key={dept.name}
              className="p-4 rounded-md bg-slate-50 border border-slate-200"
            >
              <div className="font-semibold text-slate-800 mb-2">
                {dept.name}
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <div className="text-xs text-slate-500">Assets</div>
                  <div className="text-slate-800 font-semibold">
                    {dept.assetCount}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-slate-500">Licenses</div>
                  <div className="text-slate-800 font-semibold">
                    {dept.licenseCount}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h4 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Calendar size={18} /> Licenses Expiring Soon
        </h4>
        {stats.expiringLicenses.length > 0 ? (
          <div className="space-y-2">
            {stats.expiringLicenses.slice(0, 5).map((license) => {
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
            })}
            {stats.expiringLicenses.length > 5 && (
              <div className="text-center text-slate-500 italic">
                +{stats.expiringLicenses.length - 5} more licenses expiring soon
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-slate-500 italic">
            No licenses expiring in the selected period
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
