<script setup lang="ts">
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
</script>

<template>
    <Loader />
    <font-awesome
        :icon="faCircleCheck"
        class="!size-32 text-[#daa520] fixed z-[9999] left-1/2 top-1/2 -translate-1/2"
    />
</template>
