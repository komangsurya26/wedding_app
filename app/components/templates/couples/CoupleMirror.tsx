import Image from "next/image";
import { FaInstagram } from "react-icons/fa";

export default function CoupleMirror({
  sectionClassName,
}: {
  sectionClassName?: string;
}) {
  return (
    <section className={sectionClassName}>
      {/* Mempelai Pria */}
      <div>
        <Image
          src="https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
          alt="Pria"
          width={800}
          height={800}
          className="w-11/12 h-[400px] object-cover"
          style={{
            borderRadius: "200px 200px 200px 0px",
          }}
        />

        {/* Info Groom */}
        <div className="flex flex-col items-start space-y-4 text-start">
          <p className="text-3xl font-medium mt-4 capitalize tracking-widest font-signature text-brown">
            Mempelai - Pria
          </p>

          {/* garis pendek yang menempel di kanan */}
          <div className="border-t border-gray-400 w-full"></div>

          <h2 className="text-2xl font-semibold capitalize tracking-wide text-brown font-belgiano">
            I Gede Power
          </h2>

          <p className="text-sm font-lora text-brown">
            Putra Pertama dari Pasangan <br />
            Bapak Romeo & Ibu Juliet
          </p>

          <div className="border p-2 rounded-full bg-brown/80 text-white">
            <a
              href="https://instagram.com/komangsurya_26"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs"
            >
              <FaInstagram />
              <span className="truncate max-w-[100px]">komangsurya_26</span>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-8xl text-brown font-greatvibes">&</div>

      {/* Mempelai Wanita */}
      <div>
        <div className="justify-end flex">
          <Image
            src="https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
            alt="Pria"
            width={800}
            height={800}
            className="w-11/12 h-[400px] object-cover"
            style={{
              borderRadius: "200px 200px 0px 200px",
            }}
          />
        </div>

        {/* Info Groom */}
        <div className="flex flex-col items-end space-y-4 text-end">
          <p className="text-3xl font-medium mt-4 capitalize tracking-widest font-signature text-brown">
            Mempelai - Wanita
          </p>

          {/* garis pendek yang menempel di kanan */}
          <div className="border-t border-gray-400 w-full"></div>

          <h2 className="text-2xl font-semibold capitalize tracking-wide text-brown font-belgiano">
            I Komang Agus Surya Sedana
          </h2>

          <p className="text-sm font-lora text-brown">
            Putri Pertama dari Pasangan <br />
            Bapak Romeo & Ibu Juliet
          </p>

          <div className="border p-2 rounded-full bg-brown/80 text-white">
            <a
              href="https://instagram.com/komangsurya_26"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-xs"
            >
              <FaInstagram />
              <span className="truncate max-w-[100px]">komangsurya_26</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
