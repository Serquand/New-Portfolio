<script setup lang="ts">
import type { FunctionalComponent } from 'vue';

interface Props {
    label: string,
    modelValue: string,
    icon: FunctionalComponent,
    id: string,
    required: boolean,
}

const props = defineProps<Props>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>();

const textAreaRef = ref<HTMLTextAreaElement | null>(null);

function onInput(e: any) {
    emit('update:modelValue', e.target.value);
    autoResize();
}

function autoResize() {
    if (textAreaRef.value) {
        textAreaRef.value.style.height = 'auto';
        textAreaRef.value.style.height = `${textAreaRef.value.scrollHeight}px`;
    }
}

watch(() => props.modelValue, () => autoResize, { deep: true });
</script>

<template>
    <label
        class="flex gap-6 items-center group w-full mt-6 relative"
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
                :class="[modelValue.length > 0 ? 'text-base -translate-y-9' : 'text-lg -translate-y-0']"
            >{{ label }}</label>

            <textarea
                :id="id"
                ref="textAreaRef"
                class="border-none w-full outline-0 text-lg resize-none transition-all min-h-6 max-h-[10rem] scrollbar-hide"
                :value="modelValue"
                :name="id"
                :required="required"
                autocomplete="off"
                rows="1"
                @input="onInput"
            />
        </div>
    </label>
</template>
