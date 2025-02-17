<script setup lang="ts">
import type { IconDefinition } from '@fortawesome/free-brands-svg-icons';

interface Props {
    label: string,
    icon: any,
    value: string,
    faIcon: IconDefinition | undefined,
    link: string | undefined,
}
defineProps<Props>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <h4 class="text-2xl text-[#daa520] font-bold uppercase">
            {{ label }}
        </h4>

        <component
            :is="link ? 'a' : 'div'"
            :href="link"
            target="_blank"
            class="flex gap-4 text-gray-100 text-lg items-center"
        >
            <component
                :is="icon"
                v-if="icon !== 'font-awesome'"
                class="size-6 text-gray-500"
            />

            <font-awesome
                v-else-if="faIcon"
                :icon="faIcon"
                class="!size-6 text-gray-500"
            />

            <p class="text-underline-appearence">
                {{ value }}
            </p>
        </component>
    </div>
</template>
