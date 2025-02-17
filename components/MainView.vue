<script setup lang="ts">
import type { Project } from '~/tools/types';
import { XCircleIcon } from '@heroicons/vue/24/outline';
import projects from '../data/projects.json';
import AboutMeSection from './AboutMeSection.vue';
import GetInToucheSection from './GetInToucheSection.vue';
import MainPresentationSection from './MainPresentationSection.vue';
import MyProjectsSection from './MyProjectsSection.vue';

type SelectableSection = 'about-me' | 'projects' | 'get-in-touch' | null;
const selectedSection = ref<SelectableSection>(null);
const projectToDisplayInformation = ref<Project | null>(null);
const isProjectInformationVisible = ref(false);

const sections = [
    {
        id: 'about-me',
        beginTitle: 'About',
        endTitle: 'Me',
        position: 'md:top-0 md:right-0 top-[25%]',
        component: AboutMeSection,
    },
    {
        id: 'projects',
        beginTitle: 'My',
        endTitle: 'Projects',
        position: 'md:bottom-0 md:left-0 md:top-auto top-[50%]',
        component: MyProjectsSection,
    },
    {
        id: 'get-in-touch',
        beginTitle: 'Get',
        endTitle: 'In Touch',
        position: 'bottom-0 md:right-0',
        component: GetInToucheSection,
    },
] as const;

function handleDisplayProjectInformations(projectId: string) {
    projectToDisplayInformation.value = projects.find(project => project.id === projectId) ?? null;
    isProjectInformationVisible.value = true;
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

function handleCloseProjectInformation() {
    isProjectInformationVisible.value = false;
    setTimeout(() => {
        projectToDisplayInformation.value = null;
    }, 300);
}
</script>

<template>
    <main class="flex gap-6 main-container">
        <div class="main-picture hidden lg:block" />

        <div
            class="relative bl-main lg:w-2/3 w-full transition-all"
            :class="[isProjectInformationVisible ? 'overflow-hidden' : 'overflow-auto']"
        >
            <div>
                <MainPresentationSection />

                <section
                    v-for="section in sections"
                    :key="section.id"
                    class="text-white absolute bg-[#222]"
                    :class="[
                        section.position, selectedSection === section.id ? 'selected' : '',
                    ]"
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
            </div>

            <section
                v-if="projectToDisplayInformation"
                class="absolute project-display transition-all duration-750 bg-[#222]"
                :class="[isProjectInformationVisible ? 'top-0' : 'top-[100%]']"
            >
                <ProjectInformation
                    v-if="projectToDisplayInformation"
                    :project-to-display="projectToDisplayInformation"
                    @go-to-previous-project="handleGoToPreviousProject"
                    @go-to-next-project="handleGoToNextProject"
                    @close-project-information="handleCloseProjectInformation"
                />
            </section>
        </div>
    </main>
</template>
