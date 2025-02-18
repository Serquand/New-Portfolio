import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: {
        enabled: true,
    },
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    modules: [
        '@vesp/nuxt-fontawesome',
    ],
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            bodyAttrs: { class: 'bg-[#111]' },
            title: 'Esteban VINCENT - Portfolio',
            link: [
                {
                    rel: 'stylesheet',
                    href: 'https://cdnjs.cloudflare.com/ajax/libs/octicons/8.5.0/font/octicons.min.css', // GitHub Octicons CDN
                },
            ],
        },
    },
});
