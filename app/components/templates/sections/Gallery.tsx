"use client";

import React from "react";
import Image from "next/image";

export default function Gallery({
  videoIdYoutube,
  imagePotraits,
  imageLandscapes,
}: {
  videoIdYoutube: string;
  imagePotraits: string[];
  imageLandscapes: string[];
}) {
  return (
    <section className="p-8">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-noto-serif-display italic">
          Our Gallery
        </h1>
      </div>

      {/* YouTube Video */}
      <div className="mb-12">
        <iframe
          src={`https://www.youtube.com/embed/${videoIdYoutube}?mute=1&autoplay=1&loop=1&playlist=${videoIdYoutube}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          title="YouTube video player"
          allowFullScreen
          className="w-full rounded-2xl shadow-lg"
          style={{
            aspectRatio: "16/9",
          }}
        ></iframe>
      </div>

      {/* Image Potraits */}
      <div className="grid grid-cols-2 gap-4">
        {imagePotraits.map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl group aspect-[4/5] sm:aspect-[16/10]"
          >
            <Image
              src={img}
              alt={`gallery ${index}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500"></div>
          </div>
        ))}
      </div>
      {/* Image Landscape */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {imageLandscapes.map((img, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl group aspect-[4/5] sm:aspect-[16/10]"
          >
            <Image
              src={img}
              alt={`gallery ${index}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}
