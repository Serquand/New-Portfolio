<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface Props {
    separatorIcon: FunctionalComponent,
    beginTitle: string,
    endTitle: string,
}

defineProps<Props>();
</script>

<template>
    <div class="flex justify-center font-bold text-6xl my-12 relative uppercase">
        <div class="size-fit relative overflow-hidden">
            <h3 class="opacity-0">
                {{ beginTitle }} {{ endTitle }}
            </h3>

            <div class="text-white absolute top-0 z-10">
                {{ beginTitle }}
            </div>

            <div class="text-[#daa520] absolute top-0 right-0 z-10">
                {{ endTitle }}
            </div>
        </div>
    </div>

    <SeparatorTitleContent
        :separator-icon="separatorIcon"
        class="mt-14 mb-12"
    />
</template>
