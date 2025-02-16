<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import { AcademicCapIcon, IdentificationIcon, StarIcon, WalletIcon } from '@heroicons/vue/24/outline';
import Education from './Education.vue';
import Experiences from './Experiences.vue';
import Skills from './Skills.vue';

export interface ResumeCardInformation {
    title: string,
    isVisible: boolean,
    presentationIcon: FunctionalComponent,
    component: any,
}

const refreshmentKey = ref(0);
const resumeCardsInformation = ref<Array<ResumeCardInformation>>([
    {
        isVisible: true,
        title: 'Skills',
        presentationIcon: StarIcon,
        component: Skills,
    },
    {
        isVisible: false,
        title: 'Education',
        presentationIcon: AcademicCapIcon,
        component: Skills,

    },
    {
        isVisible: false,
        title: 'Experiences',
        presentationIcon: WalletIcon,
        component: Skills,
    },
]);

const orderedIndex = computed<Record<string, number>>(() => {
    const displayedIndex = resumeCardsInformation.value.findIndex(section => section.isVisible);
    const localOrdered: Record<string, number> = { };
    const numberOfElementsAfterVisible = resumeCardsInformation.value.length - displayedIndex - 1;

    for (let i = 0; i < resumeCardsInformation.value.length; i++) {
        const cardInformation = resumeCardsInformation.value[i];
        if (cardInformation.isVisible) {
            localOrdered[cardInformation.title] = 0;
        } else {
            const distance = Math.abs(i - displayedIndex);
            const isAfter: boolean = i > displayedIndex;
            const order = distance + (isAfter ? 0 : numberOfElementsAfterVisible);
            localOrdered[cardInformation.title] = order;
        }
    }
    refreshmentKey.value ++;
    return localOrdered;
});

function handleUpdateVisibleSection(sectionTitle: string) {
    const oldVisibleSectionIndex = resumeCardsInformation.value.findIndex(_ => _.isVisible);
    resumeCardsInformation.value[oldVisibleSectionIndex].isVisible = false;

    const newVisibleSectionIndex = resumeCardsInformation.value.findIndex(_ => _.title === sectionTitle);
    resumeCardsInformation.value[newVisibleSectionIndex].isVisible = true;
}
</script>

<template>
    <div class="container">
        <SectionSubtitle
            :separator-icon="IdentificationIcon"
            begin-title="About"
            end-title="Me"
        />

        <div class="flex px-12 gap-12">
            <nav class="flex flex-col gap-5 text-[#777] transition-all justify-center">
                <button
                    v-for="(information, index) in resumeCardsInformation"
                    :key="index"
                    class="cursor-pointer w-60 py-3 transition-all font-bold uppercase text-lg tracking-wide hover:text-white flex items-center border justify-center gap-2"
                    :class="[(information.isVisible) ? 'bg-[#daa520] border-[#daa520] text-white' : 'border-[#777]  hover:border-white ']"
                    @click="() => handleUpdateVisibleSection(information.title)"
                >
                    <component
                        :is="information.presentationIcon"
                        class="size-6"
                    />
                    {{ information.title }}
                </button>
            </nav>

            <div class="flex flex-col flex-grow relative">
                <ResumeCard
                    v-for="(information, index) in resumeCardsInformation"
                    :key="index"
                    :information="information"
                    :index="orderedIndex[information.title]"
                    :maximal-index="resumeCardsInformation.length"
                    @update-visible-section="() => handleUpdateVisibleSection(information.title)"
                >
                    <component :is="information.component" />
                </ResumeCard>

                <div class="h-[2000px]" />
            </div>
        </div>

        <hr class="text-[#777] w-9/10 mx-auto my-12">

        <PersonnalStatBar />
    </div>
</template>