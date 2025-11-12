"use client";

import React, { useState } from "react";
import Image from "next/image";
import copy from "copy-to-clipboard";

//types
import { WeddingGiftProps } from "@/app/types";

//icons
import { HiOutlineClipboard } from "react-icons/hi";

export default function WeddingGift({ accounts }: WeddingGiftProps) {
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

      <div className="mt-10 space-y-5 max-h-[60vh] overflow-y-auto w-full max-w-xl">
        {accounts.map((acc) => (
          <div
            key={acc.accountNumber}
            className="flex items-center gap-4 p-4 rounded-xl bg-white/20 border border-white/10"
          >
            {acc.logo ? (
              <Image
                src={acc.logo}
                alt={acc.bankName}
                width={50}
                height={40}
                className="object-contain"
              />
            ) : (
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 font-semibold">
                {acc.bankName.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-left">
              <p className="font-semibold text-sm sm:text-base">
                {acc.accountNumber}
              </p>
              <p className="text-xs text-gray-300 mt-1">{acc.owner}</p>
            </div>

            <button
              disabled={isCopying}
              onClick={() => handleCopy(acc.accountNumber)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm transition ${
                copied === acc.accountNumber
                  ? "bg-white text-black"
                  : "border border-white/20 hover:bg-white/10"
              }`}
            >
              <HiOutlineClipboard className="w-4 h-4" />
              <span>{copied === acc.accountNumber ? "Copied!" : "Copy"}</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
