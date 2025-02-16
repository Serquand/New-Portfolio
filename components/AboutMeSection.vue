<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import { AcademicCapIcon, IdentificationIcon, StarIcon, WalletIcon } from '@heroicons/vue/24/outline';

export interface ResumeCardInformation {
    title: string,
    isVisible: boolean,
    presentationIcon: FunctionalComponent,
}

const currentDisplayedCard = ref<string>('Skills');

const resumeCardsInformation: Array<ResumeCardInformation> = [
    {
        isVisible: false,
        title: 'Skills',
        presentationIcon: StarIcon,
    },
    {
        isVisible: false,
        title: 'Education',
        presentationIcon: AcademicCapIcon,

    },
    {
        isVisible: false,
        title: 'Experiences',
        presentationIcon: WalletIcon,
    },
];
</script>

<template>
    <div class="container">
        <SectionSubtitle
            :separator-icon="IdentificationIcon"
            begin-title="About"
            end-title="Me"
        />

        <div class="flex px-12">
            <nav class="flex flex-col gap-5 text-[#777] transition-all">
                <button
                    v-for="(information, index) in resumeCardsInformation"
                    :key="index"
                    class="cursor-pointer w-60 py-3 font-bold uppercase text-lg tracking-wide hover:text-white flex items-center border justify-center gap-2"
                    :class="[(currentDisplayedCard === information.title) ? 'bg-[#daa520] border-[#daa520] text-white' : 'border-[#777]  hover:border-white ']"
                    @click="() => currentDisplayedCard = information.title"
                >
                    <component
                        :is="information.presentationIcon"
                        class="size-6"
                    />
                    {{ information.title }}
                </button>
            </nav>
        </div>

        <hr class="text-[#777] w-9/10 mx-auto my-12">

        <PersonnalStatBar />
    </div>
</template>

<!--
<div class="flex flex-col flex-grow">
    <ResumeCard
        v-for="(information, index) in resumeCardsInformation"
        :key="index"
        :information="information"
    />
</div>
-->
