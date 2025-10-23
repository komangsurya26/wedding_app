import Image from "next/image";
import { FaInstagram, FaShopify, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <section className="relative min-h-screen px-12 overflow-hidden">
      {/* Background Image */}

      <Image
        src="https://tamubali.com/wp-content/uploads/2024/09/ERY_6970-scaled.webp"
        alt="Background footer"
        fill
        className="object-cover brightness-50"
        priority
      />

      <div className="absolute top-0 left-0 right-0 h-[250px] bg-gradient-to-b from-black via-black/60 to-transparent"></div>

      <div className="relative text-center text-white py-6 flex flex-col justify-end min-h-[100vh]">
        <div>
          {/* Credit */}
          <p className="text-xs text-gray-300">
            created by classicundangan.com
          </p>

          {/* Social Media */}
          <div className="flex justify-center gap-6 text-sm mt-4">
            <a
              href="https://instagram.com/komangsurya_26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://tiktok.com/@komangsurya_26"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaShopify />
            </a>
            <a
              href="https://wa.me/6281353285093"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </div>

          {/* WhatsApp Number */}
        </div>
      </div>
    </section>
  );
}
