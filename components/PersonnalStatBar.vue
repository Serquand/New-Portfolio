<script setup lang="ts">
import { HeartIcon, BriefcaseIcon, HandThumbUpIcon } from '@heroicons/vue/24/outline';
import type { FunctionalComponent } from 'vue';

interface Statistic {
    label: string,
    value: string,
    icon: FunctionalComponent
}

const stats: Statistic[] = [
    {
        icon: BriefcaseIcon,
        label: "Years Experience",
        value: "2+"
    },
    {
        icon: HandThumbUpIcon,
        label: 'Achieved Projects',
        value: '10+'
    },
    {
        icon: HeartIcon,
        label: 'Happy Clients',
        value: '10+'
    },
]
</script>

<template>
    <div class="flex w-9/10 mx-auto justify-between">
        <div
            v-for="(stat, index) in stats"
            :key="index"
            class="flex flex-col items-center gap-10"
        >
            <component
                :is="stat.icon"
                class="size-20 text-white"
            />

            <p class="text-6xl text-[#daa520] font-bold">
                {{ stat.value }}
            </p>

            <h4 class="text-2xl text-white font-black uppercase tracking-wider">
                {{ stat.label }}
            </h4>
        </div>
    </div>
</template>
