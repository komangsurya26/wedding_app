"use client";

import React, { useState } from "react";
import clsx from "clsx";
import { IoMdTime } from "react-icons/io";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";
import { Attendance, Comment, ConfirmAttendanceProps } from "@/src/types";

export function RSVP({
  initialComments = [
    {
      name: "Andi",
      message: "Selamat menempuh hidup baru! Semoga bahagia selalu.",
      attendance: "Hadir",
      timeAgo: "2 jam yang lalu",
    },
  ],
  onSubmit,
}: ConfirmAttendanceProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Hadir");
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const maxMessage = 100;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setError("Nama dan pesan wajib diisi.");
      return;
    }

    setSubmitting(true);

    const newComment: Comment = {
      name: trimmedName,
      message: trimmedMessage,
      attendance,
      timeAgo: "Baru saja",
    };

    // optimistic update
    setComments((s) => [newComment, ...s]);
    onSubmit?.(newComment);

    // reset form
    setName("");
    setMessage("");
    setAttendance("Hadir");

    // simulate short delay for UX
    setTimeout(() => setSubmitting(false), 400);
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

            <div className="w-full pt-4 grid grid-cols-1 md:grid-cols-3 gap-2">
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
            {comments.map((c, index) => (
              <article
                key={index}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-none aspect-square h-auto min-h-[2rem] sm:min-h-[2.75rem] rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                    {c.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h3 className="font-semibold truncate capitalize">
                        {c.name}
                      </h3>
                      <span
                        className={clsx(
                          "text-xs py-1 px-2 rounded-lg text-white",
                          c.attendance === "Hadir"
                            ? "bg-green-600/40"
                            : "bg-red-600/40"
                        )}
                      >
                        {c.attendance}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed break-words">
                      {c.message}
                    </p>

                    <div className="mt-3 text-xs flex items-center gap-2 text-gray-400">
                      <IoMdTime className="shrink-0" />
                      <span>{c.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
