"use client";

export default function BottomNav({ activeTab, setActiveTab, theme, darkMode }) {
  const nav = [
    { id: "overview", icon: "🏠", label: "ภาพรวม" },
    { id: "form", icon: "✏️", label: "บันทึก" },
    { id: "list", icon: "📋", label: "รายการ" },
    { id: "chart", icon: "📊", label: "วิเคราะห์" },
    { id: "profile", icon: "👤", label: "โปรไฟล์" },
  ];
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-around items-center h-16 px-1"
      style={{
        background: darkMode ? "#1E1E2E" : "#FFFFFF",
        borderTop: darkMode ? "1px solid #2D2D3F" : "1px solid #F1F5F9",
        boxShadow: "0 -4px 20px rgba(0,0,0,0.08)",
      }}
    >
      {nav.map((item) => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all"
            style={{ color: active ? theme.accent : darkMode ? "#64748B" : "#94A3B8" }}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-semibold">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
