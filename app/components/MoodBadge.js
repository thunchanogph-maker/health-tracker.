"use client";

export function MoodBadge({ mood, size = "md" }) {
  const map = {
    great: { emoji: "😸", label: "สดใสมาก", cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/40" },
    good:  { emoji: "😺", label: "อารมณ์ดี",  cls: "bg-sky-500/15 text-sky-400 border-sky-500/40" },
    okay:  { emoji: "😐", label: "เฉยๆ meow", cls: "bg-amber-500/15 text-amber-400 border-amber-500/40" },
    bad:   { emoji: "😿", label: "อารมณ์ไม่ดี", cls: "bg-orange-500/15 text-orange-400 border-orange-500/40" },
    awful: { emoji: "😾", label: "แย่จัง meow", cls: "bg-rose-500/15 text-rose-400 border-rose-500/40" },
  };
  const m = map[mood] || map.okay;
  const sz = size === "lg" ? "px-4 py-1.5 text-sm" : "px-3 py-1 text-xs";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border-2 font-black tracking-tight ${m.cls} ${sz}`}>
      <span>{m.emoji}</span>
      <span>{m.label}</span>
    </span>
  );
}
export default MoodBadge;
