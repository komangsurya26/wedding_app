"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import Countdown, { zeroPad } from "react-countdown";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function CountDownClassic({
  sectionClassName,
}: {
  sectionClassName?: string;
}) {
  const targetDate = new Date("2025-12-12T09:00:00+08:00");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // only run on client
  }, []);

  const renderer = ({ days, hours, minutes, seconds }: any) => {
    const boxes = [
      { value: days, label: "Hari" },
      { value: hours, label: "Jam" },
      { value: minutes, label: "Menit" },
      { value: seconds, label: "Detik" },
    ];

    return (
      <section className={clsx(sectionClassName, "")}>
        <div className="grid grid-cols-4 gap-1 justify-items-center text-white">
          {boxes.map((b, i) => (
            <div
              key={i}
              className="w-full flex flex-col items-center justify-center border-gray-400 rounded-lg py-4 px-2"
            >
              <div className="text-3xl font-light">{zeroPad(b.value)}</div>
              <div className="mt-1 text-sm">{b.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center text-white text-sm">
          <button className="inline-flex items-center gap-2 px-3 py-2 md:px-3 md:py-2 rounded-sm border">
            <FaRegCalendarAlt />
            <span>Save Date</span>
          </button>
        </div>
      </section>
    );
  };

  if (!mounted) {
    return (
      <div className="w-full max-w-xl mx-auto px-6 py-8">
        <div className="rounded-2xl p-8 shadow-md text-center">
          <div className="grid grid-cols-4 gap-6 justify-items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full md:w-24 h-20 rounded-lg bg-white/15 animate-pulse"
              />
            ))}
          </div>
          <div className="mt-6 h-10 w-48 mx-auto rounded-full bg-white/15 animate-pulse" />
        </div>
      </div>
    );
  }

  return <Countdown date={targetDate} renderer={renderer} />;
}
