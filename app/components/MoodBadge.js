"use client";

export function MoodBadge({ mood, size = "md" }) {
  const map = {
    great: { emoji: "😄", label: "Great", cls: "bg-green-100 text-green-700 border-green-300" },
    good:  { emoji: "😊", label: "Good",  cls: "bg-blue-100 text-blue-700 border-blue-300" },
    okay:  { emoji: "😐", label: "Okay",  cls: "bg-yellow-100 text-yellow-700 border-yellow-300" },
    bad:   { emoji: "😢", label: "Bad",   cls: "bg-orange-100 text-orange-700 border-orange-300" },
    awful: { emoji: "😭", label: "Awful", cls: "bg-red-100 text-red-700 border-red-300" },
  };
  const m = map[mood] || map.okay;
  const sz = size === "lg" ? "px-4 py-2 text-base" : "px-3 py-1 text-sm";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-semibold ${m.cls} ${sz}`}>
      {m.emoji} {m.label}
    </span>
  );
}
export default MoodBadge;
