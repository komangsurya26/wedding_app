"use client";

import React, { useState } from "react";
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
    <React.Fragment>
      <LoadingPercent
        shortNameGroom={config.groom?.short_name!}
        shortNameBride={config.bride?.short_name!}
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
              groom={config.groom!}
              imagesGroom={config.photos?.photo_grooms ?? []}
            />
            <Bride
              bride={config.bride!}
              imagesBride={config.photos?.photo_brides ?? []}
            />
            <CountDownTimer
              image={config.photos?.photo_landscapes[0] ?? ""}
              date={config.countdown?.date!}
            />
            <WeddingDay events={config.events!} />
            <LoveStory image={config.photos?.photo_portraits[0]!} />
            <Gallery
              bride={config.bride!.short_name!}
              groom={config.groom!.short_name!}
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
