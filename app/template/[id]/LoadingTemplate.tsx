"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  TemplateComponent: React.ComponentType<{ config: any }>;
  config: any;
  minDuration?: number;
}

export default function LoadingTemplate({
  TemplateComponent,
  config,
  minDuration = 5000,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    function step(ts: number) {
      if (startRef.current == null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const t = Math.min(elapsed / minDuration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.floor(eased * 100));
      if (t < 1) rafRef.current = requestAnimationFrame(step);
      else setProgress(100);
    }
    rafRef.current = requestAnimationFrame(step);
    const timer = setTimeout(() => setIsLoading(false), minDuration);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white transition-opacity duration-700 ${
          isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="text-center">
          <h1 className="text-5xl font-oranienbaum">Bagus &amp; Cahya</h1>
          <p className="mt-4 font-karla text-2xl">{progress}%</p>
          <div className="mt-3 w-64 h-1 bg-white/20 mx-auto rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Konten utama */}
      <TemplateComponent config={config} />
    </>
  );
}
