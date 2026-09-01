"use client";

import AppLogo from "../AppLogo";
import CatMascot from "../CatMascot";

export default function Sidebar({ activeTab, setActiveTab, darkMode, theme, user, onSettingsOpen, collapsed, setCollapsed, localUser }) {
  const nav = [
    {
      id: "overview",
      label: "ภาพรวม",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
      ),
    },
    {
      id: "form",
      label: "บันทึก",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
        </svg>
      ),
    },
    {
      id: "list",
      label: "รายงาน",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
        </svg>
      ),
    },
    {
      id: "chart",
      label: "วิเคราะห์",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zM16.2 13H19v6h-2.8z" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: "โปรไฟล์",
      icon: (
        <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
  ];

  const sidebarBg = theme.accent || "#8B5CF6";
  const canvasBg = darkMode ? "#252238" : "#FFFFFF";
  const inactiveTextColor = "#FFFFFF";

  return (
    <aside
      className="hidden md:flex flex-col min-h-screen py-6 shrink-0 transition-all duration-300 relative z-20 select-none pl-4 pr-0"
      style={{
        width: collapsed ? "76px" : "250px",
        background: sidebarBg,
        boxShadow: "4px 0 24px rgba(0,0,0,0.12)",
        "--canvas-bg": canvasBg,
        "--theme-accent": sidebarBg,
      }}
    >
      {/* Top Logo Banner */}
      <div className={`flex items-center mb-8 ${collapsed ? "justify-center px-1" : "justify-between px-3 pr-4"}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <AppLogo size={140} variant="sticker" />
          </div>
        )}
        {collapsed && <AppLogo size={34} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs hover:opacity-80 shrink-0 transition border shadow-sm cursor-pointer"
          style={{ background: "rgba(255,255,255,0.25)", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.4)" }}
          title={collapsed ? "ขยายเมนู" : "ย่อเมนู"}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {!collapsed && (
        <div className="text-xs font-black uppercase tracking-widest mb-3 px-4 text-white/80">
          เมนูหลัก 🐾
        </div>
      )}

      {/* Navigation List with Flat Color-Inheriting SVG Icons & Inverted Curve Active Tabs */}
      <nav className="flex flex-col gap-2 flex-1">
        {nav.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 py-3.5 font-black text-sm transition-all duration-200 text-left w-full cursor-pointer relative ${
                collapsed ? "justify-center px-2 rounded-xl" : "px-5"
              } ${active ? "sidebar-tab-active" : "hover:bg-white/10 rounded-l-2xl"}`}
              style={{
                background: active ? canvasBg : "transparent",
                color: active ? sidebarBg : inactiveTextColor,
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="flex items-center justify-center shrink-0" style={{ color: active ? sidebarBg : inactiveTextColor }}>
                {item.icon}
              </span>
              {!collapsed && (
                <>
                  <span className="tracking-tight text-base">{item.label}</span>
                  {active && <span className="ml-auto text-xs opacity-70">🐾</span>}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mini Kuro Mascot Widget */}
      {!collapsed && (
        <div className="mx-3 mr-4 mt-auto p-3 rounded-2xl text-center border shadow-md" style={{ background: "rgba(255,255,255,0.18)", borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}>
          <CatMascot size={64} pose="sitting" interactive={true} />
          <div className="text-xs font-black mt-1">Kuro-chan 🐾</div>
          <div className="text-[10px] font-bold opacity-90">HealthTrack Companion</div>
        </div>
      )}
    </aside>
  );
}
