import React from "react";

export default function Quote() {
  return (
    <section className="px-8 py-10 h-screen text-left text-white">
      <div className="max-w-lg space-y-8">
        <div className="h-[15vh] md:h-[10vh]"></div>
        <div className="font-noto-serif-display leading-[1.3] font-bold text-white/60">
          <p className="text-[4rem] sm:text-[6rem]">31</p>
          <p className="text-[4rem] sm:text-[6rem]">DES</p>
          <p className="text-[4rem] sm:text-[6rem]">2025</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white font-light">
            "Ya Tuhanku Yang Maha Pengasih, anugrahkanlah kepada pasangan ini
            senantiasa kebahagiaan, kesehatan, tetap bersatu dan tidak pernah
            terpisahkan, panjang umur dan tinggal di rumah yang penuh
            kegembiraan bersama seluruh keturunannya"
          </p>

          <p className="flex items-center pt-3 text-sm sm:text-base md:text-lg lg:text-xl text-white">
            Rg Veda X.85.42.
            <span className="flex-1 h-px bg-white/50 ml-5"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
