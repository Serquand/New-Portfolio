<script setup lang="ts">
useSeoMeta({
    title: 'Esteban Vincent - Portfolio',
    ogTitle: 'Esteban Vincent - Portfolio',
    description: 'Not sure where to start with your web project? I provide expert advice and consultation. I\'ll guide you through every steps of the process.',
    ogType: 'website',
    ogDescription: 'Not sure where to start with your web project? I provide expert advice and consultation. I\'ll guide you through every steps of the process.',
    ogImage: 'https://serquand.com/S.png',
    ogSiteName: 'Esteban Vincent - Portfolio',
    ogLocale: 'en_EN',
    ogUrl: 'https://serquand.com',
    robots: 'index, follow',
    author: 'Esteban Vincent',
});
</script>

<template>
    <MainView />
</template>

<style lang="scss">
.scrollbar-hide {
    scrollbar-width: none;
}

.text-underline-appearence {
    position: relative;

    &::after {
        display: block;
        position: absolute;
        height: 1px;
        background: rgb(0, 166, 252);
        content: "";
    }

    &:hover::after {
        animation: appear-width 300ms ease-out forwards;
    }
}

@keyframes appear-width {
    from {
        width: 0px;
    }

    to {
        width: 100%;
    }
}

@keyframes go-up {
    from {
        top: 100%;
    }
    to {
        top: 0;
    }
}

@keyframes appear-directly {
    from {
        opacity: 0.4;
    }

    to {
        opacity: 1;
    }
}
</style>
