<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';
import MainPresentationSection from './MainPresentationSection.vue';

type SelectableSection = 'about-me' | 'portfolio' | 'get-in-touch' | null;
const selectedSection = ref<SelectableSection>(null);

const sections = [
    { id: 'about-me', beginTitle: 'About', endTitle: 'Me', position: 'top-0 right-0' },
    { id: 'portfolio', beginTitle: 'My', endTitle: 'Portfolio', position: 'bottom-0 left-0' },
    { id: 'get-in-touch', beginTitle: 'Get', endTitle: 'In Touch', position: 'bottom-0 right-0' },
] as const;
</script>

<template>
    <main class="flex pr-6">
        <div class="main-picture men" />

        <div class="bl-main transition-all">
            <MainPresentationSection />

            <section
                v-for="section in sections"
                :key="section.id"
                class="text-white absolute bg-[#222]"
                :class="[section.position, selectedSection === section.id ? 'selected' : '']"
            >
                <SectionTitle
                    v-if="!selectedSection"
                    :begin-title="section.beginTitle"
                    :end-title="section.endTitle"
                    @click="() => selectedSection = section.id"
                />

                <XCircleIcon
                    v-if="selectedSection === section.id"
                    class="size-7 absolute top-4 right-4 cursor-pointer"
                    @click="selectedSection = null"
                />
            </section>
        </div>
    </main>
</template>

<style scoped lang="scss">
.main-picture.men {
    background-image: url("/men.avif");
    padding: 0;
    margin-top: 24px;
    margin-left: 24px;
    height: calc(100vh - 48px);
    background-size: cover;
    background-position: center center;
    width: calc(33.3333333333% - 24px);
}

.bl-main {
    position: relative;
    width: 100%;
    margin-top: 24px;
    height: calc(100vh - 48px);
    overflow: hidden;
    width: 66.6666666667%;
    margin-left: 24px;
    gap: 20px;

    section {
        transition-property: all;
        transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
        transition-duration: var(--tw-duration, var(--default-transition-duration));

        &:not(.selected) {
            height: calc(50% - 10px);
            width: calc(50% - 10px);
        }

        &.selected {
            z-index: 20;
            height: 100%;
            width: 100%;
        }
    }
}
</style>
