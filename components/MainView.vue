<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/outline';

type SelectableSection = "about-me" | "portfolio" | "get-in-touch" | null;
const selectedSection = ref<SelectableSection>(null);
</script>

<template>
    <main class="flex pr-6">
        <div class="main-picture men" />
        <div class="bl-main transition-all">
            <section class="text-white">
                Mon portfolio
            </section>

            <section
                class="text-white absolute top-0 right-0 bg-[#222]"
                :class="[selectedSection === 'about-me' ? 'selected' : '']"
            >
                <SectionTitle
                    v-if="!selectedSection"
                    begin-title="About"
                    end-title="Me"
                    @click="() => selectedSection = 'about-me'"
                />

                <XCircleIcon
                    v-if="selectedSection === 'about-me'"
                    class="size-7 absolute top-4 right-4 cursor-pointer"
                    @click="selectedSection = null"
                />
            </section>

            <section
                class="text-white absolute bottom-0 left-0 bg-[#222]"
                :class="[selectedSection === 'portfolio' ? 'selected' : '']"
            >
                <SectionTitle
                    v-if="!selectedSection"
                    begin-title="My"
                    end-title="Portfolio"
                    @click="() => selectedSection = 'portfolio'"
                />

                <XCircleIcon
                    v-if="selectedSection === 'portfolio'"
                    class="size-7 absolute top-4 right-4 cursor-pointer"
                    @click="selectedSection = null"
                />
            </section>

            <section
                class="text-white absolute bottom-0 right-0 bg-[#222]"
                :class="[selectedSection === 'get-in-touch' ? 'selected' : '']"
            >
                <SectionTitle
                    v-if="!selectedSection"
                    begin-title="Get"
                    end-title="In Touch"
                    @click="() => selectedSection = 'get-in-touch'"
                />

                <XCircleIcon
                    v-if="selectedSection === 'get-in-touch'"
                    class="size-7 absolute top-4 right-4 cursor-pointer"
                    @click="selectedSection = null"
                />
            </section>
        </div>
    </main>
</template>

<style scoped lang="scss">
.main-picture.men {
    background-image: url("./men.avif");
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
