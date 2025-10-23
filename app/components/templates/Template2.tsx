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

export default function Template2({ config }: { config: any }) {
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
              sectionClassName="items-center text-center pt-28"
              images={config.images?.couple}
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
            <GreetingBali
              sectionClassName={clsx("text-center", sectionClassName)}
            >
              <h2 className="text-2xl font-semibold tracking-widest text-brown font-belgiano">
                Om Swastiastu
              </h2>
              <p className="text-xs tracking-widest leading-7 text-center text-brown font-lora">
                Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa/ Tuhan
                Yang Maha Esa, kami bermaksud mengundang Bapak/ Ibu/ Saudara/i
                pada Upacara Manusa Yadnya Pawiwahan putra dan putri kami.
              </p>
            </GreetingBali>
            <CoupleMirror
              sectionClassName={clsx("space-y-24", sectionClassName)}
            />
            <QuoteClassic
              sectionClassName={clsx("font-lora", sectionClassName)}
            >
              <Image
                src={"/icon-regweda.svg"}
                alt="Regweda"
                width={80}
                height={80}
                className="mx-auto"
              />
              <p className="text-xs tracking-widest leading-7 text-brown">
                Ya Tuhanku Yang Maha Pengasih, anugrahkanlah kepada pasangan ini
                senantiasa kebahagiaan, kesehatan, tetap bersatu dan tidak
                pernah terpisahkan, panjang umur dan tinggal di rumah yang penuh
                kegembiraan bersama seluruh keturunannya
              </p>
              <span className="font-bold text-black/40">Rg Veda X.85.42.</span>
            </QuoteClassic>
            <WeddingDayHero
              backgroundImage={config.images?.couple[0]}
              events={[
                {
                  title: "Memadik",
                  date: "SABTU, 26 APRIL 2025",
                  time: "PUKUL 15.00 WITA – SELESAI",
                  location:
                    "Jl. Ahmad Yani Utara No.188, Peguyangan, Kec. Denpasar Utara, Kota Denpasar, Bali 80115",
                  mapLink: "",
                },
                {
                  title: "Resepsi",
                  date: "SABTU, 26 APRIL 2025",
                  time: "PUKUL 15.00 WITA – SELESAI",
                  location:
                    "Jl. Ahmad Yani Utara No.188, Peguyangan, Kec. Denpasar Utara, Kota Denpasar, Bali 80115",
                  mapLink: "",
                },
              ]}
            />
            {/* <CountDown /> */}
            <ConfirmAttendance
              sectionClassName={sectionClassName}
              classNameTitle="text-3xl font-bold font-belgiano text-brown"
              classNameDescription="font-lora tracking-widest mt-8 text-xs text-brown"
              borderColor="border-gray-400"
              classNameSubmit="bg-brown text-white font-belgiano"
              classNameCommentBadgeHadir="bg-brown text-white"
              classNameCommentBadgeTidakHadir="bg-brown text-white"
              classNameTitleComment="font-lora font-semibold text-sm"
              classNameCommentMessage="font-lora text-xs"
            />
            <GalleryClassic
              sectionClassName={clsx(
                "font-belgiano text-brown",
                sectionClassName
              )}
            >
              <div className="space-y-5 text-center">
                <h2 className="text-3xl font-bold">Our Gallery</h2>
              </div>
            </GalleryClassic>
            <WeddingGift
              title="Wedding Gift"
              description="Doa restu dan kehadiran Anda adalah hadiah terindah bagi kami. Namun, jika Anda berkeinginan memberikan hadiah, Anda dapat mengirimkannya melalui rekening berikut:"
              sectionClassName={clsx(
                "bg-black font-belgiano text-white tracking-wide",
                sectionClassName
              )}
              classNameTitle="text-3xl font-bold"
              classNameDescription="text-xs font-lora"
              bgButton="bg-white/30"
            />
            <Footer />
          </div>
        </div>
      </div>
    </main>
  );
}
