<template>
  <div class="flex flex-col h-full w-60 flex-none rounded bg-gray-300 pb-4">
    <div class="p-2 text-right">
      <div class="relative">
        <button
          class="focus:outline-none"
          @click.stop="showMenu = true"
        >
          <DotsVerticalIcon />
        </button>
        <div
          v-if="showMenu"
          v-click-outside="clickOutsideMenuHandler"
          class="origin-top-right absolute right-0 mt-2 rounded shadow bg-white flex flex-col w-28 z-10"
        >
          <button
            class="focus:outline-none flex items-center text-sm p-2 space-x-2"
            @click="menuClickHandler('copy')"
          >
            <DocumentDuplicateIcon />
            <span>Copy set</span>
          </button>
          <button
            class="focus:outline-none flex items-center text-sm p-2 space-x-2"
            @click="menuClickHandler('share')"
          >
            <ShareIcon />
            <span>Copy link</span>
          </button>
        </div>
      </div>
    </div>
    <div class="p-2">
      <SkillsCard :set="set" class="rounded p-2 border border-gray-400 text-sm" />
    </div>
    <div class="overflow-y-auto list-items px-2">
      <div v-for="(label, type) in equipmentTypes" :key="type" class="mb-2 last:mb-0">
        <div v-if="set[type]" class="relative mt-4">
          <WeaponCard
            v-if="type === 'weapon'"
            :item="set[type]"
          />
          <TalismanCard
            v-else-if="type === 'talisman'"
            :item="set[type]"
          />
          <ArmorCard
            v-else
            :item="set[type]"
          />
        </div>
        <div v-else class="bg-gray-200 text-gray-600 rounded block w-full p-2 text-sm">
          {{ label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SkillsCard from './SkillsCard'
import WeaponCard from './WeaponCard'
import TalismanCard from './TalismanCard'
import ArmorCard from './ArmorCard'
import DotsVerticalIcon from './icons/DotsVerticalIcon'
import DocumentDuplicateIcon from './icons/DocumentDuplicateIcon'
import ShareIcon from './icons/ShareIcon'
import config from '~/app.config'

export default {
  name: 'BuildList',
  components: { ShareIcon, DocumentDuplicateIcon, DotsVerticalIcon, ArmorCard, TalismanCard, WeaponCard, SkillsCard },
  props: {
    set: {
      type: Object,
      required: true
    },
    readOnly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      showMenu: false
    }
  },
  computed: {
    equipmentTypes () {
      return config.equipmentTypes
    }
  },
  methods: {
    clickOutsideMenuHandler () {
      this.showMenu = false
    },
    menuClickHandler (menu) {
      this.showMenu = false
      this.$emit(`click:${menu}`)
    }
  }
}
</script>

<style scoped>

</style>
