<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import { BriefcaseIcon, HandThumbUpIcon, HeartIcon } from '@heroicons/vue/24/outline';

interface Statistic {
    label: string,
    value: string,
    icon: FunctionalComponent,
}

const stats: Statistic[] = [
    {
        icon: BriefcaseIcon,
        label: 'Years Experience',
        value: '2+',
    },
    {
        icon: HandThumbUpIcon,
        label: 'Achieved Projects',
        value: '10+',
    },
    {
        icon: HeartIcon,
        label: 'Happy Clients',
        value: '10+',
    },
];
</script>

<template>
    <div class="flex flex-col sm:flex-row w-9/10 mx-auto gap-y-9 justify-around">
        <div
            v-for="(stat, index) in stats"
            :key="index"
            class="flex flex-col items-center gap-4 sm:gap-6"
        >
            <component
                :is="stat.icon"
                class="size-18 sm:size-14 lg:size-18 text-white"
            />

            <p class="text-5xl sm:text-4xl lg:text-5xl text-[#daa520] font-bold">
                {{ stat.value }}
            </p>

            <h4 class="text-xl sm:text-base md:text-lg text-white font-black uppercase tracking-wider">
                {{ stat.label }}
            </h4>
        </div>
    </div>
</template>
