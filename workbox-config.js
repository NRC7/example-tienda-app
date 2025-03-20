export const globDirectory = "build/";
export const globPatterns = ["**/*.{html,js,css,png,jpg,svg}"];
export const swDest = "build/service-worker.js";
export const runtimeCaching = [
    {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: "CacheFirst",
        options: {
            cacheName: "images-cache",
            expiration: { maxEntries: 50 },
        },
    },
];
  