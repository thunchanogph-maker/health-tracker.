"use client";

import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

// ---- Helpers ----
const MOOD_ORDER = ["awful", "bad", "okay", "good", "great"];
const MOOD_LABELS = { awful: "😭 Awful", bad: "😢 Bad", okay: "😐 Okay", good: "😊 Good", great: "😄 Great" };
const MOOD_COLORS = {
  awful: "#f87171",
  bad: "#fb923c",
  okay: "#fbbf24",
  good: "#34d399",
  great: "#4ade80",
};

// ---- No Data Placeholder ----
function NoData({ msg = "ยังไม่มีข้อมูลในระบบ" }) {
  return (
    <div className="flex flex-col items-center justify-center h-44 text-slate-400 gap-2">
      <span className="text-3xl">📭</span>
      <p className="text-xs font-semibold">{msg}</p>
    </div>
  );
}

// ---- Chart Card Wrapper ----
function ChartCard({ title, icon = "📊", children, badge, cardBg, themeBorder, textM }) {
  return (
    <div
      className="rounded-3xl border shadow-xl p-5 relative overflow-hidden transition-all"
      style={{ background: cardBg, borderColor: themeBorder + "50" }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b" style={{ borderColor: themeBorder + "30" }}>
        <h4 className="font-black text-sm flex items-center gap-2" style={{ color: textM }}>
          <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs border" style={{ background: themeBorder + "20", borderColor: themeBorder + "40" }}>
            {icon}
          </span>
          {title}
        </h4>
        {badge}
      </div>
      {children}
    </div>
  );
}

// ---- Summary Pill ----
function Pill({ icon, label, value, color, bg, textM, textS }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl p-4 border shadow-sm" style={{ background: bg, borderColor: color + "40" }}>
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: textS }}>{label}</div>
        <div className="font-black text-base mt-0.5" style={{ color: textM }}>{value}</div>
      </div>
    </div>
  );
}

