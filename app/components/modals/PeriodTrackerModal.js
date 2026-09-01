"use client";

import { useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "../../pages/firebase";

export default function PeriodTrackerModal({ user, onClose, darkMode, theme }) {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [flow, setFlow] = useState("medium");
  const [symptoms, setSymptoms] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const SYMPTOMS = ["ปวดท้อง", "ปวดหลัง", "ปวดหัว", "คลื่นไส้", "อ่อนเพลีย", "อารมณ์แปรปรวน", "ท้องอืด", "เต้านมเจ็บ", "ง่วงนอน", "สิวขึ้น"];
  const FLOWS = [
    { value: "light", label: "เบา", emoji: "🩸", color: "#FDA4AF" },
    { value: "medium", label: "ปานกลาง", emoji: "🩸🩸", color: "#F43F5E" },
    { value: "heavy", label: "มาก", emoji: "🩸🩸🩸", color: "#9F1239" },
  ];

  const toggleS = (s) => setSymptoms((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const handleSave = async () => {
    if (!user?.uid) {
      setError("กรุณา Sign in ก่อน");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await push(ref(db, `users/${user.uid}/periodRecords`), {
        startDate,
        endDate: endDate || null,
        flow,
        symptoms,
        note: note.trim(),
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1800);
    } catch (err) {
      setError("บันทึกไม่สำเร็จ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const textM = darkMode ? "#F1F5F9" : "#1E293B";
  const textS = darkMode ? "#94A3B8" : "#64748B";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md rounded-3xl shadow-2xl overflow-hidden my-4" style={{ background: bg }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#F43F5E,#FB7185)" }}>
          <div>
            <h3 className="font-black text-white text-lg">🩸 บันทึกประจำเดือน</h3>
            <p className="text-white/70 text-xs mt-0.5">ติดตามรอบเดือนและอาการ</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">✕</button>
        </div>
        <div className="p-6 space-y-5">
          {success && <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold">✅ บันทึกสำเร็จแล้วค่ะ!</div>}
          {error && <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm">❌ {error}</div>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: textS }}>📅 วันที่เริ่ม</label>
              <input type="date" value={startDate} max={today} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm outline-none" style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", background: darkMode ? "#2D2D3F" : "#FFF", color: textM }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: textS }}>📅 สิ้นสุด <span className="font-normal opacity-60">(ไม่บังคับ)</span></label>
              <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border rounded-xl text-sm outline-none" style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", background: darkMode ? "#2D2D3F" : "#FFF", color: textM }} />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: textS }}>🩸 ปริมาณเลือด</label>
            <div className="grid grid-cols-3 gap-2">
              {FLOWS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFlow(f.value)}
                  className="flex flex-col items-center py-3 rounded-xl border-2 text-xs font-bold transition-all"
                  style={{
                    borderColor: flow === f.value ? f.color : darkMode ? "#3D3D4F" : "#E2E8F0",
                    background: flow === f.value ? f.color + "20" : darkMode ? "#2D2D3F" : "#FFF",
                    color: flow === f.value ? f.color : textS,
                    transform: flow === f.value ? "scale(1.05)" : "scale(1)",
                  }}
                >
                  <span className="text-lg mb-1">{f.emoji}</span>{f.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: textS }}>🤒 อาการที่มี <span className="font-normal opacity-60">(เลือกได้หลายข้อ)</span></label>
            <div className="flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleS(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all"
                  style={{
                    borderColor: symptoms.includes(s) ? "#F43F5E" : darkMode ? "#3D3D4F" : "#E2E8F0",
                    background: symptoms.includes(s) ? "#FFF1F2" : darkMode ? "#2D2D3F" : "#FFF",
                    color: symptoms.includes(s) ? "#F43F5E" : textS,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: textS }}>📝 บันทึกเพิ่มเติม</label>
            <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="บันทึกสิ่งที่รู้สึก..." className="w-full px-3 py-2 border rounded-xl text-sm resize-none outline-none" style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", background: darkMode ? "#2D2D3F" : "#FFF", color: textM }} />
          </div>
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold" style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", color: textS, background: darkMode ? "#2D2D3F" : "#FFF" }}>ยกเลิก</button>
            <button onClick={handleSave} disabled={loading} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{ background: loading ? "#94A3B8" : "linear-gradient(135deg,#F43F5E,#FB7185)" }}>
              {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>กำลังบันทึก...</> : "💾 บันทึก"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
