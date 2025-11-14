"use client";

import { FaEnvelopeOpen } from "react-icons/fa";

export default function Hero({
  scrollTargetId,
  isOpened,
  setIsOpened,
}: {
  scrollTargetId: string;
  isOpened: boolean;
  setIsOpened: (v: boolean) => void;
}) {
  const handleOpen = () => {
    setIsOpened(true);
    setTimeout(() => {
      const target = document.getElementById(scrollTargetId);
      target?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="text-center text-white h-screen flex flex-col items-center justify-between px-6 py-10">
      <div className="">
        <p className="text-sm tracking-widest mb-4">The Wedding Of</p>
        <h1 className="text-7xl font-oranienbaum">
          Aksara
          <br className="block md:hidden" /> &{" "}
          <br className="block md:hidden" />
          Sofia
        </h1>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-white/60">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <h2 className="text-lg font-medium">Tamu Undangan</h2>

        {!isOpened && (
          <button
            onClick={handleOpen}
            className="mt-4 px-6 py-4 border border-white/60 animate-pulse rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <div className="flex items-center gap-3 text-xs">
              <FaEnvelopeOpen />
              <p className="text-white/50 tracking-wider">OPEN INVITATION</p>
            </div>
          </button>
        )}

        <p className="text-[10px] text-white mt-4">
          *Mohon maaf jika terdapat kesalahan penulisan nama & gelar
        </p>
      </div>
    </div>
  );
}
