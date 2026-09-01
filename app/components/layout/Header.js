"use client";

import AppLogo from "../AppLogo";
import AuthDialog from "../../pages/AuthDialog";
import CatMascot from "../CatMascot";

export default function Header({ darkMode, theme, user, setUser, setRecords, onSettingsOpen, localUser }) {
  const bg = darkMode ? "rgba(25, 23, 36, 0.92)" : "rgba(255, 248, 237, 0.92)";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-16 transition-all"
      style={{
        background: bg,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${borderCol}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div className="md:hidden flex items-center gap-2">
        <AppLogo size={32} />
        <span className="font-black text-base tracking-tight" style={{ color: textM }}>
          Health<span style={{ color: theme.accent }}>Track</span>
        </span>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <div
          className="px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5"
          style={{
            background: darkMode ? "#252238" : "#FFFBEB",
            borderColor: borderCol,
            color: theme.accent,
          }}
        >
          <CatMascot size={22} pose="sitting" interactive={false} />
          <span>Kuro Mascot Active 🐾</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onSettingsOpen}
          className="flex w-9 h-9 rounded-2xl items-center justify-center text-base transition-all hover:scale-105 active:scale-95 shadow-sm"
          style={{
            background: darkMode ? "#252238" : "#FFFFFF",
            border: `1px solid ${borderCol}`,
            color: textM,
          }}
          title="ตั้งค่าธีม & แอป"
        >
          ⚙️
        </button>

        {user && (
          <div className="flex items-center gap-2">
            <div
              className="w-9 h-9 rounded-full overflow-hidden border-2 shrink-0 flex items-center justify-center font-black text-sm shadow-sm relative group"
              style={{ borderColor: theme.accent, background: theme.accent, color: "#191724" }}
            >
              {localUser?.photoURL || user?.photoURL ? (
                <img src={localUser?.photoURL || user?.photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                (localUser?.displayName || user?.displayName || "U")[0].toUpperCase()
              )}
            </div>
          </div>
        )}

        <AuthDialog
          onLogin={(u) => {
            setUser(u);
            if (!u) setRecords([]);
          }}
          customClass="flex items-center"
          accentColor={theme.accent}
          darkMode={darkMode}
          hideTriggerWhenLoggedOut={true}
        />
      </div>
    </header>
  );
}
