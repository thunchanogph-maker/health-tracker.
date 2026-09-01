"use client";

import AppLogo from "../AppLogo";

export default function WelcomePage({ darkMode, theme, onSignIn, onRegister }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-6 text-center gap-10">
      <div className="relative max-w-lg w-full">
        <div className="absolute inset-0 rounded-3xl blur-3xl opacity-25" style={{ background: `linear-gradient(${theme.gradient})` }} />
        <div className="relative rounded-3xl px-8 py-14 shadow-2xl" style={{ background: darkMode ? "#1E1E2E" : "#FFFFFF", border: darkMode ? `1px solid ${theme.accent}30` : "1px solid #F1F5F9" }}>
          <AppLogo size={72} className="mx-auto mb-4 drop-shadow-xl" />
          <h1 className="text-3xl font-black mb-3 leading-tight" style={{ color: darkMode ? "#F1F5F9" : "#1E293B" }}>
            Personal Health<br />
            <span style={{ color: theme.accent }}>Well-being Tracker</span>
          </h1>
          <p className="text-sm leading-relaxed mb-8" style={{ color: darkMode ? "#64748B" : "#94A3B8" }}>
            บันทึกสุขภาพกายและสุขภาพจิตประจำวัน<br />
            ติดตามแนวโน้ม วิเคราะห์ข้อมูล เพื่อชีวิตที่ดีขึ้น
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={onSignIn} className="px-8 py-3.5 rounded-xl font-black text-white text-sm transition-all hover:opacity-90 hover:scale-105 shadow-lg" style={{ background: `linear-gradient(${theme.gradient})`, boxShadow: `0 4px 18px ${theme.accent}40` }}>
              🔐 เข้าสู่ระบบ
            </button>
            <button onClick={onRegister} className="px-8 py-3.5 rounded-xl font-black text-sm transition-all hover:scale-105 border-2" style={{ borderColor: theme.accent, color: theme.accent, background: theme.light }}>
              🌱 สมัครสมาชิกใหม่
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
