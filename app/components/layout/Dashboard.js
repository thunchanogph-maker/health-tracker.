"use client";

import OverviewPage from "../views/OverviewPage";
import ProfilePage from "../views/ProfilePage";
import SpecialRecordsSection from "../views/SpecialRecordsSection";
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
  setUser,
  setRecords,
}) {
  const n = records.length;
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const themeBorder = theme?.accent || "#8B5CF6";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";

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
      <div className="space-y-5">
        <div
          className="rounded-[28px] p-6 shadow-xl border"
          style={{ background: cardBg, borderColor: themeBorder }}
        >
          <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
            <span
              className="w-9 h-9 rounded-2xl flex items-center justify-center border"
              style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: themeBorder + "60" }}
            >
              ✏️
            </span>
            บันทึกสุขภาพประจำวัน meow~
          </h3>
          <HealthForm
            user={user}
            records={records}
            setActiveTab={setActiveTab}
            darkMode={darkMode}
            theme={theme}
          />
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
      <div
        className="rounded-[28px] p-6 shadow-xl border"
        style={{ background: cardBg, borderColor: themeBorder }}
      >
        <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
          <span
            className="w-9 h-9 rounded-2xl flex items-center justify-center border"
            style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: themeBorder + "60" }}
          >
            📋
          </span>
          รายงานและประวัติการบันทึกทั้งหมด 🐾
          <span
            className="ml-auto text-xs px-3 py-1 rounded-full font-bold border"
            style={{ background: theme.accent, color: "#191724", borderColor: themeBorder }}
          >
            {n} รายการ
          </span>
        </h3>
        <HealthList user={user} records={records} />
      </div>
    ),
    chart: (
      <div
        className="rounded-[28px] p-6 shadow-xl border"
        style={{ background: cardBg, borderColor: themeBorder }}
      >
        <h3 className="text-lg font-black mb-5 flex items-center gap-2 tracking-tight" style={{ color: textM }}>
          <span
            className="w-9 h-9 rounded-2xl flex items-center justify-center border"
            style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: themeBorder + "60" }}
          >
            📊
          </span>
          วิเคราะห์แนวโน้มสุขภาพ 🐾
          {showBmiFeature && bmiRecord && (
            <span
              className="ml-auto text-xs px-3 py-1 rounded-full font-bold border"
              style={{ background: "rgba(56,189,248,0.15)", color: "#38BDF8", borderColor: "rgba(56,189,248,0.3)" }}
            >
              ⚖️ BMI: {bmiRecord.bmi}
            </span>
          )}
        </h3>
        <HealthChart records={records} bmiRecord={showBmiFeature ? bmiRecord : null} periodRecords={showPeriodFeature ? periodRecords : []} />
      </div>
    ),
    profile: (
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
        setUser={setUser}
        setRecords={setRecords}
      />
    ),
  };

  return (
    <div className="space-y-6">
      {/* Render Active View Content */}
      {tabContent[activeTab]}
    </div>
  );
}
