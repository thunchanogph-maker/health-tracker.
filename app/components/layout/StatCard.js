"use client";

export default function StatCard({ icon, value, label, darkMode, theme, color, iconBg }) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-3 transition-all hover:scale-[1.02]"
      style={{
        background: darkMode ? "#2D2D3F" : "#FFFFFF",
        border: darkMode ? "1px solid #3D3D4F" : "1px solid #F1F5F9",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: iconBg || theme.light }}>
        {icon}
      </div>
      <div>
        <div className="text-xl font-black leading-tight" style={{ color: color || (darkMode ? "#F1F5F9" : "#1E293B") }}>
          {value}
        </div>
        <div className="text-xs" style={{ color: darkMode ? "#64748B" : "#94A3B8" }}>
          {label}
        </div>
      </div>
    </div>
  );
}
