"use client";

import { useState, useRef } from "react";
import { ref, set } from "firebase/database";
import { db, auth } from "../../pages/firebase";

export default function EditProfileModal({ user, onClose, onSave, darkMode, theme }) {
  const [name, setName] = useState(user?.displayName || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.photoURL || null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const providerData = auth?.currentUser?.providerData || [];
  const isGoogle = providerData.some((p) => p.providerId === "google.com");
  const isEmail = providerData.some((p) => p.providerId === "password");
  const providerLabel = isGoogle ? "Google" : isEmail ? "อีเมลและรหัสผ่าน" : "—";
  const providerIcon = isGoogle ? "🔵" : "📧";
  const bg = darkMode ? "#1E1E2E" : "#FFFFFF";
  const textM = darkMode ? "#F1F5F9" : "#1E293B";
  const textS = darkMode ? "#94A3B8" : "#64748B";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("กรุณาเลือกไฟล์รูปภาพ");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("ไฟล์ใหญ่เกินไป (สูงสุด 2MB)");
      return;
    }
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
    setError(null);
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("กรุณากรอกชื่อ");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      let photoURL = user?.photoURL || null;
      if (avatarFile) {
        const reader = new FileReader();
        photoURL = await new Promise((res, rej) => {
          reader.onload = (ev) => res(ev.target.result);
          reader.onerror = rej;
          reader.readAsDataURL(avatarFile);
        });
      }
      await set(ref(db, `users/${user.uid}/profile`), {
        displayName: name.trim(),
        photoURL: photoURL || null,
        updatedAt: new Date().toISOString(),
      });
      onSave({ displayName: name.trim(), photoURL: photoURL || null });
      onClose();
    } catch (err) {
      setError("บันทึกไม่สำเร็จ: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden" style={{ background: bg }}>
        <div className="px-6 py-5 flex items-center justify-between" style={{ background: `linear-gradient(${theme.gradient})` }}>
          <div>
            <h3 className="font-black text-white text-lg">✏️ แก้ไขโปรไฟล์</h3>
            <p className="text-white/70 text-xs mt-0.5">เปลี่ยนรูปและชื่อที่ใช้แสดง</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition">✕</button>
        </div>
        <div className="p-6 space-y-5">
          {error && <div className="flex items-center gap-2 bg-red-50 border border-red-300 text-red-700 rounded-xl px-4 py-3 text-sm">❌ {error}</div>}
          <div className="flex flex-col items-center gap-3">
            <div className="relative cursor-pointer group" onClick={() => fileRef.current?.click()}>
              <div
                className="w-24 h-24 rounded-2xl overflow-hidden flex items-center justify-center text-4xl font-black text-white shadow-lg"
                style={{ background: avatarPreview ? "transparent" : `linear-gradient(${theme.gradient})` }}
              >
                {avatarPreview ? (
                  <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  (user?.displayName || "U")[0].toUpperCase()
                )}
              </div>
              <div className="absolute inset-0 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all" style={{ background: "rgba(0,0,0,0.45)" }}>
                <span className="text-white text-2xl">📷</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl flex items-center justify-center text-white text-xs shadow-lg" style={{ background: `linear-gradient(${theme.gradient})` }}>+</div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            <p className="text-xs" style={{ color: textS }}>กดที่รูปเพื่อเปลี่ยน · รองรับ JPG, PNG (สูงสุด 2MB)</p>
          </div>
          <div className="rounded-xl px-4 py-3 flex items-center gap-3" style={{ background: darkMode ? "#2D2D3F" : "#F8FAFC", border: `1px solid ${darkMode ? "#3D3D4F" : "#E2E8F0"}` }}>
            <span className="text-xl">{providerIcon}</span>
            <div>
              <div className="text-xs font-semibold" style={{ color: textS }}>ลงชื่อเข้าใช้ด้วย</div>
              <div className="text-sm font-bold" style={{ color: textM }}>{providerLabel}</div>
            </div>
            {isGoogle && <span className="ml-auto text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: "#EFF6FF", color: "#2563EB" }}>Google Account</span>}
            {isEmail && <span className="ml-auto text-xs px-2 py-1 rounded-lg font-semibold" style={{ background: "#F0FDF4", color: "#16A34A" }}>Email / Password</span>}
          </div>
          <div>
            <label className="block text-xs font-semibold mb-2" style={{ color: textS }}>👤 ชื่อที่ใช้แสดง</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="กรอกชื่อของคุณ"
              maxLength={40}
              className="w-full px-4 py-2.5 border rounded-xl text-sm outline-none"
              style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", background: darkMode ? "#2D2D3F" : "#FFF", color: textM }}
            />
            <div className="text-right text-xs mt-1" style={{ color: textS }}>{name.length}/40</div>
          </div>
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border text-sm font-semibold" style={{ borderColor: darkMode ? "#3D3D4F" : "#E2E8F0", color: textS, background: darkMode ? "#2D2D3F" : "#FFF" }}>ยกเลิก</button>
            <button onClick={handleSave} disabled={loading} className="flex-1 py-2.5 rounded-xl text-white font-bold text-sm flex items-center justify-center gap-2" style={{ background: loading ? "#94A3B8" : `linear-gradient(${theme.gradient})` }}>
              {loading ? <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" /></svg>กำลังบันทึก...</> : "💾 บันทึก"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
