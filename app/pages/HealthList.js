"use client";

import { useState } from "react";
import { ref, remove, update } from "firebase/database";
import { db } from "./firebase";
import MoodBadge from "../components/MoodBadge";

// ---- Mood options for edit modal ----
const MOODS = [
  { value: "great", emoji: "😸", label: "สดใสมาก" },
  { value: "good",  emoji: "😺", label: "อารมณ์ดี" },
  { value: "okay",  emoji: "😐", label: "เฉยๆ" },
  { value: "bad",   emoji: "😿", label: "ไม่ค่อยดี" },
  { value: "awful", emoji: "😾", label: "แย่จัง" },
];

const ITEMS_PER_PAGE = 5;

// ---- Confirm Delete Modal ----
function ConfirmModal({ onConfirm, onCancel, darkMode }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 select-none">
      <div
        className="rounded-3xl shadow-2xl p-6 max-w-sm w-full text-center border"
        style={{
          background: darkMode ? "#252238" : "#FFFFFF",
          borderColor: darkMode ? "#3D3759" : "#E2E8F0",
        }}
      >
        <div className="text-4xl mb-3">🗑️</div>
        <h3 className="font-extrabold text-lg mb-2" style={{ color: darkMode ? "#F8F6FE" : "#1E293B" }}>
          ลบรายการบันทึกนี้?
        </h3>
        <p className="text-xs mb-6" style={{ color: darkMode ? "#B2ACCD" : "#64748B" }}>
          ข้อมูลสุขภาพของวันนี้จะถูกลบถาวร ไม่สามารถกู้คืนได้
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border font-bold text-xs transition cursor-pointer"
            style={{
              background: darkMode ? "#191724" : "#F8FAFC",
              borderColor: darkMode ? "#3D3759" : "#E2E8F0",
              color: darkMode ? "#F8F6FE" : "#475569",
            }}
          >
            ยกเลิก
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black text-xs transition shadow cursor-pointer"
          >
            ลบรายการ
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Single Record Card (Matches Screenshot 2) ----
function RecordCard({ record, onEdit, onDelete, darkMode, theme }) {
  const d = new Date(record.date);
  const dateStr = d.toLocaleDateString("th-TH", { year: "numeric", month: "short", day: "numeric" });
  const themeBorder = theme?.accent || "#8B5CF6";
  const subBg = darkMode ? "#252238" : "#F8FAFC";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  return (
    <div
      className="rounded-3xl p-5 shadow-sm border transition-all duration-200 select-none space-y-4"
      style={{
        background: darkMode ? "#191724" : "#FFFFFF",
        borderColor: themeBorder + "40",
      }}
    >
      {/* Top row: Date + Mood Badge + Edit/Delete */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black flex items-center gap-1.5" style={{ color: textM }}>
            <span>🗓️</span> {dateStr}
          </span>
          <MoodBadge mood={record.mood} />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onEdit(record)}
            className="w-8 h-8 rounded-xl bg-amber-400/15 hover:bg-amber-400 text-amber-600 hover:text-slate-900 flex items-center justify-center text-xs font-bold transition cursor-pointer"
            title="แก้ไขบันทึก"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(record.id)}
            className="w-8 h-8 rounded-xl bg-rose-500/15 hover:bg-rose-500 text-rose-500 hover:text-white flex items-center justify-center text-xs font-bold transition cursor-pointer"
            title="ลบบันทึก"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Stats row (Matches Screenshot 2 rounded boxes) */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { icon: "💤", value: `${record.sleepHours}h`, label: "นอน" },
          { icon: "💧", value: `${record.waterIntake} แก้ว`, label: "น้ำ" },
          { icon: "🏃", value: `${record.exerciseMinutes} นาที`, label: "ออกกำลัง" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl py-3 px-2 flex flex-col items-center justify-center border transition-all"
            style={{
              background: subBg,
              borderColor: darkMode ? "#3D3759" : "#F1F5F9",
            }}
          >
            <span className="text-xl mb-1">{s.icon}</span>
            <span className="text-xs font-black" style={{ color: textM }}>{s.value}</span>
            <span className="text-[11px] font-bold" style={{ color: textS }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Stress Bar (Matches Screenshot 2) */}
      <div className="flex items-center gap-3 pt-1">
        <span className="text-xs font-bold flex items-center gap-1 shrink-0" style={{ color: textS }}>
          <span>😰</span> Stress
        </span>
        <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              record.stressLevel <= 2
                ? "bg-emerald-400"
                : record.stressLevel === 3
                ? "bg-amber-400"
                : "bg-rose-500"
            }`}
            style={{ width: `${(record.stressLevel / 5) * 100}%` }}
          />
        </div>
        <span className="text-xs font-black shrink-0" style={{ color: textS }}>
          {record.stressLevel}/5
        </span>
      </div>

      {/* Note & Photo */}
      {record.note && (
        <p className="text-xs font-medium rounded-xl p-3 border italic" style={{ background: subBg, color: textS, borderColor: darkMode ? "#3D3759" : "#F1F5F9" }}>
          📝 {record.note}
        </p>
      )}
      {record.photo && (
        <div className="rounded-xl overflow-hidden border max-h-40" style={{ borderColor: darkMode ? "#3D3759" : "#F1F5F9" }}>
          <img src={record.photo} alt="Record diary photo" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
}

// ---- Edit Modal ----
function EditModal({ record, onSave, onCancel, darkMode, theme }) {
  const [mood, setMood] = useState(record.mood);
  const [sleepHours, setSleepHours] = useState(record.sleepHours);
  const [waterIntake, setWaterIntake] = useState(record.waterIntake);
  const [exerciseMinutes, setExerciseMinutes] = useState(record.exerciseMinutes);
  const [stressLevel, setStressLevel] = useState(record.stressLevel);
  const [note, setNote] = useState(record.note || "");

  const themeAccent = theme?.accent || "#8B5CF6";
  const cardBg = darkMode ? "#252238" : "#FFFFFF";
  const subBg = darkMode ? "#191724" : "#F8FAFC";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";

  const handleSave = () => {
    onSave(record.id, { mood, sleepHours, waterIntake, exerciseMinutes, stressLevel, note });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto select-none">
      <div
        className="rounded-3xl shadow-2xl w-full max-w-md my-4 overflow-hidden border"
        style={{ background: cardBg, borderColor: themeAccent }}
      >
        <div
          className="px-6 py-4 flex justify-between items-center border-b"
          style={{ background: themeAccent, color: "#191724" }}
        >
          <h3 className="font-black text-base flex items-center gap-2">
            <span>✏️</span> แก้ไขรายการบันทึกสุขภาพ
          </h3>
          <button onClick={onCancel} className="font-bold text-lg hover:scale-110 transition cursor-pointer">
            ✕
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-xs font-black uppercase tracking-wide block mb-1" style={{ color: themeAccent }}>
              📅 วันที่บันทึก
            </label>
            <p className="font-black text-sm" style={{ color: textM }}>{record.date}</p>
          </div>

          {/* Mood */}
          <div>
            <label className="text-xs font-black uppercase tracking-wide block mb-2" style={{ color: themeAccent }}>
              🎭 อารมณ์ความรู้สึก
            </label>
            <div className="grid grid-cols-5 gap-1.5">
              {MOODS.map((m) => (
                <button
                  key={m.value}
                  type="button"
                  onClick={() => setMood(m.value)}
                  className={`flex flex-col items-center py-2.5 rounded-xl border-2 text-xs font-bold transition-all cursor-pointer ${
                    mood === m.value ? "scale-105 shadow-md" : "opacity-75"
                  }`}
                  style={{
                    background: mood === m.value ? themeAccent : subBg,
                    color: mood === m.value ? "#191724" : textM,
                    borderColor: mood === m.value ? themeAccent : "transparent",
                  }}
                >
                  <span className="text-xl mb-0.5">{m.emoji}</span>
                  <span className="text-[10px]">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          {[
            { icon: "💤", label: "ชั่วโมงนอน", value: sleepHours, setValue: setSleepHours, min: 0, max: 14, step: 0.5 },
            { icon: "💧", label: "น้ำ (แก้ว)", value: waterIntake, setValue: setWaterIntake, min: 0, max: 15, step: 1 },
            { icon: "🏃", label: "ออกกำลังกาย (นาที)", value: exerciseMinutes, setValue: setExerciseMinutes, min: 0, max: 120, step: 5 },
            { icon: "😰", label: "ระดับ Stress (1-5)", value: stressLevel, setValue: setStressLevel, min: 1, max: 5, step: 1 },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="text-xl w-7">{f.icon}</span>
              <label className="text-xs font-bold flex-1" style={{ color: textM }}>{f.label}</label>
              <input
                type="number"
                value={f.value}
                min={f.min}
                max={f.max}
                step={f.step}
                onChange={(e) => f.setValue(Number(e.target.value))}
                className="w-20 text-center border rounded-xl px-2 py-1.5 text-xs font-black outline-none"
                style={{ background: subBg, color: textM, borderColor: themeAccent + "60" }}
              />
            </div>
          ))}

          {/* Note */}
          <div>
            <label className="text-xs font-black uppercase tracking-wide block mb-2" style={{ color: themeAccent }}>
              📝 ไดอารี่ประจำวัน
            </label>
            <textarea
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 text-xs font-medium resize-none outline-none"
              style={{ background: subBg, color: textM, borderColor: themeAccent + "60" }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-xl border font-bold text-xs transition cursor-pointer"
              style={{ background: subBg, color: textM, borderColor: themeAccent + "40" }}
            >
              ยกเลิก
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 rounded-xl font-black text-xs text-slate-900 transition shadow-lg cursor-pointer"
              style={{ background: themeAccent }}
            >
              💾 บันทึกการแก้ไข
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ---- Main HealthList Component ----
// ============================================================
export default function HealthList({ user, records = [], darkMode = true, theme }) {
  const [editRecord, setEditRecord] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filterMood, setFilterMood] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const themeAccent = theme?.accent || "#8B5CF6";
  const textM = darkMode ? "#F8F6FE" : "#1E293B";
  const textS = darkMode ? "#B2ACCD" : "#64748B";

  // ---- UPDATE ----
  const handleUpdate = async (id, changes) => {
    await update(ref(db, `users/${user.uid}/healthRecords/${id}`), changes);
    setEditRecord(null);
  };

  // ---- DELETE ----
  const handleDelete = async () => {
    await remove(ref(db, `users/${user.uid}/healthRecords/${deleteId}`));
    setDeleteId(null);
    setCurrentPage(1);
  };

  // ---- Filter + Sort ----
  const filtered = records
    .filter((r) => filterMood === "all" || r.mood === filterMood)
    .sort((a, b) =>
      sortOrder === "desc"
        ? new Date(b.date) - new Date(a.date)
        : new Date(a.date) - new Date(b.date)
    );

  // ---- Pagination ----
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filtered.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const handleFilterChange = (val) => {
    setFilterMood(val);
    setCurrentPage(1);
  };

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3 text-center select-none">
        <span className="text-5xl">📭</span>
        <p className="font-black text-base" style={{ color: textM }}>ยังไม่มีรายการบันทึกในระบบ</p>
        <p className="text-xs" style={{ color: textS }}>ไปที่แท็บ ✏️ บันทึก เพื่อเพิ่มข้อมูลแรกของคุณนะคะ meow~</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 select-none">
      {/* Modals */}
      {editRecord && (
        <EditModal record={editRecord} onSave={handleUpdate} onCancel={() => setEditRecord(null)} darkMode={darkMode} theme={theme} />
      )}
      {deleteId && (
        <ConfirmModal onConfirm={handleDelete} onCancel={() => setDeleteId(null)} darkMode={darkMode} />
      )}

      {/* Filter & Sort Toolbar (Matches Screenshot 2) */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2 flex-wrap items-center">
          {[
            { value: "all", label: "ทั้งหมด" },
            { value: "great", label: "😄" },
            { value: "good", label: "😊" },
            { value: "okay", label: "😐" },
            { value: "bad", label: "😢" },
            { value: "awful", label: "😭" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => handleFilterChange(f.value)}
              className="px-3.5 py-1.5 rounded-xl text-xs font-black border transition-all cursor-pointer shadow-sm"
              style={{
                background: filterMood === f.value ? (filterMood === "all" ? "#00D287" : themeAccent) : darkMode ? "#191724" : "#FFFFFF",
                color: filterMood === f.value ? (filterMood === "all" ? "#FFFFFF" : "#191724") : textM,
                borderColor: filterMood === f.value ? (filterMood === "all" ? "#00D287" : themeAccent) : darkMode ? "#3D3759" : "#E2E8F0",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl border text-xs font-black shadow-sm transition cursor-pointer"
          style={{
            background: darkMode ? "#191724" : "#FFFFFF",
            color: textM,
            borderColor: darkMode ? "#3D3759" : "#E2E8F0",
          }}
        >
          <span>{sortOrder === "desc" ? "🔽 ใหม่สุด" : "🔼 เก่าสุด"}</span>
        </button>
      </div>

      <p className="text-xs font-bold" style={{ color: textS }}>
        แสดง {currentItems.length} จาก {filtered.length} รายการ
      </p>

      {/* Record Cards List (Matches Screenshot 2) */}
      {currentItems.length === 0 ? (
        <p className="text-center text-xs font-bold py-10" style={{ color: textS }}>ไม่มีรายการที่ตรงกับ Filter</p>
      ) : (
        <div className="space-y-4">
          {currentItems.map((r) => (
            <RecordCard
              key={r.id}
              record={r}
              onEdit={setEditRecord}
              onDelete={setDeleteId}
              darkMode={darkMode}
              theme={theme}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3.5 py-1.5 rounded-xl border text-xs font-bold disabled:opacity-40 transition cursor-pointer"
            style={{
              background: darkMode ? "#191724" : "#FFFFFF",
              color: textM,
              borderColor: darkMode ? "#3D3759" : "#E2E8F0",
            }}
          >
            ← ก่อนหน้า
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className="w-8 h-8 rounded-xl text-xs font-black border transition-all cursor-pointer"
              style={{
                background: currentPage === page ? themeAccent : darkMode ? "#191724" : "#FFFFFF",
                color: currentPage === page ? "#191724" : textM,
                borderColor: currentPage === page ? themeAccent : darkMode ? "#3D3759" : "#E2E8F0",
              }}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3.5 py-1.5 rounded-xl border text-xs font-bold disabled:opacity-40 transition cursor-pointer"
            style={{
              background: darkMode ? "#191724" : "#FFFFFF",
              color: textM,
              borderColor: darkMode ? "#3D3759" : "#E2E8F0",
            }}
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}