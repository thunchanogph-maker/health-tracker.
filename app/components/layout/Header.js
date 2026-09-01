"use client";

import AppLogo from "../AppLogo";
import AuthDialog from "../../pages/AuthDialog";

export default function Header({ darkMode, theme, user, setUser, setRecords, onSettingsOpen, localUser }) {
  const displayName = localUser?.displayName || user?.displayName || "Thunchanog Phonsit";
  const photoURL = localUser?.photoURL || user?.photoURL || null;

  return (
    <header className="flex items-center justify-end px-6 py-4 gap-4 select-none">
      {/* Settings Gear Button (Image 3 Style) */}
      <button
        onClick={onSettingsOpen}
        className="w-11 h-11 rounded-full flex items-center justify-center text-xl bg-white text-purple-600 shadow-md hover:scale-105 active:scale-95 transition cursor-pointer border border-purple-100"
        title="ตั้งค่า"
      >
        ⚙️
      </button>

      {/* User Profile Pill (Image 3 Style) */}
      {user ? (
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white text-slate-900 shadow-md border border-purple-100">
          <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-black text-xs overflow-hidden shrink-0">
            {photoURL ? (
              <img src={photoURL} alt="" className="w-full h-full object-cover" />
            ) : (
              (displayName || "U")[0].toUpperCase()
            )}
          </div>
          <span className="font-extrabold text-sm tracking-tight text-slate-900">
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
          accentColor="#8B5CF6"
          darkMode={darkMode}
        />
      )}
    </header>
  );
}
