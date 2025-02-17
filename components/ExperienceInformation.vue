<script setup lang="ts">
import { CalendarDateRangeIcon } from '@heroicons/vue/24/outline';

interface Props {
    title: string,
    beginningDate: string,
    endDate: string,
    description: string,
    urls?: {
        display: string,
        to: string,
    }[],
}

defineProps<Props>();
</script>

<template>
    <h4 class="text-lg tracking-wider uppercase">
        {{ title }}
    </h4>

    <p class="flex gap-3 text-[#777] items-center">
        <CalendarDateRangeIcon class="size-5" />
        <span>{{ beginningDate }} - {{ endDate }}</span>
    </p>

    <p>
        {{ description }}
    </p>

    <p
        v-if="urls"
        class="flex gap-3"
    >
        <span
            v-for="(url, index) in urls"
            :key="index"
            class="flex gap-3"
        >
            <a
                :href="url.to"
                target="_blank"
                class="text-sky-500 text-underline-appearence"
            >
                {{ url.display }}
            </a>

            <span
                v-if="index < urls.length - 1"
                class="text-[#777]"
            >
                |
            </span>
        </span>
    </p>
</template>
