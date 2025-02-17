<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';

const descriptiveArray: string[] = [
    'Software Engineer',
    'Web Developer',
    'DevOps Engineer',
] as const;
const refreshRate = 100;
const entireWordSequenceToLive = 10;
let currentWord = descriptiveArray[0];
let way: 'remove' | 'add' = 'add';
let currentWordSequenceTimeLeft: number = entireWordSequenceToLive;

const displayedWord = ref<string>('');

// Function to get the next word in the sequence
function getNextWordToDisplay() {
    const currentIndex = descriptiveArray.findIndex(_ => _ === currentWord);
    const nextIndex = (currentIndex + 1) % descriptiveArray.length;
    currentWord = descriptiveArray[nextIndex];
}

// Function to update the word displayed on the screen
function updateDisplayedWord() {
    if (way === 'add') {
        if (displayedWord.value.length === currentWord.length) {
            way = 'remove';
            getNextWordToDisplay();
            currentWordSequenceTimeLeft = entireWordSequenceToLive;
        } else {
            const newLetter = currentWord.charAt(displayedWord.value.length);
            displayedWord.value = displayedWord.value + newLetter;
        }
    } else if (way === 'remove') {
        if (currentWordSequenceTimeLeft > 0) {
            currentWordSequenceTimeLeft--;
            return;
        }

        if (displayedWord.value.length === 0) {
            way = 'add';
            displayedWord.value = currentWord.charAt(0);
        } else {
            displayedWord.value = displayedWord.value.substring(0, displayedWord.value.length - 1);
        }
    }
}

// Start the animation when mounted
onMounted(() => {
    nextTick(() => {
        setInterval(() => updateDisplayedWord(), refreshRate);
    });
});
</script>

<template>
    <section class="text-white flex flex-col absolute items-center justify-center uppercase">
        <p class="text-3xl font-light">
            Hello, World ! I'm
        </p>

        <h2 class="text-7xl text-[#daa520] text-center font-bold m-7 leading-14">
            Esteban<br>VINCENT
        </h2>

        <h1 class="sr-only">
            {{ descriptiveArray.join(" - ") }}
        </h1>

        <p class="text-3xl font-bold text-white min-h-10">
            {{ displayedWord }}
        </p>
    </section>
</template>
