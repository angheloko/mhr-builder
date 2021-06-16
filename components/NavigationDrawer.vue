<template>
  <div class="absolute z-10 inset-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')" />
    <div class="absolute w-4/5 md:w-80 bg-white h-screen left-0 flex flex-col">
      <div class="p-2 h-12 flex items-center justify-between">
        <div>
          {{ heading }}
        </div>
        <button @click="$emit('close')">
          <CloseIcon />
        </button>
      </div>
      <div class="flex-grow">
        <div class="flex flex-col justify-between h-full">
          <div class="space-y-4">
            <slot />
            <NuxtLink
              class="flex items-center space-x-2 cursor-pointer px-4"
              to="/"
            >
              <HomeIcon />
              <div>
                My sets
              </div>
            </NuxtLink>
            <NuxtLink
              class="flex items-center space-x-2 cursor-pointer px-4"
              to="/sets"
            >
              <UserGroupIcon class="h-5 w-5" />
              <div>
                Community sets
              </div>
            </NuxtLink>
            <hr>
            <div class="px-4 text-sm text-gray-400">
              Glossary
            </div>
            <div
              class="flex items-center space-x-2 cursor-pointer px-4 pl-8"
              @click="$emit('close'); showSkillSearch = true"
            >
              <LightningBoltIcon />
              <div>
                Skills
              </div>
            </div>
            <hr>
            <div
              class="flex items-center space-x-2 cursor-pointer px-4"
              @click="$emit('close'); showAbout = true"
            >
              <InformationCircleIcon class="h-5 w-5" />
              <div>
                About
              </div>
            </div>
            <a
              href="https://github.com/angheloko/mhr-builder/issues"
              class="flex items-center space-x-2 cursor-pointer px-4"
            >
              <ExclamationIcon class="h-5 w-5" />
              <div>
                Report an issue
              </div>
            </a>
            <a
              href="mailto:angheloko@gmail.com"
              class="flex items-center space-x-2 cursor-pointer px-4"
            >
              <MailIcon />
              <div>
                Contact developer
              </div>
            </a>
          </div>
          <div class="flex justify-between items-center p-4">
            <div>
              🛠 with ❤️ by <a href="https://donlalicon.dev" class="text-blue-600 font-bold">Don</a>
            </div>
            <a href="https://github.com/angheloko/mhr-builder" class="ml-3">
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </div>
    <SkillSearchModal
      v-if="showSkillSearch"
      @close="showSkillSearch = false"
    />
    <AboutModal
      v-if="showAbout"
      @close="showAbout = false"
    />
  </div>
</template>

<script>
import CloseIcon from './icons/CloseIcon'
import LightningBoltIcon from './icons/LightningBoltIcon'
import MailIcon from './icons/MailIcon'
import GithubIcon from './icons/GithubIcon'
import SkillSearchModal from './SkillSearchModal'
import HomeIcon from './icons/HomeIcon'
import InformationCircleIcon from './icons/InformationCircleIcon'
import AboutModal from './AboutModal'
import ExclamationIcon from './icons/ExclamationIcon'
import UserGroupIcon from './icons/UserGroupIcon'

export default {
  name: 'NavigationDrawer',
  components: { UserGroupIcon, ExclamationIcon, AboutModal, InformationCircleIcon, HomeIcon, SkillSearchModal, GithubIcon, MailIcon, LightningBoltIcon, CloseIcon },
  props: {
    heading: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showSkillSearch: false,
      showAbout: false
    }
  }
}
</script>

<style scoped>

</style>
