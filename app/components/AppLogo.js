"use client";

export default function AppLogo({ size = 36, variant = "compact", className = "" }) {
  const earGreen = "#A5DB74";
  const leafGreen = "#4E8552";

  if (variant === "badge") {
    // Round Emblem Badge Logo matching Image 3
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <defs>
          <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Outer Circular Ring */}
        <circle cx="100" cy="100" r="95" fill="#FFFDF8" stroke="#7BAE73" strokeWidth="4" filter="url(#badgeShadow)" />
        <circle cx="100" cy="100" r="88" fill="none" stroke="#D3E8CD" strokeWidth="2" strokeDasharray="4 4" />

        {/* Small Hearts around ring */}
        <path d="M 100 15 Q 98 12 96 15 Q 94 18 100 23 Q 106 18 104 15 Q 102 12 100 15 Z" fill="#7BAE73" />
        <path d="M 100 185 Q 98 182 96 185 Q 94 188 100 193 Q 106 188 104 185 Q 102 182 100 185 Z" fill="#7BAE73" />

        {/* Floating Health Icons */}
        {/* Heart Leaf Left */}
        <g transform="translate(30, 75) scale(0.7)">
          <path d="M 15 25 C 5 10 25 0 25 15 C 25 0 45 10 35 25 Q 25 40 25 40 Q 25 40 15 25 Z" fill="#E86A58" />
          <path d="M 25 15 Q 25 28 25 35" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </g>
        {/* Calendar Right */}
        <g transform="translate(145, 75) scale(0.65)">
          <rect x="0" y="5" width="30" height="30" rx="6" fill="#FFF" stroke="#E86A58" strokeWidth="2" />
          <rect x="0" y="5" width="30" height="8" rx="2" fill="#E86A58" />
          <circle cx="8" cy="18" r="2" fill="#7BAE73" />
          <circle cx="15" cy="18" r="2" fill="#7BAE73" />
          <circle cx="22" cy="18" r="2" fill="#7BAE73" />
          <circle cx="8" cy="26" r="2" fill="#7BAE73" />
          <circle cx="15" cy="26" r="2" fill="#7BAE73" />
        </g>

        {/* Winking Kuro Cat sitting on leaf */}
        {/* Leaf cushion */}
        <path d="M 60 125 C 40 135 160 135 140 125 C 120 115 80 115 60 125 Z" fill="#A5DB74" stroke="#4E8552" strokeWidth="2" />

        {/* Cat Head */}
        <circle cx="100" cy="80" r="28" fill="#18171B" />
        {/* Green inner ears */}
        <path d="M 76 62 L 64 34 L 88 52 Z" fill="#18171B" />
        <path d="M 78 60 L 68 38 L 86 52 Z" fill={earGreen} />
        <path d="M 124 62 L 136 34 L 112 52 Z" fill="#18171B" />
        <path d="M 122 60 L 132 38 L 114 52 Z" fill={earGreen} />

        {/* Winking Eye */}
        <circle cx="86" cy="78" r="8" fill="#FFF" />
        <circle cx="87" cy="77" r="4" fill="#18171B" />
        <path d="M 106 80 Q 114 70 120 80" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />

        {/* Nose & Mouth */}
        <polygon points="98,83 102,83 100,86" fill="#FFA4B8" />
        <path d="M 96 88 Q 100 93 104 88" stroke="#FFA4B8" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Bottom Banner Title */}
        <rect x="35" y="132" width="130" height="34" rx="8" fill="#FFF" stroke="#4E8552" strokeWidth="2.5" />
        <text x="100" y="148" textAnchor="middle" fontSize="13" fontWeight="900" fill="#2E4A29" letterSpacing="0.5">HEALTHTRACK</text>
        <text x="100" y="160" textAnchor="middle" fontSize="6.5" fontWeight="800" fill="#4E8552" letterSpacing="0.8">PERSONAL WELL-BEING TRACKER</text>
      </svg>
    );
  }

  if (variant === "sticker") {
    // Sticker Banner Logo matching Image 1
    return (
      <svg
        width={size}
        height={Math.round(size * 0.55)}
        viewBox="0 0 320 170"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <defs>
          <filter id="stickerGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.12" />
          </filter>
        </defs>

        {/* Sticker Outer White Outline Card */}
        <path
          d="M 25 15 C 10 15 5 25 5 40 L 5 130 C 5 145 15 155 30 155 L 290 155 C 305 155 315 145 315 130 L 315 40 C 315 25 305 15 290 15 Z"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="3"
          filter="url(#stickerGlow)"
        />

        {/* Cloud top with Water & Calendar */}
        <g transform="translate(145, 12) scale(0.7)">
          <path d="M 20 30 Q 10 30 10 20 Q 10 8 25 10 Q 32 0 45 5 Q 55 0 65 10 Q 75 10 75 22 Q 75 30 65 30 Z" fill="#FFEAE6" stroke="#FFA4B8" strokeWidth="2" />
          <text x="22" y="22" fontSize="16">📅</text>
          <text x="45" y="22" fontSize="16">💧</text>
        </g>

        {/* Kuro Cat Mascot holding green bar */}
        <g transform="translate(25, 20)">
          {/* Zigzag Arrow Tail */}
          <path d="M 25 80 L 15 70 L 25 55 L 10 45 L 13 40 L 0 43 L 7 55 L 11 50 L 20 61 L 10 75 Z" fill="#18171B" />
          {/* Body */}
          <ellipse cx="60" cy="70" rx="26" ry="24" fill="#18171B" />
          {/* Head */}
          <ellipse cx="55" cy="38" rx="28" ry="22" fill="#18171B" />
          {/* Green Inner Ears */}
          <path d="M 34 22 L 20 0 L 45 12 Z" fill="#18171B" />
          <path d="M 35 20 L 24 4 L 43 12 Z" fill={earGreen} />
          <path d="M 76 22 L 90 0 L 65 12 Z" fill="#18171B" />
          <path d="M 75 20 L 86 4 L 67 12 Z" fill={earGreen} />
          {/* Eyes */}
          <path d="M 40 36 Q 46 28 52 36" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M 58 36 Q 64 28 70 36" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />
          <polygon points="54,40 58,40 56,43" fill="#FFA4B8" />

          {/* Green Tracker Bar held */}
          <rect x="42" y="52" width="40" height="9" rx="4.5" fill="#FFF" stroke={earGreen} strokeWidth="1.5" />
          <rect x="44" y="54" width="24" height="5" rx="2.5" fill={earGreen} />
          {/* Arrow rising */}
          <path d="M 80 55 C 88 50 92 60 100 40 C 105 30 110 45 115 25" stroke={earGreen} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 110 23 L 118 23 L 116 31 Z" fill={earGreen} />
        </g>

        {/* Text Logo: HealthTrack */}
        <text x="145" y="112" fontSize="34" fontWeight="900" fill="#3D683A" fontFamily="sans-serif">Health<tspan fill="#5B9A55">Track</tspan></text>

        {/* ECG pulse line & Leaf Icon next to text */}
        <path stroke="#3D683A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 180 128 L 195 128 L 202 118 L 210 138 L 218 110 L 225 132 L 232 128 L 245 128" />
        {/* Leaf */}
        <path d="M 250 122 C 245 115 255 110 262 114 C 265 122 258 128 250 122 Z" fill="#3D683A" />
      </svg>
    );
  }

  // Default: Compact Icon Logo (Square Badge)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <defs>
        <linearGradient id="kuroLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#252428" />
          <stop offset="100%" stopColor="#100F13" />
        </linearGradient>
        <radialGradient id="kuroEyeShine" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
      </defs>

      {/* Background Card */}
      <rect width="100" height="100" rx="26" fill="url(#kuroLogoGrad)" stroke={earGreen} strokeWidth="2.5" />

      {/* Cat Ears Top with Green Inner Ears */}
      <path d="M 28 28 L 18 8 L 42 18 Z" fill="#100F13" stroke={earGreen} strokeWidth="1.5" />
      <path d="M 30 26 L 22 14 L 40 20 Z" fill={earGreen} />
      <path d="M 72 28 L 82 8 L 58 18 Z" fill="#100F13" stroke={earGreen} strokeWidth="1.5" />
      <path d="M 70 26 L 78 14 L 60 20 Z" fill={earGreen} />

      {/* Big White/Yellow Eyes */}
      <circle cx="36" cy="48" r="9" fill="url(#kuroEyeShine)" />
      <circle cx="38" cy="46" r="4" fill="#100F13" />
      <circle cx="35" cy="44" r="2.5" fill="#FFFFFF" />

      <circle cx="64" cy="48" r="9" fill="url(#kuroEyeShine)" />
      <circle cx="66" cy="46" r="4" fill="#100F13" />
      <circle cx="63" cy="44" r="2.5" fill="#FFFFFF" />

      {/* Pink Cheeks */}
      <circle cx="28" cy="56" r="4" fill="#FFA4B8" opacity="0.8" />
      <circle cx="72" cy="56" r="4" fill="#FFA4B8" opacity="0.8" />

      {/* Nose */}
      <polygon points="48,54 52,54 50,57" fill="#FFA4B8" />

      {/* Green ECG Pulse & Leaf at bottom */}
      <path
        d="M 20 74 L 32 74 L 38 64 L 46 84 L 54 56 L 60 78 L 66 74 L 74 74"
        stroke={earGreen}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Leaf icon at right edge */}
      <path d="M 76 70 C 73 65 82 62 87 66 C 89 72 82 76 76 70 Z" fill={leafGreen} />
    </svg>
  );
}
