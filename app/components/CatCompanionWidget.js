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
      setTimeout(() => {
        setPose("sitting");
        setShowPurr(false);
      }, 2500);
    };

    window.addEventListener("kuro-pat-updated", handleUpdatedPat);
    return () => window.removeEventListener("kuro-pat-updated", handleUpdatedPat);
  }, []);

  const handlePat = () => {
    const newCount = patCount + 1;
    setPatCount(newCount);
    localStorage.setItem("kuro-pat-count", newCount.toString());

    // Switch pose temporarily on pat
    const poses = ["cheering", "stretching", "sitting"];
    const randomPose = poses[Math.floor(Math.random() * poses.length)];
    setPose(randomPose);
    setShowPurr(true);

    // Pick next quote
    setQuoteIndex((prev) => (prev + 1) % CAT_QUOTES.length);

    setTimeout(() => {
      setPose("sitting");
      setShowPurr(false);
    }, 2000);
  };

  // Determine friendship level
  const currentLevel = [...CAT_FRIENDSHIP_LEVELS].reverse().find((l) => patCount >= l.min) || CAT_FRIENDSHIP_LEVELS[0];

  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const borderCol = darkMode ? "#3D3759" : "#F1F5F9";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  return (
    <div
      className="relative rounded-3xl p-5 overflow-hidden shadow-lg transition-all border group"
      style={{
        background: darkMode
          ? "linear-gradient(135deg, #252238 0%, #191724 100%)"
          : "linear-gradient(135deg, #FFF8ED 0%, #FFFFFF 100%)",
        borderColor: darkMode ? "#3D3759" : "#F6D69B",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
      }}
    >
      {/* Background Fluid Wave Accent */}
      <div
        className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: theme.accent }}
      />

      <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
        {/* Cat Mascot Interactive */}
        <div className="shrink-0 flex flex-col items-center">
          <CatMascot
            size={110}
            pose={pose}
            interactive={true}
            onPat={handlePat}
            speechBubble={showPurr ? "ฟินจัง meow~ 💖" : null}
          />
          <button
            onClick={handlePat}
            className="mt-1 px-3 py-1 rounded-full text-xs font-black transition-all hover:scale-105 active:scale-95 shadow-sm border flex items-center gap-1"
            style={{
              background: theme.accent,
              color: "#191724",
              borderColor: "#F6D69B",
            }}
          >
            <span>🐾 ลูบหัวน้อง Kuro</span>
          </button>
        </div>

        {/* Mascot Message & Friendship Progress */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span
              className="px-3 py-0.5 rounded-full text-xs font-bold border flex items-center gap-1"
              style={{
                background: darkMode ? "rgba(246,214,155,0.12)" : "#FFE6C2",
                color: darkMode ? "#F6D69B" : "#B45309",
                borderColor: darkMode ? "rgba(246,214,155,0.3)" : "#FDE68A",
              }}
            >
              <span>{currentLevel.icon}</span>
              <span>{currentLevel.title}</span>
            </span>
            <span className="text-xs font-semibold" style={{ color: textS }}>
              (ลูบหัวสะสม {patCount} ครั้ง)
            </span>
          </div>

          <h3 className="text-lg font-black tracking-tight mb-2" style={{ color: textM }}>
            สวัสดีครับมนุษย์! 🐾 <span style={{ color: theme.accent }}>Kuro-chan</span> ดูแลอยู่นะ meow~
          </h3>

          <div
            className="p-3 rounded-2xl border text-xs font-medium leading-relaxed transition-all"
            style={{
              background: darkMode ? "#191724" : "#FFFBEB",
              borderColor: darkMode ? "#2A2640" : "#FDE68A",
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
