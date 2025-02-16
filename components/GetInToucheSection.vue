<script setup lang="ts">
import ContactItem from '@/components/ContactItem.vue';
import { faGithub, faSpotify } from '@fortawesome/free-brands-svg-icons';
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from '@heroicons/vue/24/outline';

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

                <div class="max-w-sm mx-auto p-4">
    <label for="email" class="block text-lg font-medium text-gray-700 mb-2">Email</label>
    <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
</div>
            </div>
        </div>
    </div>
</template>