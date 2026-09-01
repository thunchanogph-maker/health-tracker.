"use client";

import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import AuthDialog from "./AuthDialog";

import { THEMES } from "../components/constants";
import SettingsModal from "../components/modals/SettingsModal";
import PeriodTrackerModal from "../components/modals/PeriodTrackerModal";
import BmiModal from "../components/modals/BmiModal";
import EditProfileModal from "../components/modals/EditProfileModal";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import Dashboard from "../components/layout/Dashboard";
import WelcomePage from "../components/views/WelcomePage";
export { default as MoodBadge } from "../components/MoodBadge";

export default function HealthPage() {
  const [user, setUser] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [periodRecords, setPeriodRecords] = useState([]);
  const [bmiRecord, setBmiRecord] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(true);
  const [theme, setTheme] = useState(THEMES[0]);
  const [showSettings, setShowSettings] = useState(false);
  const [showPeriod, setShowPeriod] = useState(false);
  const [showBmi, setShowBmi] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [authView, setAuthView] = useState("login");
  const [authKey, setAuthKey] = useState(0);

  const [showPeriodFeature, setShowPeriodFeature] = useState(false);
  const [showBmiFeature, setShowBmiFeature] = useState(false);

  useEffect(() => {
    if (!user?.uid) {
      setRecords([]);
      setPeriodRecords([]);
      setBmiRecord(null);
      setLocalUser(null);
      return;
    }
    const u1 = onValue(ref(db, `users/${user.uid}/healthRecords`), (snap) => {
      const data = snap.val();
      setRecords(data ? Object.entries(data).map(([id, r]) => ({ id, ...r })) : []);
    });
    const u2 = onValue(ref(db, `users/${user.uid}/periodRecords`), (snap) => {
      const data = snap.val();
      setPeriodRecords(data ? Object.entries(data).map(([id, r]) => ({ id, ...r })) : []);
    });
    const u3 = onValue(ref(db, `users/${user.uid}/bmiRecord`), (snap) => {
      setBmiRecord(snap.exists() ? snap.val() : null);
    });
    const u4 = onValue(ref(db, `users/${user.uid}/profile`), (snap) => {
      setLocalUser(snap.exists() ? snap.val() : null);
    });
    return () => {
      u1();
      u2();
      u3();
      u4();
    };
  }, [user?.uid]);

  useEffect(() => {
    const d = localStorage.getItem("htrack-dark");
    const t = localStorage.getItem("htrack-theme");
    const p = localStorage.getItem("htrack-period");
    const b = localStorage.getItem("htrack-bmi");
    if (d === "0") setDarkMode(false);
    else setDarkMode(true);

    if (t) {
      const found = THEMES.find((x) => x.name === t);
      if (found) setTheme(found);
    }
    if (p === "1") setShowPeriodFeature(true);
    if (b === "1") setShowBmiFeature(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("htrack-dark", darkMode ? "1" : "0");
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem("htrack-theme", theme.name);
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("htrack-period", showPeriodFeature ? "1" : "0");
  }, [showPeriodFeature]);
  useEffect(() => {
    localStorage.setItem("htrack-bmi", showBmiFeature ? "1" : "0");
  }, [showBmiFeature]);

  const canvasBg = darkMode ? "#252238" : "#FFFFFF";
  const appOuterBg = darkMode ? "#191724" : "#F4F0FF";

  const openAuth = (view) => {
    setAuthView(view);
    setAuthKey((k) => k + 1);
  };
  const handleProfileSave = (updated) => {
    setLocalUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="flex min-h-screen transition-all select-none" style={{ background: user ? canvasBg : appOuterBg }}>
      {showSettings && (
        <SettingsModal darkMode={darkMode} setDarkMode={setDarkMode} theme={theme} setTheme={setTheme} onClose={() => setShowSettings(false)} />
      )}
      {showPeriod && (
        <PeriodTrackerModal user={user} darkMode={darkMode} theme={theme} onClose={() => setShowPeriod(false)} />
      )}
      {showBmi && (
        <BmiModal user={user} darkMode={darkMode} theme={theme} existingBmi={bmiRecord} onClose={() => setShowBmi(false)} />
      )}
      {showEditProfile && user && (
        <EditProfileModal user={localUser ? { ...user, ...localUser } : user} onClose={() => setShowEditProfile(false)} onSave={handleProfileSave} darkMode={darkMode} theme={theme} />
      )}

      {/* Auth trigger */}
      <div key={authKey} className={authKey === 0 ? "hidden" : "fixed inset-0 z-50 pointer-events-none"}>
        <AuthDialog
          onLogin={(u) => {
            setUser(u);
            if (!u) setRecords([]);
          }}
          customClass="absolute bottom-0 right-0 pointer-events-auto"
          accentColor={theme.accent}
          darkMode={darkMode}
          defaultView={authView}
          autoOpen={authKey > 0}
          onModalClose={() => setAuthKey(0)}
        />
      </div>

      {user && (
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
          theme={theme}
          user={user}
          localUser={localUser}
          onSettingsOpen={() => setShowSettings(true)}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0" style={{ background: canvasBg }}>
        <Header
          darkMode={darkMode}
          theme={theme}
          user={user}
          setUser={setUser}
          setRecords={setRecords}
          onSettingsOpen={() => setShowSettings(true)}
          localUser={localUser}
        />

        <main className="flex-1 px-4 md:px-6 py-4 pb-24 md:pb-8 max-w-6xl w-full mx-auto">
          {!user ? (
            <WelcomePage darkMode={darkMode} theme={theme} onSignIn={() => openAuth("login")} onRegister={() => openAuth("register")} />
          ) : (
            <Dashboard
              user={user}
              localUser={localUser}
              records={records}
              periodRecords={periodRecords}
              bmiRecord={bmiRecord}
              darkMode={darkMode}
              theme={theme}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenPeriod={() => setShowPeriod(true)}
              onOpenBmi={() => setShowBmi(true)}
              onEditProfile={() => setShowEditProfile(true)}
              showPeriodFeature={showPeriodFeature}
              setShowPeriodFeature={setShowPeriodFeature}
              showBmiFeature={showBmiFeature}
              setShowBmiFeature={setShowBmiFeature}
              setUser={setUser}
              setRecords={setRecords}
            />
          )}
        </main>

        <footer className="hidden md:block text-center py-3 text-xs opacity-30 font-medium" style={{ color: darkMode ? "#F8F6FE" : "#1E293B" }}>
          🌿 HealthTrack — Personal Well-being Tracker
        </footer>
      </div>

      {user && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} darkMode={darkMode} />}
    </div>
  );
}