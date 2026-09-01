"use client";

import { useState } from "react";
import { ref, set } from "firebase/database";
import { db } from "../../pages/firebase";

export default function BmiModal({ user, onClose, darkMode, theme, existingBmi }) {
  const [weight, setWeight] = useState(existingBmi?.weight || "");
  const [height, setHeight] = useState(existingBmi?.height || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const bmi = weight && height ? (weight / ((height / 100) ** 2)).toFixed(1) : null;

  const getBmiLabel = (b) => {
    if (!b) return null;
    const n = parseFloat(b);
    if (n < 18.5) return { label: "น้ำหนักน้อย", color: "#3B82F6" };
    if (n < 25) return { label: "ปกติ", color: "#10B981" };
    if (n < 30) return { label: "น้ำหนักเกิน", color: "#F59E0B" };
    return { label: "อ้วน", color: "#EF4444" };
  };

  const bmiInfo = getBmiLabel(bmi);

  const handleSave = async () => {
    if (!user?.uid) {
      setError("กรุณา Sign in ก่อน");
      return;
    }
    if (!weight || !height) {
      setError("กรุณากรอกน้ำหนักและส่วนสูง");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await set(ref(db, `users/${user.uid}/bmiRecord`), {
        weight: Number(weight),
        height: Number(height),
        bmi: Number(bmi),
        updatedAt: new Date().toISOString(),
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
  const inputStyle = { borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", background: darkMode ? "#2D2D3F" : "#FFF", color: textM };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden" style={{ background: bg }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#8B5CF6,#6366F1)" }}>
          <div>
            <h3 className="font-black text-white text-lg">⚖️ น้ำหนัก & ส่วนสูง</h3>
            <p className="text-white/70 text-xs mt-0.5">คำนวณค่า BMI ของคุณ</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">✕</button>
        </div>
        <div className="p-6 space-y-5">
          {success && <div className="flex items-center gap-2 bg-green-50 border border-green-300 text-green-700 rounded-xl px-4 py-3 text-sm font-semibold">✅ บันทึกสำเร็จแล้วค่ะ!</div>}
          {error && <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm">❌ {error}</div>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: textS }}>⚖️ น้ำหนัก (กก.)</label>
              <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="65" min="20" max="300" className="w-full px-3 py-2.5 border rounded-xl text-sm outline-none text-center font-bold" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: textS }}>📏 ส่วนสูง (ซม.)</label>
              <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="165" min="100" max="250" className="w-full px-3 py-2.5 border rounded-xl text-sm outline-none text-center font-bold" style={inputStyle} />
            </div>
          </div>
          {bmi && bmiInfo && (
            <div className="rounded-2xl p-4 text-center border-2" style={{ borderColor: bmiInfo.color + "50", background: bmiInfo.color + "10" }}>
              <div className="text-4xl font-black mb-1" style={{ color: bmiInfo.color }}>{bmi}</div>
              <div className="text-sm font-bold" style={{ color: bmiInfo.color }}>{bmiInfo.label}</div>
              <div className="text-xs mt-1" style={{ color: textS }}>BMI = น้ำหนัก(กก.) ÷ ส่วนสูง(ม.)²</div>
              <div className="mt-3 relative h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(90deg,#3B82F6,#10B981,#F59E0B,#EF4444)" }}>
                <div className="absolute top-0 w-3 h-3 rounded-full bg-white border-2 border-gray-600 shadow" style={{ left: `${Math.min(Math.max(((parseFloat(bmi) - 15) / 25) * 100, 0), 100)}%`, transform: "translateX(-50%)" }} />
              </div>
              <div className="flex justify-between text-xs mt-1" style={{ color: textS }}><span>15</span><span>18.5</span><span>25</span><span>30</span><span>40</span></div>
            </div>
          )}
          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold" style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", color: textS, background: darkMode ? "#2D2D3F" : "#FFF" }}>ยกเลิก</button>
            <button onClick={handleSave} disabled={loading} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{ background: loading ? "#94A3B8" : "linear-gradient(135deg,#8B5CF6,#6366F1)" }}>
              {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>กำลังบันทึก...</> : "💾 บันทึก"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
