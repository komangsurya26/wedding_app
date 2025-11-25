"use client";

import { useEffect, useState } from "react";
import { useLoadingProgress } from "@/src/hooks/use-loading-progress";

interface Props {
  minDuration: number;
  shortNameGroom: string;
  shortNameBride: string;
}

export function LoadingPercent({
  shortNameGroom,
  shortNameBride,
  minDuration,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const progress = useLoadingProgress(minDuration);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), minDuration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-700 ${
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center">
        <h1 className="text-5xl font-oranienbaum">
          {shortNameGroom} & {shortNameBride}
        </h1>
        <p className="mt-4 font-karla text-2xl">{progress}%</p>
      </div>
    </div>
  );
}
