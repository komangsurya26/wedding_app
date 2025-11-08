import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function Bride({ image }: { image: string }) {
  return (
    <section className="relative h-screen flex items-end text-end">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt="Bride"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div className="w-full bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-white">
          <p className="text-sm md:text-xl text-white/80 italic font-serif">
            Mempelai - Wanita
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight leading-tight">
            Aksara Hagia, S.Psi
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/80">
            Putra Pertama dari Bapak Aksa dan Ibu Sara
          </p>

          <div className="mt-6">
            <a
              href={`https://instagram.com/komangsurya_26`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white/8 hover:bg-white/12 transition px-4 py-2 rounded-full text-white text-sm md:text-base"
            >
              <span className="bg-white/10 p-2 rounded-full flex items-center justify-center">
                <FaInstagram className="w-4 h-4" />
              </span>
              <span className="font-medium">@komangsurya_26</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
