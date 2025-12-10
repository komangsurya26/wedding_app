import { Groom as GroomProps } from "@/types";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export function Groom({
  groom,
  imagesGroom,
}: {
  groom?: GroomProps | null;
  imagesGroom: string[];
}) {
  return (
    <section className="relative h-screen flex items-end">
      <Image
        src={imagesGroom[0]}
        alt="Groom"
        fill
        className="absolute object-cover object-center"
      />
      <div className="absolute inset-0 top-[50vh] bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
      <div className="relative p-8 w-full space-y-4 text-white">
        <p className="text-lg italic font-serif text-white/80">
          Mempelai - Pria
        </p>

        <h2 className="text-3xl md:text-5xl font-serif font-semibold tracking-tight leading-tight text-white">
          {groom?.full_name}
        </h2>

        <p className="text-sm font-lora leading-normal text-white/80">
          Putra {groom?.child_order.toLowerCase()} dari Bapak {groom?.father}{" "}
          dan <br /> Ibu {groom?.mother}
        </p>

        <a
          href={`https://instagram.com/${groom?.instagram}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-4 py-2 w-fit rounded-full text-white/70 bg-white/8 hover:bg-white/15 "
        >
          <span className="bg-white/10 rounded-full">
            <FaInstagram className="w-4 h-4" />
          </span>
          <span>@{groom?.instagram}</span>
        </a>
      </div>
    </section>
  );
}
