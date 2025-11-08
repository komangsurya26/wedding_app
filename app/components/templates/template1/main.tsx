"use client";

import { useRef, useState } from "react";
import { FaEnvelopeOpen } from "react-icons/fa";

import Footer from "../common/sections/Footer.default";
import WeddingGift from "../common/sections/WeddingGift.default";
import Greeting from "../common/sections/Greeting.default";
import Quote from "../common/sections/Quote.default";
import LoveStory from "../common/sections/LoveStory.default";
import Gallery from "../common/sections/Gallery.default";
import RSVP from "../common/sections/RSVP.default";
import WeddingDay from "../common/sections/WeddingDay.default";
import Groom from "../common/sections/Groom.default";
import Bride from "../common/sections/Bride.default";
import CountDown from "../common/sections/CountDown.default";

export default function Template1({ config }: { config: any }) {
  const [isOpened, setIsOpened] = useState(false);
  const section2Ref = useRef<HTMLDivElement>(null);
  const handleOpenInvitation = () => {
    setIsOpened(true);
    setTimeout(() => {
      section2Ref.current?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <main className="h-screen flex justify-center bg-black">
      <div className="w-full lg:w-6/12 h-full relative overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${config.videoIdYoutube}?autoplay=1&mute=1&loop=1&playlist=${config.videoIdYoutube}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          title="Wedding Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "250vh",
            height: "177.78vh",
            border: 0,
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div
          className={`relative z-20 h-full
            ${isOpened && "overflow-y-auto"}
          `}
        >
          {/* Section 1 */}
          <section className="text-center text-white h-screen flex flex-col items-center justify-between px-6 py-10 ">
            <div>
              <p className="text-sm tracking-widest mb-2">The Wedding Of</p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:mx-48 font-oranienbaum">
                Aksara & Sofia
              </h1>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-white/60">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h2 className="text-lg font-medium">Tamu Undangan</h2>
              <div
                className={`transition-opacity duration-400 ${
                  isOpened ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
              >
                <button
                  onClick={handleOpenInvitation}
                  className="mt-4 px-6 py-4 border border-white/60 animate-pulse rounded-lg hover:bg-white/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 text-xs">
                    <FaEnvelopeOpen />
                    <p className="text-white/50 tracking-wider">
                      OPEN INVITATION
                    </p>
                  </div>
                </button>
              </div>
              <p className="text-[10px] text-white mt-4">
                *Mohon maaf jika terdapat kesalahan penulisan nama & gelar
              </p>
            </div>
          </section>
          <Greeting image={config.images.couple[1]} ref={section2Ref} />
          <Quote />
          <Groom image={config.images.groom} />
          <Bride image={config.images.bride} />
          <CountDown image={config.images.couple[1]} />

          {/* (Wedding Day) */}
          <WeddingDay
            images={config.images.couple}
            events={[
              {
                id: 1,
                title: "Akad Nikah",
                date: "Minggu, 31 Desember 2025",
                time: "09.00 WIB - Selesai",
                venue: "Balai Sarbini Jakarta",
                locationUrl: "https://maps.google.com/....",
              },
              {
                id: 2,
                title: "Resepsi Pernikahan",
                date: "Minggu, 31 Desember 2025",
                time: "11.00 WIB - Selesai",
                venue: "Balai Sarbini Jakarta",
                locationUrl: "https://maps.google.com/....",
              },
            ]}
          />

          <LoveStory image={config.images.couple[1]} />
          <Gallery
            videoIdYoutube={config.videoIdYoutube}
            imageLandscapes={config.images.landscape}
            imagePotraits={config.images.potrait}
          />
          <RSVP image={config.images.couple[1]} />
          {/* panggil komponen WeddingGift biasa (komponen internal tidak perlu bg lagi) */}
          <WeddingGift />
          <Footer />
        </div>
      </div>
    </main>
  );
}
