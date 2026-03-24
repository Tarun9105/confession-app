import path from "path";

const nextConfig = {
  outputFileTracingRoot: path.join(import.meta.dirname, "..", ".."),
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*"
      }
    ];
  }
};

export default nextConfig;
