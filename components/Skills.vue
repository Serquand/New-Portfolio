<script setup lang="ts">
import { faStar as emptyStarIcon, faStarHalfAlt as halfFilledStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fulfilledStarIcon } from '@fortawesome/free-solid-svg-icons';
import skills from '../data/skill.json';

function getIconToDisplay(value: number, index: number) {
    const currentStarValue = index + 1;
    if (currentStarValue <= value) {
        return fulfilledStarIcon;
    } else if (value > index) {
        return halfFilledStar;
    } else {
        return emptyStarIcon;
    }
}
</script>

<template>
    <div class="grid grid-cols-3 gap-y-4">
        <div
            v-for="(skill, index) in skills"
            :key="index"
            class="flex justify-center items-center flex-col gap-0.5 mx-auto"
        >
            <p class="uppercase text-lg font-semibold">
                {{ skill.technologyLabel }}
            </p>

            <div class="w-fit text-center">
                <font-awesome
                    v-for="(_, starIndex) in new Array(5)"
                    :key="starIndex"
                    :icon="getIconToDisplay(skill.value, starIndex)"
                    class="!size-4 text-[#daa520]"
                />
            </div>
        </div>
    </div>
</template>
