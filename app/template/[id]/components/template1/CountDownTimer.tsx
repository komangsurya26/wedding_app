"use client";

import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

export default function CountDownTimer({
  image,
  date,
}: {
  image: string;
  date: string;
}) {
  const isRight = false;

  const AnimatedNumber = ({ value }: { value: number }) => (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.45 }}
        className="block"
      >
        {zeroPad(value)}
      </motion.span>
    </AnimatePresence>
  );

  // Renderer countdown
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
  }: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }) => {
    const labels = ["Hari", "Jam", "Menit", "Detik"];
    const values = [days, hours, minutes, seconds];

    return (
      <div
        className={`grid grid-cols-4 gap-4 ${
          isRight ? "justify-end" : "justify-start"
        }`}
      >
        {values.map((value, index) => (
          <div className="flex flex-col md:flex-row gap-2" key={index}>
            <span className="text-4xl md:text-5xl font-lora">
              <AnimatedNumber value={value} />
            </span>
            <span className="font-lora">{labels[index]}</span>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="relative h-[120vh] flex items-end">
      <Image
        src={image}
        alt="Couple"
        fill
        className="absolute object-cover object-center"
        priority={false}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 top-[50vh] bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

      <div
        className={`relative w-full p-8 ${isRight ? "text-end" : "text-start"}`}
      >
        <div
          className={`max-w-lg text-white ${isRight ? "ml-auto" : "mr-auto"}`}
        >
          <div className="gap-6">
            <div className="pt-6 lg:pt-0 space-y-6">
              <h1 className="font-noto-serif-display text-[3rem] sm:text-[4rem] leading-none tracking-tight text-white">
                <span className="block">Save</span>
                <span className="block">The Date</span>
              </h1>

              <div
                className={`h-px bg-white/60 ${
                  isRight ? "ml-auto" : "mr-auto"
                } w-full max-w-[700px]`}
              />
            </div>

            <div className="pt-8">
              {/* Countdown Timer */}
              <Countdown date={date} renderer={renderer} />

              {/* Button */}
              <div
                className={`mt-8 max-w-[15rem] ${
                  isRight ? "ml-auto" : "mr-auto"
                }`}
              >
                <a
                  href=""
                  className="font-bodonimoda inline-block w-full text-center px-6 py-3 border border-white rounded-md text-sm tracking-widest hover:bg-white/10 transition"
                >
                  SAVE THE DATE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
