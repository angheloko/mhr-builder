<template>
  <div class="text-gray-600 bg-gray-50">
    <GeneratorModal
      v-show="showModal"
      :value="{ selectedSkills, excludedSkills }"
      @close="showModal = false"
    />
    <WelcomeModal
      v-show="showHelp"
      @close="showHelp = false"
    />
    <div class="h-12 flex items-center px-2 py-1">
      <Logo class="inline-block h-6 w-auto" />
      <h1 class="text-lg inline-block ml-1 flex-grow hidden md:block">
        Monster Hunter Rise Set Builder
      </h1>
      <h1 class="text-lg inline-block ml-1 flex-grow md:hidden">
        MHRise Builder
      </h1>
      <button
        class="bg-blue-600 text-white font-medium text-sm py-0 px-4 rounded ring h-8"
        @click="showModal = true"
      >
        Generate
      </button>
      <a href="https://github.com/angheloko/mhr-builder" class="ml-3">
        <svg class="w-6 h-6" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
        </svg>
      </a>
      <button class="ml-2" @click="showHelp = true">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <Nuxt />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import Logo from '../components/Logo'
import GeneratorModal from '../components/GeneratorModal'
import WelcomeModal from '../components/WelcomeModal'

export default {
  components: { WelcomeModal, GeneratorModal, Logo },
  data () {
    return {
      showModal: false,
      showHelp: false,
      selectedSkills: [],
      excludedSkills: [],
      types: [
        'head',
        'chest',
        'arms',
        'waist',
        'legs'
      ]
    }
  },
  mounted () {
    this.loadSkills()
  },
  methods: {
    ...mapActions({
      loadSkills: 'skills/load'
    })
  }
}
</script>
