"use client";

import React, { useState } from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";

//types
import { Gifts } from "@/types";

//icons
import { HiOutlineClipboard } from "react-icons/hi";

export function WeddingGift({ gifts }: { gifts: Gifts[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  const handleCopy = (accountNumber: string) => {
    if (isCopying) return;
    setIsCopying(true);
    copy(accountNumber);
    setCopied(accountNumber);
    setTimeout(() => {
      setCopied(null);
      setIsCopying(false);
    }, 1000);
  };

  return (
    <section className="flex flex-col items-center justify-center h-[60vh] p-6 text-center text-white">
      <h1 className="text-4xl font-noto-serif-display italic">Wedding Gift</h1>
      <p className="mt-2 text-sm text-gray-300 max-w-md mx-auto">
        Bagi yang ingin memberikan tanda kasih, dapat mengirimkan melalui
        rekening di bawah ini:
      </p>

      <div className="mt-10 space-y-5 max-h-[60vh] overflow-y-auto w-full hide-scrollbar">
        {gifts.map((g, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/20 border border-white/10 overflow-x-auto hide-scrollbar"
          >
            {g.logo ? (
              <div className="w-12 h-12 rounded-lg">
                <Image
                  src={g.logo}
                  alt={g.bank_name}
                  width={60}
                  height={40}
                  className="object-contain w-full h-full"
                />
              </div>
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 font-semibold">
                {g.bank_name.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-left">
              <p className="font-semibold text-base">{g.bank_name}</p>
              <p className="font-semibold text-sm">{g.account_number}</p>
              <p className="text-xs text-gray-300 mt-1">{g.owner}</p>
            </div>

            <button
              disabled={isCopying}
              onClick={() => handleCopy(g.account_number)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition ${
                copied === g.account_number
                  ? "bg-white text-black"
                  : "border border-white/20 hover:bg-white/10"
              }`}
            >
              <HiOutlineClipboard className="w-4 h-4" />
              <span>{copied === g.account_number ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
