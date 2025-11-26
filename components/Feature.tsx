type Feature = {
  id: number;
  title: string;
  subtitle?: string;
  category?: string;
  href?: string;
};

const features: Feature[] = [
  {
    id: 1,
    title: "Design-driven and perfect for modern weddings",
    subtitle: "Digital invitations crafted to tell your story.",
    category: "Digital",
  },
  {
    id: 2,
    title: "Build flexible pages with ease",
    subtitle: "Customizable templates and simple editing flow.",
    category: "Branding",
  },
  {
    id: 3,
    title: "Bring your creative vision to life",
    subtitle: "Support for RSVP, maps, and shareable links.",
    category: "Event",
  },
  {
    id: 4,
    title: "Bring your creative vision to life",
    subtitle: "Support for RSVP, maps, and shareable links.",
    category: "Event",
  },
  {
    id: 5,
    title: "Bring your creative vision to life",
    subtitle: "Support for RSVP, maps, and shareable links.",
    category: "Event",
  },
  {
    id: 6,
    title: "Bring your creative vision to life",
    subtitle: "Support for RSVP, maps, and shareable links.",
    category: "Event",
  },
];

export default function Feature() {
  return (
    <section className="relative py-20 bg-cover bg-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-brown/5"></div>

      <div className="container mx-auto px-4 lg:px-20">
        {/* Optional header */}
        <div className="mb-12 text-black">
          <p className="font-karla">- Our Feature</p>
          <h2 className="text-5xl mt-2">
            Fitur unggulan <br />
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
              <div className="text-sm text-gray-400 mb-4">
                0{f.id < 10 ? f.id : f.id}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
                {f.title}
              </h3>

              {/* Category */}
              {f.category && (
                <p className="mt-4 text-sm text-gray-500 font-medium">
                  {f.category}
                </p>
              )}

              {/* Subtitle */}
              {f.subtitle && <p className="mt-4 text-gray-600">{f.subtitle}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
