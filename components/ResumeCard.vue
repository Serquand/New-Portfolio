<script setup lang="ts">
import type { ResumeCardInformation } from './AboutMeSection.vue';

interface Props {
    information: ResumeCardInformation,
    index: number,
    maximalIndex: number,
}

const props = defineProps<Props>();

const emits = defineEmits<{ (e: 'update-visible-section'): void }>();

const translateValue = computed(() => (props.index - props.maximalIndex + 1) * 55);
</script>

<template>
    <div
        :id="`resume-card-${information.title.toLowerCase()}`"
        class=" absolute top-0 w-full transition-all border border-gray-500 cursor-pointer
                -translate-y-[var(--translate-y-value)] scale-[var(--scale-value)] z-[var(--z-index-value)]
        "
        :class="[!information.isVisible ? 'hover:-translate-y-[var(--hover-translate-y-value)]' : '']"
        :style="{
            '--hover-translate-y-value': `${translateValue + 10}px`,
            '--translate-y-value': `${translateValue}px`,
            '--scale-value': `${100 - 8 * index}%`,
            '--z-index-value': 10 * (maximalIndex - index),
        }"
    >
        <h4
            class="uppercase text-3xl tracking-wider text-center transition-all bg-[#111] py-8 flex gap-4 items-center justify-center text-[#daa520]"
            @click="() => !information.isVisible && emits('update-visible-section')"
        >
            <component
                :is="information.presentationIcon"
                class="size-7"
            />
            {{ information.title }}
        </h4>

        <div
            v-if="information.isVisible"
            class="bg-[#222] p-6"
        >
            <slot />
        </div>
    </div>
</template>
