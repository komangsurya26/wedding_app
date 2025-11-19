import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "res.cloudinary.com", "monni.fragrancetheme.com", "tamubali.com", "masdianastudio.com", "drive.google.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
