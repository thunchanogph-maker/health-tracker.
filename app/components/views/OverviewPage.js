"use client";

import { useState } from "react";
import AppLogo from "../AppLogo";
import MoodBadge from "../MoodBadge";
import CatMascot from "../CatMascot";

export default function OverviewPage({
  user,
  records,
  periodRecords,
  bmiRecord,
  darkMode,
  theme,
  setActiveTab,
  showPeriodFeature,
  showBmiFeature,
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null);

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";

  const MN = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const DN = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  const dim = new Date(year, month + 1, 0).getDate();
  const fw = new Date(year, month, 1).getDay();
  const moodColor = { great: "#4ade80", good: "#60a5fa", okay: "#fbbf24", bad: "#fb923c", awful: "#f87171" };

  const dateMood = {};
  records.forEach((r) => {
    dateMood[r.date] = r.mood;
  });

  const periodDates = new Set();
  if (showPeriodFeature) {
    (periodRecords || []).forEach((p) => {
      if (!p.startDate) return;
      const start = new Date(p.startDate);
      const end = p.endDate ? new Date(p.endDate) : new Date(p.startDate);
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        periodDates.add(d.toISOString().split("T")[0]);
      }
    });
  }

  const cells = [];
  for (let i = 0; i < fw; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const selectedDateStr = selected ? `${year}-${String(month + 1).padStart(2, "0")}-${String(selected).padStart(2, "0")}` : null;
  const selectedRecord = selectedDateStr ? records.find((r) => r.date === selectedDateStr) : null;
  const monthRecords = records.filter((r) => {
    const [y, m] = r.date.split("-").map(Number);
    return y === year && m === month + 1;
  });
  const n = monthRecords.length;
  const avg = (key) => (n ? (monthRecords.reduce((s, r) => s + (Number(r[key]) || 0), 0) / n).toFixed(1) : "—");
  const recent = [...records].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* ── Big Cat Calendar ── */}
      <div className="lg:col-span-2 rounded-[32px] overflow-hidden shadow-xl border relative" style={{ background: cardBg, borderColor: borderCol }}>
        {/* Header Banner */}
        <div className="px-6 py-5 flex items-center justify-between border-b" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
          <button
            onClick={prev}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center transition hover:scale-105 font-bold text-lg"
            style={{ background: cardBg, borderColor: borderCol, color: textM }}
          >
            ‹
          </button>
          <div className="text-center flex items-center gap-3">
            <CatMascot size={46} pose="sitting" interactive={true} />
            <div>
              <div className="font-black text-lg tracking-tight" style={{ color: textM }}>
                {MN[month]} {year + 543} 🐾
              </div>
              <div className="text-xs font-bold" style={{ color: theme.accent }}>
                {n} วันที่บันทึกในเดือนนี้ meow~
              </div>
            </div>
          </div>
          <button
            onClick={next}
            className="w-10 h-10 rounded-2xl border flex items-center justify-center transition hover:scale-105 font-bold text-lg"
            style={{ background: cardBg, borderColor: borderCol, color: textM }}
          >
            ›
          </button>
        </div>

        <div className="p-5">
          {/* Days Header */}
          <div className="grid grid-cols-7 mb-2">
            {DN.map((d) => (
              <div key={d} className="text-center text-xs font-black py-2" style={{ color: textS }}>
                {d}
              </div>
            ))}
          </div>

          {/* Grid Cells */}
          <div className="grid grid-cols-7 gap-2">
            {cells.map((d, i) => {
              if (!d) return <div key={`e-${i}`} />;
              const ds = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
              const mood = dateMood[ds];
              const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isPeriod = periodDates.has(ds);
              const isSel = selected === d;

              return (
                <button
                  key={ds}
                  onClick={() => setSelected(isSel ? null : d)}
                  className="relative aspect-square rounded-2xl flex flex-col items-center justify-center text-sm font-black transition-all hover:scale-105 border"
                  style={{
                    background: isSel ? theme.accent : mood ? moodColor[mood] + "25" : darkMode ? "#191724" : "#FFF8ED",
                    borderColor: isToday ? theme.accent : isSel ? theme.accent : borderCol + "60",
                    color: isSel ? "#191724" : mood ? textM : textS,
                    boxShadow: isSel ? `0 6px 16px ${theme.accent}50` : "none",
                  }}
                >
                  <span>{d}</span>
                  <div className="flex gap-1 mt-0.5 items-center">
                    {mood && <span className="w-2 h-2 rounded-full" style={{ background: moodColor[mood] }} />}
                    {isPeriod && <span style={{ fontSize: "10px", lineHeight: 1 }}>🩸</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend Footer */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-5 pt-4 border-t" style={{ borderColor: borderCol + "40" }}>
            <span className="text-xs font-black" style={{ color: textS }}>
              อารมณ์:
            </span>
            {[["great", "😄"], ["good", "😊"], ["okay", "😐"], ["bad", "😢"], ["awful", "😭"]].map(([m, e]) => (
              <span key={m} className="flex items-center gap-1 text-xs font-bold" style={{ color: textS }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: moodColor[m] }} />
                {e}
              </span>
            ))}
            {showPeriodFeature && periodDates.size > 0 && (
              <span className="flex items-center gap-1 text-xs font-bold" style={{ color: textS }}>
                🩸 ประจำเดือน
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── Right Detail Panel ── */}
      <div className="flex flex-col gap-4">
        {/* Selected Date Card */}
        <div className="rounded-[28px] p-5 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
          <h4 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color: textM }}>
            <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
              📋
            </span>
            {selected ? `วันที่ ${selected} ${MN[month]}` : "เลือกวันในปฏิทิน"}
          </h4>

          {selectedRecord ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b" style={{ borderColor: borderCol + "40" }}>
                <span className="text-xs font-bold" style={{ color: textS }}>อารมณ์วันนี้</span>
                <MoodBadge mood={selectedRecord.mood} />
              </div>
              {[
                { icon: "💤", label: "การนอนหลับ", val: `${selectedRecord.sleepHours} ชม.` },
                { icon: "💧", label: "ดื่มน้ำ", val: `${selectedRecord.waterIntake} แก้ว` },
                { icon: "🏃", label: "ออกกำลังกาย", val: `${selectedRecord.exerciseMinutes} นาที` },
                { icon: "😰", label: "ความเครียด", val: `${selectedRecord.stressLevel}/5` },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-1 border-b last:border-0" style={{ borderColor: borderCol + "20" }}>
                  <span className="text-xs font-medium" style={{ color: textS }}>
                    {r.icon} {r.label}
                  </span>
                  <span className="text-xs font-black" style={{ color: textM }}>
                    {r.val}
                  </span>
                </div>
              ))}
              {showPeriodFeature && periodDates.has(selectedDateStr) && (
                <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-xl border" style={{ background: "rgba(244,63,94,0.1)", color: "#F43F5E", borderColor: "rgba(244,63,94,0.3)" }}>
                  🩸 มีประจำเดือนวันนี้
                </div>
              )}
              {selectedRecord.note && (
                <p className="text-xs font-medium rounded-xl p-3 border" style={{ background: darkMode ? "#191724" : "#FFF8ED", color: textS, borderColor: borderCol }}>
                  📝 {selectedRecord.note}
                </p>
              )}
            </div>
          ) : selected ? (
            <div className="flex flex-col items-center py-6 text-center gap-2">
              <CatMascot size={80} pose="peeking" interactive={true} />
              <p className="text-xs font-bold mt-2" style={{ color: textS }}>ยังไม่มีบันทึกในวันนี้ meow~</p>
              <button
                onClick={() => setActiveTab("form")}
                className="mt-2 px-5 py-2 rounded-xl text-xs font-black text-slate-900 transition hover:scale-105 border"
                style={{ background: theme.accent, borderColor: borderCol }}
              >
                + บันทึกเลยวันนี้ 🐾
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center gap-2">
              <CatMascot size={80} pose="stretching" interactive={true} />
              <p className="text-xs font-bold mt-2" style={{ color: textS }}>
                แตะเลือกวันในปฏิทินได้เลยครับ meow! 🐾
              </p>
            </div>
          )}
        </div>

        {/* Month Summary Card */}
        <div className="rounded-[28px] p-5 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
          <h4 className="font-black text-xs mb-3 uppercase tracking-wider" style={{ color: textS }}>
            สรุปสุขภาพเดือนนี้ 🐾
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: "📋", label: "บันทึก", val: `${n} วัน` },
              { icon: "💤", label: "นอนเฉลี่ย", val: n ? `${avg("sleepHours")}h` : "—" },
              { icon: "💧", label: "น้ำเฉลี่ย", val: n ? `${avg("waterIntake")} แก้ว` : "—" },
              { icon: "😰", label: "Stress", val: n ? `${avg("stressLevel")}/5` : "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl p-3 text-center border" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
                <div className="text-base">{s.icon}</div>
                <div className="text-sm font-black mt-0.5" style={{ color: textM }}>
                  {s.val}
                </div>
                <div className="text-[11px] font-bold" style={{ color: textS }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Records List */}
        <div className="rounded-[28px] p-5 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
          <h4 className="font-black text-xs mb-3 uppercase tracking-wider" style={{ color: textS }}>
            บันทึกล่าสุด 🐾
          </h4>
          {recent.length === 0 ? (
            <p className="text-xs text-center py-4 font-bold" style={{ color: textS }}>
              ยังไม่มีข้อมูลบันทึก meow~
            </p>
          ) : (
            <div className="space-y-2">
              {recent.map((r) => (
                <div key={r.id} className="flex items-center gap-2.5 py-2 border-b last:border-0" style={{ borderColor: borderCol + "30" }}>
                  <span className="text-base">{({ great: "😄", good: "😊", okay: "😐", bad: "😢", awful: "😭" })[r.mood]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-black truncate" style={{ color: textM }}>
                      {new Date(r.date).toLocaleDateString("th-TH", { month: "short", day: "numeric" })}
                    </div>
                    <div className="text-[11px] font-medium" style={{ color: textS }}>
                      💤{r.sleepHours}h · 💧{r.waterIntake}แก้ว
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
