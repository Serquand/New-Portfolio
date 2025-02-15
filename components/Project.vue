<script setup lang="ts">
import { ref } from 'vue';

type Location = 'top' | 'right' | 'bottom' | 'left';

interface Props {
    projectTitle: string,
    projetImageUrl: string,
    projectId: string,
}

defineProps<Props>();

const emits = defineEmits<{ (e: 'see-project-information', projectToSeeId: string): void }>();
const locationEntered = ref<Location | null>(null);
const leaving = ref<Location | null>(null);
function handleMouseEnterProject(event: MouseEvent) {
    leaving.value = null; // Reset exit animation
    const newLocation = findFromWhereMouseEnter(event);
    if (locationEntered.value !== newLocation) {
        locationEntered.value = newLocation;
    }
}

function handleMouseLeaveProject(event: MouseEvent) {
    const exitLocation = findFromWhereMouseEnter(event);
    leaving.value = exitLocation;

    setTimeout(() => {
        if (leaving.value === exitLocation) {
            leaving.value = null;
            locationEntered.value = null;
        }
    }, 500);
}

function findFromWhereMouseEnter(event: MouseEvent): Location {
    const target = event.currentTarget as HTMLElement;
    if (!target) {
        return 'left';
    }

    const rect = target.getBoundingClientRect();
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Calculate distances to each edge
    const distances = {
        top: Math.abs(mouseY - rect.top),
        right: Math.abs(mouseX - rect.right),
        bottom: Math.abs(mouseY - rect.bottom),
        left: Math.abs(mouseX - rect.left),
    };

    // Return the closest edge
    const closestEdge = Object.entries(distances).reduce((a, b) => (a[1] < b[1] ? a : b))[0];
    return closestEdge as Location;
}
</script>

<template>
    <div
        class="w-full aspect-square cursor-pointer overflow-hidden relative bg-cover"
        :style="{ backgroundImage: `url(${projetImageUrl})` }"
        @mouseenter="handleMouseEnterProject"
        @mouseleave="handleMouseLeaveProject"
        @click="() => emits('see-project-information', projectId)"
    >
        <div
            class="absolute bg-[#daa520] size-full opacity-0 flex items-center justify-center"
            :class="[
                locationEntered ? `from-${locationEntered}` : '',
                leaving ? `leaving-from-${leaving}` : '',
                (locationEntered || leaving) ? 'filter-visible' : '',
            ]"
        >
            <h3 class="text-center text-3xl font-black">
                {{ projectTitle }}
            </h3>
        </div>
    </div>
</template>

<style lang="css" scoped>
.filter-visible {
    opacity: 1;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
}

/* === ENTREE === */
.from-top {
    animation-name: go-down;
}

.from-bottom {
    animation-name: go-up;
}

.from-left {
    animation-name: go-right;
}

.from-right {
    animation-name: go-left;
}

/* === SORTIE === */
.leaving-from-top {
    animation-name: revese-go-down;
}

.leaving-from-bottom {
    animation-name: revese-go-up;
}

.leaving-from-left {
    animation-name: revese-go-right;
}

.leaving-from-right {
    animation-name: revese-go-left;
}

/* === ANIMATIONS === */
@keyframes go-down {
    from {
        bottom: 100%;
    }
    to {
        bottom: 0;
    }
}

@keyframes go-up {
    from {
        top: 100%;
    }
    to {
        top: 0;
    }
}

@keyframes go-left {
    from {
        left: 100%;
    }
    to {
        left: 0;
    }
}

@keyframes go-right {
    from {
        right: 100%;
    }
    to {
        right: 0;
    }
}

@keyframes revese-go-down {
    from {
        bottom: 0;

    }
    to {
        bottom: 100%;
    }
}

@keyframes revese-go-up {
    from {
        top: 0;
    }
    to {
        top: 100%;
    }
}

@keyframes revese-go-left {
    from {
        left: 0;
    }
    to {
        left: 100%;
    }
}

@keyframes revese-go-right {
    from {
        right: 0;
    }
    to {
        right: 100%;
    }
}
</style>
