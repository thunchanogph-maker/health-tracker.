"use client";

import { LOGO_IMG } from "./constants";

export default function AppLogo({ size = 36, className = "" }) {
  return (
    <img
      src={LOGO_IMG}
      alt="HealthTrack Logo"
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
