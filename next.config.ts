import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  //Custom loader for building static webpage and fixing image links for next/image component
  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.ts'
  }
};

export default nextConfig;
