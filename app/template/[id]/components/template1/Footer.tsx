"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaInstagram, FaShopify, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

interface FooterProps {
  images: string[];
}

export default function Footer({ images }: FooterProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen px-12 overflow-hidden">
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
      <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-black via-black/60 to-transparent"></div>

      <div className="relative text-center text-white py-6 flex flex-col justify-end min-h-[100vh]">
        <div>
          {/* Credit */}
          <p className="text-xs text-gray-300">
            created by classicundangan.com
          </p>

          {/* Social Media */}
          <div className="flex justify-center gap-6 text-sm mt-4">
            <a
              href="https://instagram.com/komangsurya_26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/@komangsurya_26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaShopify />
            </a>
            <a
              href="https://wa.me/6281353285093"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* WhatsApp Number */}
        </div>
      </div>
    </section>
  );
}
