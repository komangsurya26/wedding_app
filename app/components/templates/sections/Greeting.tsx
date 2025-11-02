import Image from "next/image";
import React from "react";

export default function Greeting({ image }: { image: string }) {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-start text-center text-white overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Couple Photo"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-black/60 via-black/50 to-transparent"></div>
      </div>
      <div className="px-6 py-10 relative">
        <div className="flex flex-col items-center space-y-2">
          <h2 className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold tracking-widest text-white font-oranienbaum">
            "Om Swastiastu"
          </h2>
          <p className="text-[clamp(0.9rem,2vw,1.125rem)] text-white/80 font-serif font-extralight leading-snug md:leading-tight tracking-tight">
            Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan Yang
            Maha Esa, kami bermaksud mengundang Bapak/ Ibu/ Saudara/i pada
            Upacara Manusa Yadnya Pawiwahan putra dan putri kami.
          </p>
          {/* <div className="w-0.5 h-12 bg-white/50" /> */}
          {/* <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-light font-oranienbaum tracking-wide drop-shadow-sm">
            Komang & Surya
          </h3> */}
          <div className="animate-bounce-slow flex flex-col items-center gap-1">
            <svg
              className="w-8 h-8 text-white/90"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="w-8 h-8 text-white/70 -mt-2"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
