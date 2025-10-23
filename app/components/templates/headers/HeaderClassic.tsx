import Image from "next/image";
import clsx from "clsx";

export default function HeaderClassic({
  backgroundImageUrl,
  sectionClassName,
  classNameDiv,
  classNameOverlay,
}: {
  backgroundImageUrl?: string;
  sectionClassName?: string;
  classNameDiv?: string;
  classNameOverlay?: string;
}) {
  const hasBackground = Boolean(backgroundImageUrl);

  return (
    <section
      className={clsx(
        "relative min-h-screen overflow-hidden",
        sectionClassName
      )}
    >
      {hasBackground && (
        <div>
          <Image
            src={backgroundImageUrl!}
            alt="Wedding background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className={classNameOverlay}></div>;
        </div>
      )}

      <div
        className={clsx(
          "relative z-10 flex flex-col space-y-3",
          classNameDiv,
          hasBackground ? "text-white" : "text-brown"
        )}
      >
        <p className="text-sm uppercase tracking-widest font-karla">
          The Wedding Of
        </p>
        <h1 className="text-3xl md:text-2xl font-bold tracking-widest">
          MICHAEL & SHERLY
        </h1>
        <p className="font-karla tracking-widest">18 . 09 . 2025</p>
      </div>
    </section>
  );
}
