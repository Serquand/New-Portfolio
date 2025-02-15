<script setup lang="ts">
import type { Project } from '~/tools/types';
import { ArrowRightStartOnRectangleIcon, ChevronLeftIcon, ChevronRightIcon, CogIcon, UserGroupIcon, XCircleIcon } from '@heroicons/vue/24/outline';

interface Props {
    projectToDisplay: Project,
}

defineProps<Props>();

const emits = defineEmits<{
    (e: 'close-project-information'): void,
    (e: 'go-to-next-project'): void,
    (e: 'go-to-previous-project'): void,
}>();
</script>

<template>
    <div class="relative size-full text-white bg-[#222]">
        <XCircleIcon
            class="size-12 absolute top-8 right-12 cursor-pointer"
            @click="() => emits('close-project-information')"
        />

        <div class="absolute top-1/2 -translate-y-1/2 grid gap-8 grid-cols-2 w-full px-14">
            <div
                class="aspect-square cursor-pointer bg-cover"
                :style="{ backgroundImage: `url(${projectToDisplay.mainPhotoUrl})` }"
            />

            <div class="flex flex-col justify-center">
                <h4 class="text-4xl font-bold uppercase mb-12">
                    {{ projectToDisplay.name }}
                </h4>

                <div class="flex flex-col gap-3">
                    <div class="flex gap-4 items-center">
                        <UserGroupIcon class="size-8" />
                        <p class="text-xl">
                            <span class="font-semibold">Client : </span>
                            {{ projectToDisplay.client }}
                        </p>
                    </div>

                    <div class="flex gap-4 items-center">
                        <CogIcon class="size-8" />
                        <p class="text-xl">
                            <span class="font-semibold">Technologies utilisées :</span>
                            {{ projectToDisplay.usedTechnologies.join(", ") }}
                        </p>
                    </div>
                </div>

                <hr class="text-gray-500 mb-10 mt-8">

                <a
                    class="bg-[#daa520] transition-all hover:bg-[#b0861a] uppercase w-fit text-lg flex items-center gap-3 font-bold py-3 px-10"
                    :href="projectToDisplay.urlToGo"
                    target="_blank"
                >
                    Preview
                    <ArrowRightStartOnRectangleIcon class="size-7 bg-tr" />
                </a>
            </div>
        </div>

        <div class="absolute bottom-8 w-full flex items-center text-gray-400 transition-all justify-center gap-4">
            <div
                class="p-2 cursor-pointer"
                @click="() => emits('go-to-previous-project')"
            >
                <ChevronLeftIcon class="size-10 hover:text-white" />
            </div>

            <div
                class="p-2 cursor-pointer"
                @click="() => emits('go-to-next-project')"
            >
                <ChevronRightIcon class="size-10 cursor-pointer hover:text-white" />
            </div>
        </div>
    </div>
</template>
