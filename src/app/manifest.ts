import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stellar Burgers",
    short_name: "Stellar Burgers",
    icons: [
      {
        src: "/favs/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favs/android-chrome-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
    ],
    theme_color: "#801ab3",
    background_color: "#801ab3",
  };
}
