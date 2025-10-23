"use client";

import clsx from "clsx";
import { useState } from "react";
import { FaEye, FaCheck, FaRegCopy } from "react-icons/fa";

export default function WeddingGift({
  title,
  description,
  sectionClassName,
  bgButton,
  classNameDescription,
  classNameTitle,
}: {
  title?: string;
  description?: string;
  sectionClassName?: string;
  bgButton?: string;
  classNameDescription?: string;
  classNameTitle?: string;
}) {
  const [copied, setCopied] = useState("");

  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopied(bank);
    setTimeout(() => setCopied(""), 1000);
  };

  // Data rekening
  const accounts = [
    {
      bank: "BCA",
      nomor: "1234567890",
      nama: "I Komang Agus Surya Sedana",
    },
    {
      bank: "Mandiri",
      nomor: "133322455666",
      nama: "I Komang Agus Surya Sedana",
    },
    {
      bank: "BTN",
      nomor: "55501510006018",
      nama: "Ni Putu Ayu Harum Ratna Dewi",
    },
  ];

  return (
    <section className={sectionClassName}>
      <div className="space-y-8">
        <h2 className={classNameTitle}>{title}</h2>
        <p className={classNameDescription}>{description}</p>
        <div>
          <button
            className={clsx(
              "inline-flex items-center text-sm gap-3 px-4 py-2 rounded-full",
              bgButton
            )}
          >
            <FaEye />
            <span>Tampilkan Rekening</span>
          </button>
        </div>
        <div className="space-y-4">
          {accounts.map((acc) => (
            <div
              key={acc.bank}
              className="border border-gray-400 w-full p-3 rounded-md flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{acc.bank}</h3>
                <p className="text-sm">No. Rekening</p>
                <p className="text-lg font-semibold tracking-wide">
                  {acc.nomor}
                </p>
                <p className="text-sm">{acc.nama}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleCopy(acc.nomor, acc.bank)}
                  className={clsx(
                    "flex items-center gap-1 text-xs rounded p-2",
                    bgButton
                  )}
                >
                  {copied === acc.bank ? <FaCheck /> : <FaRegCopy />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
