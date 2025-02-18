<script setup lang="ts">
useSeoMeta({
    title: 'Esteban Vincent - Portfolio',
    ogTitle: 'Esteban Vincent - Portfolio',
    description: 'Vous ne savez pas par où commencer votre projet Web ? Je vous guiderai à travers les étapes de conception de votre projet !',
    ogType: 'website',
    ogDescription: 'Vous ne savez pas par où commencer votre projet Web ? Je vous guiderai à travers les étapes de conception de votre projet !',
    ogImage: 'https://serquand.com/S.png',
    ogSiteName: 'Esteban Vincent - Portfolio',
    ogLocale: 'fr_FR',
    ogUrl: 'https://serquand.com/S.png',
    robots: 'index, follow', // Permet l'indexation et le suivi des liens
    canonicalUrl: 'https://serquand.com', // URL canonique de ton site
    author: 'Esteban Vincent',
});
</script>

<template>
    <div class="p-6">
        <NuxtPage />
    </div>
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
