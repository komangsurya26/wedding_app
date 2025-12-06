import {
  BarChart,
  Book,
  Calendar,
  Edit,
  FileEdit,
  Forward,
  Image,
  Map,
  Music,
  Share,
  Timer,
  User,
  UserCheckIcon,
  Video,
} from "lucide-react";
import { ReactNode } from "react";
import { FaPeopleArrows } from "react-icons/fa";

type Feature = {
  id: number;
  title: string;
  icon: ReactNode;
  description?: string;
};

const features: Feature[] = [
  {
    id: 1,
    title: "Self Management",
    icon: <Edit />,
    description:
      "Kelola undanganmu sendiri dengan mudah. Tanpa menunggu pihak ketiga—semua bisa diatur langsung dari perangkatmu.",
  },
  {
    id: 2,
    title: "Share Tanpa Batas",
    icon: <Forward />,
    description:
      "Bagikan undangan ke siapa saja, kapan saja, dan sebanyak yang kamu inginkan. Cukup satu tautan, semua tamu bisa akses dengan mudah!",
  },
  {
    id: 3,
    title: "Hitung Mundur",
    icon: <Timer />,
    description:
      "Tampilkan countdown menuju hari spesialmu! Tamu bisa ikut merasakan antusiasme menjelang pernikahan.",
  },
  {
    id: 4,
    title: "Pengingat Tanggal",
    icon: <Calendar />,
    description:
      "Kirim notifikasi otomatis untuk tanggal acara kepada tamu. Membantu mereka menandai dan mengingat hari pentingmu sejak awal.",
  },
  {
    id: 5,
    title: "Petunjuk Lokasi",
    icon: <Map />,
    description:
      "Tautkan langsung ke Google Maps supaya tamu tidak bingung mencari lokasi acara.",
  },
  {
    id: 6,
    title: "Musik Latar",
    icon: <Music />,
    description:
      "Tambahkan nuansa emosional dengan musik pilihanmu. Undangan terasa lebih hidup dan personal.",
  },
  {
    id: 7,
    title: "Galeri Foto",
    icon: <Image />,
    description:
      "Pamerkan koleksi foto terbaik kalian dalam galeri elegan yang mudah diakses oleh para tamu.",
  },
  {
    id: 8,
    title: "Video Prewedding",
    icon: <Video />,
    description:
      "Bagikan momen prewedding kalian langsung di undangan, membuat cerita cinta kalian lebih berkesan secara visual.",
  },
  {
    id: 9,
    title: "Cerita Cinta",
    icon: <Book />,
    description:
      "Ceritakan perjalanan cinta kalian, dari awal pertemuan hingga siap melangkah ke pelaminan. Manis dan bermakna.",
  },
  {
    id: 10,
    title: "Konfirmasi Kehadiran",
    icon: <UserCheckIcon />,
    description:
      "Tamu bisa langsung mengisi konfirmasi kehadiran secara online. Data tersimpan rapi dan bisa dicek kapan saja.",
  },
  {
    id: 11,
    title: "Ganti Template",
    icon: <FileEdit />,
    description:
      "Pilih tema undangan sesuai gaya kalian, warna, dan font, sehingga undangan terasa lebih personal.",
  },
  {
    id: 14,
    title: "Statistik",
    icon: <BarChart />,
    description:
      "Lihat statistik pengunjung, RSVP, dan aktivitas undangan dengan mudah dan cepat.",
  },
];

export default function Feature() {
  return (
    <section className="relative py-20 bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brown/5"></div>

      <div className="container mx-auto px-4 lg:px-20">
        {/* Optional header */}
        <div className="mb-16 text-black text-center items-center">
          <p className="font-karla">- Our Feature -</p>
          <h2 className="text-3xl md:text-4xl mt-2 font-marcellus">
            Fitur - fitur <br />
            yang kami tawarkan
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f) => (
            <article
              key={f.id}
              className="p-6 md:p-8 bg-white border-t-2 border-gray-300"
            >
              {/* Number */}
              <div className="text-gray-400 mb-4">{f.icon}</div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                {f.title}
              </h3>

              {/* Subtitle */}
              {f.description && (
                <p className="mt-4 text-gray-600">{f.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
