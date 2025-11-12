import { GroomProps } from "@/app/types";
import Image from "next/image";
import React from "react";
import { FaInstagram } from "react-icons/fa";

export default function Groom({
  image,
  name,
  father,
  mother,
  childOrder,
  instagram,
}: GroomProps) {
  return (
    <section className="relative h-screen flex items-end">
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt="Groom"
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="w-full bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8 md:p-12">
        <div className="max-w-4xl mx-auto text-white">
          <p className="text-sm md:text-xl text-white/80 italic font-serif">
            Mempelai - Pria
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif font-semibold tracking-tight leading-tight">
            {name}
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/80">
            Putra {childOrder} dari Bapak {father} dan Ibu {mother}
          </p>

          <div className="mt-6">
            <a
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-white/8 hover:bg-white/12 transition px-3 py-2 rounded-full text-white text-sm md:text-base"
            >
              <span className="bg-white/10 p-2 rounded-full flex items-center justify-center">
                <FaInstagram className="w-4 h-4" />
              </span>
              <span>@{instagram}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
