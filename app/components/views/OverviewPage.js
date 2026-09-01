"use client";

import { useState } from "react";
import AppLogo from "../AppLogo";
import MoodBadge from "../MoodBadge";

export default function OverviewPage({ user, records, periodRecords, bmiRecord, darkMode, theme, setActiveTab, showPeriodFeature, showBmiFeature }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selected, setSelected] = useState(null);
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const cardBg = darkMode ? "#2D2D3F" : "#F8FAFC";
  const textM = darkMode ? "#F1F5F9" : "#1E293B";
  const textS = darkMode ? "#64748B" : "#94A3B8";
  const border = darkMode ? "#3D3D4F" : "#F1F5F9";
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
      {/* ── Big Calendar ── */}
      <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-sm" style={{ background: bg, border: `1px solid ${border}` }}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ background: `linear-gradient(${theme.gradient})` }}>
          <button onClick={prev} className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition text-xl font-bold">‹</button>
          <div className="text-center flex items-center gap-3">
            <AppLogo size={60} className="drop-shadow-lg" />
            <div>
              <div className="font-black text-white text-lg">{MN[month]} {year}</div>
              <div className="text-white/70 text-xs">{n} บันทึกในเดือนนี้</div>
            </div>
          </div>
          <button onClick={next} className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition text-xl font-bold">›</button>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-7 mb-2">
            {DN.map((d) => (
              <div key={d} className="text-center text-xs font-bold py-2" style={{ color: textS }}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1.5">
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
                  className="relative aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-semibold transition-all hover:scale-105"
                  style={{
                    background: isSel ? theme.accent : mood ? moodColor[mood] + "30" : darkMode ? "#2D2D3F" : "#F8FAFC",
                    border: isToday ? `2px solid ${theme.accent}` : "2px solid transparent",
                    color: isSel ? "white" : mood ? (darkMode ? "#F1F5F9" : "#1E293B") : textS,
                    boxShadow: isSel ? `0 4px 12px ${theme.accent}50` : "none",
                  }}
                >
                  {d}
                  <div className="flex gap-0.5 mt-0.5 items-center">
                    {mood && <span className="w-1.5 h-1.5 rounded-full" style={{ background: isSel ? "rgba(255,255,255,0.8)" : moodColor[mood] }} />}
                    {isPeriod && <span style={{ fontSize: "10px", lineHeight: 1 }}>🩸</span>}
                  </div>
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-5 pt-4 border-t" style={{ borderColor: border }}>
            <span className="text-xs font-semibold" style={{ color: textS }}>อารมณ์:</span>
            {[["great", "😄"], ["good", "😊"], ["okay", "😐"], ["bad", "😢"], ["awful", "😭"]].map(([m, e]) => (
              <span key={m} className="flex items-center gap-1 text-xs" style={{ color: textS }}>
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: moodColor[m] }} />{e}
              </span>
            ))}
            {showPeriodFeature && periodDates.size > 0 && <span className="flex items-center gap-1 text-xs" style={{ color: textS }}>🩸 ประจำเดือน</span>}
          </div>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex flex-col gap-4">
        <div className="rounded-2xl p-5 flex-1" style={{ background: bg, border: `1px solid ${border}` }}>
          <h4 className="font-black text-sm mb-3 flex items-center gap-2" style={{ color: textM }}>
            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs" style={{ background: theme.light }}>📋</span>
            {selected ? `วันที่ ${selected} ${MN[month]}` : "เลือกวันในปฏิทิน"}
          </h4>
          {selectedRecord ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between"><span className="text-xs" style={{ color: textS }}>อารมณ์</span><MoodBadge mood={selectedRecord.mood} /></div>
              {[
                { icon: "💤", label: "นอน", val: `${selectedRecord.sleepHours}h` },
                { icon: "💧", label: "น้ำ", val: `${selectedRecord.waterIntake} แก้ว` },
                { icon: "🏃", label: "ออกกำลัง", val: `${selectedRecord.exerciseMinutes} นาที` },
                { icon: "😰", label: "Stress", val: `${selectedRecord.stressLevel}/5` },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-1.5 border-t" style={{ borderColor: border }}>
                  <span className="text-xs" style={{ color: textS }}>{r.icon} {r.label}</span>
                  <span className="text-xs font-bold" style={{ color: textM }}>{r.val}</span>
                </div>
              ))}
              {showPeriodFeature && periodDates.has(selectedDateStr) && <div className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg" style={{ background: "#FFF0F3", color: "#F43F5E", border: "1px solid #FECDD3" }}>🩸 มีประจำเดือนวันนี้</div>}
              {selectedRecord.note && <p className="text-xs italic rounded-lg px-3 py-2" style={{ background: cardBg, color: textS }}>📝 {selectedRecord.note}</p>}
            </div>
          ) : selected ? (
            <div className="flex flex-col items-center py-6 text-center gap-2" style={{ color: textS }}>
              <span className="text-3xl">📭</span>
              <p className="text-xs">ไม่มีบันทึกในวันนี้</p>
              <button onClick={() => setActiveTab("form")} className="mt-1 px-4 py-1.5 rounded-xl text-xs font-bold text-white" style={{ background: `linear-gradient(${theme.gradient})` }}>+ บันทึกวันนี้</button>
            </div>
          ) : (
            <div className="flex flex-col items-center py-6 text-center" style={{ color: textS }}>
              <span className="text-3xl mb-2">👆</span>
              <p className="text-xs">แตะวันในปฏิทินเพื่อดูรายละเอียด</p>
            </div>
          )}
        </div>

        {/* Month summary */}
        <div className="rounded-2xl p-4" style={{ background: bg, border: `1px solid ${border}` }}>
          <h4 className="font-black text-xs mb-3 uppercase tracking-wide" style={{ color: textS }}>สรุปเดือนนี้</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: "📋", label: "บันทึก", val: `${n} วัน` },
              { icon: "💤", label: "นอนเฉลี่ย", val: n ? `${avg("sleepHours")}h` : "—" },
              { icon: "💧", label: "น้ำเฉลี่ย", val: n ? `${avg("waterIntake")} แก้ว` : "—" },
              { icon: "😰", label: "Stress", val: n ? `${avg("stressLevel")}/5` : "—" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: cardBg }}>
                <div className="text-base">{s.icon}</div>
                <div className="text-sm font-black mt-0.5" style={{ color: textM }}>{s.val}</div>
                <div className="text-xs" style={{ color: textS }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BMI quick card */}
        {showBmiFeature && bmiRecord && (() => {
          const getBmiLabel = (b) => {
            if (!b) return null;
            const n = parseFloat(b);
            if (n < 18.5) return { label: "น้ำหนักน้อย", color: "#3B82F6" };
            if (n < 25) return { label: "ปกติ", color: "#10B981" };
            if (n < 30) return { label: "น้ำหนักเกิน", color: "#F59E0B" };
            return { label: "อ้วน", color: "#EF4444" };
          };
          const info = getBmiLabel(bmiRecord.bmi);
          if (!info) return null;
          return (
            <div className="rounded-2xl p-4 flex items-center gap-3" style={{ background: bg, border: `1px solid ${border}` }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: info.color + "15" }}>⚖️</div>
              <div>
                <div className="text-xs" style={{ color: textS }}>BMI ของฉัน</div>
                <div className="text-xl font-black" style={{ color: info.color }}>{bmiRecord.bmi}</div>
                <div className="text-xs font-semibold" style={{ color: info.color }}>{info.label}</div>
              </div>
            </div>
          );
        })()}

        {/* Recent */}
        <div className="rounded-2xl p-4" style={{ background: bg, border: `1px solid ${border}` }}>
          <h4 className="font-black text-xs mb-3 uppercase tracking-wide" style={{ color: textS }}>ล่าสุด</h4>
          {recent.length === 0 ? (
            <p className="text-xs text-center py-3" style={{ color: textS }}>ยังไม่มีบันทึก</p>
          ) : (
            <div className="space-y-2">
              {recent.map((r) => (
                <div key={r.id} className="flex items-center gap-2 py-1.5 border-b last:border-0" style={{ borderColor: border }}>
                  <span className="text-base">{({ great: "😄", good: "😊", okay: "😐", bad: "😢", awful: "😭" })[r.mood]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: textM }}>
                      {new Date(r.date).toLocaleDateString("th-TH", { month: "short", day: "numeric" })}
                    </div>
                    <div className="text-xs" style={{ color: textS }}>💤{r.sleepHours}h · 💧{r.waterIntake}แก้ว</div>
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
