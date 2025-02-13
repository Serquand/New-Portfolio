<script setup lang="ts">
interface Props {
    beginTitle: string,
    endTitle: string,
}

defineProps<Props>();
</script>

<template>
    <div class="flex justify-center cursor-pointer items-center group font-black text-4xl absolute inset-0 uppercase">
        <div class="size-fit relative overflow-hidden">
            <h3 class="opacity-0">
                {{ beginTitle }} {{ endTitle }}
            </h3>

            <div class="text-white top-0 group-hover:top-[105%] duration-300 transition-all absolute">
                {{ beginTitle }}
            </div>

            <div class="text-[#daa520] group-hover:bottom-0 transition-all duration-300 absolute bottom-[105%]">
                {{ beginTitle }}
            </div>

            <div class="text-[#daa520] bottom-0 group-hover:bottom-[105%] duration-300 transition-all absolute right-0">
                {{ endTitle }}
            </div>

            <div class="text-white absolute group-hover:top-0 transition-all duration-300 top-[105%] right-0">
                {{ endTitle }}
            </div>
        </div>
    </div>
</template>
