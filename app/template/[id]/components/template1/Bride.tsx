import { Bride as BrideTypes } from "@/src/types";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export function Bride({
  bride,
  imagesBride,
}: {
  bride: BrideTypes;
  imagesBride: string[];
}) {
  return (
    <section className="relative h-screen flex items-end text-end">
      <Image
        src={imagesBride[0]}
        alt="Bride"
        fill
        className="absolute object-cover object-center"
        priority={false}
      />
      <div className="absolute inset-0 top-[50vh] bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
      <div className="relative p-8 w-full space-y-4 text-white">
        <p className="text-lg italic font-serif text-white/80">
          Mempelai - Wanita
        </p>

        <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight leading-tight text-white">
          {bride.full_name}
        </h2>

        <p className="text-sm font-lora leading-normal text-white/80">
          Putri {bride.child_order.toLowerCase()} dari Bapak {bride.father} dan{" "}
          <br /> Ibu {bride.mother}
        </p>

        <a
          href={`https://instagram.com/${bride.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 px-4 py-2 w-fit rounded-full text-white/70 bg-white/8 hover:bg-white/15 "
        >
          <span className="bg-white/10 rounded-full">
            <FaInstagram className="w-4 h-4" />
          </span>
          <span>@{bride.instagram}</span>
        </a>
      </div>
    </section>
  );
}
