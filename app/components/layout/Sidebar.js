"use client";

import AppLogo from "../AppLogo";

export default function Sidebar({ activeTab, setActiveTab, darkMode, theme, user, onSettingsOpen, collapsed, setCollapsed, localUser }) {
  const nav = [
    { id: "overview", icon: "🏠", label: "ภาพรวม" },
    { id: "form", icon: "✏️", label: "บันทึก" },
    { id: "list", icon: "📋", label: "รายการ" },
    { id: "chart", icon: "📊", label: "วิเคราะห์" },
    { id: "profile", icon: "👤", label: "โปรไฟล์" },
  ];
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const textS = darkMode ? "#94A3B8" : "#64748B";
  const textM = darkMode ? "#F1F5F9" : "#1E293B";
  const displayName = localUser?.displayName || user?.displayName || "ผู้ใช้";
  const photoURL = localUser?.photoURL || user?.photoURL || null;

  return (
    <aside
      className="hidden md:flex flex-col min-h-screen py-6 shrink-0 transition-all duration-300"
      style={{
        width: collapsed ? "64px" : "256px",
        background: bg,
        borderRight: darkMode ? "1px solid #2D2D3F" : "1px solid #F1F5F9",
        boxShadow: "2px 0 16px rgba(0,0,0,0.04)",
        overflow: "hidden",
      }}
    >
      <div className={`flex items-center mb-8 ${collapsed ? "justify-center px-2" : "justify-between px-5"}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <AppLogo size={36} className="shrink-0 drop-shadow-sm" />
            <div>
              <div className="font-black text-sm whitespace-nowrap" style={{ color: textM }}>HealthTrack</div>
              <div className="text-xs whitespace-nowrap" style={{ color: textS }}>Well-being</div>
            </div>
          </div>
        )}
        {collapsed && <AppLogo size={32} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-lg flex items-center justify-center text-xs hover:opacity-70 shrink-0"
          style={{ background: darkMode ? "#2D2D3F" : "#F1F5F9", color: textS }}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {user && !collapsed && (
        <button
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl p-3 mb-5 mx-3 flex items-center gap-3 transition hover:opacity-90"
          style={{
            background: activeTab === "profile" ? `linear-gradient(${theme.gradient})` : darkMode ? "#2D2D3F" : theme.light,
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white shrink-0 overflow-hidden"
            style={{ background: activeTab === "profile" ? "rgba(255,255,255,0.3)" : theme.accent }}
          >
            {photoURL ? <img src={photoURL} alt="" className="w-full h-full object-cover" /> : displayName[0].toUpperCase()}
          </div>
          <div className="overflow-hidden">
            <div className="text-sm font-semibold truncate" style={{ color: activeTab === "profile" ? "white" : darkMode ? "#F1F5F9" : "#1E293B" }}>
              {displayName}
            </div>
            <div className="text-xs truncate" style={{ color: activeTab === "profile" ? "rgba(255,255,255,0.7)" : darkMode ? "#64748B" : "#94A3B8" }}>
              {user.email || ""}
            </div>
          </div>
        </button>
      )}

      {user && collapsed && (
        <div className="flex justify-center mb-5">
          <button
            onClick={() => setActiveTab("profile")}
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white overflow-hidden"
            style={{ background: theme.accent }}
          >
            {photoURL ? <img src={photoURL} alt="" className="w-full h-full object-cover" /> : displayName[0].toUpperCase()}
          </button>
        </div>
      )}

      {!collapsed && <div className="text-xs font-bold uppercase tracking-widest mb-2 px-5" style={{ color: darkMode ? "#475569" : "#CBD5E1" }}>เมนูหลัก</div>}

      <nav className="flex flex-col gap-1 flex-1 px-3">
        {nav.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 text-left w-full ${collapsed ? "justify-center" : "px-3"}`}
              style={{
                background: active ? `linear-gradient(${theme.gradient})` : "transparent",
                color: active ? "#FFFFFF" : darkMode ? "#94A3B8" : "#64748B",
                boxShadow: active ? `0 4px 14px ${theme.accent}40` : "none",
              }}
              title={collapsed ? item.label : undefined}
            >
              <span className="text-base shrink-0">{item.icon}</span>
              {!collapsed && (
                <>
                  {item.label}
                  {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80" />}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {!collapsed && <div className="text-xs text-center mt-3 opacity-20 px-4" style={{ color: textM }}>DTM67-236 Mini Project</div>}
    </aside>
  );
}
