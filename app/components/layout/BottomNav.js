"use client";

export default function BottomNav({ activeTab, setActiveTab, theme, darkMode }) {
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

  const navbarBg = theme?.accent || "#8B5CF6";
  const canvasBg = darkMode ? "#252238" : "#FFFFFF";
  const inactiveTextColor = "#FFFFFF";

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-stretch h-16 px-1 select-none overflow-visible shadow-2xl"
      style={{
        background: navbarBg,
        boxShadow: "0 -6px 25px rgba(0,0,0,0.15)",
        "--canvas-bg": canvasBg,
        "--theme-accent": navbarBg,
      }}
    >
      {nav.map((item) => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center gap-1 py-2 px-3.5 transition-all cursor-pointer ${
              active ? "bottom-nav-tab-active" : "hover:bg-white/10 rounded-t-2xl"
            }`}
            style={{
              background: active ? canvasBg : "transparent",
              color: active ? navbarBg : inactiveTextColor,
            }}
          >
            <span className="flex items-center justify-center shrink-0" style={{ color: active ? navbarBg : inactiveTextColor }}>
              {item.icon}
            </span>
            <span className="text-[11px] font-black tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
