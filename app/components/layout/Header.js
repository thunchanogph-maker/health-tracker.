"use client";

import AppLogo from "../AppLogo";
import AuthDialog from "../../pages/AuthDialog";

export default function Header({ darkMode, theme, user, setUser, setRecords, onSettingsOpen, localUser }) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 h-16"
      style={{
        background: darkMode ? "rgba(15,15,26,0.92)" : "rgba(241,245,249,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: darkMode ? "1px solid #2D2D3F" : "1px solid #E2E8F0",
        boxShadow: "0 1px 12px rgba(0,0,0,0.04)",
      }}
    >
      <div className="md:hidden flex items-center gap-2">
        <AppLogo size={28} />
        <span className="font-black text-sm" style={{ color: darkMode ? "#F1F5F9" : "#1E293B" }}>HealthTrack</span>
      </div>
      <div className="hidden md:block" />
      <div className="flex items-center gap-2">
        <button
          onClick={onSettingsOpen}
          className="flex w-9 h-9 rounded-xl items-center justify-center text-base transition-all hover:scale-105"
          style={{
            background: darkMode ? "#2D2D3F" : "#FFFFFF",
            border: darkMode ? "1px solid #3D3D4F" : "1px solid #E2E8F0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
          title="ตั้งค่า"
        >
          ⚙️
        </button>
        {user && (
          <div
            className="w-8 h-8 rounded-full overflow-hidden border-2 shrink-0 flex items-center justify-center text-white font-black text-sm"
            style={{ borderColor: theme.accent, background: theme.accent }}
          >
            {localUser?.photoURL || user?.photoURL ? (
              <img src={localUser?.photoURL || user?.photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              (localUser?.displayName || user?.displayName || "U")[0].toUpperCase()
            )}
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
