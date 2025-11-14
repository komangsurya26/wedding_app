import dynamic from "next/dynamic";
import Image from "next/image";

const CountDownTimer = dynamic(() => import("./CountDownTimer"), {
  ssr: false,
});

export default function CountDown({
  image,
  date,
}: {
  image: string;
  date: string;
}) {
  return (
    <section className="relative h-[120vh] flex items-end">
      <Image
        src={image}
        alt="Couple"
        fill
        className="absolute object-cover object-center"
        priority={false}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 top-[50vh] bg-gradient-to-t from-black/90 via-black/70 to-transparent"></div>
      <CountDownTimer date={date} />
    </section>
  );
}
