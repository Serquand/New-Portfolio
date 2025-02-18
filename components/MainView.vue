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
        position: 'md:top-0 md:right-0',
        component: AboutMeSection,
    },
    {
        id: 'projects',
        beginTitle: 'My',
        endTitle: 'Projects',
        position: 'md:bottom-0 md:left-0 md:top-auto',
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
                    :id="section.id"
                    :key="section.id"
                    class="text-white absolute bg-[#222]"
                    :class="[
                        section.position, selectedSection === section.id ? 'selected' : '',
                    ]"
                >
                    <SectionTitle
                        v-if="selectedSection !== section.id"
                        :begin-title="section.beginTitle"
                        :end-title="section.endTitle"
                        @click="() => selectedSection = section.id"
                    />

                    <div class="section-content">
                        <component
                            :is="section.component"
                            v-if="selectedSection === section.id"
                            @see-project-information="handleDisplayProjectInformations"
                        />
                    </div>

                    <XCircleIcon
                        v-if="selectedSection === section.id"
                        class="size-12 fixed top-14 right-18 cursor-pointer close-selected-section"
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

<style lang="scss">
$DURATION_FOR_OPEN_SELECTED_SECTION: 650ms;
$DURATION_OPACITY_SECTION_APPEARED_ANIMATION: 100ms;
$DURATION_FOR_APPEAR: $DURATION_FOR_OPEN_SELECTED_SECTION - $DURATION_OPACITY_SECTION_APPEARED_ANIMATION;

.main-container {
    height: calc(100vh - 48px);
    background-color: #111;
}

.main-picture {
    background-image: url("/bombe.avif");
    background-size: cover;
    background-position: center center;
    width: 40%;
}

.bl-main {
    position: relative;
    width: 100%;
    scrollbar-width: none;

    section {
        transition-property: all;
        transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
        transition-duration: $DURATION_FOR_OPEN_SELECTED_SECTION;

        &.project-display {
            height: 100%;
            width: 100%;
            z-index: 30;
        }

        &:not(.project-display) {
            &:not(.selected) {
                @media (min-width: 767px) {
                    height: calc(50% - 12px);
                    width: calc(50% - 12px);
                }

                @media (max-width: 767px) {
                    height: calc(20% - 6px);
                    width: calc(100%);
                }
            }

            &.selected {
                z-index: 20;
                width: 100%;

                @media (min-width: 767px) {
                    top: 0 !important;
                    bottom: 0 !important;
                }

                @media (max-width: 767px) {
                    top: 0 !important;
                    bottom: 0 !important;
                    height: auto;
                }

                .section-content, .close-selected-section {
                    opacity: 0;
                    animation: appear-directly $DURATION_OPACITY_SECTION_APPEARED_ANIMATION linear $DURATION_FOR_APPEAR forwards;
                }
            }
        }
    }
}

#main-presentation {
    @media (max-width: 767px) {
        height: calc(40% - 18px);
    }
}

#about-me {
    @media (max-width: 767px) {
        top: calc(40% - 6px);
    }
}

#projects {
    @media (max-width: 767px) {
        top: 60%;
    }
}

#get-in-touch {
    @media (max-width: 767px) {
        top: calc(80% + 6px);
    }
}
</style>
