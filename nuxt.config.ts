// https://v3.nuxtjs.org/api/configuration/nuxt.config
import functions from "./sockets/index";

export default defineNuxtConfig({
    build: {
        postcss: {
            postcssOptions: require('./postcss.config.js'),
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-internal-socket',
    ],
    socketIO: {
        socketFunctions: functions,
        clientOptions: {
            uri: "/",
            managerOptions: {},
        },
    },
})
