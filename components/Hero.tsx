export default function Hero() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 right-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/dpij7jkkd/video/upload/v1765441771/video/herovideo_qvrpex.mp4" type="video/mp4" />
        </video>

        {/* Konten utama di atas video */}
        <div className="relative flex items-center justify-center h-full text-center text-white px-4">
          <div className="text-gray-800 space-y-6">
            <p className="text-xl tracking-logo font-cormorantgaramond uppercase">
              Resepsibali
            </p>
            <p className="text-4xl capitalize font-marcellus">
              website <br />
              undangan digital online
            </p>
            <p className="text-md capitalize font-karla font-light text-gray-700">
              buat undangan digitalmu sekarang <br /> dengan mudah dan cepat
            </p>
            <button></button>
          </div>
        </div>
      </section>
    </>
  );
}
