import Image from "next/image";
import clsx from "clsx";
import { HiMapPin } from "react-icons/hi2";

type EventDetail = {
  title: string;
  date: string;
  time: string;
  location: string;
  mapLink: string;
};

interface WeddingDayHeroProps {
  title?: string; // "Wedding Day" default
  backgroundImage: string;
  overlayClassName?: string;
  sectionClassName?: string;
  contentClassName?: string;
  eventBoxClassName?: string;
  titleClassName?: string;
  events: EventDetail[];
}

export default function WeddingDayHero({
  title = "Wedding Day",
  backgroundImage,
  overlayClassName,
  sectionClassName,
  contentClassName,
  eventBoxClassName,
  titleClassName,
  events,
}: WeddingDayHeroProps) {
  return (
    <section className={clsx("relative min-h-screen px-12", sectionClassName)}>
      {/* Sticky Background */}
      <Image
        src={backgroundImage}
        alt="Hero Image"
        fill
        className="object-cover"
        priority
      />

      {/* Overlay */}
      <div className={clsx("absolute inset-0 bg-black/50", overlayClassName)} />

      {/* Content */}
      <div
        className={clsx(
          "relative flex flex-col items-center justify-center min-h-screen space-y-4 text-center text-white",
          contentClassName
        )}
      >
        {/* Title */}
        <h1
          className={clsx(
            "text-5xl font-semibold font-belgiano tracking-wide",
            titleClassName
          )}
        >
          {title}
        </h1>

        {/* Events */}
        {events.map((event, index) => (
          <div
            key={index}
            className={clsx(
              "mt-6 bg-black/20 backdrop-blur-[2px] p-6 font-belgiano rounded-lg w-full max-w-md",
              eventBoxClassName
            )}
          >
            <h2 className="text-3xl font-semibold tracking-wide">
              {event.title}
            </h2>
            <p className="mt-4 text-sm tracking-wide font-lora">{event.date}</p>
            <p className="text-sm tracking-wide font-lora">{event.time}</p>
            <p className="mt-4 text-xs tracking-wide font-lora">
              {event.location}
            </p>

            <a
              href={event.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex gap-2 items-center bg-white text-brown px-4 py-1 rounded-full hover:bg-gray-200 transition"
            >
              <HiMapPin />
              Lokasi
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
