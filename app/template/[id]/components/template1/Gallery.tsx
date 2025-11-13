import React from "react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

export default function Gallery({
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
  const images = [...portraits, ...landscapes];

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
              src={`https://www.youtube.com/embed/${videoIdYoutube}?mute=1&autoplay=1&loop=1&playlist=${videoIdYoutube}&controls=0&modestbranding=1&rel=0&playsinline=1`}
              title="YouTube video player"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
              className="w-full h-full block"
              style={{ border: "0" }}
            />
          </div>
        </div>
      )}

      {/* Masonry gallery */}
      {images.length > 0 ? (
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          selector="a[data-src]"
        >
          <div className="columns-2 gap-2">
            {images.map((src, idx) => {
              return (
                <a
                  key={`${src}-${idx}`}
                  href={src}
                  data-src={src}
                  data-lg-size="1600-1067"
                  className="block mb-2 break-inside-avoid overflow-hidden shadow-sm"
                  data-sub-html=" <div class='lg-caption'><h4 class='font-semibold mb-1'>Komang & Surya</h4><p class='text-sm opacity-80'>Ketika cinta menjadi satu-satunya cahaya yang menerangi langkah.</p></div>"
                >
                  <img
                    src={src}
                    alt={`gallery-${idx + 1}`}
                    loading="lazy"
                    className="w-full h-auto block transform transition-transform duration-300 hover:scale-105"
                    style={{ display: "block" }}
                  />
                </a>
              );
            })}
          </div>
        </LightGallery>
      ) : (
        <p className="text-center text-sm text-gray-300">
          No images to display.
        </p>
      )}
    </section>
  );
}
