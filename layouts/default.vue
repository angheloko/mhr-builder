<template>
  <div class="text-gray-600 bg-gray-50 min-h-screen flex flex-col">
    <div class="h-12 flex items-center px-2 py-1 space-x-2">
      <NuxtLink to="/">
        <Logo class="inline-block h-6 w-auto" />
      </NuxtLink>
      <h1 class="text-lg inline-block flex-grow hidden md:block">
        <NuxtLink to="/">
          Monster Hunter Rise Set Builder
        </NuxtLink>
      </h1>
      <h1 class="text-lg inline-block flex-grow md:hidden">
        <NuxtLink to="/">
          MHRise Builder
        </NuxtLink>
      </h1>
      <button
        class="bg-blue-600 text-white font-medium text-sm py-0 px-4 rounded ring h-8"
        @click="showModal = modals.generator.id"
      >
        Generate
      </button>
      <button @click="showSideSheet = true">
        <MenuIcon />
      </button>
    </div>
    <Nuxt class="flex-grow" />
    <Modal
      v-if="showModal"
      :title="modals[showModal].title"
      @close="closeModal"
    >
      <GeneratorModal
        v-if="showModal === modals.generator.id"
        :value="{ selectedSkills, excludedSkills }"
        @close="closeModal"
      />
      <SkillSearch
        v-if="showModal === modals.skills.id"
      />
    </Modal>
    <SideSheet
      v-show="showSideSheet"
      @close="showSideSheet = false"
    >
      <div class="flex flex-col justify-between h-full">
        <div class="space-y-4">
          <div
            class="flex items-center space-x-2 cursor-pointer"
            @click="showSideSheet = false; showModal = modals.skills.id;"
          >
            <LightningBoltIcon />
            <div>
              Skills
            </div>
          </div>
          <a
            href="https://github.com/angheloko/mhr-builder/issues"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <ExclamationCircleIcon />
            <div>
              Report an issue
            </div>
          </a>
          <a
            href="mailto:angheloko@gmail.com"
            class="flex items-center space-x-2 cursor-pointer"
          >
            <MailIcon />
            <div>
              Contact developer
            </div>
          </a>
        </div>
        <div class="flex justify-between items-center">
          <div>
            🛠 with ❤️ by <a href="https://donlalicon.dev" class="text-blue-600 font-bold">Don</a>
          </div>
          <a href="https://github.com/angheloko/mhr-builder" class="ml-3">
            <svg class="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          </a>
        </div>
      </div>
    </SideSheet>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Logo from '~/components/Logo'
import GeneratorModal from '~/components/GeneratorModal'
import SideSheet from '~/components/SideSheet'
import LightningBoltIcon from '~/components/icons/LightningBoltIcon'
import Modal from '~/components/Modal'
import MenuIcon from '~/components/icons/MenuIcon'
import SkillSearch from '~/components/SkillSearch'
import ExclamationCircleIcon from '~/components/icons/ExclamationCircleIcon'
import MailIcon from '~/components/icons/MailIcon'

export default {
  components: { MailIcon, ExclamationCircleIcon, SkillSearch, MenuIcon, Modal, LightningBoltIcon, SideSheet, GeneratorModal, Logo },
  data () {
    return {
      showModal: '',
      showSideSheet: false,
      selectedSkills: [],
      excludedSkills: [],
      types: [
        'head',
        'chest',
        'arms',
        'waist',
        'legs'
      ],
      modals: {
        generator: {
          id: 'generator'
        },
        skills: {
          id: 'skills',
          title: 'Skills'
        }
      }
    }
  },
  mounted () {
    this.loadSkills()
    this.$emitter.on('snackbar', (url) => {
      console.log(url)
    })
  },
  methods: {
    ...mapActions({
      loadSkills: 'skills/load'
    }),
    closeModal () {
      this.showModal = ''
    }
  }
}
</script>
