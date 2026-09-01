"use client";

import { useState, useEffect } from "react";
import CatMascot from "./CatMascot";
import { CAT_QUOTES, CAT_FRIENDSHIP_LEVELS } from "./constants";

export default function CatCompanionWidget({ user, theme, darkMode }) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [patCount, setPatCount] = useState(0);
  const [pose, setPose] = useState("sitting");
  const [showPurr, setShowPurr] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("kuro-pat-count");
    if (saved) setPatCount(parseInt(saved, 10) || 0);

    const handleUpdatedPat = (e) => {
      const cnt = e?.detail?.count || parseInt(localStorage.getItem("kuro-pat-count") || "0", 10);
      setPatCount(cnt);
      setPose("cheering");
      setShowPurr(true);
      setQuoteIndex((prev) => (prev + 1) % CAT_QUOTES.length);
      setTimeout(() => {
        setPose("sitting");
        setShowPurr(false);
      }, 3000);
    };

    window.addEventListener("kuro-pat-updated", handleUpdatedPat);
    return () => window.removeEventListener("kuro-pat-updated", handleUpdatedPat);
  }, []);

  // Determine friendship level based on total daily record entries
  const currentLevel = [...CAT_FRIENDSHIP_LEVELS].reverse().find((l) => patCount >= l.min) || CAT_FRIENDSHIP_LEVELS[0];

  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const borderCol = theme?.accent || "#8B5CF6";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  return (
    <div
      className="relative rounded-3xl p-5 overflow-hidden shadow-xl transition-all border group mb-4 select-none"
      style={{
        background: cardBg,
        borderColor: borderCol,
        boxShadow: `0 8px 30px ${theme?.accent || "#8B5CF6"}20`,
      }}
    >
      {/* Background Fluid Wave Accent */}
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: theme.accent }}
      />

      <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
        {/* Cat Mascot Display */}
        <div className="shrink-0 flex flex-col items-center">
          <CatMascot
            size={180}
            pose={pose}
            interactive={true}
            speechBubble={showPurr ? "บันทึกแล้ว! ได้รับลูบหัว +1 meow~ 💖" : null}
          />
        </div>

        {/* Mascot Message & Friendship Level */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span
              className="px-3 py-1 rounded-full text-xs font-black border flex items-center gap-1.5 shadow-sm"
              style={{
                background: darkMode ? "rgba(246,214,155,0.15)" : "#FFE6C2",
                color: darkMode ? "#F6D69B" : "#B45309",
                borderColor: borderCol,
              }}
            >
              <span>{currentLevel.icon}</span>
              <span>ระดับ: {currentLevel.title}</span>
            </span>
            <span className="text-xs font-bold" style={{ color: textS }}>
              (ลูบหัวสะสม <strong style={{ color: theme.accent }}>{patCount}</strong> ครั้งจากการเขียนบันทึก)
            </span>
          </div>

          <h3 className="text-lg font-black tracking-tight mb-2" style={{ color: textM }}>
            สวัสดีครับมนุษย์! 🐾 <span style={{ color: theme.accent }}>Kuro-chan</span> คอยดูแลสุขภาพอยู่นะ meow~
          </h3>

          <div
            className="p-3 rounded-2xl border text-xs font-medium leading-relaxed transition-all shadow-inner"
            style={{
              background: darkMode ? "#191724" : "#FFFBEB",
              borderColor: borderCol,
              color: textM,
            }}
          >
            💬 "{CAT_QUOTES[quoteIndex]}"
          </div>
        </div>
      </div>
    </div>
  );
}
