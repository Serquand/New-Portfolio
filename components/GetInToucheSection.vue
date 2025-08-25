<script setup lang="ts">
import type { InfoMail } from '~/tools/types';
import ContactItem from '@/components/ContactItem.vue';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { ChatBubbleBottomCenterIcon, EnvelopeIcon, KeyIcon, MapPinIcon, PaperAirplaneIcon, PhoneIcon } from '@heroicons/vue/24/outline';

const basisContactInformations: InfoMail = {
    emailTo: '',
    messageContent: '',
    subject: '',
};
const contactInformations = ref<InfoMail>({ ...basisContactInformations });
const isLoading = ref<boolean>(false);
const isLoadingValid = ref<boolean>(false);
const refreshmentKey = ref<number>(0);
const errorMessage = ref<string>('');

const contacts = [
    {
        label: 'Phone',
        icon: PhoneIcon,
        value: '+33 7 80 44 45 79',
        link: 'tel:+33780444579',
    },
    {
        label: 'Email',
        icon: EnvelopeIcon,
        value: 'e.vincent@serquand.com',
        link: 'mailto:e.vincent@serquand.com',
    },
    {
        label: 'GitHub',
        icon: 'font-awesome',
        value: 'Serquand',
        faIcon: faGithub,
        link: 'https://github.com/Serquand',
    },
    {
        label: 'Location',
        icon: MapPinIcon,
        value: 'Ivry-sur-Seine, France',
    },
];

const socialProfiles = [
    {
        id: 'github',
        faIcon: faGithub,
        link: 'https://github.com/Serquand',
        hoverColor: '#fff',
    },
    {
        id: 'linkedin',
        faIcon: faLinkedin,
        link: 'https://www.linkedin.com/in/esteban-vincent-86577321b',
        hoverColor: '#0A66C2',
    },
    {
        id: 'leetcode',
        faIcon: faCode,
        link: 'https://leetcode.com/u/Serquand',
        hoverColor: '#FFA116',
    },
];

async function submitMail() {
    try {
        isLoading.value = true;
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(contactInformations.value),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.information);
        }

        isLoading.value = false;
        isLoadingValid.value = true;

        setTimeout(() => isLoadingValid.value = false, 1_500);

        contactInformations.value = { ...basisContactInformations };
        refreshmentKey.value = refreshmentKey.value + 1;
    } catch (information: any) {
        const error = information.message;
        isLoading.value = false;

        if (typeof error === 'string' && error !== '') {
            errorMessage.value = error;
        } else {
            errorMessage.value = 'Something bad happened!';
        }
    }
}
</script>

<template>
    <div class="bg-[#222]">
        <SectionSubtitle
            :separator-icon="EnvelopeIcon"
            begin-title="Get"
            end-title="In Touch"
        />

        <div class="inset-0 flex flex-col md:items-start items-center md:flex-row gap-6 p-6">
            <div class="flex flex-col gap-7 h-fit p-5 border border-gray-600 bg-[#111] w-92 max-w-[100%]">
                <div
                    v-for="contact in contacts"
                    :key="contact.label"
                >
                    <ContactItem
                        :label="contact.label"
                        :icon="contact.icon"
                        :value="contact.value"
                        :fa-icon="contact.faIcon"
                        :link="contact.link"
                    />
                </div>

                <div class="flex flex-col gap-4">
                    <h4 class="text-xl text-[#daa520] font-bold uppercase">
                        Social Profiles
                    </h4>

                    <div class="flex gap-4">
                        <a
                            v-for="profile in socialProfiles"
                            :key="profile.id"
                            :href="profile.link"
                            target="_blank"
                            class="group"
                        >
                            <font-awesome
                                :icon="profile.faIcon"
                                class="!size-8 text-gray-500 group-hover:transition-all group-hover:text-[var(--hoverColor)] group-hover:scale-120"
                                :style="{ '--hoverColor': profile.hoverColor }"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <SeparatorTitleContent
                :separator-icon="EnvelopeIcon"
                class="block md:hidden my-12"
            />

            <div class="w-full flex flex-col md:items-start items-center">
                <h4 class="uppercase md:text-xl sm:text-lg text-base tracking-wide font-bold">
                    Feel free to drop me a line
                </h4>

                <p class="mt-4 font-light leading-6 text-center md:text-base text-sm md:text-start">
                    Not sure where to start with your web project?
                    I provide expert advice and consultation.<br>
                    I'll guide you through every steps of the process.
                </p>

                <form
                    class="mt-8 flex flex-col md:items-start items-center w-full gap-8"
                    @submit.prevent="submitMail"
                >
                    <PortfolioInput
                        id="email"
                        label="Your email"
                        class="cursor-pointer"
                        :model-value="contactInformations.emailTo"
                        :icon="EnvelopeIcon"
                        type="email"
                        :max="320"
                        :required="true"
                        @update:model-value="e => contactInformations.emailTo = e"
                    />

                    <PortfolioInput
                        id="subject"
                        label="Your subject"
                        class="cursor-pointer"
                        :model-value="contactInformations.subject"
                        :icon="KeyIcon"
                        type="text"
                        :max="100"
                        :required="true"
                        @update:model-value="e => contactInformations.subject = e"
                    />

                    <TextAreaResizable
                        id="message"
                        :key="refreshmentKey"
                        label="Your message"
                        :model-value="contactInformations.messageContent"
                        :icon="ChatBubbleBottomCenterIcon"
                        :required="true"
                        @update:model-value="e => contactInformations.messageContent = e"
                    />

                    <div class="w-full flex flex-col items-center md:items-start">
                        <button class="bg-[#daa520] transition-all hover:bg-[#b0861a] uppercase w-fit text-lg flex items-center gap-3 font-bold py-3 px-10 cursor-pointer">
                            Send Email
                            <PaperAirplaneIcon class="size-7 bg-tr" />
                        </button>

                        <p
                            v-if="errorMessage"
                            class="text-red-600 text-lg mt-4 text-center md:text-start w-full"
                        >
                            <span v-html="errorMessage" />
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <ClientOnly>
        <Teleport to="body">
            <Loader v-if="isLoading" />
            <LoaderValid v-if="isLoadingValid" />
        </Teleport>
    </ClientOnly>
</template>
