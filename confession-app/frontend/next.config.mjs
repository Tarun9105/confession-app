import path from "path";

const nextConfig = {
  output: "export",
  outputFileTracingRoot: path.join(import.meta.dirname, "..", ".."),
  images: {
    unoptimized: true
  }
};

export default nextConfig;
