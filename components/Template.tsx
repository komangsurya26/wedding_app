import Image from "next/image";
import Link from "next/link";

const templates = [
  {
    id: 1,
    name: "Lume",
    img: "https://masdianastudio.com/wp-content/uploads/2025/10/Undangan-Digital-Lumier_1-1.jpg",
    bestSeller: true,
    href: "/template/1",
  },
  {
    id: 2,
    name: "Chocolate Dream",
    img: "https://masdianastudio.com/wp-content/uploads/2025/09/UNDANGAN-DIGITAL-CELESTIA_1.jpg",
    bestSeller: true,
    href: "/template/2",
  },
  {
    id: 3,
    name: "True Potential",
    img: "https://masdianastudio.com/wp-content/uploads/2025/07/1-2.jpg",
    bestSeller: true,
    href: "/template/3",
  },
  {
    id: 4,
    name: "True Potential",
    img: "https://masdianastudio.com/wp-content/uploads/2025/07/1-2.jpg",
    bestSeller: true,
    href: "/template/3",
  },
  {
    id: 5,
    name: "True Potential",
    img: "https://masdianastudio.com/wp-content/uploads/2025/07/1-2.jpg",
    bestSeller: true,
    href: "/template/3",
  },
];

export default function Template() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Header */}
        <div className="flex items-center mb-12">
          <div>
            <p className="font-karla text-gray-700">- Our Template</p>
            <div className="mt-5 flex space-x-4">
              <button className="border border-black/20 text-black px-2 py-2 sm:px-3 text-sm sm:text-base md:text-lg rounded-none font-medium hover:bg-gray-100 cursor-pointer">
                Wedding
              </button>
              <button className="border border-black/20 text-black px-2 py-2 sm:px-3 text-sm sm:text-base md:text-lg rounded-none font-medium hover:bg-gray-100 cursor-pointer">
                Metatah
              </button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
              >
                <div className="p-4">
                  <Image
                    src={template.img}
                    alt="Template"
                    width={400}
                    height={250}
                    className="w-full object-cover rounded-lg"
                  />
                </div>

                <div className="p-4 text-center space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {template.name}
                  </h2>

                  <div className="flex flex-col justify-center gap-3">
                    <Link
                      href={template.href}
                      className="bg-brown text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brown/80 transition cursor-pointer"
                    >
                      Preview
                    </Link>
                    <Link
                      href={template.href}
                      className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
