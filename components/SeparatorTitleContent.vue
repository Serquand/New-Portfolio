<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface Props {
    separatorIcon: FunctionalComponent,
}

defineProps<Props>();
</script>

<template>
    <div class="w-2/3 relative mx-auto">
        <hr class="h-px text-[#777] inset-x-0 rounded-full">
        <div class="bg-[#222] w-24 flex justify-center absolute top-1/2 left-1/2 -translate-1/2">
            <component
                :is="separatorIcon"
                class="text-[#daa520] size-8"
            />
        </div>
    </div>
</template>
