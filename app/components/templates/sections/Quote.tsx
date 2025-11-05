import useInViewAnimation from "@/app/hooks/useInViewAnimation";
import React, { useRef } from "react";

export default function Quote() {
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const isVisible = useInViewAnimation(quoteRef, 0.1);

  return (
    <section
      ref={quoteRef}
      className="px-8 py-10 h-screen text-left text-white"
    >
      <div className="max-w-lg space-y-8">
        <div className="h-[15vh] md:h-[10vh]"></div>
        <div
          className={`font-noto-serif-display leading-[1.3] font-bold text-white/60 ${
            isVisible && "animate__animated animate__fadeInLeft animate__slow"
          }`}
        >
          <p className="text-[4rem] sm:text-[6rem]">31</p>
          <p className="text-[4rem] sm:text-[6rem]">DES</p>
          <p className="text-[4rem] sm:text-[6rem]">2025</p>
        </div>
        <div className="space-y-4">
          <p
            className={`text-sm sm:text-base lg:text-lg leading-relaxed text-white font-light ${
              isVisible &&
              "animate__animated animate__fadeInLeft animate__slow animate__delay-2s"
            }`}
          >
            "Ya Tuhanku Yang Maha Pengasih, anugrahkanlah kepada pasangan ini
            senantiasa kebahagiaan, kesehatan, tetap bersatu dan tidak pernah
            terpisahkan, panjang umur dan tinggal di rumah yang penuh
            kegembiraan bersama seluruh keturunannya"
          </p>

          <div className="flex items-center pt-3">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
              Rg Veda X.85.42.
            </p>
            <svg
              viewBox="0 0 340 1"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-1 ml-5 h-px"
            >
              <path
                className={isVisible ? "quoteLine" : ""}
                fill="none"
                stroke="white"
                strokeWidth="1"
                d="M0 0.5 L340 0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
