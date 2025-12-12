"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { IoMdTime } from "react-icons/io";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { createRSVP, fetchRSVPsByInvitation, RSVPRecord } from "@/actions/rsvp-actions";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

type AttendanceUI = "Hadir" | "Tidak Hadir";

export function RSVP({ invitationId }: { invitationId: number }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<AttendanceUI>("Hadir");
  const [guestCount, setGuestCount] = useState(1);
  const [comments, setComments] = useState<RSVPRecord[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const maxMessage = 200;

  // Fetch existing RSVPs on mount
  useEffect(() => {
    async function loadRSVPs() {
      try {
        const data = await fetchRSVPsByInvitation(invitationId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load RSVPs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadRSVPs();
  }, [invitationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("Nama dan pesan wajib diisi.");
      return;
    }

    setSubmitting(true);

    try {
      const newRSVP = await createRSVP({
        invitation_id: invitationId,
        name: trimmedName,
        attendance: attendance === "Hadir" ? "yes" : "no",
        guest_count: attendance === "Hadir" ? guestCount : 0,
        message: trimmedMessage,
      });

      // Add to list (prepend for newest first)
      setComments((prev) => [newRSVP, ...prev]);

      // Reset form
      setName("");
      setMessage("");
      setAttendance("Hadir");
      setGuestCount(1);
    } catch (err) {
      setError("Gagal mengirim ucapan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true, locale: id });
    } catch {
      return "Baru saja";
    }
  };

  return (
    <section className="p-6 sm:p-8">
      <div className="max-w-3xl mx-auto text-white">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-noto-serif-display italic">
            RSVP
          </h1>
          <h2 className="text-3xl sm:text-4xl font-noto-serif-display italic">
            Ucapan & Doa
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Tulis ucapan, doa, atau konfirmasi kehadiranmu.
          </p>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            aria-describedby="form-note"
          >
            <p id="form-note" className="sr-only">
              Form ini untuk mengirim ucapan dan konfirmasi kehadiran.
            </p>

            {error && (
              <div
                role="alert"
                aria-live="polite"
                className="text-sm text-red-300 bg-red-900/20 p-2 rounded"
              >
                {error}
              </div>
            )}

            <input
              aria-label="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama (contoh: Budi)"
              className="w-full capitalize font-marcellus px-3 py-2 text-sm sm:text-base rounded-xl bg-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 placeholder:text-gray-400 font-semibold"
            />

            <textarea
              aria-label="Ucapan"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, maxMessage))}
              placeholder="Tulis ucapan atau doa di sini..."
              rows={5}
              className="w-full font-marcellus px-3 py-3 text-sm sm:text-base rounded-2xl bg-transparent border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/20 font-semibold resize-none"
            />
            <div className="flex justify-between items-center -mt-4 text-xs text-gray-400">
              <span>
                {message.length}/{maxMessage} karakter
              </span>
              <span className="italic text-end">
                Hormati bahasa yang baik & sopan
              </span>
            </div>

            <div className="w-full pt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAttendance("Hadir")}
                className={clsx(
                  "flex-1 py-2 font-marcellus rounded-lg border transition-shadow focus:outline-none",
                  attendance === "Hadir"
                    ? "bg-green-600/40 text-white font-semibold shadow"
                    : "bg-transparent border-white/10 text-gray-200 hover:border-white/30"
                )}
                aria-pressed={attendance === "Hadir"}
              >
                <span className="inline-flex items-center justify-center gap-2 w-full">
                  <HiOutlineCheck /> Hadir
                </span>
              </button>

              <button
                type="button"
                onClick={() => setAttendance("Tidak Hadir")}
                className={clsx(
                  "flex-1 py-2 font-marcellus rounded-lg border transition-shadow focus:outline-none",
                  attendance === "Tidak Hadir"
                    ? "bg-red-600/40 text-white font-semibold shadow"
                    : "bg-transparent border-white/10 text-gray-200 hover:border-white/30"
                )}
                aria-pressed={attendance === "Tidak Hadir"}
              >
                <span className="inline-flex items-center justify-center gap-2 w-full">
                  <HiOutlineX /> Tidak Hadir
                </span>
              </button>
            </div>

            {/* Guest count - only show when attending */}
            {attendance === "Hadir" && (
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-300">Hadir ber berapa nih:</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold">{guestCount}</span>
                  <button
                    type="button"
                    onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !name.trim() || !message.trim()}
              className={clsx(
                "px-5 py-2 font-marcellus rounded-lg md:text-lg font-semibold transition-transform disabled:opacity-60 disabled:cursor-not-allowed",
                submitting ? "transform scale-95" : "hover:-translate-y-0.5",
                !name.trim() || !message.trim()
                  ? "bg-white/10 text-gray-300"
                  : "bg-white text-black"
              )}
            >
              {submitting ? "Mengirim..." : "Kirim Ucapan"}
            </button>
          </form>

          <hr className="border-white/10" />

          <div
            role="list"
            aria-label="Daftar Komentar"
            className="space-y-4 overflow-y-auto max-h-[50vh]"
          >
            {loading ? (
              // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-white/10 rounded w-1/3" />
                      <div className="h-3 bg-white/10 rounded w-full" />
                      <div className="h-3 bg-white/10 rounded w-2/3" />
                    </div>
                  </div>
                </div>
              ))
            ) : comments.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                <p>Belum ada ucapan. Jadilah yang pertama! 🎉</p>
              </div>
            ) : (
              comments.map((c) => (
                <article
                  key={c.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-none aspect-square h-auto min-h-[2rem] sm:min-h-[2.75rem] rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                      {c.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="font-semibold truncate capitalize">
                          {c.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span
                            className={clsx(
                              "text-xs py-1 px-2 rounded-lg text-white",
                              c.attendance === "yes"
                                ? "bg-green-600/40"
                                : "bg-red-600/40"
                            )}
                          >
                            {c.attendance === "yes" ? "Hadir" : "Tidak Hadir"}
                          </span>
                        </div>
                      </div>

                      <p className="mt-2 text-sm leading-relaxed break-words">
                        {c.message}
                      </p>

                      <div className="mt-3 text-xs flex items-center gap-2 text-gray-400">
                        <IoMdTime className="shrink-0" />
                        <span>{formatTimeAgo(c.created_at)}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
