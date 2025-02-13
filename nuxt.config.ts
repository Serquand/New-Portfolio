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
    app: { head: {
        charset: 'utf-8',
        viewport: 'width=device-width, initial-scale=1',
        htmlAttrs: { class: 'h-full bg-white' },
        bodyAttrs: { class: 'h-full bg-[#111]' },
    } },
});
