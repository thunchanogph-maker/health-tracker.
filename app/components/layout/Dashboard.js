"use client";

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
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>✏️</span> บันทึกสุขภาพประจำวัน meow~
          </h2>
          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-purple-50 text-purple-600 border border-purple-200">
            {new Date().toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" })}
          </span>
        </div>

        <HealthForm user={user} />

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
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📋</span> รายงานและประวัติทั้งหมด 🐾
          </h2>
          <span className="text-xs font-black px-3.5 py-1 rounded-full bg-purple-600 text-white shadow-sm">
            {n} รายการ
          </span>
        </div>
        <HealthList user={user} records={records} />
      </div>
    ),
    chart: (
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>📊</span> วิเคราะห์แนวโน้มสุขภาพ 🐾
          </h2>
          {showBmiFeature && bmiRecord && (
            <span className="text-xs font-black px-3 py-1 rounded-full bg-sky-100 text-sky-700 border border-sky-300">
              ⚖️ BMI: {bmiRecord.bmi}
            </span>
          )}
        </div>
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
      />
    ),
  };

  return (
    <div className="space-y-6">
      {/* Top Interactive Cat Mascot Companion Banner */}
      <CatCompanionWidget user={user} theme={theme} darkMode={darkMode} />

      {/* Main Inner White Canvas hosting current Active Tab Content */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 min-h-[700px] shadow-xl text-slate-900 border border-purple-100/50">
        {tabContent[activeTab]}
      </div>
    </div>
  );
}
