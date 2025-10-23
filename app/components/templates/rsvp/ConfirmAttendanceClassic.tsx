"use client";
import React, { useState } from "react";
import clsx from "clsx";
import { IoMdTime } from "react-icons/io";

export type Attendance = "Hadir" | "Tidak Hadir";

export type Comment = {
  id: string;
  name: string;
  message: string;
  attendance: Attendance;
  timeAgo: string;
};

export interface ConfirmAttendanceProps {
  title?: string;
  description?: string;
  submitButtonText?: string;
  namePlaceholder?: string;
  messagePlaceholder?: string;
  classNameInput?: string;
  borderColor?: string;
  classNameSubmit?: string;
  classNameCommentBadgeHadir?: string;
  classNameCommentBadgeTidakHadir?: string;
  classNameTitle?: string;
  classNameDescription?: string;
  classNameTitleComment?: string;
  classNameCommentMessage?: string;
  sectionClassName?: string;

  initialComments?: Comment[];
  onSubmit?: (comment: Comment) => void;
}

export default function ConfirmAttendance({
  title = "Konfirmasi Kehadiran & Kirim Doa",
  description = "Sampaikan kehadiranmu dan tinggalkan pesan manis atau doa. Kami sangat menghargai setiap ucapan dan doa dari sahabat & keluarga.",
  submitButtonText = "Kirim",
  namePlaceholder = "Nama",
  messagePlaceholder = "Tulis doa atau harapanmu...",
  classNameInput,
  borderColor,
  classNameSubmit,
  classNameCommentBadgeHadir,
  classNameCommentBadgeTidakHadir,
  classNameTitle,
  classNameDescription,
  classNameTitleComment,
  classNameCommentMessage,
  sectionClassName,

  initialComments = [],
  onSubmit,
}: ConfirmAttendanceProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [attendance, setAttendance] = useState<Attendance>("Hadir");
  const [comments, setComments] = useState<Comment[]>(
    initialComments.length
      ? initialComments
      : [
          {
            id: "c1",
            name: "Joko",
            message: "Selamat ya, semoga berkah!",
            attendance: "Hadir",
            timeAgo: "2 bulan lalu",
          },
          {
            id: "c2",
            name: "Sinta",
            message: "Mohon maaf, ada acara keluarga.",
            attendance: "Tidak Hadir",
            timeAgo: "1 bulan lalu",
          },
        ]
  );
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !message.trim()) {
      setError("Nama dan pesan wajib diisi.");
      return;
    }

    const newComment: Comment = {
      id: "c" + Date.now(),
      name: name.trim(),
      message: message.trim(),
      attendance,
      timeAgo: "Baru saja",
    };

    setComments((s) => [newComment, ...s]);
    onSubmit?.(newComment);
    setName("");
    setMessage("");
    setAttendance("Hadir");
  };

  return (
    <section className={sectionClassName}>
      <div className="space-y-12">
        {/* Header (bisa override lewat children) */}
        <div className="mb-8">
          <h2 className={classNameTitle}>{title}</h2>
          <p className={classNameDescription}>{description}</p>
        </div>

        <div className={clsx("border-t pt-8 space-y-6", borderColor)}>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-300 bg-red-900/20 p-2 rounded">
                {error}
              </div>
            )}

            <input
              aria-label="Nama"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={namePlaceholder}
              className={clsx(
                "w-full bg-white/6 border rounded-sm p-2 text-sm focus:outline-none",
                classNameInput
              )}
            />

            <textarea
              aria-label="Ucapan"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={messagePlaceholder}
              rows={4}
              className={clsx(
                "w-full bg-white/6 border rounded-sm p-2 text-sm focus:outline-none",
                classNameInput
              )}
            />

            <select
              value={attendance}
              onChange={(e) => setAttendance(e.target.value as Attendance)}
              className={clsx(
                "w-full bg-white/6 border p-2 rounded-sm text-sm",
                classNameInput
              )}
            >
              <option value="Hadir">Hadir</option>
              <option value="Tidak Hadir">Tidak Hadir</option>
            </select>

            <button
              type="submit"
              className={clsx(
                "w-[25%] border p-2 text-sm rounded-sm font-semibold",
                classNameSubmit
              )}
            >
              {submitButtonText}
            </button>
          </form>

          <hr className={borderColor} />

          {/* List komentar */}
          <div className="space-y-6 max-h-80 overflow-y-auto pr-5 pl-5">
            {comments.map((c) => (
              <article key={c.id} className={clsx("p-4 border-b", borderColor)}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3
                      className={clsx("max-w-[120px]", classNameTitleComment)}
                    >
                      {c.name}
                    </h3>

                    <span
                      className={clsx(
                        "text-xs py-1 px-2 rounded-lg text-white",
                        c.attendance === "Hadir"
                          ? classNameCommentBadgeHadir
                          : classNameCommentBadgeTidakHadir
                      )}
                    >
                      {c.attendance}
                    </span>
                  </div>

                  <p className={clsx("mt-2", classNameCommentMessage)}>
                    {c.message}
                  </p>

                  <div className="mt-3 text-sm flex items-center gap-4">
                    <span className="inline-flex items-center gap-2 text-xs">
                      <IoMdTime />
                      <span>{c.timeAgo}</span>
                    </span>
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
