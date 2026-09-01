"use client";

export default function AppLogo({ size = 36, variant = "compact", useImage = false, className = "" }) {
  const earGreen = "#A5DB74";
  const leafGreen = "#4E8552";

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
        <g transform="translate(30, 75) scale(0.7)">
          <path d="M 15 25 C 5 10 25 0 25 15 C 25 0 45 10 35 25 Q 25 40 25 40 Q 25 40 15 25 Z" fill="#E86A58" />
          <path d="M 25 15 Q 25 28 25 35" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        </g>
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
        <path d="M 60 125 C 40 135 160 135 140 125 C 120 115 80 115 60 125 Z" fill="#A5DB74" stroke="#4E8552" strokeWidth="2" />
        <circle cx="100" cy="80" r="28" fill="#18171B" />
        <path d="M 76 62 L 64 34 L 88 52 Z" fill="#18171B" />
        <path d="M 78 60 L 68 38 L 86 52 Z" fill={earGreen} />
        <path d="M 124 62 L 136 34 L 112 52 Z" fill="#18171B" />
        <path d="M 122 60 L 132 38 L 114 52 Z" fill={earGreen} />

        <circle cx="86" cy="78" r="8" fill="#FFF" />
        <circle cx="87" cy="77" r="4" fill="#18171B" />
        <path d="M 106 80 Q 114 70 120 80" stroke="#FFF" strokeWidth="3" strokeLinecap="round" />

        <polygon points="98,83 102,83 100,86" fill="#FFA4B8" />
        <path d="M 96 88 Q 100 93 104 88" stroke="#FFA4B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />

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
      <div className={`inline-flex flex-col items-center justify-center ${className}`}>
        <img
          src="/img/healthtrack_logo.jpg"
          alt="HealthTrack Official Logo Sticker"
          className="max-w-full h-auto rounded-2xl shadow-md border border-slate-200"
          style={{ width: size, maxHeight: size }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>
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
