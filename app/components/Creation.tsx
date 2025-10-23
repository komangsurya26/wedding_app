import Image from "next/image";

export default function Creation() {
  return (
    <>
      <section className="bg-white py-16">
        <div className="relative px-40">
          {/* Judul dan deskripsi */}
          <div className="mb-12 max-w-3xl">
            <p className="text-gray-700 font-karla">- Our Creation</p>
            <h2 className="text-5xl text-gray-800 mt-2">
              Menciptakan undangan digital dengan sentuhan personal, indah, dan
              bermakna.
            </h2>
          </div>

          {/* Bulatan berputar dengan teks melengkung */}
          <div className="absolute top-0 right-0 md:right-1/3 w-32 h-32">
            <svg
              className="w-full h-full animate-spinSlow"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
                />
              </defs>
              <text
                fill="#9ca3af" // Tailwind's text-gray-400
                fontSize="9"
                fontWeight="normal"
                letterSpacing="2"
              >
                <textPath href="#circlePath" startOffset="0%">
                  RESEPSI • BALI • RESEPSI • BALI • RESEPSI • BALI •
                </textPath>
              </text>
              {/* Titik di tengah */}
              <circle cx="50" cy="50" r="2" fill="#9ca3af" />
            </svg>
          </div>
        </div>

        {/* Grid Gambar */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative col-span-2 h-80">
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-54.webp"
              alt="Interior details"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-sm">Branding</p>
              <h3 className="text-lg font-semibold">Interior details</h3>
            </div>
          </div>
          <div className="relative h-80">
            <Image
              src="https://tamubali.com/wp-content/uploads/2024/08/Template-Foto-Cover-60.jpg"
              alt="Sand"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-80">
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-35.webp"
              alt="Smile"
              width={600}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-80">
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-50.webp"
              alt="Window"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-80">
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/03/Cover-2.0-60.webp"
              alt="Leaves"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative col-span-2 h-80">
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/07/Cover-2.0-2025-07-19T143825.805.jpg"
              alt="Model"
              width={500}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
