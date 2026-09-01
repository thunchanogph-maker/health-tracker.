"use client";

import { useState } from "react";

export default function CatMascot({
  size = 120,
  pose = "holding-tracker", // holding-tracker | winking | badge | sitting
  className = "",
  interactive = true,
  onPat = null,
  speechBubble = null,
}) {
  const [isPatting, setIsPatting] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleClick = () => {
    if (!interactive) return;
    setIsPatting(true);
    setTimeout(() => setIsPatting(false), 600);

    const newHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 40,
      y: -20 - Math.random() * 20,
      emoji: ["💖", "🐾", "✨", "😻", "🌱", "🌿"][Math.floor(Math.random() * 6)],
    };
    setHearts((prev) => [...prev.slice(-4), newHeart]);

    if (onPat) onPat();
  };

  const imageSrc =
    pose === "winking" || pose === "badge"
      ? "/img/official_badge_logo.png"
      : "/img/official_sticker_logo.png";

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      onClick={handleClick}
      style={{ width: size, height: size }}
    >
      {/* Floating heart / sparkle animations */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute pointer-events-none text-lg font-bold z-30"
          style={{
            top: h.y,
            left: `calc(50% + ${h.x}px)`,
            animation: "floatHeart 0.9s cubic-bezier(0.18, 0.89, 0.32, 1.28) forwards",
          }}
        >
          {h.emoji}
        </span>
      ))}

      {/* Speech Bubble */}
      {speechBubble && (
        <div
          className="absolute -top-12 z-40 px-3 py-1.5 rounded-2xl text-xs font-black shadow-lg border whitespace-nowrap animate-pulse"
          style={{
            background: "#FFF8ED",
            color: "#2D2640",
            borderColor: "#A5DB74",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          {speechBubble}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b"
            style={{ background: "#FFF8ED", borderColor: "#A5DB74" }}
          />
        </div>
      )}

      {/* Exact Official Mascot / Logo Image Uploaded by User */}
      <img
        src={imageSrc}
        alt="HealthTrack Mascot & Logo"
        className={`w-full h-full object-contain transition-transform duration-300 ${
          isPatting ? "scale-110 -rotate-3" : "group-hover:scale-105"
        }`}
      />
    </div>
  );
}
