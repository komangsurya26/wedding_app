"use client";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import LightGallery from "lightgallery/react";

import Image from "next/image";

export function Gallery({
  groom,
  bride,
  videoIdYoutube,
  imagePotraits,
  imageLandscapes,
}: {
  groom: string;
  bride: string;
  videoIdYoutube: string;
  imagePotraits: string[];
  imageLandscapes: string[];
}) {
  const images = [
    // column 1
    imagePotraits[0],
    imageLandscapes[0],

    // column 2
    imageLandscapes[1],
    imagePotraits[1],

    // column 3
    imagePotraits[2] ?? imagePotraits[0],
    imageLandscapes[2] ?? imageLandscapes[0],

    // column 4
    imageLandscapes[3] ?? imageLandscapes[1],
    imagePotraits[3] ?? imagePotraits[1],

    // column 5
    imagePotraits[4] ?? imagePotraits[0],
    imageLandscapes[4] ?? imageLandscapes[0],

    // column 6
    imageLandscapes[0],
    imagePotraits[0],
  ];

  const columns = Math.ceil(images.length / 2); // Membagi gambar menjadi 2 baris
  const imagesPerColumn = Math.ceil(images.length / columns); // Jumlah gambar per kolom
  const imagesColumns = Array.from({ length: columns }, (_, columnIndex) => {
    // Membuat array untuk setiap kolom
    return images.slice(
      columnIndex * imagesPerColumn,
      (columnIndex + 1) * imagesPerColumn
    );
  });

  return (
    <section className="pt-8 px-2 max-w-[1200px] mx-auto">
      <div className="text-center mb-2">
        <h1 className="text-3xl lg:text-5xl font-noto-serif-display italic text-white">
          Our Gallery
        </h1>
      </div>

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
      <LightGallery
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
        selector="a[data-src]"
      >
        <div className="grid grid-cols-2 gap-3">
          {imagesColumns.map((columnImages, columnIndex) => (
            <div key={columnIndex} className="grid space-y-3">
              {columnImages.map((src, imageIndex) => (
                <a key={imageIndex} href={src} data-src={src}>
                  <img
                    className="w-full h-auto object-cover rounded shadow"
                    src={src}
                    alt={`${groom} & ${bride}`}
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </LightGallery>
    </section>
  );
}
