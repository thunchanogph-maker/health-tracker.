"use client";

export default function SpecialRecordsSection({ bmiRecord, showPeriodFeature, showBmiFeature, onOpenPeriod, onOpenBmi, darkMode, theme }) {
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const border = darkMode ? "#3D3D4F" : "#F1F5F9";
  const textM = darkMode ? "#F1F5F9" : "#1E293B";

  const hasPeriod = showPeriodFeature;
  const hasBmi = showBmiFeature;
  if (!hasPeriod && !hasBmi) return null;

  const getBmiLabel = (b) => {
    if (!b) return null;
    const n = parseFloat(b);
    if (n < 18.5) return { label: "น้ำหนักน้อย", color: "#3B82F6" };
    if (n < 25) return { label: "ปกติ", color: "#10B981" };
    if (n < 30) return { label: "น้ำหนักเกิน", color: "#F59E0B" };
    return { label: "อ้วน", color: "#EF4444" };
  };

  const bmiInfo = bmiRecord ? getBmiLabel(bmiRecord.bmi) : null;

  return (
    <div className="rounded-2xl p-5 mt-5" style={{ background: bg, border: `1px solid ${border}`, boxShadow: "0 4px 24px rgba(0,0,0,0.04)" }}>
      <h4 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color: textM }}>
        <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "#FFF0F3" }}>✨</span>
        บันทึกพิเศษ
      </h4>
      <div className={`grid gap-3 ${hasPeriod && hasBmi ? "grid-cols-2" : "grid-cols-1"}`}>
        {hasPeriod && (
          <button onClick={onOpenPeriod} className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left" style={{ borderColor: "#FECDD3", background: "#FFF0F3" }}>
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-xl shrink-0">🩸</div>
            <div>
              <div className="text-sm font-black" style={{ color: "#F43F5E" }}>ประจำเดือน</div>
              <div className="text-xs" style={{ color: "#FB7185" }}>บันทึกรอบเดือน</div>
            </div>
          </button>
        )}
        {hasBmi && (
          <button onClick={onOpenBmi} className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] text-left" style={{ borderColor: "#DDD6FE", background: "#F5F3FF" }}>
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-xl shrink-0">⚖️</div>
            <div>
              <div className="text-sm font-black" style={{ color: "#7C3AED" }}>น้ำหนัก / BMI</div>
              <div className="text-xs" style={{ color: "#8B5CF6" }}>{bmiRecord ? `BMI: ${bmiRecord.bmi} · ${bmiInfo?.label}` : "กรอกน้ำหนัก-ส่วนสูง"}</div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
