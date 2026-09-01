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
  const [darkMode, setDarkMode] = useState(false);
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
    if (d === "1") setDarkMode(true);
    else setDarkMode(false);

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

  const openAuth = (view) => {
    setAuthView(view);
    setAuthKey((k) => k + 1);
  };
  const handleProfileSave = (updated) => {
    setLocalUser((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="min-h-screen bg-[#F8F5FF] text-slate-900 p-2 sm:p-5 flex flex-col justify-between select-none">
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
          accentColor="#8B5CF6"
          darkMode={darkMode}
          defaultView={authView}
          autoOpen={authKey > 0}
          onModalClose={() => setAuthKey(0)}
        />
      </div>

      {!user ? (
        <div className="max-w-5xl mx-auto w-full my-auto">
          <WelcomePage darkMode={darkMode} theme={theme} onSignIn={() => openAuth("login")} onRegister={() => openAuth("register")} />
        </div>
      ) : (
        /* Outer Purple Container Dashboard Frame (Matching Image 3 Mockup) */
        <div className="max-w-[1380px] w-full mx-auto rounded-[36px] bg-[#8B5CF6] p-2 sm:p-4 shadow-2xl flex flex-col md:flex-row border-4 border-purple-300/40 relative overflow-hidden min-h-[850px]">
          {/* Left Sidebar */}
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

          {/* Right Main Column (Header top right + Inner White Canvas) */}
          <div className="flex flex-col flex-1 min-w-0">
            <Header
              darkMode={darkMode}
              theme={theme}
              user={user}
              setUser={setUser}
              setRecords={setRecords}
              onSettingsOpen={() => setShowSettings(true)}
              localUser={localUser}
            />

            <main className="flex-1 pb-20 md:pb-4">
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
              />
            </main>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="hidden md:block text-center py-2 text-xs font-semibold text-purple-700 opacity-60">
        🌿 HealthTrack — Personal Well-being Tracker
      </footer>

      {user && <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} theme={theme} darkMode={darkMode} />}
    </div>
  );
}