<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface Props {
    label: string,
    modelValue: string,
    icon: FunctionalComponent,
    id: string,
}

defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>();

function onInput(e: any) {
    emit('update:modelValue', e.target.value);
}
</script>

<template>
    <label
        class="flex gap-6 items-center group w-full h-16 relative"
        :for="id"
    >
        <component
            :is="icon"
            class="size-8 text-gray-400 group-focus-within:text-[#daa520]"
        />

        <div class="border-b flew-grow w-full pb-2 group-focus-within:border-[#daa520] border-gray-500">
            <label
                :for="id"
                class="absolute group-focus-within:text-base group-focus-within:-translate-y-9 transition-all duration-300 mb-px block"
                :class="[modelValue.length > 0 ? 'text-base -translate-y-9' : 'text-xl -translate-y-3']"
            >{{ label }}</label>

            <input
                :id="id"
                class="border-none h-6 w-full outline-0 text-xl"
                type="text"
                :value="modelValue"
                :name="id"
                autocomplete="off"
                @input="onInput"
            >
        </div>
    </label>
</template>
