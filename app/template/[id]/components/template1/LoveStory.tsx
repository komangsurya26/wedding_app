import Image from "next/image";
import React from "react";

export default function LoveStory({ image }: { image: string }) {
  return (
    <section className="relative h-[120vh] md:h-[150vh] flex items-start justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <Image
        src={image}
        alt="Couple"
        width={800}
        height={700}
        className="h-full absolute object-cover object-center"
      />
      <div className="absolute top-0 left-0 right-0 h-[70vh] sm:h-[80vh] bg-gradient-to-b from-neutral-900 via-neutral-800 to-transparent" />
      {/* Content */}
      <div className="relative w-full pt-16 px-6 md:px-12 lg:px-24 max-w-5xl text-center">
        <h1 className="text-4xl lg:text-5xl font-noto-serif-display italic text-white">
          LOVE STORY
        </h1>

        <div className="mt-5 text-gray-300 space-y-4 font-serif text-[clamp(0.9rem,2vw,1.125rem)]">
          <p>
            Love brought us together,
            <br />
            two hearts, one soul, and a promise to stay.
          </p>

          <p>
            With God's grace,
            <br />
            we begin our journey as husband and wife,
          </p>

          <p>
            bound by love, strengthened by faith, and destined for a lifetime of
            happiness and loyalty.
          </p>
        </div>
      </div>
    </section>
  );
}
