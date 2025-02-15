<script setup lang="ts">
import type { Project } from '~/tools/types';
import { XCircleIcon } from '@heroicons/vue/24/outline';
import projects from '../projects.json';
import AboutMeSection from './AboutMeSection.vue';
import GetInToucheSection from './GetInToucheSection.vue';
import MainPresentationSection from './MainPresentationSection.vue';
import MyProjectsSection from './MyProjectsSection.vue';

type SelectableSection = 'about-me' | 'projects' | 'get-in-touch' | null;
const selectedSection = ref<SelectableSection>(null);
const projectToDisplayInformation = ref<Project | null>(null);

const sections = [
    {
        id: 'about-me',
        beginTitle: 'About',
        endTitle: 'Me',
        position: 'top-0 right-0',
        component: AboutMeSection,
    },
    {
        id: 'projects',
        beginTitle: 'My',
        endTitle: 'Projects',
        position: 'bottom-0 left-0',
        component: MyProjectsSection,
    },
    {
        id: 'get-in-touch',
        beginTitle: 'Get',
        endTitle: 'In Touch',
        position: 'bottom-0 right-0',
        component: GetInToucheSection,
    },
] as const;

function handleDisplayProjectInformations(projectId: string) {
    projectToDisplayInformation.value = projects.find(project => project.id === projectId) ?? null;
}

function handleGoToNextProject() {
    if (!projectToDisplayInformation.value) {
        return;
    }

    const currentProjectId = projectToDisplayInformation.value.id;
    const currentIndex = projects.findIndex(project => project.id === currentProjectId);
    const nextProjectId = (currentIndex + 1) % projects.length;
    projectToDisplayInformation.value = projects[nextProjectId];
}

function handleGoToPreviousProject() {
    if (!projectToDisplayInformation.value) {
        return;
    }

    const currentProjectId = projectToDisplayInformation.value.id;
    const currentIndex = projects.findIndex(project => project.id === currentProjectId);
    const previousProjectId = (currentIndex - 1 + projects.length) % projects.length;
    projectToDisplayInformation.value = projects[previousProjectId];
}
</script>

<template>
    <main class="flex pr-6">
        <div class="main-picture men hidden lg:block" />

        <div class="bl-main lg:w-2/3 w-full overflow-hidden transition-all">
            <MainPresentationSection />

            <section
                v-for="section in sections"
                :key="section.id"
                class="text-white absolute bg-[#222]"
                :class="[section.position, selectedSection === section.id ? 'selected' : '']"
            >
                <SectionTitle
                    v-if="!selectedSection"
                    :begin-title="section.beginTitle"
                    :end-title="section.endTitle"
                    @click="() => selectedSection = section.id"
                />

                <component
                    :is="section.component"
                    v-if="selectedSection === section.id"
                    @see-project-information="handleDisplayProjectInformations"
                />

                <XCircleIcon
                    v-if="selectedSection === section.id"
                    class="size-12 absolute top-8 right-12 cursor-pointer"
                    @click="selectedSection = null"
                />
            </section>

            <section
                v-if="projectToDisplayInformation"
                class="absolute bg-[#123] project-display"
            >
                <ProjectInformation
                    :project-to-display="projectToDisplayInformation"
                    @go-to-previous-project="handleGoToPreviousProject"
                    @go-to-next-project="handleGoToNextProject"
                />
            </section>
        </div>
    </main>
</template>

<style scoped lang="scss">
.main-picture.men {
    background-image: url("/bombe.avif");
    padding: 0;
    margin-top: 24px;
    margin-left: 24px;
    height: calc(100vh - 48px);
    background-size: cover;
    background-position: center center;
    width: calc(33.3333333333% - 24px);
}

.bl-main {
    position: relative;
    width: 100%;
    margin-top: 24px;
    overflow: auto;
    scrollbar-width: none;
    margin-left: 24px;
    gap: 20px;

    section {
        transition-property: all;
        transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
        transition-duration: var(--tw-duration, var(--default-transition-duration));

        &.project-display {
            height: 100%;
            width: 100%;
            z-index: 30;
            top: 100%;
        }

        &:not(.project-display) {
            &:not(.selected) {
                height: calc(50% - 10px);
                width: calc(50% - 10px);
            }

            &.selected {
                z-index: 20;
                height: 100%;
                width: 100%;
            }
        }
    }
}
</style>
