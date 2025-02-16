<script setup lang="ts">
import type { ResumeCardInformation } from './AboutMeSection.vue';

defineProps<{ information: ResumeCardInformation }>();
</script>

<template>
    <div>
        <h4>{{ information.title }}</h4>
    </div>
</template>
