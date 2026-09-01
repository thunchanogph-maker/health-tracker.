"use client";

import { useState, useEffect } from "react";
import MoodBadge from "../MoodBadge";
import CatMascot from "../CatMascot";
import AppLogo from "../AppLogo";
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
  const [selectedPose, setSelectedPose] = useState("holding-tracker");

  useEffect(() => {
    const saved = localStorage.getItem("kuro-pat-count");
    if (saved) setPatCount(parseInt(saved, 10) || 0);
  }, []);

  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const borderCol = theme?.accent || "#8B5CF6";


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
        <CatMascot size={180} pose="holding-tracker" interactive={true} />
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

      {/* Mascot & Logo Official Showcase Card */}
      <div className="rounded-[28px] p-6 shadow-xl border space-y-6" style={{ background: cardBg, borderColor: borderCol }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: borderCol + "50" }}>
          <div>
            <h4 className="font-black text-lg flex items-center gap-2" style={{ color: textM }}>
              <span className="w-9 h-9 rounded-2xl flex items-center justify-center text-base border" style={{ background: darkMode ? "#191724" : "#FFE6C2", borderColor: borderCol }}>
                🎨
              </span>
              มาสคอต และ โลโก้ของระบบ (System Design & Mascot) 🐾
            </h4>
            <p className="text-xs font-medium mt-1" style={{ color: textS }}>
              เอกลักษณ์แมวดำหูเขียวพาสเทล <strong style={{ color: theme.accent }}>Kuro-chan</strong> & โลโก้แบรนด์ HealthTrack
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border shrink-0" style={{ background: "#A5DB7425", borderColor: "#A5DB74", color: "#3D683A" }}>
            <span>🌿 Primary Accent: #A5DB74</span>
          </div>
        </div>

        {/* 1. Official Logos Section */}
        <div>
          <h5 className="font-black text-sm mb-3 flex items-center gap-1.5" style={{ color: textM }}>
            <span>🏷️</span> โลโก้ทางการของระบบ (Official HealthTrack Logos)
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Logo Variant 1: Sticker Logo */}
            <div className="p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 text-center transition-all hover:scale-102" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
              <AppLogo size={240} variant="sticker" />
              <div>
                <div className="text-xs font-black" style={{ color: textM }}>Sticker Header Logo</div>
                <div className="text-[11px] font-medium opacity-75" style={{ color: textS }}>โลโก้สติ๊กเกอร์ พร้อมแมวกอดแทร็กเกอร์และเมฆปฏิทิน</div>
              </div>
            </div>

            {/* Logo Variant 2: Badge Stamp Logo */}
            <div className="p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 text-center transition-all hover:scale-102" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
              <AppLogo size={140} variant="badge" />
              <div>
                <div className="text-xs font-black" style={{ color: textM }}>Emblem Badge Logo</div>
                <div className="text-[11px] font-medium opacity-75" style={{ color: textS }}>ตราสัญลักษณ์วงกลม Personal Well-being Tracker</div>
              </div>
            </div>

            {/* Logo Variant 3: App Icon */}
            <div className="p-4 rounded-2xl border flex flex-col items-center justify-center gap-3 text-center transition-all hover:scale-102" style={{ background: darkMode ? "#191724" : "#FFF8ED", borderColor: borderCol }}>
              <AppLogo size={100} variant="compact" />
              <div>
                <div className="text-xs font-black" style={{ color: textM }}>App Icon & Favicon</div>
                <div className="text-[11px] font-medium opacity-75" style={{ color: textS }}>ไอคอนปุ่มเมนูและแอปพลิเคชัน</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Mascot Expression Sheet Section */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-3">
            <h5 className="font-black text-sm flex items-center gap-1.5" style={{ color: textM }}>
              <span>🐱</span> คอลเลกชันท่าทางมาสคอต (Kuro Mascot Expression Sheet)
            </h5>
            <span className="text-xs font-bold" style={{ color: theme.accent }}>
              (คลิกเพื่อพรีวิวท่าทาง)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: "holding-tracker", name: "กอดแทร็กเกอร์", desc: "ท่าหลักโลโก้ ถือหลอดสุขภาพ" },
              { id: "winking", name: "ขยิบตา 1 ข้าง", desc: "ท่าประจำตราสัญลักษณ์" },
              { id: "sitting", name: "นั่งน่ารัก", desc: "ท่าพักผ่อน หูเขียวพาสเทล" },
              { id: "cheering", name: "ดีใจ / ชูมือ", desc: "ท่ายินดีเมื่อทำเป้าหมายสำเร็จ" },
              { id: "sleeping", name: "นอนหลับสนิท", desc: "ท่าสำหรับการนอนหลับพักผ่อน" },
              { id: "stretching", name: "บิดตัวยืดบิด", desc: "ท่าออกกำลังกายและผ่อนคลาย" },
              { id: "peeking", name: "แอบมองน่ารัก", desc: "ท่าแอบดูข้างการ์ด" },
              { id: "curious", name: "สงสัย (?)", desc: "ท่าสงสัยถามไถ่สุขภาพ" },
            ].map((p) => {
              const active = selectedPose === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPose(p.id)}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all ${
                    active ? "scale-105 shadow-md" : "hover:scale-102 opacity-80"
                  }`}
                  style={{
                    background: active ? (darkMode ? "#252238" : "#FFFBEB") : (darkMode ? "#191724" : "#FFF8ED"),
                    borderColor: active ? theme.accent : borderCol + "60",
                  }}
                >
                  <CatMascot size={70} pose={p.id} interactive={false} />
                  <div className="text-xs font-black mt-2" style={{ color: active ? theme.accent : textM }}>
                    {p.name}
                  </div>
                  <div className="text-[10px] font-medium opacity-75" style={{ color: textS }}>
                    {p.desc}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Preview Banner */}
          <div className="mt-4 p-4 rounded-2xl border flex items-center justify-between" style={{ background: darkMode ? "#191724" : "#FFFBEB", borderColor: theme.accent + "50" }}>
            <div className="flex items-center gap-4">
              <CatMascot size={80} pose={selectedPose} interactive={true} speechBubble="เมี๊ยว! ขอบคุณที่ดูแลสุขภาพนะ 💚" />
              <div>
                <div className="text-sm font-black" style={{ color: textM }}>
                  ท่าทางที่เลือก: <span style={{ color: theme.accent }}>{selectedPose}</span>
                </div>
                <div className="text-xs font-medium opacity-80" style={{ color: textS }}>
                  ลองคลิกที่ตัวน้อง Kuro เพื่อลูบหัวสะสมแต้มทาสแมวได้เลย meow~! 🐾
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action Button at Bottom of Profile Page */}
      <div className="pt-4 flex justify-center">
        <button
          type="button"
          onClick={async () => {
            try {
              const { logout } = await import("../../pages/Auth");
              await logout();
            } catch (e) {
              console.error(e);
            }
            if (setUser) setUser(null);
            if (setRecords) setRecords([]);
          }}
          className="w-full max-w-md py-4 rounded-2xl font-black text-sm text-rose-500 bg-rose-500/10 border-2 border-rose-400/40 hover:bg-rose-500 hover:text-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95"
        >
          <span>🚪 ออกจากระบบ (Sign Out)</span>
        </button>
      </div>
    </div>
  );
}
