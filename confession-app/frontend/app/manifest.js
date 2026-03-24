export default function manifest() {
  return {
    name: "Confessly",
    short_name: "Confessly",
    description: "Anonymous confessions with fast mobile-first discovery.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5efe3",
    theme_color: "#c96442",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
