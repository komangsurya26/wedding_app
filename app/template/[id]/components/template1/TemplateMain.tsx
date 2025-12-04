"use client";

import { useState } from "react";
import { Invitation } from "@/src/types";

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

export default function TemplateMain({ config }: { config: Invitation }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <LoadingPercent
        shortNameGroom="Komang"
        shortNameBride="Surya"
        minDuration={5000}
      />
      <main className="h-screen flex justify-center bg-black">
        <div className="relative h-full w-full lg:w-1/2 overflow-hidden overflow-x-hidden">
          <BgYoutube videoIdYoutube={config.video?.id_video_youtube!} />
          <div className={`relative h-full ${isOpened && "overflow-y-auto"}`}>
            <Hero
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              scrollTargetId="section-2"
            />
            <Greeting
              id="section-2"
              image={config.photos?.photo_portraits[0]!}
            />
            <Quote />
            <Groom
              full_name="I Komang Agus Surya Sedana"
              child_order="Pertama"
              father="I Made Sudiarta"
              mother="Ni Nengah Karmini"
              instagram="komangsurya_26"
              short_name=""
              images={config.photos?.photo_grooms ?? []}
            />
            <Bride
              full_name="I Komang Agus Surya Sedana"
              child_order="Pertama"
              father="I Made Sudiarta"
              mother="Ni Nengah Karmini"
              instagram="komangsurya_26"
              short_name=""
              images={config.photos?.photo_brides ?? []}
            />
            <CountDownTimer
              image={config.photos?.photo_landscapes[0] ?? ""}
              date={config.countdown?.date!}
            />
            <WeddingDay events={config.events!} />
            <LoveStory image={config.photos?.photo_portraits[0]!} />
            <Gallery
              videoIdYoutube={config.video?.id_video_youtube ?? ""}
              imageLandscapes={config.photos?.photo_landscapes ?? []}
              imagePotraits={config.photos?.photo_portraits ?? []}
            />
            <RSVP />
            <WeddingGift
              gifts={[
                {
                  bank_name: "BCA",
                  account_number: "1234567890",
                  owner: "Komang Surya",
                  logo: "https://res.cloudinary.com/dpij7jkkd/image/upload/v1764136672/banks/bca_ls9vum.png",
                },
                {
                  bank_name: "Mandiri",
                  account_number: "0987654321",
                  owner: "Komang Surya",
                  logo: "https://res.cloudinary.com/dpij7jkkd/image/upload/v1764136672/banks/mandiri_lzkfeh.png",
                },
              ]}
            />
            <Footer images={config.photos?.photo_portraits ?? []} />
          </div>
        </div>
      </main>
    </>
  );
}
