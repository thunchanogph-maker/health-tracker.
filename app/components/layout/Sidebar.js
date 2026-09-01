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

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";

  return (
    <aside
      className="hidden md:flex flex-col min-h-screen py-6 shrink-0 transition-all duration-300 relative z-20 border-r select-none"
      style={{
        width: collapsed ? "68px" : "260px",
        background: bg,
        borderColor: borderCol,
        boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className={`flex items-center mb-6 ${collapsed ? "justify-center px-2" : "justify-between px-5"}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <AppLogo size={140} variant="sticker" />
          </div>
        )}
        {collapsed && <AppLogo size={34} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs hover:opacity-80 shrink-0 transition border"
          style={{ background: darkMode ? "#252238" : "#FFE6C2", color: textM, borderColor: borderCol }}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {!collapsed && (
        <div className="text-xs font-black uppercase tracking-widest mb-2 px-5" style={{ color: textS }}>
          เมนูหลัก 🐾
        </div>
      )}

      <nav className="flex flex-col gap-1.5 flex-1 px-3">
        {nav.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 py-3 rounded-2xl text-sm font-bold transition-all duration-200 text-left w-full border ${
                collapsed ? "justify-center" : "px-3.5"
              }`}
              style={{
                background: active ? theme.accent : "transparent",
                borderColor: active ? theme.accent : "transparent",
                color: active ? "#191724" : textS,
                boxShadow: active ? `0 6px 18px ${theme.accent}40` : "none",
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="font-extrabold">{item.label}</span>
                  {active && <span className="ml-auto text-xs">🐾</span>}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mini Kuro Mascot Widget */}
      {!collapsed && (
        <div className="mx-3 mt-auto p-3 rounded-2xl text-center border" style={{ background: darkMode ? "#252238" : "#FFFBEB", borderColor: borderCol }}>
          <CatMascot size={64} pose="sitting" interactive={true} />
          <div className="text-xs font-black mt-1" style={{ color: textM }}>Kuro-chan</div>
          <div className="text-[11px] font-medium" style={{ color: textS }}>HealthTrack Companion 🐾</div>
        </div>
      )}
    </aside>
  );
}
