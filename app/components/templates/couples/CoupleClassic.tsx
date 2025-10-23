import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function CoupleClassic({
  sectionClassName,
}: {
  sectionClassName?: string;
}) {
  return (
    <section className={sectionClassName}>
      {/* Mempelai Pria */}
      <div>
        <Image
          src={
            "https://tamubali.com/wp-content/uploads/2025/04/ASA_5349-67fc8aeb1c9f9.jpeg"
          }
          alt="Pria"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />

        {/* Info Groom */}
        <div className="text-start">
          {/* Instagram */}
          <div className="flex justify-end mb-6 mt-3">
            <a
              href="https://instagram.com/komangsurya_26"
              target="_blank"
              className="flex items-center gap-1 text-xs text-gray-300 hover:text-white"
            >
              <FaInstagram />
              <span className="truncate max-w-[100px]">komangsurya_26</span>
            </a>
          </div>

          {/* Title */}
          <p className="text-sm uppercase tracking-widest">Mempelai - Pria</p>
          <div className="border-t border-gray-400 w-full my-4"></div>

          <h2 className="text-2xl font-semibold uppercase">
            I Komang Agus Surya Sedana
          </h2>
          <p className="mt-3 text-sm font-karla tracking-widest">
            Putra Pertama dari Pasangan <br />
            Bapak Romeo & Ibu Juliet
          </p>
        </div>
      </div>

      {/* Mempelai Wanita */}
      <div className="mt-28">
        <Image
          src={
            "https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
          }
          alt="Pria"
          width={800}
          height={800}
          className="w-full h-full object-cover"
        />

        {/* Info Groom */}
        <div className="text-start">
          {/* Instagram */}
          <div className="flex justify-end mb-6 mt-3">
            <a
              href="https://instagram.com/komangsurya_26"
              target="_blank"
              className="flex items-center gap-1 text-xs text-gray-300 hover:text-white"
            >
              <FaInstagram />
              <span className="truncate max-w-[100px]">komangsurya_26</span>
            </a>
          </div>

          {/* Title */}
          <p className="text-sm uppercase tracking-widest">Mempelai - Wanita</p>
          <div className="border-t border-gray-400 w-full my-4"></div>

          <h2 className="text-2xl font-semibold uppercase">
            I Komang Agus Surya Sedana
          </h2>
          <p className="mt-3 text-sm font-karla tracking-widest">
            Putri Pertama dari Pasangan <br />
            Bapak Romeo & Ibu Juliet
          </p>
        </div>
      </div>
    </section>
  );
}
