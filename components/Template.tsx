import { TEMPLATE_LIST } from "@/src/lib/template-data";
import Image from "next/image";
import Link from "next/link";

export default function Template() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        {/* Header */}
        <div className="text-center items-center mb-12">
          <p className="font-karla text-gray-700">- Our Template -</p>
          <h2 className="text-4xl mt-2 font-marcellus">Pilih template</h2>
        </div>

        {/* Grid */}
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {TEMPLATE_LIST.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg"
              >
                <div className="p-4">
                  {template.img ? (
                    <Image
                      src={template.img}
                      alt="Template"
                      width={400}
                      height={250}
                      className="w-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="aspect-square rounded-md bg-gray-100">
                      <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
                        No Image
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 text-center space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800 font-marcellus">
                    {template.name}
                  </h2>

                  <div className="flex flex-col justify-center gap-3">
                    <Link
                      href={template.href}
                      className="bg-brown text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brown/80 transition cursor-pointer"
                    >
                      Lihat
                    </Link>
                    <Link
                      href={`/checkout?templateId=${template.id}`}
                      className="border border-gray-400 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                    >
                      Coba Sekarang
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
