"use client";

import { useRef, useState } from "react";
import { FaEnvelopeOpen } from "react-icons/fa";

import Footer from "@/app/components/templates/Footer.default";
import WeddingGift from "@/app/components/templates/WeddingGift.default";
import Greeting from "@/app/components/templates/Greeting.default";
import Quote from "@/app/components/templates/Quote.default";
import LoveStory from "@/app/components/templates/LoveStory.default";
import Gallery from "@/app/components/templates/Gallery.default";
import RSVP from "@/app/components/templates/RSVP.default";
import WeddingDay from "@/app/components/templates/WeddingDay.default";
import Groom from "@/app/components/templates/Groom.default";
import Bride from "@/app/components/templates/Bride.default";
import CountDown from "@/app/components/templates/CountDown.default";
import LoadingPercent from "@/app/components/templates/LoadingPercent";

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
    <>
      <LoadingPercent shortNameGroom="Komang" shortNameBride="Surya" />
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
            <Groom
              image={config.images.groom}
              name="I Komang Agus Surya Sedana"
              childOrder="Pertama"
              father="I Made Sudiarta"
              mother="Ni Nengah Karmini"
              instagram="komangsurya_26"
            />
            <Bride
              image={config.images.bride}
              name="I Komang Agus Surya Sedana"
              childOrder="Pertama"
              father="I Made Sudiarta"
              mother="Ni Nengah Karmini"
              instagram="komangsurya_26"
            />
            <CountDown
              image={config.images.couple[1]}
              date="2025-11-12T16:02:00"
            />

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
            <RSVP />
            {/* panggil komponen WeddingGift biasa (komponen internal tidak perlu bg lagi) */}
            <WeddingGift
              accounts={[
                {
                  bankName: "Bank Central Asia (BCA)",
                  accountNumber: "1234567890",
                  owner: "Komang Surya",
                  logo: "/banks/bca.png",
                },
                {
                  bankName: "Bank Mandiri",
                  accountNumber: "0987654321",
                  owner: "Komang Surya",
                  logo: "/banks/mandiri.png",
                },
              ]}
            />
            <Footer images={config.images.couple} />
          </div>
        </div>
      </main>
    </>
  );
}
