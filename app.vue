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

.main-container {
    height: calc(100vh - 48px);
}

.main-picture {
    background-image: url("/bombe.avif");
    background-size: cover;
    background-position: center center;
    width: 40%;
}

.bl-main {
    position: relative;
    width: 100%;
    scrollbar-width: none;

    section {
        transition-property: all;
        transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
        transition-duration: var(--tw-duration, var(--default-transition-duration));

        &.project-display {
            height: 100%;
            width: 100%;
            z-index: 30;
        }

        &:not(.project-display) {
            &:not(.selected) {
                height: calc(50% - 12px);
                width: calc(50% - 12px);

                @media (max-width: 768px) {
                    height: calc(25% - 12px);
                    width: calc(100%);
                }
            }

            &.selected {
                z-index: 20;
                height: 100%;
                width: 100%;
            }
        }
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
</style>
