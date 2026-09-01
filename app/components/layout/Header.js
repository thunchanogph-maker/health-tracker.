"use client";

import AppLogo from "../AppLogo";
import AuthDialog from "../../pages/AuthDialog";

export default function Header({ darkMode, theme, user, setUser, setRecords, onSettingsOpen, localUser }) {
  const displayName = localUser?.displayName || user?.displayName || "Thunchanog Phonsit";
  const photoURL = localUser?.photoURL || user?.photoURL || null;

  const bgPill = darkMode ? "#252238" : "#FFFFFF";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";

  return (
    <header className="flex items-center justify-between md:justify-end px-4 md:px-6 py-4 gap-4 select-none">
      <div className="md:hidden flex items-center gap-2">
        <AppLogo size={110} variant="sticker" />
      </div>

      <div className="flex items-center gap-3">
        {/* Settings Gear Button */}
        <button
          onClick={onSettingsOpen}
          className="w-11 h-11 rounded-full flex items-center justify-center text-xl shadow-md hover:scale-105 active:scale-95 transition cursor-pointer border"
          style={{
            background: bgPill,
            color: theme.accent,
            borderColor: borderCol,
          }}
          title="ตั้งค่าธีม & แอป"
        >
          ⚙️
        </button>

        {/* User Profile Pill */}
        {user ? (
          <div
            className="flex items-center gap-3 px-4 py-2 rounded-full shadow-md border"
            style={{
              background: bgPill,
              borderColor: borderCol,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center font-black text-xs overflow-hidden shrink-0"
              style={{ background: theme.accent, color: "#191724" }}
            >
              {photoURL ? (
                <img src={photoURL} alt="" className="w-full h-full object-cover" />
              ) : (
                (displayName || "U")[0].toUpperCase()
              )}
            </div>
            <span className="font-black text-xs sm:text-sm tracking-tight" style={{ color: textM }}>
              {displayName}
            </span>
          </div>
        ) : (
          <AuthDialog
            onLogin={(u) => {
              setUser(u);
              if (!u) setRecords([]);
            }}
            customClass="flex items-center"
            accentColor={theme.accent}
            darkMode={darkMode}
          />
        )}
      </div>
    </header>
  );
}
