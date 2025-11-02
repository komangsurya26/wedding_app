import Image from "next/image";
import { FaRegEnvelopeOpen } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import Footer from "./sections/Footer";
import WeddingDay from "./sections/weddingday/WeddingDayT1";
import WeddingGift from "./sections/WeddingGift";
import Greeting from "./sections/Greeting";
import Quote from "./sections/Quote";
import LoveStory from "./sections/LoveStory";
import Gallery from "./sections/Gallery";
import RSVP from "./sections/RSVP";

export default function Template1({ config }: { config: any }) {
  const sectionClassName = "px-8 py-16";
  // const videoIdYoutube = "6FYtKVFik_8";
  const videoIdYoutube = "J1HAyer_I8U";
  // const videoIdYoutube = "B1YrcdtbboE";
  const isRight = false;
  const images = [
    "https://tamubali.com/wp-content/uploads/2024/09/ERY_6912-cetak-scaled.webp",
    "https://tamubali.com/wp-content/uploads/2024/09/ERY_6667-scaled.webp",
    "https://tamubali.com/wp-content/uploads/2024/09/ERY_6518-scaled.webp",
  ];

  return (
    <main className="h-screen flex justify-center bg-black">
      <div className="w-full lg:w-6/12 h-full relative overflow-hidden">
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

        <div className="relative z-20 h-full overflow-y-auto overflow-hidden">
          {/* Section 1 */}
          <section className="h-screen flex flex-col items-center justify-between text-center px-6 py-10 text-white">
            <div>
              <p className="text-sm tracking-widest mb-2">The Wedding Of</p>
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:mx-48 font-oranienbaum">
                Aksara & Sofia
              </h1>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-white/60">
                Kepada Yth. Bapak/Ibu/Saudara/i
              </p>
              <h2 className="text-lg font-medium">Tamu Undangan</h2>

              <button className="mt-4 px-6 py-4 border border-white/60 rounded-lg hover:bg-white/20 transition">
                <div className="flex items-center gap-3 text-xs">
                  <FaRegEnvelopeOpen />
                  <p className="text-white/50">OPEN INVITATION</p>
                </div>
              </button>
              <p className="text-[10px] text-white mt-4">
                *Mohon maaf jika terdapat kesalahan penulisan nama & gelar
              </p>
            </div>
          </section>
          <Greeting image={config.images.couple[1]} />
          <Quote />
          <section className="relative h-screen flex items-end">
            <div className="absolute inset-0 -z-10">
              <Image
                src={config.images.groom}
                alt="Groom"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
            <div className="w-full bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-white">
                <p className="text-sm md:text-xl text-white/80 italic font-serif">
                  Mempelai - Pria
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight leading-tight">
                  Aksara Hagia, S.Psi
                </h2>

                <p className="mt-3 text-sm md:text-base text-white/80">
                  Putra Pertama dari Bapak Aksa dan Ibu Sara
                </p>

                <div className="mt-6">
                  <a
                    href={`https://instagram.com/komangsurya_26`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-white/8 hover:bg-white/12 transition px-4 py-2 rounded-full text-white text-sm md:text-base"
                  >
                    <span className="bg-white/10 p-2 rounded-full flex items-center justify-center">
                      <FaInstagram className="w-4 h-4" />
                    </span>
                    <span className="font-medium">@komangsurya_26</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="relative h-screen flex items-end text-end">
            <div className="absolute inset-0 -z-10">
              <Image
                src={config.images.bride}
                alt="Bride"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="w-full bg-gradient-to-t from-black/80 via-black/60 to-transparent p-8 md:p-12">
              <div className="max-w-4xl mx-auto text-white">
                <p className="text-sm md:text-xl text-white/80 italic font-serif">
                  Mempelai - Wanita
                </p>

                <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold tracking-tight leading-tight">
                  Aksara Hagia, S.Psi
                </h2>

                <p className="mt-3 text-sm md:text-base text-white/80">
                  Putra Pertama dari Bapak Aksa dan Ibu Sara
                </p>

                <div className="mt-6">
                  <a
                    href={`https://instagram.com/komangsurya_26`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 bg-white/8 hover:bg-white/12 transition px-4 py-2 rounded-full text-white text-sm md:text-base"
                  >
                    <span className="bg-white/10 p-2 rounded-full flex items-center justify-center">
                      <FaInstagram className="w-4 h-4" />
                    </span>
                    <span className="font-medium">@komangsurya_26</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section className="relative h-[120vh] py-10 flex items-end">
            <div className="absolute inset-0">
              <Image
                src={config.images.couple[2]}
                alt="Couple"
                fill
                priority
                className="object-cover object-center"
              />
            </div>

            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-0 left-0 right-0 h-[250px] bg-gradient-to-t from-black/90 via-black/70 to-transparent" />

            <div
              className={`relative w-full px-8 ${
                isRight ? "text-end" : "text-start"
              }`}
            >
              <div
                className={`max-w-lg text-white ${
                  isRight ? "ml-auto" : "mr-auto"
                }`}
              >
                <div className="gap-6">
                  <div className="pt-6 lg:pt-0 space-y-6">
                    <h1 className="font-noto-serif-display text-[3rem] sm:text-[4rem] leading-none tracking-tight text-white">
                      <span className="block">Save</span>
                      <span className="block">The Date</span>
                    </h1>
                    <div
                      className={`h-px bg-white/60 ${
                        isRight ? "ml-auto" : "mr-auto"
                      } w-full max-w-[700px]`}
                    />
                  </div>

                  <div className="pt-8">
                    <div
                      className={`grid grid-cols-4 gap-4 text-white ${
                        isRight ? "justify-items-end" : "justify-items-start"
                      }`}
                    >
                      <div>
                        <p className="text-[2rem] md:text-[3rem] font-noto-serif-display leading-none">
                          68
                        </p>
                        <p className="mt-2 text-sm text-center md:text-base">
                          Hari
                        </p>
                      </div>
                      <div>
                        <p className="text-[2rem] md:text-[3rem] font-noto-serif-display leading-none">
                          14
                        </p>
                        <p className="mt-2 text-sm text-center md:text-base">
                          Jam
                        </p>
                      </div>
                      <div>
                        <p className="text-[2rem] md:text-[3rem] font-noto-serif-display leading-none">
                          14
                        </p>
                        <p className="mt-2 text-sm text-center md:text-base">
                          Menit
                        </p>
                      </div>
                      <div>
                        <p className="text-[2rem] md:text-[3rem] font-noto-serif-display leading-none">
                          27
                        </p>
                        <p className="mt-2 text-sm text-center md:text-base">
                          Detik
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-8 max-w-[15rem] ${
                        isRight ? "ml-auto" : "mr-auto"
                      }`}
                    >
                      <a
                        href="#"
                        className="font-bodonimoda inline-block w-full text-center px-6 py-3 border border-white rounded-md text-sm tracking-widest hover:bg-white/10 transition"
                      >
                        SAVE THE DATE
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* (Wedding Day) */}
          <WeddingDay
            images={images}
            events={[
              {
                id: 1,
                title: "Akad Nikah",
                date: "Minggu, 31 Desember 2025",
                time: "09.00 WIB - Selesai",
                venue: "Balai Sarbini Jakarta",
                locationUrl: "https://maps.google.com/....",
              },
              {
                id: 2,
                title: "Resepsi Pernikahan",
                date: "Minggu, 31 Desember 2025",
                time: "11.00 WIB - Selesai",
                venue: "Balai Sarbini Jakarta",
                locationUrl: "https://maps.google.com/....",
              },
            ]}
          />

          <LoveStory image={config.images.couple[1]} />
          <Gallery
            videoIdYoutube={videoIdYoutube}
            imageLandscapes={config.images.landscape}
            imagePotraits={config.images.potrait}
          />
          <RSVP image={config.images.couple[1]} />
          {/* panggil komponen WeddingGift biasa (komponen internal tidak perlu bg lagi) */}
          <WeddingGift />
          <Footer />
        </div>
      </div>
    </main>
  );
}
