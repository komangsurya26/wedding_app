import Image from "next/image";

export default function CoupleBorderRadius({
  sectionClassName,
}: {
  sectionClassName?: string;
}) {
  return (
    <section className={sectionClassName}>
      {/* {"ini h nya h-[140vh]"} */}
      <div className="flex flex-col gap-[80vh]">
        {/* Mempelai Pria */}
        <div className="relative flex">
          <div
            style={{
              boxShadow: "0 18px 30px rgba(0,0,0,0.15)",
            }}
            className="absolute right-0 w-32 h-60 overflow-hidden top-30"
          >
            {/* Photo Black White */}
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
              alt="groom"
              width={1400}
              height={900}
              className="object-cover w-full h-full grayscale"
            />
          </div>
          <div
            style={{
              boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
            }}
            className="absolute left-6 w-50 h-70 overflow-hidden"
          >
            {/* Photo original */}
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
              alt="couple"
              width={800}
              height={800}
              className="object-cover w-full h-full"
            />
          </div>
          {/* svg putar */}
          <div className="absolute -top-15 left-50 w-16 h-32 -z-10">
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
              <text fill="" fontSize="16" fontWeight="" letterSpacing={4.3}>
                <textPath href="#circlePath" startOffset="0%">
                  MEMPELAI • PRIA •
                </textPath>
              </text>
              <circle cx="50" cy="50" r="2" fill="#9ca3af" />
            </svg>
          </div>
          {/* nama pengantin */}
          <div className="absolute mt-75 left-6 w-50 space-y-5">
            <h2 className="text-xl font-bodonimoda leading-6">
              I Nyoman Gede Yudhi Maharsa Jaya, S.T
            </h2>
            <p className="text-xs font-lora">
              Putra Kedua Dari Bapak I Wayan Kangin & Ibu Ni Wayan Kauh
            </p>

            <div className="">
              <button className="inline-flex items-center px-3 py-2 rounded-full bg-black/70 text-white text-xs">
                @komangsurya_26
              </button>
            </div>
          </div>
        </div>

        {/* Mempelai Wanita */}
        <div className="relative flex">
          <div
            style={{
              boxShadow: "0 18px 30px rgba(0,0,0,0.15)",
            }}
            className="overflow-hidden w-32 h-60 absolute left-0 top-30"
          >
            {/* Photo Black White */}
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
              alt="groom"
              width={1400}
              height={900}
              className="object-cover w-full h-full grayscale"
            />
          </div>
          <div
            style={{
              boxShadow: "0 8px 18px rgba(0,0,0,0.4)",
            }}
            className="absolute right-6 w-50 h-70 overflow-hidden"
          >
            {/* Photo original */}
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/04/ASA_5284-67fc8af45c66a.jpeg"
              alt="couple"
              width={800}
              height={800}
              className="object-cover w-full h-full"
            />
          </div>
          {/* svg putar */}
          <div className="absolute -top-15 left-25 w-16 h-32 -z-10">
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
              <text fill="" fontSize="16" fontWeight="" letterSpacing={2.5}>
                <textPath href="#circlePath" startOffset="0%">
                  MEMPELAI • WANITA •
                </textPath>
              </text>
              <circle cx="50" cy="50" r="2" fill="#9ca3af" />
            </svg>
          </div>
          {/* nama pengantin */}
          <div className="absolute mt-75 right-6 w-50 space-y-5">
            <h2 className="text-xl font-bodonimoda leading-6">
              I Nyoman Gede Yudhi Maharsa Jaya, S.T
            </h2>
            <p className="text-xs font-lora">
              Putra Kedua Dari Bapak I Wayan Kangin & Ibu Ni Wayan Kauh
            </p>

            <div className="">
              <button className="inline-flex items-center px-3 py-2 rounded-full bg-black/70 text-white text-xs">
                @komangsurya_26
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
