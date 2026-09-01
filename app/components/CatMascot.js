"use client";

import { useState } from "react";

export default function CatMascot({
  size = 120,
  pose = "sitting", // sitting | sleeping | stretching | peeking | cheering | working | sad
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
      emoji: ["💖", "🐾", "✨", "😻", "🌟"][Math.floor(Math.random() * 5)],
    };
    setHearts((prev) => [...prev.slice(-4), newHeart]);

    if (onPat) onPat();
  };

  return (
    <div
      className={`relative inline-flex flex-col items-center select-none cursor-pointer group ${className}`}
      onClick={handleClick}
      style={{ width: size, height: size }}
    >
      {/* Floating heart animations */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute pointer-events-none text-lg font-bold"
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
          className="absolute -top-12 z-20 px-3 py-1.5 rounded-2xl text-xs font-black shadow-lg border whitespace-nowrap animate-pulse"
          style={{
            background: "#FFF8ED",
            color: "#2D2640",
            borderColor: "#F6D69B",
            boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
          }}
        >
          {speechBubble}
          <div
            className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 border-r border-b"
            style={{ background: "#FFF8ED", borderColor: "#F6D69B" }}
          />
        </div>
      )}

      {/* SVG Vector Mascot */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ${
          isPatting ? "scale-110 -rotate-3" : "group-hover:scale-105"
        }`}
      >
        <defs>
          <radialGradient id="catEyeShine" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </radialGradient>
          <linearGradient id="catBodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2D283E" />
            <stop offset="50%" stopColor="#1F1C2B" />
            <stop offset="100%" stopColor="#171522" />
          </linearGradient>
          <filter id="catGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Dynamic Pose Renderings */}
        {pose === "sleeping" ? (
          // Sleeping Cat on Crescent Moon
          <g filter="url(#catGlow)">
            {/* Moon Cushion */}
            <path
              d="M 20 90 A 55 55 0 1 0 120 130 A 45 45 0 1 1 20 90 Z"
              fill="#F6D69B"
              opacity="0.9"
            />
            {/* Sleeping Cat Body */}
            <path
              d="M 50 110 C 40 90 60 70 90 70 C 120 70 130 95 120 115 C 110 130 80 135 50 110 Z"
              fill="url(#catBodyGradient)"
            />
            {/* Cat Ears */}
            <path d="M 60 75 L 50 55 L 70 65 Z" fill="#2D283E" />
            <path d="M 62 73 L 53 58 L 70 65 Z" fill="#FFA4B8" opacity="0.7" />
            <path d="M 85 70 L 80 50 L 95 62 Z" fill="#2D283E" />
            <path d="M 85 70 L 82 53 L 95 62 Z" fill="#FFA4B8" opacity="0.7" />
            {/* Sleeping Eyes (Closed Arcs) */}
            <path d="M 60 82 Q 67 87 74 82" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 82 82 Q 89 87 96 82" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            {/* Pink Nose */}
            <polygon points="78,88 82,88 80,91" fill="#FFA4B8" />
            {/* Sleeping Zzz */}
            <text x="120" y="55" fill="#F6D69B" fontSize="18" fontWeight="bold" opacity="0.9">Z</text>
            <text x="132" y="42" fill="#F6D69B" fontSize="13" fontWeight="bold" opacity="0.7">z</text>
            <text x="140" y="32" fill="#F6D69B" fontSize="10" fontWeight="bold" opacity="0.5">z</text>
          </g>
        ) : pose === "stretching" ? (
          // Playful / Stretching Cat Pose
          <g filter="url(#catGlow)">
            {/* Tail */}
            <path
              d="M 120 110 C 145 90 140 50 125 40 C 115 35 110 45 120 60 C 128 72 110 95 100 110 Z"
              fill="url(#catBodyGradient)"
            />
            {/* Arched Body */}
            <path
              d="M 30 120 C 40 70 80 60 110 95 C 120 110 110 125 90 125 C 60 125 45 125 30 120 Z"
              fill="url(#catBodyGradient)"
            />
            {/* Front Paws stretched */}
            <ellipse cx="25" cy="122" rx="10" ry="7" fill="#1F1C2B" />
            <ellipse cx="40" cy="123" rx="10" ry="7" fill="#1F1C2B" />
            {/* Cat Head turned looking back */}
            <circle cx="45" cy="75" r="28" fill="url(#catBodyGradient)" />
            {/* Ears */}
            <path d="M 28 60 L 22 35 L 42 50 Z" fill="#2D283E" />
            <path d="M 30 58 L 25 40 L 41 50 Z" fill="#FFA4B8" opacity="0.7" />
            <path d="M 55 58 L 62 35 L 68 53 Z" fill="#2D283E" />
            <path d="M 55 58 L 61 40 L 67 53 Z" fill="#FFA4B8" opacity="0.7" />
            {/* Sparkly Big Eyes */}
            <circle cx="36" cy="72" r="7" fill="url(#catEyeShine)" />
            <circle cx="38" cy="70" r="3" fill="#171522" />
            <circle cx="54" cy="72" r="7" fill="url(#catEyeShine)" />
            <circle cx="56" cy="70" r="3" fill="#171522" />
            {/* Cheeks */}
            <circle cx="28" cy="80" r="4" fill="#FFA4B8" opacity="0.6" />
            <circle cx="62" cy="80" r="4" fill="#FFA4B8" opacity="0.6" />
            {/* Nose */}
            <polygon points="43,78 47,78 45,81" fill="#FFA4B8" />
          </g>
        ) : pose === "peeking" ? (
          // Peeking Cat from Card Edge
          <g filter="url(#catGlow)">
            {/* Head */}
            <ellipse cx="80" cy="90" rx="36" ry="32" fill="url(#catBodyGradient)" />
            {/* Ears */}
            <path d="M 52 70 L 40 38 L 68 58 Z" fill="#2D283E" />
            <path d="M 54 68 L 44 44 L 66 58 Z" fill="#FFA4B8" opacity="0.8" />
            <path d="M 108 70 L 120 38 L 92 58 Z" fill="#2D283E" />
            <path d="M 106 68 L 116 44 L 94 58 Z" fill="#FFA4B8" opacity="0.8" />
            {/* Paws on Edge */}
            <rect x="52" y="112" width="18" height="14" rx="7" fill="#2D283E" stroke="#171522" strokeWidth="2" />
            <rect x="90" y="112" width="18" height="14" rx="7" fill="#2D283E" stroke="#171522" strokeWidth="2" />
            {/* Eyes */}
            <circle cx="66" cy="88" r="9" fill="url(#catEyeShine)" />
            <circle cx="68" cy="86" r="4" fill="#171522" />
            <circle cx="65" cy="84" r="2.5" fill="#FFFFFF" />
            <circle cx="94" cy="88" r="9" fill="url(#catEyeShine)" />
            <circle cx="96" cy="86" r="4" fill="#171522" />
            <circle cx="93" cy="84" r="2.5" fill="#FFFFFF" />
            {/* Cute Cheeks */}
            <circle cx="56" cy="96" r="5" fill="#FFA4B8" opacity="0.6" />
            <circle cx="104" cy="96" r="5" fill="#FFA4B8" opacity="0.6" />
            {/* Nose & Mouth */}
            <polygon points="78,94 82,94 80,97" fill="#FFA4B8" />
            <path d="M 76 99 Q 80 102 80 99 Q 80 102 84 99" stroke="#FFA4B8" strokeWidth="2" strokeLinecap="round" />
          </g>
        ) : pose === "cheering" ? (
          // Cheering / Jumping Cat Pose
          <g filter="url(#catGlow)">
            {/* Sparkles around */}
            <path d="M 25 40 L 28 46 L 34 49 L 28 52 L 25 58 L 22 52 L 16 49 L 22 46 Z" fill="#F6D69B" />
            <path d="M 135 30 L 137 34 L 142 36 L 137 38 L 135 42 L 133 38 L 128 36 L 133 34 Z" fill="#F6D69B" />
            {/* Tail */}
            <path d="M 115 110 Q 145 100 135 60 Q 130 50 120 70" stroke="url(#catBodyGradient)" strokeWidth="14" strokeLinecap="round" />
            {/* Body */}
            <ellipse cx="80" cy="115" rx="34" ry="36" fill="url(#catBodyGradient)" />
            {/* Raised Paws */}
            <path d="M 45 100 Q 30 70 42 60 Q 52 65 55 90" fill="url(#catBodyGradient)" />
            <ellipse cx="40" cy="60" rx="8" ry="8" fill="#FFA4B8" opacity="0.8" />
            <path d="M 115 100 Q 130 70 118 60 Q 108 65 105 90" fill="url(#catBodyGradient)" />
            <ellipse cx="120" cy="60" rx="8" ry="8" fill="#FFA4B8" opacity="0.8" />
            {/* Head */}
            <circle cx="80" cy="75" r="32" fill="url(#catBodyGradient)" />
            {/* Ears */}
            <path d="M 52 56 L 40 24 L 68 44 Z" fill="#2D283E" />
            <path d="M 54 54 L 44 30 L 66 44 Z" fill="#FFA4B8" opacity="0.8" />
            <path d="M 108 56 L 120 24 L 92 44 Z" fill="#2D283E" />
            <path d="M 106 54 L 116 30 L 94 44 Z" fill="#FFA4B8" opacity="0.8" />
            {/* Happy Eyes (😄 shape) */}
            <path d="M 60 74 Q 67 65 74 74" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <path d="M 86 74 Q 93 65 100 74" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            {/* Open Happy Mouth */}
            <path d="M 74 81 Q 80 92 86 81 Z" fill="#FFA4B8" />
            {/* Pink Cheeks */}
            <circle cx="56" cy="80" r="5" fill="#FFA4B8" opacity="0.7" />
            <circle cx="104" cy="80" r="5" fill="#FFA4B8" opacity="0.7" />
          </g>
        ) : (
          // Default: Sitting Cute Cat Pose
          <g filter="url(#catGlow)">
            {/* Tail */}
            <path
              d="M 110 120 C 140 120 145 80 130 65 C 120 55 115 70 122 85 C 128 98 120 120 105 125 Z"
              fill="url(#catBodyGradient)"
            />

            {/* Cat Body */}
            <ellipse cx="80" cy="118" rx="34" ry="32" fill="url(#catBodyGradient)" />
            <ellipse cx="80" cy="124" rx="20" ry="12" fill="#171522" opacity="0.4" />

            {/* Front Paws */}
            <rect x="62" y="128" width="14" height="22" rx="7" fill="#2D283E" stroke="#171522" strokeWidth="1.5" />
            <rect x="84" y="128" width="14" height="22" rx="7" fill="#2D283E" stroke="#171522" strokeWidth="1.5" />
            {/* Paw claws / lines */}
            <line x1="66" y1="144" x2="66" y2="148" stroke="#FFA4B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="70" y1="144" x2="70" y2="148" stroke="#FFA4B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="88" y1="144" x2="88" y2="148" stroke="#FFA4B8" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="92" y1="144" x2="92" y2="148" stroke="#FFA4B8" strokeWidth="1.5" strokeLinecap="round" />

            {/* Cat Head */}
            <ellipse cx="80" cy="74" rx="36" ry="30" fill="url(#catBodyGradient)" />

            {/* Cat Ears */}
            <path d="M 52 54 L 38 22 L 68 42 Z" fill="#2D283E" />
            <path d="M 54 52 L 42 28 L 66 42 Z" fill="#FFA4B8" opacity="0.8" />
            <path d="M 108 54 L 122 22 L 92 42 Z" fill="#2D283E" />
            <path d="M 106 52 L 118 28 L 94 42 Z" fill="#FFA4B8" opacity="0.8" />

            {/* Big Round White Eyes */}
            <circle cx="63" cy="72" r="10" fill="url(#catEyeShine)" />
            <circle cx="65" cy="70" r="4.5" fill="#171522" />
            <circle cx="62" cy="68" r="2.5" fill="#FFFFFF" />

            <circle cx="97" cy="72" r="10" fill="url(#catEyeShine)" />
            <circle cx="99" cy="70" r="4.5" fill="#171522" />
            <circle cx="96" cy="68" r="2.5" fill="#FFFFFF" />

            {/* Rosy Cheeks */}
            <ellipse cx="53" cy="80" rx="5" ry="3.5" fill="#FFA4B8" opacity="0.7" />
            <ellipse cx="107" cy="80" rx="5" ry="3.5" fill="#FFA4B8" opacity="0.7" />

            {/* Nose & Mouth */}
            <polygon points="78,77 82,77 80,80" fill="#FFA4B8" />
            <path d="M 75 83 Q 80 87 80 83 Q 80 87 85 83" stroke="#FFA4B8" strokeWidth="2" strokeLinecap="round" />

            {/* Whiskers */}
            <path d="M 46 76 L 26 72 M 45 80 L 24 80 M 47 84 L 28 87" stroke="#F6D69B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
            <path d="M 114 76 L 134 72 M 115 80 L 136 80 M 113 84 L 132 87" stroke="#F6D69B" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
          </g>
        )}
      </svg>
    </div>
  );
}
