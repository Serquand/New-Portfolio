<template>
    <div class="fixed z-[9999] inset-0 bg-black/70 flex items-center justify-center">
        <div class="loader animate-spin" />
    </div>
</template>

<style lang="css" scoped>
.loader {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    border-style: solid;
    border-color: #daa520;
    border-top-width: 2px;
    border-right-width: 2px;
    border-bottom-width: 0px;
    border-left-width: 0px;
    animation-duration: 600ms;
}
</style>
