import Image from "next/image";
import HeaderClassic from "./headers/HeaderClassic";
import GreetingBali from "./greetings/GreetingBali";
import CoupleClassic from "./couples/CoupleClassic";
import WeddingDayDetail from "./weddingday/WeddingDayDetail";
import GalleryClassic from "./gallery/GalleryClassic";
import ConfirmAttendance from "./rsvp/ConfirmAttendanceClassic";
import clsx from "clsx";
import Footer from "./footer/FooterClassic";
import WeddingGift from "./rsvp/WeddingGiftClassic";
import CountDownClassic from "./countdown/CountDownClassic";

export default function Template1({ config }: { config: any }) {
  const sectionClassName = "px-8 py-16";
  const videoIdYoutube = "6FYtKVFik_8";
  // const videoIdYoutube = "-14qjn6LuHs";

  return (
    <main className="h-screen w-full flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 lg:w-9/12 h-full relative">
        <Image
          src={config.images?.couple[0]}
          alt="Hero Image"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>;
      </div>
      <div className="w-full md:w-1/2 lg:w-3/12 h-full relative overflow-hidden">
        <iframe
          src={`https://www.youtube.com/embed/${videoIdYoutube}?autoplay=1&mute=1&loop=1&playlist=${videoIdYoutube}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          title="Wedding Video"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            width: "250vh",
            height: "177.78vh",
            border: 0,
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-20 h-full overflow-y-auto">
          <div className="mx-auto text-white">
            <HeaderClassic
              sectionClassName="flex flex-col text-center justify-start"
              classNameDiv="mt-28"
              classNameOverlay="absolute inset-0 bg-black/50"
              backgroundImageUrl={config.images?.couple[0]}
            />
            <GreetingBali sectionClassName={sectionClassName}>
              <h2 className="text-2xl font-semibold tracking-widest">
                Om Swastiastu
              </h2>
              <p className="text-xs tracking-widest leading-7 text-justify max-w-[500px] mx-auto">
                Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan
                Yang Maha Esa, kami bermaksud mengundang Bapak/ Ibu/ Saudara/i
                pada Upacara Manusa Yadnya Pawiwahan putra dan putri kami.
              </p>
            </GreetingBali>
            <CoupleClassic sectionClassName={sectionClassName} />
            <section className={clsx("bg-black/40", sectionClassName)}>
              <iframe
                src={`https://www.youtube.com/embed/${videoIdYoutube}?mute=1&autoplay=1`}
                title="YouTube video player"
                allowFullScreen
                className="w-full h-full"
                style={{
                  aspectRatio: "16/9",
                }}
              ></iframe>
              <div className="text-center mt-6">
                <p className="font-signature text-xl">
                  Ya Tuhanku Yang Maha Pengasih, anugrahkanlah kepada pasangan
                  ini senantiasa kebahagiaan, kesehatan, tetap bersatu dan tidak
                  pernah terpisahkan, panjang umur dan tinggal di rumah yang
                  penuh kegembiraan bersama seluruh keturunannya
                </p>
              </div>
            </section>
            <WeddingDayDetail
              sectionClassName="px-8 pt-16"
              titleResepsiClassName=""
              dateClassName="font-karla"
              addressClassName=""
              titleClassName=""
              paragraphClassName=""
            />
            <CountDownClassic sectionClassName="pb-12 px-6" />
            <GalleryClassic
              sectionClassName={clsx("bg-black/50", sectionClassName)}
            >
              <h2 className="text-2xl font-semibold tracking-widest">
                Gallery of <br />
                Komang & Surya
              </h2>
            </GalleryClassic>
            <ConfirmAttendance
              sectionClassName={sectionClassName}
              classNameTitle="text-2xl tracking-widest font-semibold"
              classNameDescription="text-xs tracking-widest font-karla mt-8"
              classNameCommentBadgeHadir="bg-green-600/40 text-white"
              classNameCommentBadgeTidakHadir="bg-red-600/40 text-white"
              classNameSubmit="bg-white/30"
              classNameTitleComment="font-semibold text-sm"
              classNameCommentMessage="text-xs"
            />
            <WeddingGift
              title="Wedding Gift"
              description="Doa restu dan kehadiran Anda adalah hadiah terindah bagi kami. Namun, jika Anda berkeinginan memberikan hadiah, Anda dapat mengirimkannya melalui rekening berikut:"
              sectionClassName={clsx("bg-black/50", sectionClassName)}
              classNameDescription="font-karla text-xs tracking-widest"
              classNameTitle="text-2xl tracking-widest font-semibold"
              bgButton="bg-white/30"
            />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
