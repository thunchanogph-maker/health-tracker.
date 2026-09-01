"use client";

export default function AppLogo({ size = 36, className = "" }) {
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
          <stop offset="0%" stopColor="#2D2845" />
          <stop offset="100%" stopColor="#191724" />
        </linearGradient>
        <radialGradient id="kuroEyeShine" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </radialGradient>
      </defs>

      {/* Rounded Background Card with Cat Ear Silhouette */}
      <rect width="100" height="100" rx="26" fill="url(#kuroLogoGrad)" stroke="#F6D69B" strokeWidth="2.5" />

      {/* Cat Ears Top Cutouts */}
      <path d="M 28 28 L 18 8 L 42 18 Z" fill="#2D2845" stroke="#F6D69B" strokeWidth="2" />
      <path d="M 30 26 L 22 14 L 40 20 Z" fill="#FFA4B8" />
      <path d="M 72 28 L 82 8 L 58 18 Z" fill="#2D2845" stroke="#F6D69B" strokeWidth="2" />
      <path d="M 70 26 L 78 14 L 60 20 Z" fill="#FFA4B8" />

      {/* Heart Health Emblem in Center */}
      <path
        d="M 50 78 C 30 62 20 48 20 34 C 20 22 29 16 40 16 C 46 16 50 20 50 22 C 50 20 54 16 60 16 C 71 16 80 22 80 34 C 80 48 70 62 50 78 Z"
        fill="#F6D69B"
        opacity="0.25"
      />

      {/* Cute Big White Eyes */}
      <circle cx="36" cy="48" r="9" fill="url(#kuroEyeShine)" />
      <circle cx="38" cy="46" r="4" fill="#191724" />
      <circle cx="35" cy="44" r="2.5" fill="#FFFFFF" />

      <circle cx="64" cy="48" r="9" fill="url(#kuroEyeShine)" />
      <circle cx="66" cy="46" r="4" fill="#191724" />
      <circle cx="63" cy="44" r="2.5" fill="#FFFFFF" />

      {/* Cute Pink Cheeks */}
      <circle cx="28" cy="56" r="4" fill="#FFA4B8" opacity="0.8" />
      <circle cx="72" cy="56" r="4" fill="#FFA4B8" opacity="0.8" />

      {/* Nose & Heart ECG Line */}
      <polygon points="48,54 52,54 50,57" fill="#FFA4B8" />

      <path
        d="M 24 72 L 36 72 L 42 60 L 50 82 L 58 52 L 64 76 L 70 72 L 76 72"
        stroke="#F6D69B"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
