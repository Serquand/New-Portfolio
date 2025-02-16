<script setup lang="ts">
import { WalletIcon } from '@heroicons/vue/24/outline';
import experiences from '../experiences.json';
</script>

<template>
    <div class="flex flex-col gap-6">
        <div
            v-for="(experience, _) in experiences"
            :key="_"
            class="flex flex-col gap-2"
        >
            <h4 class="text-lg tracking-wider uppercase">
                {{ experience.title }}
            </h4>

            <p class="flex gap-3 text-[#777] items-center">
                <WalletIcon class="size-5" />
                <span>{{ experience.beginningDate }} - {{ experience.endDate }}</span>
            </p>

            <p class="">
                {{ experience.description }}
            </p>

            <p class="flex gap-3">
                <span
                    v-for="(url, index) in experience.urls"
                    :key="index"
                    class="flex gap-3"
                >
                    <a
                        :href="url.to"
                        target="_blank"
                        class="text-sky-500 text-underline-appearence"
                    >
                        {{ url.display }}
                    </a>

                    <span
                        v-if="index < experience.urls.length - 1"
                        class="text-[#777]"
                    >
                        |
                    </span>
                </span>
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
.text-underline-appearence {
    position: relative;

    &::after {
        display: block;
        position: absolute;
        height: 1px;
        background: rgb(0, 166, 252);
        content: "";
    }

    &:hover::after {
        animation: appear-width 300ms ease-out forwards;
    }
}

@keyframes appear-width {
    from {
        width: 0px;
    }

    to {
        width: 100%;
    }
}
</style>
