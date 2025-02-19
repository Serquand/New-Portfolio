<script setup lang="ts">
import type { Project } from '~/tools/types';
import { XCircleIcon } from '@heroicons/vue/24/outline';
import projects from '../data/projects.json';
import AboutMeSection from './AboutMeSection.vue';
import GetInToucheSection from './GetInToucheSection.vue';
import MainPresentationSection from './MainPresentationSection.vue';
import MyProjectsSection from './MyProjectsSection.vue';

type SelectableSection = 'about-me' | 'projects ' | 'get-in-touch' | null;
const selectedSection = ref<SelectableSection>(null);
const projectToDisplayInformation = ref<Project | null>(projects[0]);
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
    <main class="flex m-6 ml-0 main-container">
        <div class="main-picture flex-shrink-0 hidden lg:block">
            <div class="main-picture-image" />
        </div>

        <div
            class="relative bl-main w-full transition-all h-full"
            :class="[isProjectInformationVisible ? 'overflow-hidden' : 'overflow-auto']"
        >
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

        <div
            class="project-information-container"
            :class="[projectToDisplayInformation ? 'z-30' : '-z-10']"
        >
            <section
                v-if="projectToDisplayInformation"
                class="absolute inset-x-0 transition-all duration-750 bg-[#222] h-full"
                :class="[projectToDisplayInformation ? 'top-0' : 'top-[100%]']"
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
    height: calc(100svh - 48px);
}

.project-information-container {
    position: fixed;
    top: 24px;
    right: 24px;
    bottom: 24px;
    overflow: hidden;
    left: calc(33% + 64px);
}

.main-picture {
    width: calc(33% + 24px);
    margin: 0 24px;

    &-image {
        height: 100%;
        width: 100%;
        background-image: url("/chill_guy.webp");
        background-size: cover;
        background-position: center center;
    }
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
            height: 100vh;
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
                inset-block: 0 !important;

                .section-content, .close-selected-section {
                    opacity: 0;
                    animation: appear-directly $DURATION_OPACITY_SECTION_APPEARED_ANIMATION ease-out $DURATION_FOR_APPEAR forwards;
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
        bottom: calc(60% - 12px)
    }
}

#projects {
    @media (max-width: 767px) {
        top: 60%;
        bottom: calc(80% - 6px);
    }
}

#get-in-touch {
    @media (max-width: 767px) {
        top: calc(80% + 6px);
    }
}
</style>