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

  return (
    <aside className="flex flex-col h-full py-6 pr-0 shrink-0 select-none z-20 w-60">
      {/* Official HealthTrack Logo Banner (Matching Image 3 Top Left) */}
      <div className="px-5 mb-8 flex flex-col items-center justify-center">
        <AppLogo size={150} variant="sticker" />
      </div>

      {/* Navigation List with Inverted Curve Active Tabs */}
      <nav className="flex flex-col gap-2 flex-1 pl-4">
        {nav.map((item) => {
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3.5 py-3.5 px-5 font-black text-sm transition-all duration-200 text-left w-full cursor-pointer ${
                active ? "sidebar-tab-active" : "text-white/80 hover:text-white hover:bg-white/10 rounded-2xl"
              }`}
            >
              <span className={`text-xl shrink-0 ${active ? "text-purple-600" : "text-white"}`}>{item.icon}</span>
              <span className="tracking-tight text-base">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mini Kuro Mascot Widget at Sidebar Bottom */}
      <div className="mx-4 mt-auto p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center text-white">
        <CatMascot size={64} pose="sitting" interactive={true} />
        <div className="text-xs font-black mt-1">Kuro-chan 🐾</div>
        <div className="text-[10px] font-medium opacity-80">HealthTrack Companion</div>
      </div>
    </aside>
  );
}
