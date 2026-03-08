import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: "India Tools",
    description: siteConfig.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f5f7fb",
    theme_color: "#0f5cc0",
    lang: "en-IN",
    orientation: "portrait",
    categories: ["finance", "utilities"],
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/512?maskable=1",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
