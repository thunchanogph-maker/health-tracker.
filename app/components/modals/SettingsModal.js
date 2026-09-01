"use client";

import { THEMES } from "../constants";

export default function SettingsModal({ darkMode, setDarkMode, theme, setTheme, onClose }) {
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const textMain = darkMode ? "#F1F5F9" : "#1E293B";
  const textSub = darkMode ? "#64748B" : "#94A3B8";
  const cardBg = darkMode ? "#2D2D3F" : "#F8FAFC";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden" style={{ background: bg }}>
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black" style={{ color: textMain }}>⚙️ ตั้งค่า</h3>
            <p className="text-xs mt-0.5" style={{ color: textSub }}>ธีมและการแสดงผล</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition hover:opacity-70"
            style={{ background: cardBg, color: textSub }}
          >
            ✕
          </button>
        </div>
        <div className="px-6 pb-6 space-y-5">
          <div className="rounded-2xl p-4 flex items-center justify-between" style={{ background: cardBg }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{darkMode ? "🌙" : "☀️"}</span>
              <div>
                <div className="text-sm font-bold" style={{ color: textMain }}>{darkMode ? "โหมดมืด" : "โหมดสว่าง"}</div>
                <div className="text-xs" style={{ color: textSub }}>สลับธีมสีพื้นหลัง</div>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="relative w-12 h-6 rounded-full transition-all duration-300"
              style={{ background: darkMode ? theme.accent : "#E2E8F0" }}
            >
              <span
                className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300"
                style={{ left: darkMode ? "calc(100% - 22px)" : "2px" }}
              />
            </button>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: textSub }}>สีธีมหลัก</p>
            <div className="grid grid-cols-4 gap-2">
              {THEMES.map((t) => {
                const active = theme.name === t.name;
                return (
                  <button
                    key={t.name}
                    onClick={() => setTheme(t)}
                    className="flex flex-col items-center gap-1.5 py-3 rounded-2xl transition-all hover:scale-105"
                    style={{
                      background: active ? t.light : cardBg,
                      border: `2px solid ${active ? t.accent : "transparent"}`,
                    }}
                  >
                    <span className="w-6 h-6 rounded-full shadow-sm" style={{ background: t.accent }} />
                    <span className="text-xs font-semibold" style={{ color: active ? t.accent : textSub }}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
