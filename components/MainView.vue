<template>
    <main class="flex">
        <div class="main-picture men" />
        <div class="bl-main transition-all">
            <section class="text-white">
                Mon portfolio
            </section>

            <section class="text-white relative bg-[#222]">
                <SectionTitle
                    begin-title="About"
                    end-title="Me"
                />
            </section>

            <section class="text-white relative bg-[#222]">
                <SectionTitle
                    begin-title="My"
                    end-title="Portfolio"
                />
            </section>

            <section class="text-white relative bg-[#222]">
                <SectionTitle
                    begin-title="Get"
                    end-title="In Touch"
                />
            </section>
        </div>
    </main>
</template>

<style scoped>
.main-picture.men {
    background-image: url("./men.avif");
    padding: 0;
    margin-top: 24px;
    margin-left: 24px;
    height: calc(100vh - 48px);
    background-size: cover;
    background-position: center center;
    width: calc(33.3333333333% - 48px);
}

.bl-main {
    position: absolute;
    width: 100%;
    margin-top: 24px;
    height: calc(100vh - 48px);
    overflow: hidden;
    width: 66.6666666667%;
    left: 33.3333333333% !important;
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
}
</style>
