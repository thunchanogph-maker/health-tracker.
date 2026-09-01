"use client";

import AppLogo from "../AppLogo";
import StatCard from "./StatCard";
import OverviewPage from "../views/OverviewPage";
import ProfilePage from "../views/ProfilePage";
import SpecialRecordsSection from "../views/SpecialRecordsSection";
import CatCompanionWidget from "../CatCompanionWidget";
import HealthForm from "../../pages/HealthForm";
import HealthList from "../../pages/HealthList";
import HealthChart from "../../pages/HealthChart";

export default function Dashboard({
  user,
  localUser,
  records,
  periodRecords,
  bmiRecord,
  darkMode,
  theme,
  activeTab,
  setActiveTab,
  onOpenPeriod,
  onOpenBmi,
  onEditProfile,
  showPeriodFeature,
  setShowPeriodFeature,
  showBmiFeature,
  setShowBmiFeature,
}) {
  const n = records.length;
  const avg = (key) => (n ? (records.reduce((s, r) => s + (Number(r[key]) || 0), 0) / n).toFixed(1) : "—");

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  const todayStr = new Date().toISOString().split("T")[0];
  const todayRec = records.find((r) => r.date === todayStr);

  const tabContent = {
    overview: (
      <OverviewPage
        user={user}
        records={records}
        periodRecords={periodRecords}
        bmiRecord={bmiRecord}
        darkMode={darkMode}
        theme={theme}
        setActiveTab={setActiveTab}
        showPeriodFeature={showPeriodFeature}
        showBmiFeature={showBmiFeature}
      />
    ),
    form: (
      <div className="space-y-4">
        <div
          className="rounded-[28px] p-6 shadow-xl border"
          style={{ background: cardBg, borderColor: borderCol }}
        >
          <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
            <span className="w-9 h-9 rounded-2xl flex items-center justify-center border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
              ✏️
            </span>
            บันทึกสุขภาพประจำวัน meow~
            {todayRec && (
              <span className="ml-auto text-xs px-3 py-1 rounded-full font-bold border flex items-center gap-1" style={{ background: "rgba(74,222,128,0.15)", color: "#4ADE80", borderColor: "rgba(74,222,128,0.3)" }}>
                ✓ บันทึกแล้ววันนี้ 🐾
              </span>
            )}
          </h3>
          <HealthForm user={user} />
        </div>

        <SpecialRecordsSection
          bmiRecord={bmiRecord}
          showPeriodFeature={showPeriodFeature}
          showBmiFeature={showBmiFeature}
          onOpenPeriod={onOpenPeriod}
          onOpenBmi={onOpenBmi}
          darkMode={darkMode}
          theme={theme}
        />
      </div>
    ),
    list: (
      <div className="rounded-[28px] p-6 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
        <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
          <span className="w-9 h-9 rounded-2xl flex items-center justify-center border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
            📋
          </span>
          ประวัติการบันทึกทั้งหมด 🐾
          <span className="ml-auto text-xs px-3 py-1 rounded-full font-bold border" style={{ background: theme.accent, color: "#191724", borderColor: borderCol }}>
            {n} รายการ
          </span>
        </h3>
        <HealthList user={user} records={records} />
      </div>
    ),
    chart: (
      <div className="rounded-[28px] p-6 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
        <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
          <span className="w-9 h-9 rounded-2xl flex items-center justify-center border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
            📊
          </span>
          วิเคราะห์แนวโน้มสุขภาพ 🐾
          {showBmiFeature && bmiRecord && (
            <span className="ml-auto text-xs px-3 py-1 rounded-full font-bold border" style={{ background: "rgba(56,189,248,0.15)", color: "#38BDF8", borderColor: "rgba(56,189,248,0.3)" }}>
              ⚖️ BMI: {bmiRecord.bmi}
            </span>
          )}
        </h3>
        <HealthChart records={records} bmiRecord={showBmiFeature ? bmiRecord : null} periodRecords={showPeriodFeature ? periodRecords : []} />
      </div>
    ),
    profile: (
      <div className="rounded-[28px] p-6 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
        <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
          <span className="w-9 h-9 rounded-2xl flex items-center justify-center border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
            🐾
          </span>
          โปรไฟล์ & เพื่อนสนิท Kuro-chan 💖
        </h3>
        <ProfilePage
          user={localUser || user}
          records={records}
          bmiRecord={bmiRecord}
          darkMode={darkMode}
          theme={theme}
          onOpenPeriod={onOpenPeriod}
          onOpenBmi={onOpenBmi}
          onEditProfile={onEditProfile}
          showPeriodFeature={showPeriodFeature}
          setShowPeriodFeature={setShowPeriodFeature}
          showBmiFeature={showBmiFeature}
          setShowBmiFeature={setShowBmiFeature}
        />
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      {/* Interactive Mascot Banner */}
      <CatCompanionWidget user={user} theme={theme} darkMode={darkMode} />

      {/* Summary Stats Pill Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="📋" value={n} label="บันทึกสะสม" darkMode={darkMode} theme={theme} iconBg={theme.accent} color="#191724" />
        <StatCard icon="💤" value={n ? `${avg("sleepHours")}h` : "—"} label="นอนเฉลี่ย" darkMode={darkMode} theme={theme} iconBg="#38BDF8" color="#191724" />
        <StatCard icon="💧" value={n ? `${avg("waterIntake")} แก้ว` : "—"} label="น้ำเฉลี่ย" darkMode={darkMode} theme={theme} iconBg="#4ADE80" color="#191724" />
        <StatCard icon="😰" value={n ? `${avg("stressLevel")}/5` : "—"} label="ความเครียด" darkMode={darkMode} theme={theme} iconBg="#F472B6" color="#191724" />
      </div>

      {tabContent[activeTab]}
    </div>
  );
}
