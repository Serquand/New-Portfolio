<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import { XMarkIcon } from '@heroicons/vue/20/solid';

interface Props {
    icon: FunctionalComponent | null,
    title: string,
    information: string,
    iconClass: string,
}

defineProps<Props>();

const show = ref(false);

function openNotifications() {
    show.value = true;
    setTimeout(() => show.value = false, 5_000);
}

defineExpose({ openNotifications });
</script>

<template>
    <div
        aria-live="assertive"
        class="pointer-events-none fixed inset-0 flex px-4 py-6 items-start sm:p-6 z-[60]"
    >
        <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
            <transition
                enter-active-class="transform ease-out duration-300 transition"
                enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div
                    v-if="show"
                    class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                >
                    <div class="p-4">
                        <div class="flex items-start">
                            <div class="flex-shrink-0">
                                <component
                                    :is="icon"
                                    :class="iconClass"
                                />
                            </div>

                            <div class="ml-3 w-0 flex-1 pt-0.5">
                                <p class="text-2xl tracking-wide text-gray-900">
                                    {{ title }}
                                </p>

                                <p class="mt-1 text-xl tracking-wide text-gray-500">
                                    {{ information }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
