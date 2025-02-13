<script setup lang="ts">
const descriptiveArray: string[] = [
    'Software Engineer',
    'Web Developer',
    'DevOps Engineer',
    'Discord BOT Developer',
] as const;
const refreshRate = 100;
const entireWordSequenceToLive = 10;
let currentWord = descriptiveArray[0];
let way: 'remove' | 'add' = 'add';
let currentStillingSequenceToLive: number = entireWordSequenceToLive;

const displayedWord = ref<string>('');

function getNextWordToDisplay() {
    const currentIndex = descriptiveArray.findIndex(_ => _ === currentWord);
    const nextIndex = (currentIndex + 1) % descriptiveArray.length;
    currentWord = descriptiveArray[nextIndex];
}

function updateDisplayedWord() {
    if (way === 'add') {
        if (displayedWord.value.length === currentWord.length) {
            way = 'remove';
            getNextWordToDisplay();
            currentStillingSequenceToLive = entireWordSequenceToLive;
        } else {
            const newLetter = currentWord.charAt(displayedWord.value.length);
            displayedWord.value = displayedWord.value + newLetter;
        }
    } else if (way === 'remove') {
        if (currentStillingSequenceToLive > 0) {
            currentStillingSequenceToLive--;
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

onMounted(() => {
    setInterval(() => updateDisplayedWord(), refreshRate);
});
</script>

<template>
    <section class="text-white flex flex-col items-center justify-center uppercase">
        <p class="text-xl font-light">
            Hi there ! I'm
        </p>

        <h2 class="text-6xl text-[#daa520] text-center font-bold m-7 leading-8">
            Esteban VINCENT
        </h2>

        <h1 class="sr-only">
            Software Engineer - Web Developper
        </h1>

        <p class="text-2xl font-medium text-white min-h-9">
            {{ displayedWord }}
        </p>
    </section>
</template>
