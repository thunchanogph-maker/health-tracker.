"use client";

export default function AppLogo({ size = 36, variant = "compact", useImage = false, className = "" }) {
  const earGreen = "#A5DB74";
  const leafGreen = "#4E8552";
  const textGreen = "#2E4A29";

  if (useImage || variant === "image") {
    return (
      <img
        src="/img/healthtrack_logo.jpg"
        alt="HealthTrack Logo"
        className={`object-contain rounded-2xl ${className}`}
        style={{ width: size, height: "auto", maxHeight: size }}
      />
    );
  }

  if (variant === "badge") {
    // 1. Round Emblem Badge Logo matching Image 1 uploaded by user
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <defs>
          <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000000" floodOpacity="0.1" />
          </filter>
          <linearGradient id="badgeLeafGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A5DB74" />
            <stop offset="100%" stopColor="#7BAE73" />
          </linearGradient>
        </defs>

        {/* Outer Circular Ring Background */}
        <circle cx="120" cy="120" r="110" fill="#FFFDF8" stroke="#7BAE73" strokeWidth="4.5" filter="url(#badgeShadow)" />
        <circle cx="120" cy="120" r="102" fill="none" stroke="#D3E8CD" strokeWidth="2.5" strokeDasharray="5 5" />

        {/* Outer Hearts Decor */}
        <path d="M 120 18 Q 117 14 114 18 Q 111 22 120 28 Q 129 22 126 18 Q 123 14 120 18 Z" fill="#7BAE73" />
        <path d="M 120 222 Q 117 218 114 222 Q 111 226 120 232 Q 129 226 126 222 Q 123 218 120 222 Z" fill="#7BAE73" />
        <path d="M 18 120 Q 14 117 18 114 Q 22 111 28 120 Q 22 129 18 126 Q 14 123 18 120 Z" fill="#7BAE73" />
        <path d="M 222 120 Q 218 117 222 114 Q 226 111 232 120 Q 226 129 222 126 Q 218 123 222 120 Z" fill="#7BAE73" />

        {/* Floating Health Icons */}
        {/* Heart Leaf Left */}
        <g transform="translate(36, 88) scale(0.85)">
          <path d="M 20 30 C 5 12 30 0 30 18 C 30 0 55 12 40 30 Q 30 48 30 48 Q 30 48 20 30 Z" fill="#E86A58" stroke="#3D2925" strokeWidth="2" />
          <path d="M 30 18 Q 30 34 30 42" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Green stem leaves at bottom */}
          <path d="M 20 42 C 10 40 10 50 24 46 Z" fill="#7BAE73" />
          <path d="M 40 42 C 50 40 50 50 36 46 Z" fill="#7BAE73" />
        </g>

        {/* Calendar Right */}
        <g transform="translate(170, 88) scale(0.8)">
          <rect x="0" y="6" width="36" height="36" rx="8" fill="#FFF" stroke="#3D2925" strokeWidth="2.5" />
          <path d="M 0 14 C 0 8 4 6 10 6 L 26 6 C 32 6 36 8 36 14 L 36 16 L 0 16 Z" fill="#E86A58" stroke="#3D2925" strokeWidth="1.5" />
          {/* Flower on calendar header */}
          <circle cx="18" cy="11" r="3" fill="#FFE27A" />
          <circle cx="18" cy="7" r="1.5" fill="#E86A58" />
          <circle cx="22" cy="11" r="1.5" fill="#E86A58" />
          <circle cx="18" cy="15" r="1.5" fill="#E86A58" />
          <circle cx="14" cy="11" r="1.5" fill="#E86A58" />
          {/* Grid Dots */}
          <circle cx="9" cy="23" r="2.5" fill="#7BAE73" />
          <circle cx="18" cy="23" r="2.5" fill="#7BAE73" />
          <circle cx="27" cy="23" r="2.5" fill="#7BAE73" />
          <circle cx="9" cy="32" r="2.5" fill="#7BAE73" />
          <circle cx="18" cy="32" r="2.5" fill="#7BAE73" />
          <circle cx="27" cy="32" r="2.5" fill="#7BAE73" />
        </g>

        {/* Leaf Cushion Base */}
        <path d="M 68 145 C 40 158 200 158 172 145 C 150 135 90 135 68 145 Z" fill="url(#badgeLeafGrad)" stroke="#4E8552" strokeWidth="2.5" />
        <path d="M 75 147 Q 120 152 165 147" stroke="#FFF" strokeWidth="2" fill="none" opacity="0.6" />

        {/* Winking Kuro Cat */}
        <g transform="translate(0, 5)">
          {/* Tail */}
          <path d="M 140 120 C 175 115 178 75 165 60 C 155 50 148 65 155 80 Z" fill="#18171B" stroke="#000" strokeWidth="2" />

          {/* Body & Paws */}
          <ellipse cx="120" cy="118" rx="32" ry="28" fill="#18171B" stroke="#000" strokeWidth="2" />

          {/* Cat Head */}
          <circle cx="120" cy="78" r="32" fill="#18171B" stroke="#000" strokeWidth="2" />

          {/* Green Inner Ears */}
          <path d="M 94 58 L 78 26 L 106 48 Z" fill="#18171B" stroke="#000" strokeWidth="2" />
          <path d="M 95 56 L 82 32 L 104 48 Z" fill={earGreen} />
          <path d="M 146 58 L 162 26 L 134 48 Z" fill="#18171B" stroke="#000" strokeWidth="2" />
          <path d="M 145 56 L 158 32 L 136 48 Z" fill={earGreen} />

          {/* Open Eye Left */}
          <circle cx="102" cy="75" r="10" fill="#FFF" stroke="#000" strokeWidth="2" />
          <circle cx="104" cy="74" r="5" fill="#18171B" />
          <circle cx="101" cy="72" r="2.5" fill="#FFF" />

          {/* Winking Eye Right */}
          <path d="M 126 77 Q 136 65 144 77" stroke="#000" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Nose & Mouth */}
          <polygon points="118,81 122,81 120,84" fill="#FFA4B8" />
          <path d="M 115 86 Q 120 92 125 86" stroke="#FFA4B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Chart & Pen Held */}
          <rect x="95" y="112" width="28" height="20" rx="4" fill="#FFF" stroke="#3D2925" strokeWidth="2" />
          <rect x="98" y="122" width="5" height="7" fill="#E86A58" />
          <rect x="105" y="118" width="5" height="11" fill="#FFE27A" />
          <rect x="112" y="115" width="5" height="14" fill="#7BAE73" />
          {/* Pen */}
          <line x1="94" y1="106" x2="98" y2="114" stroke="#7BAE73" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Bottom Banner Title */}
        <g transform="translate(0, 10)">
          <rect x="42" y="152" width="156" height="42" rx="10" fill="#FFF" stroke="#4E8552" strokeWidth="3" filter="url(#badgeShadow)" />
          <text x="120" y="174" textAnchor="middle" fontSize="16" fontWeight="900" fill={textGreen} letterSpacing="0.8">HEALTHTRACK</text>
          <text x="120" y="187" textAnchor="middle" fontSize="8" fontWeight="800" fill="#4E8552" letterSpacing="0.6">PERSONAL WELL-BEING TRACKER</text>

          {/* Firebase Icon at bottom */}
          <g transform="translate(112, 197) scale(0.6)">
            <path d="M 3.8 14.6 L 9.2 4.2 L 13.5 12.2 Z" fill="#FFC107" />
            <path d="M 13.5 12.2 L 16.5 6.5 L 20.2 14.6 Z" fill="#FFA000" />
            <path d="M 3.8 14.6 L 12 22 L 20.2 14.6 Z" fill="#FFCA28" />
          </g>
        </g>
      </svg>
    );
  }

  if (variant === "sticker") {
    // 2. Header Sticker Logo matching Image 2 uploaded by user
    return (
      <svg
        width={size}
        height={Math.round(size * 0.52)}
        viewBox="0 0 340 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ display: "inline-block", verticalAlign: "middle" }}
      >
        <defs>
          <filter id="stickerGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#000000" floodOpacity="0.1" />
          </filter>
          <linearGradient id="trackerGreenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#A5DB74" />
            <stop offset="100%" stopColor="#4E8552" />
          </linearGradient>
        </defs>

        {/* White Outer Sticker Border Card */}
        <path
          d="M 30 15 C 15 15 8 28 8 45 L 8 135 C 8 152 18 165 35 165 L 305 165 C 322 165 332 152 332 135 L 332 45 C 332 28 322 15 305 15 Z"
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="3.5"
          filter="url(#stickerGlow)"
        />

        {/* Top Pink Cloud with Calendar & Water Bottle */}
        <g transform="translate(155, 10) scale(0.75)">
          <path d="M 20 32 Q 8 32 8 20 Q 8 6 25 8 Q 32 -4 48 2 Q 60 -4 72 8 Q 85 8 85 22 Q 85 32 72 32 Z" fill="#FFEAE6" stroke="#FFA4B8" strokeWidth="2.5" />
          <text x="24" y="24" fontSize="18">📅</text>
          <text x="50" y="24" fontSize="18">💧</text>
        </g>

        {/* Kuro Cat Mascot holding progress bar */}
        <g transform="translate(25, 20)">
          {/* Zigzag Arrow Tail on left */}
          <path d="M 30 95 L 18 82 L 30 65 L 12 52 L 16 46 L 0 50 L 8 65 L 12 58 L 22 72 L 12 88 Z" fill="#18171B" stroke="#000" strokeWidth="2" />

          {/* Body */}
          <ellipse cx="70" cy="80" rx="30" ry="26" fill="#18171B" stroke="#000" strokeWidth="2" />

          {/* Cat Head */}
          <ellipse cx="62" cy="44" rx="32" ry="25" fill="#18171B" stroke="#000" strokeWidth="2" />

          {/* Green Inner Ears */}
          <path d="M 38 26 L 22 0 L 52 14 Z" fill="#18171B" stroke="#000" strokeWidth="2" />
          <path d="M 39 24 L 26 5 L 50 14 Z" fill={earGreen} />
          <path d="M 86 26 L 102 0 L 72 14 Z" fill="#18171B" stroke="#000" strokeWidth="2" />
          <path d="M 85 24 L 98 5 L 74 14 Z" fill={earGreen} />

          {/* Smiling Eyes */}
          <path d="M 45 42 Q 52 32 60 42" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 66 42 Q 73 32 81 42" stroke="#FFF" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Nose & Mouth with tongue */}
          <polygon points="61,46 65,46 63,49" fill="#FFA4B8" />
          <path d="M 60 52 Q 63 57 66 52 Z" fill="#FFA4B8" />

          {/* Green Progress Bar held in paws */}
          <rect x="48" y="60" width="46" height="11" rx="5.5" fill="#FFF" stroke={earGreen} strokeWidth="2" />
          <rect x="50" y="62" width="28" height="7" rx="3.5" fill="url(#trackerGreenGrad)" />
          {/* Paws */}
          <circle cx="46" cy="65.5" r="7" fill="#18171B" stroke="#000" strokeWidth="1.5" />
          <circle cx="96" cy="65.5" r="7" fill="#18171B" stroke="#000" strokeWidth="1.5" />

          {/* Rising Green Curved Arrow */}
          <path d="M 94 62 C 105 52 110 68 122 45 C 128 32 134 50 142 26" stroke={earGreen} strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M 136 24 L 146 24 L 143 34 Z" fill={earGreen} />
        </g>

        {/* Text Logo: HealthTrack */}
        <text x="155" y="125" fontSize="38" fontWeight="900" fill="#3D683A" fontFamily="sans-serif" letterSpacing="-0.5">
          Health<tspan fill="#5B9A55">Track</tspan>
        </text>

        {/* ECG pulse wave & Leaf Icon next to text */}
        <path stroke="#3D683A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M 195 142 L 212 142 L 220 130 L 228 152 L 236 120 L 244 146 L 252 142 L 265 142" />
        {/* Leaf at right */}
        <path d="M 272 135 C 266 126 278 120 286 125 C 290 134 282 142 272 135 Z" fill="#3D683A" />
      </svg>
    );
  }

  // 3. Default: Compact Icon Logo
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

      <rect width="100" height="100" rx="26" fill="url(#kuroLogoGrad)" stroke={earGreen} strokeWidth="2.5" />

      {/* Cat Ears Top with Green Inner Ears */}
      <path d="M 28 28 L 18 8 L 42 18 Z" fill="#100F13" stroke={earGreen} strokeWidth="1.5" />
      <path d="M 30 26 L 22 14 L 40 20 Z" fill={earGreen} />
      <path d="M 72 28 L 82 8 L 58 18 Z" fill="#100F13" stroke={earGreen} strokeWidth="1.5" />
      <path d="M 70 26 L 78 14 L 60 20 Z" fill={earGreen} />

      <circle cx="36" cy="48" r="9" fill="url(#kuroEyeShine)" />
      <circle cx="38" cy="46" r="4" fill="#100F13" stroke="none" />
      <circle cx="35" cy="44" r="2.5" fill="#FFFFFF" />

      <circle cx="64" cy="48" r="9" fill="url(#kuroEyeShine)" />
      <circle cx="66" cy="46" r="4" fill="#100F13" stroke="none" />
      <circle cx="63" cy="44" r="2.5" fill="#FFFFFF" />

      <circle cx="28" cy="56" r="4" fill="#FFA4B8" opacity="0.8" />
      <circle cx="72" cy="56" r="4" fill="#FFA4B8" opacity="0.8" />

      <polygon points="48,54 52,54 50,57" fill="#FFA4B8" />

      <path
        d="M 20 74 L 32 74 L 38 64 L 46 84 L 54 56 L 60 78 L 66 74 L 74 74"
        stroke={earGreen}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M 76 70 C 73 65 82 62 87 66 C 89 72 82 76 76 70 Z" fill={leafGreen} />
    </svg>
  );
}
