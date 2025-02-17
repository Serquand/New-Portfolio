<script setup lang="ts">
import experiences from '../data/experiences.json';
</script>

<template>
    <div class="flex flex-col gap-6">
        <div
            v-for="(experience, _) in experiences"
            :key="_"
            class="flex flex-col gap-2"
        >
            <ExperienceInformation
                :title="experience.title"
                :beginning-date="experience.beginningDate"
                :end-date="experience.endDate"
                :description="experience.description"
                :urls="experience.urls"
            />
        </div>
    </div>
</template>
