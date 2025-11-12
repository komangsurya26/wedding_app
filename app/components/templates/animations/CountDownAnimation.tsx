import React from "react";
import Countdown, { zeroPad } from "react-countdown";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export default function CountDownAnimation({
  targetDate,
  className,
}: {
  targetDate: string | Date;
  className?: string;
}) {
  const AnimatedNumber = ({ value }: { value: number }) => (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="inline-block"
      >
        {zeroPad(value)}
      </motion.span>
    </AnimatePresence>
  );

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
      <div className={clsx("grid grid-cols-4 gap-4 text-white", className)}>
        {values.map((val, i) => (
          <div key={i} className="text-center">
            <p className="text-[2rem] md:text-[3rem] font-noto-serif-display leading-none">
              <AnimatedNumber value={val} />
            </p>
            <p className="mt-2 text-sm md:text-base">{labels[i]}</p>
          </div>
        ))}
      </div>
    );
  };

  return <Countdown date={new Date(targetDate)} renderer={renderer} />;
}
