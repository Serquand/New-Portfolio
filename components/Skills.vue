<script setup lang="ts">
import { faStar as emptyStarIcon, faStarHalfAlt as halfFilledStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fulfilledStarIcon } from '@fortawesome/free-solid-svg-icons';
import skills from '../skill.json';

function getIconToDisplay(value: number, index: number) {
    const currentStarValue = index + 1;
    // alert(`${currentStarValue}, ${value}`);

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
    <div
        class="grid grid-cols-2 gap-y-6"
    >
        <div
            v-for="(skill, index) in skills"
            :key="index"
            class="flex justify-center flex-col gap-2 mx-auto"
        >
            <p class="uppercase text-center text-xl font-semibold">
                {{ skill.technologyLabel }}
            </p>

            <div class="w-fit">
                <font-awesome
                    v-for="(_, starIndex) in new Array(5)"
                    :key="starIndex"
                    :icon="getIconToDisplay(skill.value, starIndex)"
                    class="!size-7 text-[#daa520]"
                />
            </div>
        </div>
    </div>
</template>
