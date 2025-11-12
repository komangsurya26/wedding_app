import Image from "next/image";
import React from "react";
import CountDownAnimation from "@/app/components/templates/animations/CountDownAnimation";

export default function CountDown({
  image,
  date,
}: {
  image: string;
  date: string;
}) {
  const isRight = false;

  return (
    <section className="relative h-[100vh] py-10 flex items-end">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt="Couple"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

      <div
        className={`relative w-full px-8 ${
          isRight ? "text-end" : "text-start"
        }`}
      >
        <div
          className={`max-w-lg text-white ${isRight ? "ml-auto" : "mr-auto"}`}
        >
          <div className="gap-6">
            <div className="pt-6 lg:pt-0 space-y-6">
              <h1 className="font-noto-serif-display text-[3rem] sm:text-[4rem] leading-none tracking-tight text-white">
                <span className="block">Save</span>
                <span className="block">The Date</span>
              </h1>
              <div
                className={`h-px bg-white/60 ${
                  isRight ? "ml-auto" : "mr-auto"
                } w-full max-w-[700px]`}
              />
            </div>

            <div className="pt-8">
              <CountDownAnimation
                targetDate={date}
                className={
                  isRight ? "justify-items-end" : "justify-items-start"
                }
              />

              <div
                className={`mt-8 max-w-[15rem] ${
                  isRight ? "ml-auto" : "mr-auto"
                }`}
              >
                <a
                  href=""
                  className="font-bodonimoda inline-block w-full text-center px-6 py-3 border border-white rounded-md text-sm tracking-widest hover:bg-white/10 transition"
                >
                  SAVE THE DATE
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
