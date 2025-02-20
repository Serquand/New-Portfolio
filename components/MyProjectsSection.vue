<script setup lang="ts">
import { WalletIcon } from '@heroicons/vue/24/outline';
import projects from '../data/projects.json';

const emits = defineEmits<{ (e: 'see-project-information', projectToSeeId: string): void }>();
</script>

<template>
    <SectionSubtitle
        :separator-icon="WalletIcon"
        begin-title="My"
        end-title="Projects"
    />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-12 sm:px-6 mx-auto bg-[#222] pb-6">
        <Project
            v-for="project in projects"
            :key="project.id"
            :project-title="project.name"
            :projet-image-url="project.mainPhotoUrl"
            :project-id="project.id"
            @see-project-information="projectId => emits('see-project-information', projectId)"
        />
    </div>
</template>
