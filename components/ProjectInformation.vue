<script setup lang="ts">
import type { Project } from '~/tools/types';
import { ArrowRightStartOnRectangleIcon, ChevronLeftIcon, ChevronRightIcon, CogIcon, UserGroupIcon, XCircleIcon } from '@heroicons/vue/24/outline';

interface Props {
    projectToDisplay: Project | undefined,
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e: 'close-project-information'): void,
    (e: 'go-to-next-project'): void,
    (e: 'go-to-previous-project'): void,
}>();

const localProjectToDisplay = ref<Project | undefined>();
const timeToLiveAfterClosing = 500;
function udpateLocalProjectToDisplay(newValue: Project | undefined) {
    if (!newValue) {
        setTimeout(() => {
            if (!props.projectToDisplay) {
                localProjectToDisplay.value = undefined;
            }
        }, timeToLiveAfterClosing);
    } else {
        localProjectToDisplay.value = newValue;
    }
}

watch(() => props.projectToDisplay, udpateLocalProjectToDisplay, { deep: true });
</script>

<template>
    <div class="relative text-white flex md:items-center size-full">
        <XCircleIcon
            class="size-12 absolute top-4 right-4 cursor-pointer"
            @click="() => emits('close-project-information')"
        />

        <div
            v-if="localProjectToDisplay"
            class="flex flex-col md:flex-row gap-8 w-full px-4 pt-16 md:py-auto md:px-6"
        >
            <div
                class="aspect-square flex-shrink w-4/5 md:max-w-[50%] cursor-pointer mx-auto min-w-64 bg-cover"
                :style="{ backgroundImage: `url(${localProjectToDisplay.mainPhotoUrl})` }"
            />

            <div class="flex flex-grow flex-col md:justify-center">
                <h4 class="text-center md:text-start text-xl md:text-2xl font-bold uppercase mb-6">
                    {{ localProjectToDisplay.name }}
                </h4>

                <div class="flex flex-col text-center md:text-start text-base md:text-xl gap-3 mb-8 md:mb-0 ">
                    <p>
                        <UserGroupIcon class="size-5 md:size-8 inline-block mr-3" />
                        <span class="font-semibold">Client : </span>
                        {{ localProjectToDisplay.client }}
                    </p>

                    <p>
                        <CogIcon class="size-5 md:size-8 inline-block mr-3" />
                        <span class="font-semibold">Technologies utilisées :</span>
                        {{ localProjectToDisplay.usedTechnologies.join(", ") }}
                    </p>
                </div>

                <hr class="text-gray-500 my-6 hidden md:block">

                <a
                    class="
                        bg-[#daa520] transition-all hover:bg-[#b0861a] uppercase text-center text-lg
                        flex justify-center items-center gap-3
                        font-bold py-3 md:w-fit w-4/5 min-w-64 md:ml-0 mx-auto
                    "
                    :href="localProjectToDisplay.urlToGo"
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
