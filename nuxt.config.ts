// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    build: {
        postcss: {
            postcssOptions: require('./postcss.config.js'),
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/pwa',
    ],
    pwa: {
        manifest: {
            name: '2048 Nuxt Game',
            short_name: '2048',
            lang: 'en',
            display: 'standalone',
        }
    },
})
