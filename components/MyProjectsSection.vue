<script setup lang="ts">
import { WalletIcon } from '@heroicons/vue/24/outline';
import projects from '../projects.json';
</script>

<template>
    <SectionSubtitle
        :separator-icon="WalletIcon"
        begin-title="My"
        end-title="Projects"
    />

    <div class="grid grid-cols-3 gap-4 px-4 mx-auto bg-[#222] pb-6">
        <Project
            v-for="project in projects"
            :key="project.id"
            :project-title="project.name"
            :projet-image-url="project.mainPhotoUrl"
        />
    </div>
</template>
