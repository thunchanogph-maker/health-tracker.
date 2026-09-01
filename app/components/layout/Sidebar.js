"use client";

import AppLogo from "../AppLogo";
import CatMascot from "../CatMascot";

// Clean Flat Vector SVG Icons without patterns that adapt colors dynamically
function NavIcon({ id, color, size = 22 }) {
  if (id === "overview") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 10.5L12 3L21 10.5V20C21 20.5523 20.5523 21 20 21H15V14H9V21H4C3.44772 21 3 20.5523 3 20V10.5Z" fill={color} />
      </svg>
    );
  }
  if (id === "form") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill={color} />
      </svg>
    );
  }
  if (id === "list") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM7 7H17V9H7V7ZM17 13H7V11H17V13ZM14 17H7V15H14V17Z" fill={color} />
      </svg>
    );
  }
  if (id === "chart") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 19H19V21H3V3H5V19ZM7 11H9V17H7V11ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z" fill={color} />
      </svg>
    );
  }
  if (id === "profile") {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill={color} />
      </svg>
    );
  }
  return null;
}

export default function Sidebar({ activeTab, setActiveTab, darkMode, theme, user, onSettingsOpen, collapsed, setCollapsed, localUser }) {
  const nav = [
    { id: "overview", label: "ภาพรวม" },
    { id: "form", label: "บันทึก" },
    { id: "list", label: "รายงาน" },
    { id: "chart", label: "วิเคราะห์" },
    { id: "profile", label: "โปรไฟล์" },
  ];

  // Dynamic Theme Colors
  const sidebarBg = darkMode ? "#252238" : "#FFF8ED";
  const contentBg = darkMode ? "#191724" : "#FFF8ED";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";

  // Unselected vs Active Tab Colors
  const unselectedColor = darkMode ? "#B2ACCD" : "#64748B";
  const activeColor = theme.accent || "#F6D69B";

  return (
    <aside
      className="hidden md:flex flex-col min-h-screen py-6 shrink-0 transition-colors duration-300 relative z-20 border-r select-none"
      style={{
        width: collapsed ? "70px" : "260px",
        background: sidebarBg,
        borderColor: borderCol,
        boxShadow: "4px 0 24px rgba(0,0,0,0.06)",
      }}
    >
      {/* Top Logo Section */}
      <div className={`flex items-center mb-6 ${collapsed ? "justify-center px-2" : "justify-between px-5"}`}>
        {!collapsed && (
          <div className="flex items-center gap-3 overflow-hidden">
            <AppLogo size={140} variant="sticker" />
          </div>
        )}
        {collapsed && <AppLogo size={34} />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-7 h-7 rounded-xl flex items-center justify-center text-xs hover:opacity-80 shrink-0 transition border cursor-pointer"
          style={{
            background: darkMode ? "#191724" : "#FFE6C2",
            color: activeColor,
            borderColor: borderCol,
          }}
          title={collapsed ? "ขยายแถบเมนู" : "ย่อแถบเมนู"}
        >
          {collapsed ? "▶" : "◀"}
        </button>
      </div>

      {!collapsed && (
        <div className="text-xs font-black uppercase tracking-widest mb-3 px-5 transition-colors" style={{ color: unselectedColor }}>
          เมนูหลัก 🐾
        </div>
      )}

      {/* Sidebar Navigation Items */}
      <nav className="flex flex-col gap-1.5 flex-1 pl-3 pr-0">
        {nav.map((item) => {
          const active = activeTab === item.id;
          const currentItemColor = active ? activeColor : unselectedColor;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 py-3.5 text-sm font-black transition-all duration-200 text-left w-full cursor-pointer relative ${
                active ? "sidebar-tab-active" : "hover:opacity-90 rounded-2xl mr-3"
              } ${collapsed ? "justify-center px-0" : "px-4"}`}
              style={{
                "--content-bg": contentBg,
                color: currentItemColor,
              }}
              title={collapsed ? item.label : undefined}
            >
              {/* Clean Vector SVG Icon */}
              <div className="shrink-0 transition-transform duration-200 hover:scale-110">
                <NavIcon id={item.id} color={currentItemColor} size={22} />
              </div>

              {!collapsed && (
                <>
                  <span className="font-extrabold tracking-tight text-sm">{item.label}</span>
                  {active && (
                    <span className="ml-auto text-xs w-2 h-2 rounded-full" style={{ background: activeColor }} />
                  )}
                </>
              )}
            </button>
          );
        })}
      </nav>

      {/* Mini Kuro Mascot Widget */}
      {!collapsed && (
        <div
          className="mx-3 mt-auto p-3 rounded-2xl text-center border transition-all"
          style={{ background: darkMode ? "#191724" : "#FFFBEB", borderColor: borderCol }}
        >
          <CatMascot size={64} pose="sitting" interactive={true} />
          <div className="text-xs font-black mt-1" style={{ color: activeColor }}>
            Kuro-chan 🐾
          </div>
          <div className="text-[10px] font-medium opacity-80" style={{ color: unselectedColor }}>
            HealthTrack Companion 🐾
          </div>
        </div>
      )}
    </aside>
  );
}
