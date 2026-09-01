"use client";

import { useState, useEffect } from "react";
import MoodBadge from "../MoodBadge";
import CatMascot from "../CatMascot";
import { CAT_FRIENDSHIP_LEVELS } from "../constants";

export default function ProfilePage({
  user,
  records,
  bmiRecord,
  darkMode,
  theme,
  onOpenPeriod,
  onOpenBmi,
  onEditProfile,
  showPeriodFeature,
  setShowPeriodFeature,
  showBmiFeature,
  setShowBmiFeature,
}) {
  const [patCount, setPatCount] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("kuro-pat-count");
    if (saved) setPatCount(parseInt(saved, 10) || 0);
  }, []);

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";

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

  const currentCatLevel = [...CAT_FRIENDSHIP_LEVELS].reverse().find((l) => patCount >= l.min) || CAT_FRIENDSHIP_LEVELS[0];

  const achievements = [
    { icon: "🐱", label: "เพื่อนใหม่", desc: "พบกับ Kuro-chan", done: true },
    { icon: "🌱", label: "เริ่มต้น", desc: "บันทึกสุขภาพวันแรก", done: n >= 1 },
    { icon: "🔥", label: "3 วันติด", desc: "บันทึก 3 วันติดต่อกัน", done: streak >= 3 },
    { icon: "⭐", label: "7 วันติด", desc: "บันทึก 7 วัน", done: streak >= 7 },
    { icon: "💖", label: "ทาสแมวตัวจริง", desc: "ลูบหัว Kuro ≥ 10 ครั้ง", done: patCount >= 10 },
    { icon: "💧", label: "ดื่มน้ำดี", desc: "ค่าเฉลี่ยน้ำ ≥ 8 แก้ว", done: Number(avg("waterIntake")) >= 8 },
  ];

  const bmi = bmiRecord?.bmi;

  return (
    <div className="space-y-6">
      {/* Profile Header Hero */}
      <div className="rounded-[32px] overflow-hidden relative border shadow-2xl" style={{ background: cardBg, borderColor: borderCol }}>
        <div className="relative p-7 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Cat ears badge */}
          <div className="relative shrink-0 cursor-pointer group" onClick={onEditProfile} title="แก้ไขโปรไฟล์">
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black text-slate-900 shadow-xl overflow-hidden border-2"
              style={{ background: theme.accent, borderColor: borderCol }}
            >
              {user?.photoURL ? <img src={user.photoURL} alt="" className="w-full h-full object-cover" /> : (user?.displayName || "U")[0].toUpperCase()}
            </div>
            <div className="absolute inset-0 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(0,0,0,0.5)" }}>
              <span className="text-white text-xl">✏️</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 flex items-center justify-center text-xs shadow border">🐾</div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
              <h2 className="text-2xl font-black" style={{ color: textM }}>
                {user?.displayName || "มนุษย์ทาสแมว"}
              </h2>
              <button onClick={onEditProfile} className="opacity-70 hover:opacity-100 transition" title="แก้ไขชื่อ">
                <span className="text-sm">✏️</span>
              </button>
            </div>
            <p className="text-xs font-medium mb-4" style={{ color: textS }}>
              {user?.email || "ผู้ดูแลสุขภาพส่วนตัว meow~"}
            </p>

            <div className="flex flex-wrap gap-2.5 justify-center sm:justify-start">
              {[
                { val: n, label: "บันทึกสะสม" },
                { val: streak, label: "วันติดต่อกัน" },
                { val: n > 0 ? (topMood?.[0] ? moodEmoji[topMood[0]] : "—") : "—", label: "อารมณ์หลัก" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl px-4 py-2 text-center border" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
                  <div className="text-lg font-black" style={{ color: theme.accent }}>
                    {s.val}
                  </div>
                  <div className="text-[11px] font-bold" style={{ color: textS }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cat Mascot Friendship Progress Card */}
      <div className="rounded-[28px] p-6 shadow-xl border flex flex-col sm:flex-row items-center gap-5" style={{ background: cardBg, borderColor: borderCol }}>
        <CatMascot size={100} pose="cheering" interactive={true} />
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <span className="text-lg">{currentCatLevel.icon}</span>
            <h4 className="font-black text-base" style={{ color: textM }}>
              ระดับความสนิทกับ Kuro-chan: <span style={{ color: theme.accent }}>{currentCatLevel.title}</span>
            </h4>
          </div>
          <p className="text-xs font-medium mb-3" style={{ color: textS }}>
            สะสมการลูบหัวน้องแมวไปแล้ว <strong className="text-amber-400 font-bold">{patCount}</strong> ครั้ง meow~ 🐾
          </p>

          <div className="w-full h-3 rounded-full overflow-hidden border" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((patCount / 50) * 100, 100)}%`,
                background: theme.accent,
              }}
            />
          </div>
        </div>
      </div>

      {/* Special Feature Toggles */}
      <div className="rounded-[28px] p-6 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
        <h4 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: textM }}>
          <span className="w-8 h-8 rounded-2xl flex items-center justify-center text-sm border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
            ✨
          </span>
          ฟีเจอร์บันทึกพิเศษ 🐾
        </h4>

        <div className="space-y-3">
          {/* Period tracker toggle */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all"
            style={{
              borderColor: showPeriodFeature ? "#F43F5E" : borderCol,
              background: showPeriodFeature ? "rgba(244,63,94,0.08)" : darkMode ? "#191724" : "#FFF8ED",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: "rgba(244,63,94,0.15)" }}>
              🩸
            </div>
            <div className="flex-1">
              <div className="text-sm font-black" style={{ color: showPeriodFeature ? "#F43F5E" : textM }}>
                บันทึกประจำเดือน
              </div>
              <div className="text-xs font-medium" style={{ color: textS }}>
                ติดตามรอบเดือน พร้อมแสดง 🩸 ในปฏิทินปฏิทินแมว
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showPeriodFeature && (
                <button onClick={onOpenPeriod} className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-rose-500 shadow">
                  + บันทึก
                </button>
              )}
              <button
                onClick={() => setShowPeriodFeature(!showPeriodFeature)}
                className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                style={{ background: showPeriodFeature ? "#F43F5E" : "#4A4565" }}
              >
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300" style={{ left: showPeriodFeature ? "calc(100% - 22px)" : "2px" }} />
              </button>
            </div>
          </div>

          {/* BMI toggle */}
          <div
            className="flex items-center gap-3 p-4 rounded-2xl border-2 transition-all"
            style={{
              borderColor: showBmiFeature ? "#38BDF8" : borderCol,
              background: showBmiFeature ? "rgba(56,189,248,0.08)" : darkMode ? "#191724" : "#FFF8ED",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{ background: "rgba(56,189,248,0.15)" }}>
              ⚖️
            </div>
            <div className="flex-1">
              <div className="text-sm font-black" style={{ color: showBmiFeature ? "#38BDF8" : textM }}>
                น้ำหนัก & BMI
              </div>
              <div className="text-xs font-medium" style={{ color: textS }}>
                {bmiRecord ? `ปัจจุบัน: ${bmiRecord.weight} กก. / ${bmiRecord.height} ซม. (BMI ${bmi})` : "บันทึกและคำนวณดัชนีมวลกาย"}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {showBmiFeature && (
                <button onClick={onOpenBmi} className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-sky-500 shadow">
                  แก้ไข
                </button>
              )}
              <button
                onClick={() => setShowBmiFeature(!showBmiFeature)}
                className="relative w-12 h-6 rounded-full transition-all duration-300 shrink-0"
                style={{ background: showBmiFeature ? "#38BDF8" : "#4A4565" }}
              >
                <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300" style={{ left: showBmiFeature ? "calc(100% - 22px)" : "2px" }} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Badges */}
      <div className="rounded-[28px] p-6 shadow-xl border" style={{ background: cardBg, borderColor: borderCol }}>
        <h4 className="font-black text-base mb-4 flex items-center gap-2" style={{ color: textM }}>
          <span className="w-8 h-8 rounded-2xl flex items-center justify-center text-sm border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
            🏆
          </span>
          ความสำเร็จทาสแมว 🐾
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {achievements.map((a) => (
            <div
              key={a.label}
              className="rounded-2xl p-3.5 text-center flex flex-col items-center gap-1 border transition-all"
              style={{
                background: a.done ? (darkMode ? "#191724" : "#FFF8ED") : cardBg,
                borderColor: a.done ? theme.accent : borderCol + "40",
                opacity: a.done ? 1 : 0.4,
              }}
            >
              <span className="text-2xl">{a.icon}</span>
              <div className="text-xs font-black" style={{ color: a.done ? theme.accent : textS }}>
                {a.label}
              </div>
              <div className="text-[11px] font-medium" style={{ color: textS }}>
                {a.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
