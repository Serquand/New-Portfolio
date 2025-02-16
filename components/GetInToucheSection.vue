<script setup lang="ts">
import type { FunctionalComponent } from 'vue';
import type Notifications from './Notifications.vue';
import type { InfoMail } from '~/tools/types';
import ContactItem from '@/components/ContactItem.vue';
import { faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { EnvelopeIcon, KeyIcon, MapPinIcon, PaperAirplaneIcon, PhoneIcon, CheckCircleIcon, XMarkIcon } from '@heroicons/vue/24/outline';

const basisContactInformations: InfoMail = {
    emailTo: 'esteban.vinc',
    messageContent: 'Mon contenu',
    subject: 'Mon sujet',
};
const contactInformations = ref<InfoMail>({ ...basisContactInformations });

const notificationTitle = ref('');
const notificationMessage = ref('');
const notificationsRef = ref<typeof Notifications | null>(null);
const notificationIcon = ref<FunctionalComponent | null>(null);
const iconClass = ref<string>("");

function openNotifications() {
    if (notificationsRef.value) {
        notificationsRef.value.openNotifications();
    }
}

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
        value: 'estebanvincent.mail@gmail.com',
        link: 'mailto:estebanvincent.mail@gmail.com',
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
        id: 'spotify',
        faIcon: faSpotify,
        link: 'https://open.spotify.com/user/estebanvincent.mail?si=f1fec19b03d5464c',
        hoverColor: '#16A34A',
    },
];

async function submitMail() {
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: JSON.stringify(contactInformations.value),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        contactInformations.value = { ...basisContactInformations };

        notificationTitle.value = "Message sent!";
        notificationMessage.value = 'Message sucessfully sent!';
        notificationIcon.value = CheckCircleIcon;
        iconClass.value = "size-8 text-green-600";
    } catch {
        notificationTitle.value = "Error";
        notificationMessage.value = 'Something bad happened';
        notificationIcon.value = XMarkIcon;
        iconClass.value = "size-8 text-red-600";
    } finally {
        openNotifications();
    }
}
</script>

<template>
    <div class="absolute top-0 px-2 size-full flex-col flex">
        <SectionSubtitle
            :separator-icon="EnvelopeIcon"
            begin-title="Get"
            end-title="In Touch"
        />

        <div class="inset-0 flex gap-6 flex-grow p-6">
            <div class="flex flex-col gap-7 h-fit p-5 border border-gray-600 bg-[#111] w-92">
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
                    <h4 class="text-2xl text-[#daa520] font-bold uppercase">
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
                                class="!size-8 text-gray-500 group-hover:transition-all group-hover:text-[var(--hoverColor)]"
                                :style="{ '--hoverColor': profile.hoverColor }"
                            />
                        </a>
                    </div>
                </div>
            </div>

            <div class="w-full">
                <h4 class="uppercase text-2xl tracking-wide font-bold">
                    Feel free to drop me a line
                </h4>

                <p class="text-lg mt-4 font-light leading-8">
                    Not sure where to start with your web project? I provide expert advice and consultation. <br>
                    I'll guide you through every steps of the process.
                </p>

                <form
                    class="mt-8 flex flex-col gap-6"
                    @submit.prevent="submitMail"
                >
                    <PortfolioInput
                        id="email"
                        label="Your email"
                        :model-value="contactInformations.emailTo"
                        :icon="EnvelopeIcon"
                        @update:model-value="e => contactInformations.emailTo = e"
                    />

                    <PortfolioInput
                        id="subject"
                        label="Your subject"
                        :model-value="contactInformations.subject"
                        :icon="KeyIcon"
                        @update:model-value="e => contactInformations.subject = e"
                    />

                    <button class="bg-[#daa520] transition-all hover:bg-[#b0861a] uppercase w-fit text-lg flex items-center gap-3 font-bold py-3 px-10 cursor-pointer">
                        Send Email
                        <PaperAirplaneIcon class="size-7 bg-tr" />
                    </button>
                </form>
            </div>
        </div>
    </div>

    <Notifications
        ref="notificationsRef"
        :icon="notificationIcon"
        :title="notificationTitle"
        :information="notificationMessage"
        :icon-class="iconClass"
    />
</template>
