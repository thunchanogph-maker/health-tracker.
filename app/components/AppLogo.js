"use client";

export default function AppLogo({ size = 40, variant = "sticker", className = "" }) {
  if (variant === "badge") {
    return (
      <img
        src="/img/official_badge_logo.png"
        alt="HealthTrack Official Badge Logo"
        className={`object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Default & Sticker Logo: Official user image
  return (
    <img
      src="/img/official_sticker_logo.png"
      alt="HealthTrack Official Logo"
      className={`object-contain ${className}`}
      style={{ width: size, height: "auto", maxHeight: size }}
    />
  );
}
