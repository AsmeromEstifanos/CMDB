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
import { Menu, Database } from "lucide-react";

const MobileHeader = ({ onMenuClick }) => {
  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-[998] bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Database className="w-6 h-6 text-blue-400" />
        <span className="text-lg font-bold text-slate-800">SVH CMDB</span>
      </div>
      <button
        onClick={onMenuClick}
        className="p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100"
      >
        <Menu size={20} />
      </button>
    </div>
  );
};

const AppShell = () => {
  const isAuthenticated = useIsAuthenticated();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen">
      <Navigation
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <MobileHeader
        onMenuClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      <main className="flex-1 bg-slate-50 overflow-y-auto p-4 sm:p-6 lg:p-8 lg:ml-[72px] pt-20 lg:pt-8">
        {isAuthenticated ? (
          <Routes>
            <Route path="/cmdb/" element={<Dashboard />} />
            <Route path="/cmdb/assets" element={<AssetManagement />} />
            <Route path="/cmdb/licenses" element={<LicenseManagement />} />
            <Route path="/cmdb/reports" element={<Reports />} />
            <Route path="/cmdb/settings" element={<Settings />} />
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
