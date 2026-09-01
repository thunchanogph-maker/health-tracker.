"use client";

import { useState, useEffect, useRef } from "react";
import { ref, push, update, remove } from "firebase/database";
import { db } from "./firebase";
import MoodBadge from "../components/MoodBadge";

const MOODS = [
  { value: "great", emoji: "😸", label: "สดใสมาก", bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  { value: "good", emoji: "😺", label: "อารมณ์ดี", bg: "#EFF6FF", text: "#2563EB", border: "#BFDBFE" },
  { value: "okay", emoji: "😐", label: "เฉยๆ", bg: "#FEF3C7", text: "#D97706", border: "#FDE68A" },
  { value: "bad", emoji: "😿", label: "ไม่ค่อยดี", bg: "#FFEDD5", text: "#EA580C", border: "#FED7AA" },
  { value: "awful", emoji: "😾", label: "แย่จัง", bg: "#FEE2E2", text: "#DC2626", border: "#FECACA" },
];

export default function HealthForm({ user, records = [], setActiveTab }) {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [mood, setMood] = useState("great");
  const [sleepHours, setSleepHours] = useState(7);
  const [waterIntake, setWaterIntake] = useState(8);
  const [exerciseMinutes, setExerciseMinutes] = useState(30);
  const [stressLevel, setStressLevel] = useState(1);
  const [note, setNote] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  // Check if a record already exists for the selected date
  useEffect(() => {
    const existingRec = records.find((r) => r.date === date);
    if (existingRec) {
      setEditingId(existingRec.id);
      setMood(existingRec.mood || "great");
      setSleepHours(existingRec.sleepHours ?? 7);
      setWaterIntake(existingRec.waterIntake ?? 8);
      setExerciseMinutes(existingRec.exerciseMinutes ?? 30);
      setStressLevel(existingRec.stressLevel ?? 1);
      setNote(existingRec.note || "");
      setPhoto(existingRec.photo || null);
    } else {
      setEditingId(null);
      setMood("great");
      setSleepHours(7);
      setWaterIntake(8);
      setExerciseMinutes(30);
      setStressLevel(1);
      setNote("");
      setPhoto(null);
    }
  }, [date, records]);

  // Handle Photo File Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพเท่านั้น");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 2MB");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target.result);
    reader.readAsDataURL(file);
  };

  // Handle Submit (Create or Update)
  const handleSubmit = async () => {
    if (!user?.uid) {
      setError("กรุณา Sign in ก่อนบันทึกข้อมูล meow~");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const recordData = {
        date,
        mood,
        sleepHours,
        waterIntake,
        exerciseMinutes,
        stressLevel,
        note: note.trim(),
        photo: photo || null,
        updatedAt: new Date().toISOString(),
      };

      if (editingId) {
        // Update existing record for this date
        await update(ref(db, `users/${user.uid}/healthRecords/${editingId}`), recordData);
      } else {
        // Create new record for this date
        recordData.createdAt = new Date().toISOString();
        await push(ref(db, `users/${user.uid}/healthRecords`), recordData);
      }

      // Auto +1 Pat for Kuro-chan
      const currentPat = parseInt(localStorage.getItem("kuro-pat-count") || "0", 10);
      const newPatCount = currentPat + 1;
      localStorage.setItem("kuro-pat-count", newPatCount.toString());

      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("kuro-pat-updated", { detail: { count: newPatCount } }));
      }

      // Auto Redirect to Overview page
      if (setActiveTab) {
        setActiveTab("overview");
      }
    } catch (err) {
      setError("บันทึกข้อมูลไม่สำเร็จ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Delete Record
  const handleDelete = async () => {
    if (!editingId || !user?.uid) return;
    if (!confirm("คุณต้องการลบบันทึกของวันนี้ใช่หรือไม่?")) return;
    setLoading(true);
    setError(null);
    try {
      await remove(ref(db, `users/${user.uid}/healthRecords/${editingId}`));
      if (setActiveTab) {
        setActiveTab("overview");
      }
    } catch (err) {
      setError("ลบข้อมูลไม่สำเร็จ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {error && (
        <div className="flex items-center gap-3 bg-rose-500/15 border-2 border-rose-400 text-rose-500 rounded-2xl px-5 py-3 text-sm font-bold">
          <span className="text-xl">❌</span>
          {error}
        </div>
      )}

      {/* Date Picker Header with Edit Mode Indicator */}
      <div className="p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3" style={{ background: "rgba(246,214,155,0.12)", borderColor: "#F6D69B" }}>
        <div className="flex items-center gap-2">
          <span className="text-lg">📅</span>
          <div>
            <label className="text-xs font-black block" style={{ color: "#F6D69B" }}>
              เลือกวันที่บันทึกสุขภาพ
            </label>
            {editingId ? (
              <span className="text-[11px] font-bold text-amber-400">
                ✏️ พบข้อมูลวันที่เลือกแล้ว (โหมดแก้ไข/อัปเดตบันทึก)
              </span>
            ) : (
              <span className="text-[11px] font-medium text-slate-400">
                เขียนบันทึกสุขภาพใหม่สำหรับวันนี้
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            max={today}
            onChange={(e) => setDate(e.target.value)}
            className="px-4 py-2 rounded-xl font-bold text-xs outline-none border transition cursor-pointer"
            style={{ background: "#252238", color: "#F8F6FE", borderColor: "#3D3759" }}
          />
          {editingId && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="px-3 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/20 border border-rose-400/40 hover:bg-rose-500 hover:text-white transition"
              title="ลบบันทึกวันหนี้"
            >
              🗑️ ลบ
            </button>
          )}
        </div>
      </div>

      {/* Mood Selector Grid */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider mb-3 text-amber-300">
          🎭 อารมณ์ความรู้สึกวันนี้เป็นอย่างไร?
        </label>
        <div className="grid grid-cols-5 gap-2">
          {MOODS.map((m) => {
            const isSelected = mood === m.value;
            return (
              <button
                key={m.value}
                type="button"
                onClick={() => setMood(m.value)}
                className="flex flex-col items-center justify-center py-3.5 px-1 rounded-2xl border-2 transition-all duration-200 cursor-pointer"
                style={{
                  background: isSelected ? m.bg : "rgba(37,34,56,0.6)",
                  borderColor: isSelected ? m.border : "#3D3759",
                  transform: isSelected ? "scale(1.05)" : "scale(1)",
                  boxShadow: isSelected ? "0 6px 16px rgba(0,0,0,0.15)" : "none",
                }}
              >
                <span className="text-2xl mb-1">{m.emoji}</span>
                <span className="text-xs font-black" style={{ color: isSelected ? m.text : "#B2ACCD" }}>
                  {m.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Health Metrics Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 1. Sleep Card */}
        <div className="p-4 rounded-2xl border space-y-3" style={{ background: "rgba(37,34,56,0.8)", borderColor: "#3D3759" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black flex items-center gap-1.5" style={{ color: "#38BDF8" }}>
              <span>💤</span> การนอนหลับ
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black border" style={{ background: "rgba(56,189,248,0.15)", color: "#38BDF8", borderColor: "rgba(56,189,248,0.3)" }}>
              {sleepHours} ชั่วโมง
            </span>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {[5, 6, 7, 8, 9].map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => setSleepHours(h)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                  sleepHours === h ? "bg-sky-400 text-slate-900 border-sky-300 font-black shadow" : "bg-[#191724] text-slate-300 border-[#3D3759]"
                }`}
              >
                {h} ชม.
              </button>
            ))}
          </div>

          <input
            type="range"
            min={0}
            max={14}
            step={0.5}
            value={sleepHours}
            onChange={(e) => setSleepHours(Number(e.target.value))}
            className="w-full h-2 rounded-full cursor-pointer accent-sky-400"
          />
        </div>

        {/* 2. Water Card */}
        <div className="p-4 rounded-2xl border space-y-3" style={{ background: "rgba(37,34,56,0.8)", borderColor: "#3D3759" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black flex items-center gap-1.5" style={{ color: "#4ADE80" }}>
              <span>💧</span> ดื่มน้ำเปล่า
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black border" style={{ background: "rgba(74,222,128,0.15)", color: "#4ADE80", borderColor: "rgba(74,222,128,0.3)" }}>
              {waterIntake} แก้ว
            </span>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {[4, 6, 8, 10].map((w) => (
              <button
                key={w}
                type="button"
                onClick={() => setWaterIntake(w)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                  waterIntake === w ? "bg-emerald-400 text-slate-900 border-emerald-300 font-black shadow" : "bg-[#191724] text-slate-300 border-[#3D3759]"
                }`}
              >
                {w} แก้ว
              </button>
            ))}
            <button
              type="button"
              onClick={() => setWaterIntake((prev) => prev + 1)}
              className="px-3 py-1 rounded-xl text-xs font-black bg-amber-400 text-slate-900 border border-amber-300 shadow hover:scale-105"
            >
              +1 แก้ว 💧
            </button>
          </div>

          <input
            type="range"
            min={0}
            max={15}
            value={waterIntake}
            onChange={(e) => setWaterIntake(Number(e.target.value))}
            className="w-full h-2 rounded-full cursor-pointer accent-emerald-400"
          />
        </div>

        {/* 3. Exercise Card */}
        <div className="p-4 rounded-2xl border space-y-3" style={{ background: "rgba(37,34,56,0.8)", borderColor: "#3D3759" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black flex items-center gap-1.5" style={{ color: "#FB923C" }}>
              <span>🏃</span> ออกกำลังกาย
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black border" style={{ background: "rgba(251,146,60,0.15)", color: "#FB923C", borderColor: "rgba(251,146,60,0.3)" }}>
              {exerciseMinutes} นาที
            </span>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {[0, 15, 30, 45, 60].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setExerciseMinutes(ex)}
                className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                  exerciseMinutes === ex ? "bg-orange-400 text-slate-900 border-orange-300 font-black shadow" : "bg-[#191724] text-slate-300 border-[#3D3759]"
                }`}
              >
                {ex} นาที
              </button>
            ))}
          </div>

          <input
            type="range"
            min={0}
            max={120}
            step={5}
            value={exerciseMinutes}
            onChange={(e) => setExerciseMinutes(Number(e.target.value))}
            className="w-full h-2 rounded-full cursor-pointer accent-orange-400"
          />
        </div>

        {/* 4. Stress Card */}
        <div className="p-4 rounded-2xl border space-y-3" style={{ background: "rgba(37,34,56,0.8)", borderColor: "#3D3759" }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-black flex items-center gap-1.5" style={{ color: "#F472B6" }}>
              <span>😰</span> ระดับความเครียด
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black border" style={{ background: "rgba(244,114,182,0.15)", color: "#F472B6", borderColor: "rgba(244,114,182,0.3)" }}>
              {stressLevel} / 5
            </span>
          </div>

          <div className="flex justify-between gap-1">
            {[1, 2, 3, 4, 5].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStressLevel(st)}
                className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition ${
                  stressLevel === st ? "bg-pink-400 text-slate-900 border-pink-300 font-black shadow" : "bg-[#191724] text-slate-300 border-[#3D3759]"
                }`}
              >
                ระดับ {st}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Diary & Photo Journal Section */}
      <div className="p-5 rounded-3xl border space-y-4 shadow-lg" style={{ background: "rgba(25,23,36,0.9)", borderColor: "#3D3759" }}>
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-amber-300 flex items-center gap-2">
            <span>📖</span> บันทึกไดอารี่ประจำวัน & ภาพถ่ายความประทับใจ
          </label>
          <span className="text-[11px] text-slate-400 font-medium">บันทึกรูปภาพความทรงจำ</span>
        </div>

        <textarea
          rows={3}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="วันนี้มีเรื่องราวดีๆ อะไรอยากเขียนบันทึกไว้บ้างไหม meow~?"
          className="w-full px-4 py-3 rounded-2xl text-xs font-medium resize-none border outline-none transition"
          style={{ background: "#252238", color: "#F8F6FE", borderColor: "#3D3759" }}
        />

        {/* Photo Upload Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-400/40 hover:bg-purple-500 hover:text-white transition flex items-center gap-2 shadow"
          >
            <span>📷 {photo ? "เปลี่ยนรูปภาพประจำวัน" : "แนบรูปภาพไดอารี่"}</span>
          </button>

          {photo && (
            <div className="relative group rounded-2xl overflow-hidden border border-purple-400/50 shadow-md">
              <img src={photo} alt="Diary attachment" className="w-24 h-24 object-cover" />
              <button
                type="button"
                onClick={() => setPhoto(null)}
                className="absolute top-1 right-1 bg-rose-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center shadow hover:scale-110 transition"
                title="ลบรูปภาพ"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons: Submit / Update */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-4 rounded-2xl font-black text-slate-900 text-sm flex items-center justify-center gap-2 shadow-xl border-2 transition-all hover:scale-102 active:scale-98 cursor-pointer"
          style={{
            background: loading ? "#94A3B8" : "#F6D69B",
            borderColor: "#FDE68A",
            boxShadow: "0 6px 20px rgba(246,214,155,0.3)",
          }}
        >
          {loading ? (
            <span>กำลังบันทึกข้อมูล meow...</span>
          ) : editingId ? (
            <span>💾 อัปเดตบันทึก + ลูบหัว Kuro-chan 🐾 (+1 Pat)</span>
          ) : (
            <span>💾 บันทึกสุขภาพ + ลูบหัว Kuro-chan 🐾 (+1 Pat)</span>
          )}
        </button>
      </div>
    </div>
  );
}