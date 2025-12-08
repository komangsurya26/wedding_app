"use client";

import React, { useState } from "react";
import { Invitation } from "@/src/types";

import { Footer } from "./template1/Footer";
import { WeddingGift } from "./template1/WeddingGift";
import { Greeting } from "./template1/Greeting";
import { Quote } from "./template1/Quote";
import { LoveStory } from "./template1/LoveStory";
import { Gallery } from "./template1/Gallery";
import { RSVP } from "./template1/RSVP";
import { WeddingDay } from "./template1/WeddingDay";
import { Groom } from "./template1/Groom";
import { Bride } from "./template1/Bride";
import { Hero } from "./template1/Hero";
import { LoadingPercent } from "./template1/LoadingPercent";
import { BgYoutube } from "./template1/BgYoutube";
import CountDownTimer from "./template1/CountDownTimer";
import { addDay } from "@/src/lib/utils";

export default function Template1({ config }: { config: Invitation }) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <React.Fragment>
      <LoadingPercent
        shortNameGroom={config.groom?.short_name ?? ""}
        shortNameBride={config.bride?.short_name ?? ""}
        minDuration={5000}
      />
      <main className="h-screen flex justify-center bg-black">
        <div className="relative h-full w-full lg:w-1/2 overflow-hidden overflow-x-hidden">
          <BgYoutube videoIdYoutube={config.video?.id_video_youtube ?? ""} />
          <div className={`relative h-full ${isOpened && "overflow-y-auto"}`}>
            <Hero
              isOpened={isOpened}
              setIsOpened={setIsOpened}
              scrollTargetId="section-2"
            />
            <Greeting
              id="section-2"
              image={config.photos?.photo_portraits[0] ?? ""}
            />
            <Quote
              dateCountdown={
                config.countdown?.date ?? addDay(new Date(), 6).toISOString()
              }
            />
            <Groom
              groom={config.groom ?? null}
              imagesGroom={config.photos?.photo_grooms ?? []}
            />
            <Bride
              bride={config.bride ?? null}
              imagesBride={config.photos?.photo_brides ?? []}
            />
            <CountDownTimer
              image={config.photos?.photo_portraits[1] ?? ""}
              date={
                config.countdown?.date ?? addDay(new Date(), 6).toISOString()
              }
            />
            <WeddingDay events={config.events ?? []} />
            <LoveStory image={config.photos?.photo_portraits[2] ?? ""} />
            <Gallery
              bride={config.bride?.short_name ?? ""}
              groom={config.groom?.short_name ?? ""}
              videoIdYoutube={config.video?.id_video_youtube ?? ""}
              imageLandscapes={config.photos?.photo_landscapes ?? []}
              imagePotraits={config.photos?.photo_portraits ?? []}
            />
            <RSVP />
            <WeddingGift gifts={config.gifts ?? []} />
            <Footer images={config.photos?.photo_portraits ?? []} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}
