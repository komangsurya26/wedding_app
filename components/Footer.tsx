"use client";

import { useState } from "react";
import { FaInstagram, FaFacebookF, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!name || !message) {
      alert("Please fill in your name and message.");
      return;
    }
    const phone = "6281353285093"; // wa ku
    const text = `Halo resepsi bali, saya ${name}. ${message}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <footer className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left - About */}
        <div>
          <h2 className="text-black text-xl font-semibold mb-4">
            Tentang Kami
          </h2>
          <p className="text-black text-sm leading-relaxed">
            Crafted with love — we design elegant and modern digital invitations
            to celebrate your special moments.
          </p>
        </div>

        {/* Middle - Form */}
        <div>
          <h2 className="text-black text-xl font-semibold mb-4">Kirim Pesan</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Nama"
              className="w-full px-4 py-2 rounded-md text-black border border-gray-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Pesan"
              rows={3}
              className="w-full px-4 py-2 rounded-md text-black border border-gray-500 focus:outline-none"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              onClick={handleSend}
              className="text-black w-full py-2 border cursor-pointer hover:bg-[#dddbdb] border-gray-500 rounded-md font-semibold flex items-center justify-center gap-2"
            >
              <FaWhatsapp /> Send via WhatsApp
            </button>
          </div>
        </div>

        {/* Right - Social Media */}
        <div>
          <h2 className="text-black text-xl font-semibold mb-4">Ikuti Kami</h2>
          <div className="flex space-x-4 text-white">
            <a
              href="https://instagram.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaTiktok />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 transition"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom - Small footer text */}
      <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Resepsi Studio. Crafted with love in Bali.
      </div>
    </footer>
  );
}
