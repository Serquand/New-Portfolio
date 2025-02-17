<script setup lang="ts">
import educations from '../data/education.json';
</script>

<template>
    <div class="flex flex-col gap-6">
        <div
            v-for="(education, _) in educations"
            :key="_"
            class="flex flex-col gap-2"
        >
            <ExperienceInformation
                :title="education.title"
                :beginning-date="education.beginningDate"
                :end-date="education.endDate"
                :description="education.description"
            />
        </div>
    </div>
</template>
