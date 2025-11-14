"use client";

import { useEffect, useState } from "react";
import { FaInstagram, FaShopify, FaWhatsapp } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Footer({ images }: { images: string[] }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  // Auto slide image every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background slider */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.4 }}
          exit={{ opacity: 0.8 }}
          transition={{
            opacity: { duration: 2, ease: "easeInOut" },
            scale: { duration: 20, ease: "linear" },
          }}
        >
          {/* next/image fill agar benar-benar cover container */}
          <Image
            src={images[index]}
            alt={`background-couple-${index}`}
            fill
            className="object-cover object-center"
            priority={false}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 top-[50vh] bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="relative flex flex-col justify-end h-full text-center py-6 text-white">
        {/* Credit */}
        <p className="text-xs text-gray-300">created by classicundangan.com</p>

        {/* Social Media */}
        <div className="flex justify-center gap-6 text-sm mt-4">
          <IconLink href="https://instagram.com/komangsurya_26">
            <FaInstagram />
          </IconLink>
          <IconLink href="https://tiktok.com/@komangsurya_26">
            <FaShopify />
          </IconLink>
          <IconLink href="https://wa.me/6281353285093">
            <FaWhatsapp />
          </IconLink>
        </div>
      </div>
    </section>
  );
}

/* Reusable Icon Link */
function IconLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
