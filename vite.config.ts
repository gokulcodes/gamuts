import { VitePWA, type ManifestOptions } from "vite-plugin-pwa";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const manifest: Partial<ManifestOptions> = {
  theme_color: "#121212",
  background_color: "#121212",
  icons: [
    {
      purpose: "maskable",
      sizes: "512x512",
      src: "icon512_maskable.png",
      type: "image/png",
    },
    {
      purpose: "any",
      sizes: "512x512",
      src: "icon512_rounded.png",
      type: "image/png",
    },
  ],
  orientation: "any",
  display: "standalone",
  dir: "ltr",
  lang: "en-US",
  name: "Gamuts",
  short_name: "Gamuts",
  start_url: "/",
  scope: "/",
  description:
    "A simple tool that lets you sketch diagrams quickly with a hand-drawn feel and then transforms them into polished, professional-looking images perfect",
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: manifest,
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
    }),
    react(),
    tailwindcss(),
  ],
});
