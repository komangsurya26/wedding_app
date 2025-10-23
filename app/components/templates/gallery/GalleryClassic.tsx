import Image from "next/image";

interface GalleryClassicProps {
  sectionClassName?: string;
  children?: React.ReactNode;
}

export default function GalleryClassic({
  sectionClassName,
  children,
}: GalleryClassicProps) {
  return (
    <section className={sectionClassName}>
      {children}
      {/* Gallery Grid */}
      <div className="mt-8 grid gap-2">
        {/* Replace with actual images */}
        {Array.from({ length: 5 }).map((_, idx) => (
          <div key={idx} className="w-full h-auto bg-gray-300 overflow-hidden">
            <Image
              src="https://tamubali.com/wp-content/uploads/2025/05/MITA-AND-MOMON-17-682aafe63a4ec.jpeg"
              alt={`Gallery Image ${idx + 1}`}
              width={400}
              height={500}
              className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
