"use client";

import AppLogo from "../AppLogo";
import StatCard from "./StatCard";
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
}) {
  const n = records.length;
  const avg = (key) => (n ? (records.reduce((s, r) => s + (Number(r[key]) || 0), 0) / n).toFixed(1) : "—");
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const border = darkMode ? "1px solid #2D2D3F" : "1px solid #F1F5F9";
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
      <div>
        <div className="rounded-2xl p-6" style={{ background: bg, border, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
          <h3 className="text-base font-black mb-5 flex items-center gap-2" style={{ color: darkMode ? "#F1F5F9" : "#1E293B" }}>
            <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: theme.light }}>✏️</span>
            บันทึกสุขภาพวันนี้
            {todayRec && <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "#DCFCE7", color: "#16A34A" }}>✓ บันทึกแล้ววันนี้</span>}
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
      <div className="rounded-2xl p-6" style={{ background: bg, border, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
        <h3 className="text-base font-black mb-5 flex items-center gap-2" style={{ color: darkMode ? "#F1F5F9" : "#1E293B" }}>
          <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#DBEAFE" }}>📋</span>
          รายการบันทึกทั้งหมด
          <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: theme.light, color: theme.accent }}>{n} รายการ</span>
        </h3>
        <HealthList user={user} records={records} />
      </div>
    ),
    chart: (
      <div className="rounded-2xl p-6" style={{ background: bg, border, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
        <h3 className="text-base font-black mb-5 flex items-center gap-2" style={{ color: darkMode ? "#F1F5F9" : "#1E293B" }}>
          <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#ECFDF5" }}>📊</span>
          วิเคราะห์สุขภาพ
          {showBmiFeature && bmiRecord && <span className="ml-auto text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "#F5F3FF", color: "#7C3AED" }}>⚖️ BMI: {bmiRecord.bmi}</span>}
          {showPeriodFeature && <span className="text-xs px-2.5 py-1 rounded-full font-semibold" style={{ background: "#FFF0F3", color: "#F43F5E" }}>🩸 ประจำเดือน</span>}
        </h3>
        <HealthChart records={records} bmiRecord={showBmiFeature ? bmiRecord : null} periodRecords={showPeriodFeature ? periodRecords : []} />
      </div>
    ),
    profile: (
      <div className="rounded-2xl p-6" style={{ background: bg, border, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
        <h3 className="text-base font-black mb-5 flex items-center gap-2" style={{ color: darkMode ? "#F1F5F9" : "#1E293B" }}>
          <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: theme.light }}>👤</span>
          โปรไฟล์ของฉัน
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
    <div className="space-y-5">
      {/* Welcome banner */}
      <div className="rounded-2xl overflow-hidden relative" style={{ background: `linear-gradient(${theme.gradient})` }}>
        <div className="absolute right-0 top-0 w-40 h-40 rounded-full opacity-10 bg-white" style={{ transform: "translate(25%,-25%)" }} />
        <div className="relative px-6 py-5 flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-0.5">สวัสดีค่ะ 👋</p>
            <h2 className="text-xl font-black text-white">{localUser?.displayName || user?.displayName || "คุณผู้ใช้"}</h2>
            <p className="text-white/70 text-xs mt-1">
              {n > 0 ? `บันทึกแล้ว ${n} วัน · ${todayRec ? "✓ บันทึกวันนี้แล้ว" : "ยังไม่ได้บันทึกวันนี้"}` : "เริ่มบันทึกสุขภาพวันแรกได้เลยค่ะ"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            {!todayRec && (
              <button
                onClick={() => setActiveTab("form")}
                className="px-4 py-2 rounded-xl text-xs font-bold"
                style={{ background: "rgba(255,255,255,0.25)", color: "white", backdropFilter: "blur(8px)" }}
              >
                + บันทึกวันนี้
              </button>
            )}
            <AppLogo size={48} className="opacity-80 drop-shadow-lg" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon="📋" value={n} label="Records" darkMode={darkMode} theme={theme} iconBg={theme.light} />
        <StatCard icon="💤" value={n ? `${avg("sleepHours")}h` : "—"} label="นอนเฉลี่ย" darkMode={darkMode} theme={theme} iconBg="#EFF6FF" color="#2563EB" />
        <StatCard icon="💧" value={n ? `${avg("waterIntake")} แก้ว` : "—"} label="น้ำเฉลี่ย" darkMode={darkMode} theme={theme} iconBg="#ECFEFF" color="#0891B2" />
        <StatCard icon="😰" value={n ? `${avg("stressLevel")}/5` : "—"} label="Stress" darkMode={darkMode} theme={theme} iconBg="#FEF2F2" color="#DC2626" />
      </div>

      {tabContent[activeTab]}
    </div>
  );
}
