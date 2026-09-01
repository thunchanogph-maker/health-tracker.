"use client";

import AppLogo from "../AppLogo";
import CatMascot from "../CatMascot";

export default function Sidebar({ activeTab, setActiveTab, darkMode, theme, user, onSettingsOpen, collapsed, setCollapsed, localUser }) {
  const nav = [
    { id: "overview", icon: "🏠", label: "ภาพรวม" },
    { id: "form", icon: "✏️", label: "บันทึก" },
    { id: "list", icon: "📋", label: "รายการ" },
    { id: "chart", icon: "📊", label: "วิเคราะห์" },
    { id: "profile", icon: "🐾", label: "โปรไฟล์ & แมว" },
  ];

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const displayName = localUser?.displayName || user?.displayName || "มนุษย์";
  const photoURL = localUser?.photoURL || user?.photoURL || null;

  return (
    <aside
      className="hidden md:flex flex-col min-h-screen py-6 shrink-0 transition-all duration-300 relative z-20"
      style={{
        width: collapsed ? "68px" : "260px",
        background: bg,
        borderRight: `1px solid ${borderCol}`,
        boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
      }}
    >
      <div className={`flex items-center mb-6 ${collapsed ? "justify-center px-2" : "justify-between px-5"}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <AppLogo size={38} className="shrink-0" />
            <div>
              <div className="font-black text-base whitespace-nowrap tracking-tight" style={{ color: textM }}>
                Health<span style={{ color: theme.accent }}>Track</span>
              </div>
              <div className="text-xs whitespace-nowrap font-bold" style={{ color: theme.accent }}>
                x Kuro Neko 🐾
              </div>
            </div>
          </div>
        )}
        {collapsed && <AppLogo size={34} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs hover:opacity-80 shrink-0 transition"
          style={{ background: darkMode ? "#252238" : "#FFE6C2", color: textM, border: `1px solid ${borderCol}` }}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {user && !collapsed && (
        <button
          onClick={() => setActiveTab("profile")}
          className="rounded-2xl p-3 mb-5 mx-3 flex items-center gap-3 transition-all hover:scale-102 border"
          style={{
            background: activeTab === "profile" ? theme.accent : darkMode ? "#252238" : "#FFFFFF",
            borderColor: borderCol,
            color: activeTab === "profile" ? "#191724" : textM,
          }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0 overflow-hidden border-2"
            style={{ borderColor: activeTab === "profile" ? "#191724" : theme.accent, background: theme.accent, color: "#191724" }}
          >
            {photoURL ? <img src={photoURL} alt="" className="w-full h-full object-cover" /> : displayName[0].toUpperCase()}
          </div>
          <div className="overflow-hidden text-left">
            <div className="text-sm font-black truncate">{displayName}</div>
            <div className="text-xs truncate font-medium opacity-80">{user.email || "มนุษย์ทาสแมว 🐾"}</div>
          </div>
        </button>
      )}

      {user && collapsed && (
        <div className="flex justify-center mb-5">
          <button
            onClick={() => setActiveTab("profile")}
            className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white overflow-hidden border"
            style={{ borderColor: borderCol, background: theme.accent }}
          >
            {photoURL ? <img src={photoURL} alt="" className="w-full h-full object-cover" /> : displayName[0].toUpperCase()}
          </button>
        </div>
      )}

      {!collapsed && (
        <div className="text-xs font-black uppercase tracking-widest mb-2 px-5" style={{ color: textS }}>
          เมนูหลัก meow~
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

      {/* Mini Kuro Mascot Widget in Sidebar */}
      {!collapsed && (
        <div className="mx-3 mt-auto p-3 rounded-2xl text-center border" style={{ background: darkMode ? "#252238" : "#FFFBEB", borderColor: borderCol }}>
          <CatMascot size={60} pose="peeking" interactive={true} />
          <div className="text-xs font-black mt-1" style={{ color: textM }}>Kuro-chan</div>
          <div className="text-[11px] font-medium" style={{ color: textS }}>สุขภาพดี ยิ้มรับวันใหม่ 😸</div>
        </div>
      )}
    </aside>
  );
}
