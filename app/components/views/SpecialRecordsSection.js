"use client";

export default function SpecialRecordsSection({
  bmiRecord,
  showPeriodFeature,
  showBmiFeature,
  onOpenPeriod,
  onOpenBmi,
  darkMode,
  theme,
}) {
  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  const getBmiLabel = (b) => {
    if (!b) return null;
    const n = parseFloat(b);
    if (n < 18.5) return { label: "น้ำหนักน้อย", color: "#38BDF8" };
    if (n < 25) return { label: "ปกติ", color: "#4ADE80" };
    if (n < 30) return { label: "น้ำหนักเกิน", color: "#F59E0B" };
    return { label: "อ้วน", color: "#F43F5E" };
  };

  const bmiInfo = bmiRecord ? getBmiLabel(bmiRecord.bmi) : null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      {/* 1. Direct Period Tracker Card */}
      <button
        type="button"
        onClick={onOpenPeriod}
        className="rounded-[24px] p-5 text-left transition-all duration-300 border hover:scale-102 cursor-pointer flex flex-col justify-between relative overflow-hidden group shadow-lg"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, rgba(244,63,94,0.15) 0%, rgba(37,34,56,0.9) 100%)"
            : "linear-gradient(135deg, #FFF0F3 0%, #FFFFFF 100%)",
          borderColor: "rgba(244,63,94,0.4)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-sm" style={{ background: "rgba(244,63,94,0.2)", borderColor: "#F43F5E" }}>
            🩸
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black text-white bg-rose-500 shadow">
            + บันทึกประจำเดือน 🐾
          </span>
        </div>
        <div>
          <h4 className="font-black text-base text-rose-500 dark:text-rose-400 mb-0.5">
            บันทึกประจำเดือน & รอบเดือน
          </h4>
          <p className="text-xs font-medium" style={{ color: textS }}>
            ติดตามรอบเดือน บันทึกอาการ และแสดงสัญลักษณ์ 🩸 ในปฏิทินแมว
          </p>
        </div>
      </button>

      {/* 2. Direct BMI & Body Weight Tracker Card */}
      <button
        type="button"
        onClick={onOpenBmi}
        className="rounded-[24px] p-5 text-left transition-all duration-300 border hover:scale-102 cursor-pointer flex flex-col justify-between relative overflow-hidden group shadow-lg"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, rgba(56,189,248,0.15) 0%, rgba(37,34,56,0.9) 100%)"
            : "linear-gradient(135deg, #F0F9FF 0%, #FFFFFF 100%)",
          borderColor: "rgba(56,189,248,0.4)",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border shadow-sm" style={{ background: "rgba(56,189,248,0.2)", borderColor: "#38BDF8" }}>
            ⚖️
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-black text-slate-900 bg-sky-400 shadow">
            {bmiRecord ? `BMI: ${bmiRecord.bmi}` : "คำนวณ BMI 🐾"}
          </span>
        </div>
        <div>
          <h4 className="font-black text-base text-sky-400 mb-0.5">
            น้ำหนัก & ส่วนสูง / คำนวณ BMI
          </h4>
          <p className="text-xs font-medium" style={{ color: textS }}>
            {bmiRecord ? `ปัจจุบัน: ${bmiRecord.weight} กก. / ${bmiRecord.height} ซม. (${bmiInfo?.label})` : "บันทึกน้ำหนัก-ส่วนสูง คำนวณดัชนีมวลกายอัตโนมัติ"}
          </p>
        </div>
      </button>
    </div>
  );
}
