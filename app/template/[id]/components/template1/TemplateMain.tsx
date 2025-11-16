"use client";

import { useState } from "react";
import { ConfigTemplate } from "@/app/types";

import { Footer } from "./Footer";
import { WeddingGift } from "./WeddingGift";
import { Greeting } from "./Greeting";
import { Quote } from "./Quote";
import { LoveStory } from "./LoveStory";
import { Gallery } from "./Gallery";
import { RSVP } from "./RSVP";
import { WeddingDay } from "./WeddingDay";
import { Groom } from "./Groom";
import { Bride } from "./Bride";
import { Hero } from "./Hero";
import { LoadingPercent } from "./LoadingPercent";
import { BgYoutube } from "./BgYoutube";
import CountDownTimer from "./CountDownTimer";

export function TemplateMain({ config }: { config: ConfigTemplate }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <LoadingPercent shortNameGroom="Komang" shortNameBride="Surya" />
      <main className="h-screen flex justify-center bg-black">
        <div className="relative h-full w-full lg:w-1/2 overflow-hidden overflow-x-hidden">
          <BgYoutube videoIdYoutube={config.videoIdYoutube} />
          <div className={`relative h-full ${isOpened && "overflow-y-auto"}`}>
            <Hero
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              scrollTargetId="section-2"
            />
            <Greeting id="section-2" image={config.images.couple[1]} />
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
            <CountDownTimer
              image={config.images.couple[1]}
              date="2025-11-20T16:02:00"
            />
            <WeddingDay
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
            <Footer images={config.images.potrait} />
          </div>
        </div>
      </main>
    </>
  );
}
