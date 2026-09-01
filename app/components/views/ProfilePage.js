"use client";

import MoodBadge from "../MoodBadge";

export default function ProfilePage({ user, records, bmiRecord, darkMode, theme, onOpenPeriod, onOpenBmi, onEditProfile, showPeriodFeature, setShowPeriodFeature, showBmiFeature, setShowBmiFeature }) {
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const cardBg = darkMode ? "#2D2D3F" : "#F8FAFC";
  const textM = darkMode ? "#F1F5F9" : "#1E293B";
  const textS = darkMode ? "#94A3B8" : "#64748B";
  const border = darkMode ? "#3D3D4F" : "#F1F5F9";
  const n = records.length;
  const avg = (key) => (n ? (records.reduce((s, r) => s + (Number(r[key]) || 0), 0) / n).toFixed(1) : "—");
  const moodCount = { great: 0, good: 0, okay: 0, bad: 0, awful: 0 };
  records.forEach((r) => {
    if (moodCount[r.mood] !== undefined) moodCount[r.mood]++;
  });
  const topMood = Object.entries(moodCount).sort((a, b) => b[1] - a[1])[0];
  const moodEmoji = { great: "😄", good: "😊", okay: "😐", bad: "😢", awful: "😭" };
  const sortedDates = [...new Set(records.map((r) => r.date))].sort().reverse();
  let streak = 0;
  let checkDate = new Date();
  for (const d of sortedDates) {
    const check = checkDate.toISOString().split("T")[0];
    if (d === check) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else break;
  }
  const latest = records.length > 0 ? [...records].sort((a, b) => new Date(b.date) - new Date(a.date))[0] : null;
  const achievements = [
    { icon: "🌱", label: "เริ่มต้น", desc: "บันทึกวันแรก", done: n >= 1 },
    { icon: "🔥", label: "3 วันติด", desc: "บันทึก 3 วันติดต่อกัน", done: streak >= 3 },
    { icon: "⭐", label: "7 วันติด", desc: "บันทึก 7 วัน", done: streak >= 7 },
    { icon: "💎", label: "30 บันทึก", desc: "บันทึกครบ 30 ครั้ง", done: n >= 30 },
    { icon: "🏆", label: "นักวิเคราะห์", desc: "บันทึกครบ 10 ครั้ง", done: n >= 10 },
    { icon: "💧", label: "ดื่มน้ำดี", desc: "ค่าเฉลี่ยน้ำ ≥ 8 แก้ว", done: Number(avg("waterIntake")) >= 8 },
  ];
  const bmi = bmiRecord?.bmi;
  const getBmiLabel = (b) => {
    if (!b) return null;
    const nv = parseFloat(b);
    if (nv < 18.5) return { label: "น้ำหนักน้อย", color: "#3B82F6" };
    if (nv < 25) return { label: "ปกติ", color: "#10B981" };
    if (nv < 30) return { label: "น้ำหนักเกิน", color: "#F59E0B" };
    return { label: "อ้วน", color: "#EF4444" };
  };
  const bmiInfo = getBmiLabel(bmi);

  return (
    <div className="space-y-5">
      {/* Hero — clickable avatar */}
      <div className="rounded-3xl overflow-hidden relative" style={{ background: `linear-gradient(${theme.gradient})` }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white" style={{ transform: "translate(30%,-30%)" }} />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white" style={{ transform: "translate(-20%,20%)" }} />
        </div>
        <div className="relative p-7 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0 cursor-pointer group" onClick={onEditProfile} title="แก้ไขโปรไฟล์">
            <div className="w-22 h-22 w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black text-white shadow-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.25)" }}>
              {user?.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : (user?.displayName || "U")[0].toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(0,0,0,0.35)" }}>
              <span className="text-white text-xl">✏️</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-yellow-400 flex items-center justify-center text-xs shadow">⭐</div>
          </div>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-0.5">
              <h2 className="text-xl font-black text-white">{user?.displayName || "ผู้ใช้"}</h2>
              <button onClick={onEditProfile} className="opacity-70 hover:opacity-100 transition" title="แก้ไขชื่อ">
                <span className="text-white text-sm">✏️</span>
              </button>
            </div>
            <p className="text-white/60 text-xs mb-3">{user?.email || ""}</p>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              {[
                { val: n, label: "บันทึก" },
                { val: streak, label: "วันติดต่อ" },
                { val: n > 0 ? (topMood?.[0] ? moodEmoji[topMood[0]] : "—") : "—", label: "Mood หลัก" },
              ].map((s) => (
                <div key={s.label} className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-1.5 text-center">
                  <div className="text-lg font-black text-white">{s.val}</div>
                  <div className="text-white/60 text-xs">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Special feature toggles */}
      <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
        <h4 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color: textM }}>
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "#FFF0F3" }}>✨</span>
          บันทึกพิเศษ
          <span className="ml-auto text-xs font-normal" style={{ color: textS }}>เปิด/ปิดเพื่อเปิดใช้งาน</span>
        </h4>
        <div className="space-y-3">
          {/* Period toggle */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all"
            style={{
              borderColor: showPeriodFeature ? "#FECDD3" : darkMode ? "#3D3D4F" : "#F1F5F9",
              background: showPeriodFeature ? "#FFF0F3" : darkMode ? "#2D2D3F" : "#F8FAFC",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                background: showPeriodFeature ? "#FECDD3" : "transparent",
                border: `1px solid ${showPeriodFeature ? "#FECDD3" : darkMode ? "#3D3D4F" : "#E2E8F0"}`,
              }}
            >
              🩸
            </div>
            <div className="flex-1">
              <div className="text-sm font-black" style={{ color: showPeriodFeature ? "#F43F5E" : textM }}>บันทึกประจำเดือน</div>
              <div className="text-xs" style={{ color: textS }}>แสดง 🩸 ในปฏิทินและหน้าวิเคราะห์</div>
            </div>
            <div className="flex items-center gap-2">
              {showPeriodFeature && (
                <button onClick={onOpenPeriod} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: "#F43F5E", color: "white" }}>+ บันทึก</button>
              )}
              <button
                onClick={() => setShowPeriodFeature(!showPeriodFeature)}
                className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                style={{ background: showPeriodFeature ? "#F43F5E" : "#E2E8F0" }}
              >
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300" style={{ left: showPeriodFeature ? "calc(100% - 22px)" : "2px" }} />
              </button>
            </div>
          </div>

          {/* BMI toggle */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all"
            style={{
              borderColor: showBmiFeature ? "#DDD6FE" : darkMode ? "#3D3D4F" : "#F1F5F9",
              background: showBmiFeature ? "#F5F3FF" : darkMode ? "#2D2D3F" : "#F8FAFC",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
              style={{
                background: showBmiFeature ? "#DDD6FE" : "transparent",
                border: `1px solid ${showBmiFeature ? "#DDD6FE" : darkMode ? "#3D3D4F" : "#E2E8F0"}`,
              }}
            >
              ⚖️
            </div>
            <div className="flex-1">
              <div className="text-sm font-black" style={{ color: showBmiFeature ? "#7C3AED" : textM }}>น้ำหนัก & ส่วนสูง / BMI</div>
              <div className="text-xs" style={{ color: textS }}>
                {bmiRecord ? `ปัจจุบัน: ${bmiRecord.weight}กก. / ${bmiRecord.height}ซม. · BMI ${bmi}` : "แสดงค่า BMI ในหน้าวิเคราะห์"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showBmiFeature && (
                <button onClick={onOpenBmi} className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ background: "#7C3AED", color: "white" }}>แก้ไข</button>
              )}
              <button
                onClick={() => setShowBmiFeature(!showBmiFeature)}
                className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                style={{ background: showBmiFeature ? "#7C3AED" : "#E2E8F0" }}
              >
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300" style={{ left: showBmiFeature ? "calc(100% - 22px)" : "2px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { icon: "💤", label: "นอนเฉลี่ย", val: `${avg("sleepHours")}h`, color: "#3B82F6", bg: "#EFF6FF" },
          { icon: "💧", label: "น้ำเฉลี่ย", val: `${avg("waterIntake")} แก้ว`, color: "#06B6D4", bg: "#ECFEFF" },
          { icon: "🏃", label: "ออกกำลัง", val: `${avg("exerciseMinutes")} นาที`, color: "#10B981", bg: "#ECFDF5" },
          { icon: "😰", label: "Stress", val: `${avg("stressLevel")}/5`, color: "#EF4444", bg: "#FEF2F2" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl p-3.5 flex items-center gap-3" style={{ background: darkMode ? "#2D2D3F" : s.bg, border: `1px solid ${border}` }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: s.color + "20" }}>{s.icon}</div>
            <div>
              <div className="font-black text-base" style={{ color: textM }}>{s.val}</div>
              <div className="text-xs" style={{ color: textS }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Achievements + Latest */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
          <h4 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color: textM }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "#FEF9C3" }}>🏆</span>ความสำเร็จ
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {achievements.map((a) => (
              <div
                key={a.label}
                className="rounded-xl p-2.5 text-center flex flex-col items-center gap-0.5"
                style={{
                  background: a.done ? theme.light : darkMode ? "#2D2D3F" : "#F8FAFC",
                  border: `1px solid ${a.done ? theme.accent : border}`,
                  opacity: a.done ? 1 : 0.45,
                }}
              >
                <span className="text-xl">{a.icon}</span>
                <div className="text-xs font-bold leading-tight" style={{ color: a.done ? theme.accent : textS }}>{a.label}</div>
                <div style={{ fontSize: "10px", color: textS, lineHeight: "1.2" }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
          <h4 className="font-black text-sm mb-4 flex items-center gap-2" style={{ color: textM }}>
            <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: theme.light }}>📋</span>บันทึกล่าสุด
          </h4>
          {latest ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: textS }}>วันที่</span>
                <span className="text-xs font-bold" style={{ color: textM }}>
                  {new Date(latest.date).toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs" style={{ color: textS }}>อารมณ์</span>
                <MoodBadge mood={latest.mood} />
              </div>
              {[
                { icon: "💤", label: "นอน", val: `${latest.sleepHours}h` },
                { icon: "💧", label: "น้ำ", val: `${latest.waterIntake} แก้ว` },
                { icon: "🏃", label: "ออกกำลัง", val: `${latest.exerciseMinutes} นาที` },
                { icon: "😰", label: "Stress", val: `${latest.stressLevel}/5` },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-1 border-t" style={{ borderColor: border }}>
                  <span className="text-xs" style={{ color: textS }}>{r.icon} {r.label}</span>
                  <span className="text-xs font-bold" style={{ color: textM }}>{r.val}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center py-8" style={{ color: textS }}>
              <span className="text-3xl mb-2">📭</span>
              <p className="text-xs">ยังไม่มีบันทึก</p>
            </div>
          )}
        </div>
      </div>

      {/* Health Score */}
      {n > 0 && (() => {
        const s1 = Math.min(Number(avg("sleepHours")) / 8, 1) * 100;
        const s2 = Math.min(Number(avg("waterIntake")) / 8, 1) * 100;
        const s3 = Math.min(Number(avg("exerciseMinutes")) / 60, 1) * 100;
        const s4 = (1 - (Number(avg("stressLevel")) - 1) / 4) * 100;
        const overall = ((s1 + s2 + s3 + s4) / 4).toFixed(0);
        return (
          <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-black text-sm flex items-center gap-2" style={{ color: textM }}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "#ECFDF5" }}>💚</span>Health Score
              </h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black" style={{ color: theme.accent }}>{overall}</span>
                <span className="text-sm" style={{ color: textS }}>/100</span>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "การนอน", s: s1, c: "#3B82F6" },
                { label: "น้ำดื่ม", s: s2, c: "#06B6D4" },
                { label: "ออกกำลัง", s: s3, c: "#10B981" },
                { label: "ความเครียด", s: s4, c: "#EF4444" },
              ].map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: textS }}>{b.label}</span>
                    <span className="font-bold" style={{ color: textM }}>{b.s.toFixed(0)}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: darkMode ? "#3D3D4F" : "#F1F5F9" }}>
                    <div className="h-full rounded-full" style={{ width: `${b.s}%`, background: b.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
