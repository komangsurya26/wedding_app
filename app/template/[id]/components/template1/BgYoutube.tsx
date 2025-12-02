"use client";

import React from "react";

export function BgYoutube({ videoIdYoutube }: { videoIdYoutube: string }) {
  // const url = `https://res.cloudinary.com/dpij7jkkd/video/upload/f_auto,q_auto/videoplayback_pua8re`;
  const url = `https://res.cloudinary.com/dpij7jkkd/video/upload/v1763908785/videoplayback_pua8re.mp4`;
  return (
    <>
      <iframe
        src={`https://www.youtube.com/embed/${videoIdYoutube}?autoplay=1&mute=1&loop=1&playlist=${videoIdYoutube}&controls=0&modestbranding=1&rel=0&playsinline=1`}
        title="Wedding Video"
        loading="lazy"
        allow="autoplay; fullscreen"
        className="absolute w-[160vh] h-[100vh] object-cover pointer-events-none"
        // className="absolute w-[250vh] h-[100vh] lg:w-[250vh] lg:h-[100vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          transform: "scale(1.5)",
        }}
      />
      <div className="absolute inset-0 bg-black/70"></div>
    </>
    // <div>
    //   <video
    //     src={url}
    //     autoPlay={true}
    //     loop={true}
    //     muted={true}
    //     controls={false}
    //     className="absolute h-full w-full object-cover pointer-events-none"
    //   >
    //     Browser Anda tidak mendukung video tag.
    //   </video>
    //   <div className="absolute inset-0 bg-black/70"></div>
    // </div>
  );
}
