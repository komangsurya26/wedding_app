"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function HeaderSlider({
  images,
  children,
  sectionClassName,
  blur = true,
}: {
  images: string[];
  children?: React.ReactNode;
  sectionClassName?: string;
  blur?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setNextIndex((index + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section
      className={clsx(
        "relative min-h-screen flex flex-col overflow-hidden",
        sectionClassName
      )}
    >
      {/* Layer utama */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${images[index]}')` }}
      />
      {/* Layer transisi */}
      {nextIndex !== null && (
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[nextIndex]}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          onAnimationComplete={() => {
            setIndex(nextIndex);
            setNextIndex(null);
          }}
        />
      )}
      {/* Overlay biar teks terbaca */}
      <div className="absolute inset-0 bg-black/30"></div>;
      {/* Efek blur di bawah */}
      {blur && (
        <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-white via-white/60 to-transparent"></div>
      )}
      {/* Konten */}
      {children}
    </section>
  );
}
