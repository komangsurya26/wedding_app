import clsx from "clsx";
import { FaMapPin } from "react-icons/fa";

export default function WeddingDayDetail({
  sectionClassName,
  titleClassName,
  paragraphClassName,
  titleResepsiClassName,
  dateClassName,
  addressClassName,
}: {
  sectionClassName?: string;
  titleClassName?: string;
  paragraphClassName?: string;
  titleResepsiClassName?: string;
  dateClassName?: string;
  addressClassName?: string;
}) {
  return (
    <section className={sectionClassName}>
      <div className="max-w-lg mx-auto space-y-12">
        {/* Harapan Kehadiran */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-widest uppercase">
            Wedding Day
          </h2>
          <p
            className={clsx(
              "text-[13px] tracking-widest font-karla leading-6 text-white/60",
              paragraphClassName
            )}
          >
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu pada
            acara kami.
          </p>
        </div>

        {/* Resepsi */}
        <hr className="border-gray-400" />

        <div className="space-y-12">
          <h2 className="text-2xl font-semibold tracking-widest">RESEPSI</h2>
          <p className={clsx("leading-8 tracking-widest", dateClassName)}>
            SABTU, 26 APRIL 2025 <br />
            PUKUL 15.00 WITA – SELESAI
          </p>
          <p className="font-karla text-[13px] text-white/70 tracking-widest leading-6">
            Jl. Ahmad Yani Utara No.188, <br />
            Peguyangan, Kec. Denpasar Utara, <br />
            Kota Denpasar, Bali 80115
          </p>
          <a
            href="https://maps.google.com?q=Jl.+Ahmad+Yani+Utara+No.188,+Denpasar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gray-300 text-black px-4 py-2 rounded-sm shadow text-xs"
          >
            <FaMapPin />
            GOOGLE MAPS
          </a>
        </div>
        <hr className="border-gray-400" />
      </div>
    </section>
  );
}