// ---- Main HealthChart Component ----
export default function HealthChart({ records = [], bmiRecord = null, periodRecords = [], darkMode = true, theme }) {
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const subCardBg = darkMode ? "#191724" : "#F8FAFC";
  const themeBorder = theme?.accent || "#8B5CF6";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  const chartBase = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: { font: { size: 11, weight: "bold" }, color: textS, boxWidth: 12 },
      },
    },
    scales: {
      x: { ticks: { color: textS, font: { size: 10 } }, grid: { color: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" } },
      y: { ticks: { color: textS, font: { size: 10 } }, grid: { color: darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)" } },
    },
  };

  if (!records || records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3 text-center">
        <span className="text-5xl">📊</span>
        <p className="text-base font-black" style={{ color: textM }}>ยังไม่มีข้อมูลเพียงพอสำหรับการวิเคราะห์</p>
        <p className="text-xs" style={{ color: textS }}>ไปที่แท็บ ✏️ บันทึก เพื่อเริ่มบันทึกสุขภาพกันก่อนนะคะ meow~</p>
      </div>
    );
  }

  // Sort records chronologically
  const sorted = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));
  const last7 = sorted.slice(-7);
  const trendLabels = last7.map((r) => {
    const d = new Date(r.date);
    return `${d.getDate()}/${d.getMonth() + 1}`;
  });

  // 1. Mood Distribution
  const moodCounts = MOOD_ORDER.reduce((acc, m) => ({ ...acc, [m]: 0 }), {});
  records.forEach((r) => {
    if (moodCounts[r.mood] !== undefined) moodCounts[r.mood]++;
  });
  const activeMoods = MOOD_ORDER.filter((m) => moodCounts[m] > 0);

  const moodPieData = {
    labels: activeMoods.map((m) => MOOD_LABELS[m]),
    datasets: [
      {
        data: activeMoods.map((m) => moodCounts[m]),
        backgroundColor: activeMoods.map((m) => MOOD_COLORS[m]),
        borderWidth: 2,
        borderColor: cardBg,
      },
    ],
  };

  // 2. Sleep Trend
  const sleepLineData = {
    labels: trendLabels,
    datasets: [
      {
        label: "ชั่วโมงนอน",
        data: last7.map((r) => r.sleepHours),
        borderColor: "#38BDF8",
        backgroundColor: "rgba(56,189,248,0.15)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#0284C7",
        pointRadius: 5,
      },
    ],
  };

  // 3. Stress Level Bar
  const stressBarData = {
    labels: trendLabels,
    datasets: [
      {
        label: "ระดับความเครียด (1-5)",
        data: last7.map((r) => r.stressLevel),
        backgroundColor: last7.map((r) => (r.stressLevel <= 2 ? "#4ADE80" : r.stressLevel === 3 ? "#FBBF24" : "#F87171")),
        borderRadius: 8,
      },
    ],
  };

  // 4. Water & Exercise
  const activityBarData = {
    labels: trendLabels,
    datasets: [
      {
        label: "💧 น้ำ (แก้ว)",
        data: last7.map((r) => r.waterIntake),
        backgroundColor: "rgba(56,189,248,0.8)",
        borderRadius: 6,
      },
      {
        label: "🏃 ออกกำลังกาย (x10 นาที)",
        data: last7.map((r) => (r.exerciseMinutes / 10).toFixed(1)),
        backgroundColor: "rgba(74,222,128,0.8)",
        borderRadius: 6,
      },
    ],
  };

  // 5. Special Record: Period Cycle Analytics
  const sortedPeriod = [...periodRecords].sort((a, b) => new Date(a.date) - new Date(b.date));
  const periodCount = sortedPeriod.length;
  let nextPeriodEst = "—";
  if (periodCount > 0) {
    const lastPeriodDate = new Date(sortedPeriod[periodCount - 1].date);
    lastPeriodDate.setDate(lastPeriodDate.getDate() + 28);
    nextPeriodEst = lastPeriodDate.toLocaleDateString("th-TH", { day: "numeric", month: "short" });
  }

  // Symptoms Breakdown Count
  const symptomsMap = {};
  periodRecords.forEach((pr) => {
    if (pr.symptoms && Array.isArray(pr.symptoms)) {
      pr.symptoms.forEach((sym) => {
        symptomsMap[sym] = (symptomsMap[sym] || 0) + 1;
      });
    }
  });

  // 6. Special Record: BMI & Weight Trend
  const bmiVal = bmiRecord ? parseFloat(bmiRecord.bmi) : null;
  const getBmiStatus = (b) => {
    if (!b) return { label: "ไม่มีข้อมูล", color: textS };
    if (b < 18.5) return { label: "น้ำหนักน้อย / ผอม", color: "#38BDF8" };
    if (b < 25) return { label: "น้ำหนักปกติ / สุขภาพดี", color: "#4ADE80" };
    if (b < 30) return { label: "น้ำหนักเกิน", color: "#F59E0B" };
    return { label: "ภาวะอ้วน", color: "#F43F5E" };
  };
  const bmiStatus = getBmiStatus(bmiVal);

  const n = records.length;
  const avg = (key) => (records.reduce((s, r) => s + (Number(r[key]) || 0), 0) / n).toFixed(1);

  return (
    <div className="space-y-6 select-none">
      {/* Summary Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Pill icon="📋" label="บันทึกทั้งหมด" value={`${n} วัน`} color={themeBorder} bg={cardBg} textM={textM} textS={textS} />
        <Pill icon="💤" label="นอนเฉลี่ย" value={`${avg("sleepHours")} ชม.`} color="#38BDF8" bg={cardBg} textM={textM} textS={textS} />
        <Pill icon="💧" label="น้ำเฉลี่ย" value={`${avg("waterIntake")} แก้ว`} color="#4ADE80" bg={cardBg} textM={textM} textS={textS} />
        <Pill icon="😰" label="Stress เฉลี่ย" value={`${avg("stressLevel")} / 5`} color="#F43F5E" bg={cardBg} textM={textM} textS={textS} />
      </div>

      {/* ── SPECIAL RECORDS ANALYTICS SECTION ── */}
      <div
        className="p-6 rounded-3xl border space-y-5 shadow-xl transition-all"
        style={{ background: cardBg, borderColor: themeBorder }}
      >
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: themeBorder + "40" }}>
          <h3 className="text-base font-black flex items-center gap-2" style={{ color: themeBorder }}>
            <span>✨</span> วิเคราะห์บันทึกพิเศษ (Special Records Analytics)
          </h3>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full border"
            style={{ background: themeBorder + "15", color: themeBorder, borderColor: themeBorder + "40" }}
          >
            ฟีเจอร์เจาะลึก 🐾
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Period Tracker Analytics Card */}
          <div className="p-5 rounded-2xl border space-y-4 shadow-sm" style={{ background: subCardBg, borderColor: "rgba(244,63,94,0.4)" }}>
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-rose-500 flex items-center gap-2">
                <span>🩸</span> การวิเคราะห์รอบประจำเดือน
              </h4>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-500 text-white">
                {periodCount} บันทึก
              </span>
            </div>

            {periodCount === 0 ? (
              <NoData msg="ยังไม่มีบันทึกประจำเดือน สามารถกดเพิ่มได้ในแท็บโปรไฟล์" />
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border" style={{ background: cardBg, borderColor: themeBorder + "30" }}>
                    <div className="text-[11px] font-medium" style={{ color: textS }}>คาดการณ์รอบถัดไป</div>
                    <div className="text-base font-black text-rose-500 mt-0.5">{nextPeriodEst}</div>
                  </div>
                  <div className="p-3 rounded-xl border" style={{ background: cardBg, borderColor: themeBorder + "30" }}>
                    <div className="text-[11px] font-medium" style={{ color: textS }}>รอบเดือนเฉลี่ย</div>
                    <div className="text-base font-black mt-0.5" style={{ color: textM }}>28 วัน</div>
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold mb-2" style={{ color: textM }}>อาการที่พบบ่อย (Symptoms):</div>
                  {Object.keys(symptomsMap).length === 0 ? (
                    <span className="text-xs" style={{ color: textS }}>ไม่มีการระบุอาการ</span>
                  ) : (
                    <div className="flex flex-wrap gap-1.5">
                      {Object.entries(symptomsMap).map(([sym, count]) => (
                        <span key={sym} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30">
                          {sym} ({count} ครั้ง)
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* BMI & Weight Analytics Card */}
          <div className="p-5 rounded-2xl border space-y-4 shadow-sm" style={{ background: subCardBg, borderColor: "rgba(56,189,248,0.4)" }}>
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm text-sky-500 flex items-center gap-2">
                <span>⚖️</span> การวิเคราะห์น้ำหนัก & BMI
              </h4>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-400 text-slate-900">
                {bmiRecord ? `BMI ${bmiRecord.bmi}` : "ยังไม่กรอก"}
              </span>
            </div>

            {!bmiRecord ? (
              <NoData msg="ยังไม่ได้บันทึกน้ำหนัก-ส่วนสูง สามารถกรอกได้ในแท็บโปรไฟล์" />
            ) : (
              <div className="space-y-3">
                <div className="p-4 rounded-xl border space-y-2" style={{ background: cardBg, borderColor: themeBorder + "30" }}>
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span style={{ color: textS }}>สถานะดัชนีมวลกาย:</span>
                    <span style={{ color: bmiStatus.color }}>{bmiStatus.label}</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        width: `${Math.min((bmiVal / 40) * 100, 100)}%`,
                        background: bmiStatus.color,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] pt-1 font-bold" style={{ color: textS }}>
                    <span>ผอม (&lt;18.5)</span>
                    <span>ปกติ (18.5-24.9)</span>
                    <span>อ้วน (&gt;30)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border" style={{ background: cardBg, borderColor: themeBorder + "30" }}>
                    <div className="text-[11px] font-medium" style={{ color: textS }}>น้ำหนักปัจจุบัน</div>
                    <div className="text-base font-black text-sky-500 mt-0.5">{bmiRecord.weight} กก.</div>
                  </div>
                  <div className="p-3 rounded-xl border" style={{ background: cardBg, borderColor: themeBorder + "30" }}>
                    <div className="text-[11px] font-medium" style={{ color: textS }}>ส่วนสูง</div>
                    <div className="text-base font-black mt-0.5" style={{ color: textM }}>{bmiRecord.height} ซม.</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Row 1: Mood Pie + Sleep Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ChartCard title="🎭 สัดส่วน Mood ทั้งหมด" icon="🎭" cardBg={cardBg} themeBorder={themeBorder} textM={textM}>
          {activeMoods.length === 0 ? (
            <NoData />
          ) : (
            <div style={{ height: 220 }}>
              <Pie data={moodPieData} options={chartBase} />
            </div>
          )}
        </ChartCard>

        <ChartCard title="💤 แนวโน้มการนอน (7 วันล่าสุด)" icon="💤" cardBg={cardBg} themeBorder={themeBorder} textM={textM}>
          {last7.length === 0 ? (
            <NoData />
          ) : (
            <div style={{ height: 220 }}>
              <Line data={sleepLineData} options={chartBase} />
            </div>
          )}
        </ChartCard>
      </div>

      {/* Row 2: Stress Bar + Activity Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ChartCard title="😰 ระดับ Stress รายวัน (7 วันล่าสุด)" icon="😰" cardBg={cardBg} themeBorder={themeBorder} textM={textM}>
          {last7.length === 0 ? (
            <NoData />
          ) : (
            <div style={{ height: 220 }}>
              <Bar data={stressBarData} options={chartBase} />
            </div>
          )}
        </ChartCard>

        <ChartCard title="💧🏃 น้ำ & ออกกำลังกาย (7 วันล่าสุด)" icon="🏃" cardBg={cardBg} themeBorder={themeBorder} textM={textM}>
          {last7.length === 0 ? (
            <NoData />
          ) : (
            <div style={{ height: 220 }}>
              <Bar data={activityBarData} options={chartBase} />
            </div>
          )}
        </ChartCard>
      </div>
    </div>
  );
}