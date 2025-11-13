"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WeddingDayProps } from "@/app/types";

//icons
import { FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import { HiBuildingOffice2 } from "react-icons/hi2";

export default function WeddingDay({ images, events }: WeddingDayProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 overflow-hidden -z-10"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.4 }}
          exit={{ opacity: 0.8 }}
          transition={{
            opacity: { duration: 2, ease: "easeInOut" },
            scale: { duration: 20, ease: "linear" },
          }}
        >
          <Image
            src={images[index]}
            alt={`background-couple-${index}`}
            fill
            className="object-cover object-center h-full w-full"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative my-20 mx-6 sm:mx-18">
        {events.map((e) => (
          <div key={e.id} className="py-4">
            <div className="max-w-4xl">
              <div className="bg-black/50 border border-white/10 rounded-3xl p-10 shadow-lg">
                <h3
                  id={`event-${e.id}-title`}
                  className="font-noto-serif-display text-3xl lg:text-5xl leading-tight italic text-white drop-shadow-sm"
                >
                  {e.title}
                </h3>

                <div className="mt-6 text-white">
                  <div className="flex items-center gap-3">
                    <span className="p-2">
                      <FiCalendar className="w-5 h-5" />
                    </span>
                    <span className="text-base md:text-lg">{e.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-2">
                      <FiClock className="w-5 h-5" />
                    </span>
                    <span className="text-base md:text-lg">{e.time}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="p-2">
                      <HiBuildingOffice2 className="w-5 h-5" />
                    </span>
                    <span className="text-base md:text-lg">{e.venue}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={e.locationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3 border border-white/40 rounded-lg text-white/95 text-sm md:text-base hover:bg-white/20 transition"
                    aria-label={`Lihat lokasi ${e.title}`}
                  >
                    <FiMapPin className="w-5 h-5" />
                    <span className="font-medium">Lihat Lokasi</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
