import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/

const manifestForPlugin = {
    registerType: "prompt",
    workbox: {
        globPatterns: ["**/*"],
    },
    includeAssets: [
        "**/*",
    ],
    manifest: {
        name: "ShowMeShows",
        short_name: "SMS",
        description: "A platform to discover trending movies and TV shows, powered by TMDb.",
        icons: [
            {
                src: "./public/icons/manifest-icon-192.maskable.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "./public/icons/manifest-icon-192.maskable.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable",
            },
            {
                src: "./public/icons/manifest-icon-512.maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "./public/icons/manifest-icon-512.maskable.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
        theme_color: "#171717", // Update according to your theme
        background_color: "#0F0617", // Update if necessary
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
    },
};


export default defineConfig({
    plugins: [react(), VitePWA(manifestForPlugin)],
})
