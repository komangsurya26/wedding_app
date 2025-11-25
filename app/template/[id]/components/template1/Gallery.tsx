"use client";

import React from "react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-zoom.css";
import Image from "next/image";

export function Gallery({
  videoIdYoutube,
  imagePotraits,
  imageLandscapes,
}: {
  videoIdYoutube: string;
  imagePotraits: string[];
  imageLandscapes: string[];
}) {
  const portraits = Array.isArray(imagePotraits) ? imagePotraits : [];
  const landscapes = Array.isArray(imageLandscapes) ? imageLandscapes : [];

  return (
    <section className="pt-8 px-2 max-w-[1200px] mx-auto">
      {/* Title */}
      <div className="text-center mb-2">
        <h1 className="text-3xl lg:text-5xl font-noto-serif-display italic text-white">
          Our Gallery
        </h1>
      </div>

      {/* YouTube Video */}
      {videoIdYoutube && (
        <div className="mb-2">
          <div
            className="w-full overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${videoIdYoutube}?mute=1&controls=0&rel=0`}
              title="YouTube video player"
              allow="encrypted-media; fullscreen"
              className="w-full h-full block"
            />
          </div>
        </div>
      )}

      {/* Masonry gallery */}
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        selector="a[data-src]"
      >
        <div className="grid grid-cols-2 gap-3">
          {/* COLUMN 1 */}
          <div className="grid space-y-3">
            <a href={portraits[0]} data-src={portraits[0]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[0]}
                width={232}
                height={290}
                alt="Image 01"
              />
            </a>

            <a href={landscapes[0]} data-src={landscapes[0]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[0]}
                width={232}
                height={290}
                alt="Image 02"
              />
            </a>

            <a href={portraits[1]} data-src={portraits[1]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[1]}
                width={232}
                height={174}
                alt="Image 03"
              />
            </a>

            <a href={landscapes[1]} data-src={landscapes[1]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[1]}
                width={232}
                height={174}
                alt="Image 04"
              />
            </a>
          </div>

          {/* COLUMN 2 */}
          <div className="grid space-y-3">
            <a href={landscapes[2]} data-src={landscapes[2]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[2]}
                width={232}
                height={290}
                alt="Image 05"
              />
            </a>

            <a href={portraits[2]} data-src={portraits[2]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[2]}
                width={232}
                height={290}
                alt="Image 06"
              />
            </a>

            <a href={landscapes[3]} data-src={landscapes[3]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[3]}
                width={232}
                height={174}
                alt="Image 07"
              />
            </a>

            <a href={portraits[3]} data-src={portraits[3]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[3]}
                width={232}
                height={174}
                alt="Image 08"
              />
            </a>
          </div>

          {/* COLUMN 3 */}
          <div className="grid space-y-3">
            <a href={portraits[4]} data-src={portraits[4]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[4]}
                width={232}
                height={290}
                alt="Image 09"
              />
            </a>

            <a href={landscapes[4]} data-src={landscapes[4]}>
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[4]}
                width={232}
                height={290}
                alt="Image 10"
              />
            </a>

            <a
              href={portraits[5] ?? portraits[0]}
              data-src={portraits[5] ?? portraits[0]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[5] ?? portraits[0]}
                width={232}
                height={174}
                alt="Image 11"
              />
            </a>

            <a
              href={landscapes[5] ?? landscapes[0]}
              data-src={landscapes[5] ?? landscapes[0]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[5] ?? landscapes[0]}
                width={232}
                height={174}
                alt="Image 12"
              />
            </a>
          </div>

          {/* COLUMN 4 */}
          <div className="grid space-y-3">
            <a
              href={landscapes[6] ?? landscapes[1]}
              data-src={landscapes[6] ?? landscapes[1]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[6] ?? landscapes[1]}
                width={232}
                height={290}
                alt="Image 13"
              />
            </a>

            <a
              href={portraits[6] ?? portraits[1]}
              data-src={portraits[6] ?? portraits[1]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[6] ?? portraits[1]}
                width={232}
                height={290}
                alt="Image 14"
              />
            </a>

            <a
              href={landscapes[7] ?? landscapes[2]}
              data-src={landscapes[7] ?? landscapes[2]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[7] ?? landscapes[2]}
                width={232}
                height={174}
                alt="Image 15"
              />
            </a>

            <a
              href={portraits[7] ?? portraits[2]}
              data-src={portraits[7] ?? portraits[2]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[7] ?? portraits[2]}
                width={232}
                height={174}
                alt="Image 16"
              />
            </a>
          </div>

          {/* COLUMN 5 */}
          <div className="grid space-y-3">
            <a
              href={portraits[8] ?? portraits[3]}
              data-src={portraits[8] ?? portraits[3]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[8] ?? portraits[3]}
                width={232}
                height={290}
                alt="Image 17"
              />
            </a>

            <a
              href={landscapes[8] ?? landscapes[3]}
              data-src={landscapes[8] ?? landscapes[3]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[8] ?? landscapes[3]}
                width={232}
                height={290}
                alt="Image 18"
              />
            </a>
          </div>

          {/* COLUMN 6 */}
          <div className="grid space-y-3">
            <a
              href={landscapes[9] ?? landscapes[4]}
              data-src={landscapes[9] ?? landscapes[4]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={landscapes[9] ?? landscapes[4]}
                width={232}
                height={290}
                alt="Image 19"
              />
            </a>

            <a
              href={portraits[9] ?? portraits[4]}
              data-src={portraits[9] ?? portraits[4]}
            >
              <Image
                className="w-full h-full object-cover rounded shadow"
                src={portraits[9] ?? portraits[4]}
                width={232}
                height={290}
                alt="Image 20"
              />
            </a>
          </div>
        </div>
      </LightGallery>
    </section>
  );
}
