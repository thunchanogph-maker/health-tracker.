"use client";

import AppLogo from "../AppLogo";
import CatMascot from "../CatMascot";

export default function Sidebar({ activeTab, setActiveTab, darkMode, theme, user, onSettingsOpen, collapsed, setCollapsed, localUser }) {
  const nav = [
    { id: "overview", icon: "🏠", label: "ภาพรวม" },
    { id: "form", icon: "✏️", label: "บันทึก" },
    { id: "list", icon: "📋", label: "รายงาน" },
    { id: "chart", icon: "📊", label: "วิเคราะห์" },
    { id: "profile", icon: "👤", label: "โปรไฟล์" },
  ];

  const sidebarBg = theme.accent || "#8B5CF6";
  const canvasBg = darkMode ? "#252238" : "#FFFFFF";
  const inactiveTextColor = darkMode ? "#FFFFFF" : "#FFFFFF";

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
      {/* Top Logo Sticker Banner (Matching Mockup Image) */}
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

      {/* Navigation List with Inverted Curve Active Tabs */}
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
              <span className="text-xl shrink-0" style={{ color: active ? sidebarBg : inactiveTextColor }}>
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

      {/* Mini Kuro Mascot Companion Widget at Bottom of Sidebar */}
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
