import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "monni.fragrancetheme.com", pathname: "/**" },
      { protocol: "https", hostname: "lh3.googleusercontent.com", pathname: "/**" },
    ]
    // domains: ["res.cloudinary.com", "monni.fragrancetheme.com", "tamubali.com", "masdianastudio.com", "lh3.googleusercontent.com"],
  },
};

export default nextConfig;
