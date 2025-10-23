import Footer from "@/app/components/templates/footer/FooterClassic";
import WeddingGift from "@/app/components/templates/rsvp/WeddingGiftClassic";
import Image from "next/image";
import HeaderSlider from "./headers/HeaderSlider";
import GreetingBali from "./greetings/GreetingBali";
import CoupleMirror from "./couples/CoupleMirror";
import QuoteClassic from "./quotes/QuoteClassic";
import WeddingDayHero from "./weddingday/WeddingDayHero";
import GalleryClassic from "./gallery/GalleryClassic";
import ConfirmAttendance from "./rsvp/ConfirmAttendanceClassic";
import clsx from "clsx";
import CoupleBorderRadius from "./couples/CoupleBorderRadius";

export default function Template3({ config }: { config: any }) {
  const sectionClassName = "px-8 py-16";

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
        <div className="relative z-20 h-full overflow-y-auto">
          <div className="mx-auto text-black">
            <HeaderSlider
              images={config.images?.couple}
              sectionClassName="items-center text-center pt-28"
              blur={false}
            >
              <div className="relative z-10 space-y-2 text-white font-belgiano">
                <p className="text-sm uppercase tracking-[0.2em]">
                  The Wedding Of
                </p>
                <h1 className="text-3xl tracking-wide capitalize">
                  Bagus & Cahya
                </h1>
                <p className="text-xs capitalize tracking-widest font-lora">
                  Senin, 09 September 2025
                </p>
              </div>
            </HeaderSlider>
            <GreetingBali sectionClassName={sectionClassName}>
              <h2 className="text-2xl font-semibold tracking-widest font-bodonimoda">
                Om Swastiastu
              </h2>
              <p className="text-xs tracking-widest leading-7 font-lora">
                Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan
                Yang Maha Esa, kami bermaksud mengundang Bapak/ Ibu/ Saudara/i
                pada Upacara Manusa Yadnya Pawiwahan putra dan putri kami.
              </p>
            </GreetingBali>
            <CoupleBorderRadius sectionClassName="mt-28 min-h-[140vh]" />
            <GalleryClassic sectionClassName={sectionClassName} />
          </div>
        </div>
      </div>
    </main>
  );
}
