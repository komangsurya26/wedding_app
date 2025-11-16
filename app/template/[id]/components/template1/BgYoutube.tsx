import React from "react";

export function BgYoutube({ videoIdYoutube }: { videoIdYoutube: string }) {
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${videoIdYoutube}?autoplay=1&mute=1&loop=1&playlist=${videoIdYoutube}&controls=0&modestbranding=1&rel=0&playsinline=1`}
        title="Wedding Video"
        allow="fullscreen"
        className="absolute w-[250vh] h-[100vh] lg:w-[250vh] lg:h-[100vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          border: 0,
        }}
      />
      <div className="absolute inset-0 bg-black/70"></div>
    </>
  );
}
