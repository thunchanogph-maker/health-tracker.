"use client";

import AppLogo from "../AppLogo";
import CatMascot from "../CatMascot";

export default function WelcomePage({ darkMode, theme, onSignIn, onRegister }) {
  const bg = darkMode ? "#191724" : "#FFF8ED";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";
  const borderCol = darkMode ? "#3D3759" : "#F6D69B";

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center py-10 relative">
      {/* Background Fluid Organic Blob */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none animate-blob" style={{ background: theme.accent }} />

      <div className="relative max-w-xl w-full">
        <div
          className="relative rounded-[32px] px-6 sm:px-10 py-12 shadow-2xl border transition-all"
          style={{
            background: cardBg,
            borderColor: borderCol,
            boxShadow: darkMode ? "0 20px 50px rgba(0,0,0,0.4)" : "0 20px 40px rgba(246,214,155,0.25)",
          }}
        >
          {/* Top Cute Cat Ears Banner Header */}
          <div className="flex justify-center -mt-20 mb-4">
            <div
              className="p-4 rounded-full border-4 shadow-xl transition-transform hover:scale-105"
              style={{
                background: darkMode ? "#191724" : "#FFF8ED",
                borderColor: theme.accent,
              }}
            >
              <CatMascot size={110} pose="cheering" speechBubble="ยินดีต้อนรับครับ meow! 🐾" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 border" style={{ background: darkMode ? "rgba(246,214,155,0.12)" : "#FFE6C2", color: darkMode ? "#F6D69B" : "#B45309", borderColor: borderCol }}>
            <span>🐾 HealthTrack x Kuro-chan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black mb-3 leading-tight tracking-tight" style={{ color: textM }}>
            Personal Health &<br />
            <span style={{ color: theme.accent }}>Well-being Tracker</span>
          </h1>

          <p className="text-sm leading-relaxed mb-8 max-w-md mx-auto font-medium" style={{ color: textS }}>
            บันทึกสุขภาพกาย สุขภาพจิต และประจำวันของคุณ<br />
            โดยมีน้องแมว <strong style={{ color: theme.accent }}>Kuro-chan</strong> คอยอยู่เคียงข้างและดูแลคุณทุกวัน meow! 😸✨
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <button
              onClick={onSignIn}
              className="px-8 py-4 rounded-2xl font-black text-sm transition-all hover:opacity-90 hover:scale-105 active:scale-95 shadow-xl flex items-center justify-center gap-2"
              style={{
                background: theme.accent,
                color: "#191724",
                boxShadow: `0 6px 20px ${theme.accent}50`,
              }}
            >
              <span>🔐 เข้าสู่ระบบ meow~</span>
            </button>

            <button
              onClick={onRegister}
              className="px-8 py-4 rounded-2xl font-black text-sm transition-all hover:scale-105 active:scale-95 border-2 flex items-center justify-center gap-2"
              style={{
                borderColor: theme.accent,
                color: theme.accent,
                background: darkMode ? "rgba(246,214,155,0.08)" : "#FFF8ED",
              }}
            >
              <span>🌱 สมัครสมาชิกใหม่ 🐾</span>
            </button>
          </div>

          {/* Features Highlights Pills */}
          <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t" style={{ borderColor: borderCol + "40" }}>
            {[
              { icon: "📊", label: "กราฟวิเคราะห์" },
              { icon: "🩸", label: "บันทึกประจำเดือน" },
              { icon: "⚖️", label: "คำนวณ BMI" },
            ].map((f) => (
              <div key={f.label} className="p-2 rounded-xl text-center" style={{ background: darkMode ? "#191724" : "#FFF8ED" }}>
                <span className="text-base">{f.icon}</span>
                <div className="text-xs font-bold mt-1" style={{ color: textM }}>{f.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
