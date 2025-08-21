import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import AssetManagement from "./components/AssetManagement";
import LicenseManagement from "./components/LicenseManagement";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import { AssetProvider } from "./context/AssetContext";
import "./tailwind.css";
import { useIsAuthenticated } from "@azure/msal-react";

const AppShell = () => {
  const isAuthenticated = useIsAuthenticated();
  return (
    <div className="flex min-h-screen">
      <Navigation />
      <main className="flex-1 bg-slate-50 overflow-y-auto p-4 sm:p-6 lg:p-8 ml-[72px] lg:ml-72">
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<AssetManagement />} />
            <Route path="/licenses" element={<LicenseManagement />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        ) : (
          <div className="max-w-xl mx-auto mt-16 sm:mt-24 text-center">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome to SVH CMDB
            </h1>
            <p className="text-slate-600">
              Please sign in with your Microsoft account using the button in the
              sidebar to continue.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AssetProvider>
      <Router>
        <AppShell />
      </Router>
    </AssetProvider>
  );
}

export default App;
