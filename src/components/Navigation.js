import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  HardDrive,
  Key,
  BarChart3,
  Settings,
  X,
  Database,
  RefreshCw,
} from "lucide-react";
import AuthButtons from "./AuthButtons";
import { useAssets } from "../context/AssetContext";

const Navigation = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isDesktopHovered, setIsDesktopHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false,
  );
  const location = useLocation();
  const { refreshData, loading } = useAssets();

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsDesktopHovered(false);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [setIsMobileMenuOpen]);

  const isDesktopExpanded = !isMobile && isDesktopHovered;
  const isNavCollapsed = isMobile ? !isMobileMenuOpen : !isDesktopExpanded;
  const widthClass = isMobile
    ? isMobileMenuOpen
      ? "w-72"
      : "w-0"
    : isDesktopExpanded
      ? "w-72"
      : "w-[72px]";

  const navItems = [
    { path: "/cmdb/", label: "Dashboard", icon: Home },
    { path: "/cmdb/assets", label: "Asset Management", icon: HardDrive },
    { path: "/cmdb/licenses", label: "License Management", icon: Key },
    { path: "/cmdb/reports", label: "Reports & Analytics", icon: BarChart3 },
    { path: "/cmdb/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[999] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav
        onMouseEnter={() => {
          if (!isMobile) {
            setIsDesktopHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (!isMobile) {
            setIsDesktopHovered(false);
          }
        }}
        className={`fixed h-screen z-[1000] overflow-hidden bg-gradient-to-br from-slate-800 to-slate-700 text-white transition-[width] duration-300 ${
          isMobile ? "left-0 shadow-lg" : "shadow-lg"
        } ${
          isMobile && !isMobileMenuOpen ? "pointer-events-none" : ""
        } ${widthClass}`}
      >
        <div
          className={`flex items-center py-5 border-b border-white/10 ${
            isNavCollapsed && !isMobile
              ? "justify-center px-0"
              : "justify-between px-4 sm:px-6"
          }`}
        >
          <div
            className={`flex items-center gap-3 ${
              isNavCollapsed && !isMobile ? "justify-center w-full" : ""
            }`}
          >
            <Database className="w-8 h-8 text-blue-400 shrink-0" />
            {!isNavCollapsed && (
              <span className="text-l font-bold whitespace-nowrap">CMDB</span>
            )}
          </div>

          {(isMobile || !isNavCollapsed) && (
            <div className="flex items-center gap-2">
              <button
                onClick={refreshData}
                disabled={loading}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                title="Refresh Data"
              >
                <RefreshCw
                  size={18}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
              {isMobile && (
                <button
                  className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  title={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  <X size={20} />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col py-4 h-[calc(100vh-76px)]">
          <ul className="space-y-1 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`mx-2 flex items-center gap-3 rounded-md px-2 sm:px-4 py-2 text-slate-300 hover:text-white transition-colors ${
                      active ? "bg-blue-500 text-white" : "hover:bg-white/10"
                    } ${isNavCollapsed ? "justify-center" : ""}`}
                    title={isNavCollapsed ? item.label : ""}
                    onClick={() => {
                      if (isMobile) {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    <Icon size={20} className="shrink-0" />
                    {!isNavCollapsed && (
                      <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div
            className={`mt-auto border-t border-white/10 px-4 pt-4 min-h-[88px] transition-opacity duration-300 ${
              isNavCollapsed
                ? "opacity-0 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }`}
          >
            <div className="min-h-[56px]">
              <AuthButtons />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
