import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "monni.fragrancetheme.com", "tamubali.com", "masdianastudio.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
