import type { NextConfig } from "next";

// La web se exporta como páginas fijas (carpeta `out/`), que GitHub Pages publica tal cual.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
