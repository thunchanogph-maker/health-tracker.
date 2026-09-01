"use client";

import { useState } from "react";
import MoodBadge from "../MoodBadge";
import CatMascot from "../CatMascot";
import CatCompanionWidget from "../CatCompanionWidget";

const moodEmojiMap = {
  great: "😸",
  good: "😺",
  okay: "😐",
  bad: "😿",
  awful: "😾",
};

export default function OverviewPage({
  user,
  records = [],
  periodRecords = [],
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
  const [selected, setSelected] = useState(today.getDate());

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const subCardBg = darkMode ? "#191724" : "#FFF8ED";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const borderCol = theme?.accent || "#8B5CF6";

  const MN = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
  const DN = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"];

  const dim = new Date(year, month + 1, 0).getDate();
  const fw = new Date(year, month, 1).getDay();

  const dateMood = {};
  records.forEach((r) => {
    dateMood[r.date] = r.mood;
  });

  const periodDates = new Set(periodRecords.map((r) => r.date));

  const prev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
    setSelected(null);
  };
  const next = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
    setSelected(null);
  };

  const cells = [];
  for (let i = 0; i < fw; i++) cells.push(null);
  for (let d = 1; d <= dim; d++) cells.push(d);

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
    <div className="space-y-5 select-none">
      {/* Cat Companion Welcome Mascot Banner */}
      <CatCompanionWidget user={user} theme={theme} darkMode={darkMode} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ── Big Cat Calendar ── */}
        <div className="lg:col-span-2 rounded-[32px] overflow-hidden shadow-xl border relative" style={{ background: cardBg, borderColor: borderCol }}>
          {/* Header Banner */}
          <div className="px-6 py-5 flex items-center justify-between border-b" style={{ background: subCardBg, borderColor: borderCol }}>
            <button
              onClick={prev}
              className="w-10 h-10 rounded-2xl border flex items-center justify-center transition hover:scale-105 font-bold text-lg cursor-pointer"
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
              className="w-10 h-10 rounded-2xl border flex items-center justify-center transition hover:scale-105 font-bold text-lg cursor-pointer"
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
                    type="button"
                    onClick={() => setSelected(d)}
                    className="relative aspect-square rounded-2xl flex flex-col items-center justify-between p-1.5 transition-all hover:scale-105 border cursor-pointer overflow-hidden"
                    style={{
                      background: isSel ? theme.accent : mood ? subCardBg : cardBg,
                      borderColor: isToday ? theme.accent : isSel ? theme.accent : borderCol + "60",
                      color: isSel ? "#191724" : textM,
                      boxShadow: isSel ? `0 6px 16px ${theme.accent}50` : "none",
                    }}
                  >
                    <span className={`text-xs font-black ${isToday ? "text-amber-500 font-extrabold" : ""}`}>{d}</span>
                    <div className="flex items-center justify-center gap-1 my-auto">
                      {mood && <span className="text-xl leading-none">{moodEmojiMap[mood] || "😐"}</span>}
                      {isPeriod && <span className="text-base leading-none">🩸</span>}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend Footer (No colored dots, enlarged emojis) */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mt-5 pt-4 border-t" style={{ borderColor: borderCol + "40" }}>
              <span className="text-xs font-black mr-1" style={{ color: textS }}>
                อารมณ์:
              </span>
              {[
                ["great", "😸", "สดใสมาก"],
                ["good", "😺", "อารมณ์ดี"],
                ["okay", "😐", "เฉยๆ"],
                ["bad", "😿", "ไม่ค่อยดี"],
                ["awful", "😾", "แย่จัง"],
              ].map(([m, e, label]) => (
                <span
                  key={m}
                  className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border"
                  style={{
                    background: subCardBg,
                    borderColor: borderCol + "60",
                    color: textM,
                  }}
                >
                  <span className="text-base">{e}</span>
                  <span className="text-[11px]" style={{ color: textS }}>{label}</span>
                </span>
              ))}
              {showPeriodFeature && (
                <span
                  className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border"
                  style={{
                    background: "rgba(244,63,94,0.1)",
                    borderColor: "rgba(244,63,94,0.3)",
                    color: "#F43F5E",
                  }}
                >
                  <span className="text-base">🩸</span>
                  <span className="text-[11px]">ประจำเดือน</span>
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
              <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs border" style={{ background: subCardBg, borderColor: borderCol }}>
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
                  <p className="text-xs font-medium rounded-xl p-3 border" style={{ background: subCardBg, color: textS, borderColor: borderCol }}>
                    📝 {selectedRecord.note}
                  </p>
                )}
                {selectedRecord.photo && (
                  <div className="mt-2 rounded-xl overflow-hidden border" style={{ borderColor: borderCol }}>
                    <img src={selectedRecord.photo} alt="Diary photo" className="w-full h-36 object-cover" />
                  </div>
                )}
              </div>
            ) : selected ? (
              <div className="flex flex-col items-center py-6 text-center gap-2">
                <CatMascot size={80} pose="peeking" interactive={true} />
                <p className="text-xs font-bold mt-2" style={{ color: textS }}>ยังไม่มีบันทึกในวันนี้ meow~</p>
                <button
                  type="button"
                  onClick={() => setActiveTab("form")}
                  className="mt-2 px-5 py-2 rounded-xl text-xs font-black text-slate-900 transition hover:scale-105 border cursor-pointer shadow"
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

          {/* Month Summary Card (Matches Screenshot 3 and Screenshot 4) */}
          <div className="rounded-[28px] p-5 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
            <h4 className="font-black text-xs mb-3 uppercase tracking-wider flex items-center gap-1.5" style={{ color: textS }}>
              <span>สรุปสุขภาพเดือนนี้</span> 🐾
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: "📋", label: "บันทึก", val: `${n} วัน` },
                { icon: "💤", label: "นอนเฉลี่ย", val: n ? `${avg("sleepHours")}h` : "—" },
                { icon: "💧", label: "น้ำเฉลี่ย", val: n ? `${avg("waterIntake")} แก้ว` : "—" },
                { icon: "😰", label: "Stress", val: n ? `${avg("stressLevel")}/5` : "—" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-3 text-center border shadow-sm transition-all"
                  style={{
                    background: subCardBg,
                    borderColor: borderCol,
                  }}
                >
                  <div className="text-base">{s.icon}</div>
                  <div className="text-sm font-black mt-0.5" style={{ color: textM }}>
                    {s.val}
                  </div>
                  <div className="text-[11px] font-bold mt-0.5" style={{ color: textS }}>
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
              <p className="text-xs font-bold py-2 text-center" style={{ color: textS }}>ยังไม่มีประวัติการบันทึก</p>
            ) : (
              <div className="space-y-2">
                {recent.map((r) => (
                  <div key={r.id} className="flex items-center justify-between p-2.5 rounded-xl border" style={{ background: subCardBg, borderColor: borderCol + "40" }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold" style={{ color: textM }}>{r.date}</span>
                      <MoodBadge mood={r.mood} />
                    </div>
                    <span className="text-xs font-bold" style={{ color: textS }}>
                      💤 {r.sleepHours}h | 💧 {r.waterIntake}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
