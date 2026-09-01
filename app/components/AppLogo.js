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
        <linearGradient id="htLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      {/* Background Rounded Shield */}
      <rect width="100" height="100" rx="26" fill="url(#htLogoGradient)" />
      
      {/* Heart Shape Silhouette */}
      <path
        d="M50 80 C26 62 16 48 16 33 C16 21 25 14 36 14 C43 14 48 18 50 22 C52 18 57 14 64 14 C75 14 84 21 84 33 C84 48 74 62 50 80 Z"
        fill="white"
        fillOpacity="0.25"
      />
      
      {/* ECG / Heartbeat Line */}
      <path
        d="M20 50 L33 50 L39 34 L47 66 L55 26 L62 58 L68 50 L80 50"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Glowing Star / Dot */}
      <circle cx="80" cy="50" r="4" fill="#FDE047" />
    </svg>
  );
}
