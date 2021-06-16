<template>
  <div class="flex flex-col h-full w-60 flex-none rounded bg-gray-300 pb-4">
    <div class="p-2 text-right">
      <div class="relative">
        <button
          class="focus:outline-none"
          @click.stop="showMenu = !showMenu"
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
          <button
            v-if="!readOnly"
            class="focus:outline-none flex items-center text-sm p-2 space-x-2 text-red-600"
            @click="menuClickHandler('delete')"
          >
            <TrashIcon />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
    <div class="p-2">
      <SkillsCard :set="value" class="rounded p-2 border border-gray-400 text-sm" />
    </div>
    <div class="overflow-y-auto px-2">
      <div v-for="(label, type) in equipmentTypes" :key="type" class="mb-2 last:mb-0">
        <div v-if="value[type]" class="relative mt-4">
          <WeaponCard
            v-if="type === 'weapon'"
            :value="value[type]"
            :read-only="readOnly"
            @decorate="addDecoration(type, $event)"
            @undecorate="removeDecoration(type, $event)"
          />
          <TalismanCard
            v-else-if="type === 'talisman'"
            :value="value[type]"
            :read-only="readOnly"
            @decorate="addDecoration(type, $event)"
            @undecorate="removeDecoration(type, $event)"
          />
          <ArmorCard
            v-else
            :value="value[type]"
            :read-only="readOnly"
            @decorate="addDecoration(type, $event)"
            @undecorate="removeDecoration(type, $event)"
          />
          <button
            v-if="!readOnly"
            class="text-sm absolute -top-1 -right-1 text-white bg-red-400 rounded-full h-4 w-4 p-0.5"
            @click="removeEquipment(type)"
          >
            <XIcon class="w-3 h-3" />
          </button>
        </div>
        <template v-else>
          <div v-if="readOnly" class="bg-gray-200 text-gray-600 rounded block w-full p-2 text-sm">
            {{ label }}
          </div>
          <button
            v-else
            class="bg-gray-200 text-gray-600 rounded block w-full p-2 text-sm focus:outline-none"
            @click="showEquipmentModal(type)"
          >
            Add {{ label }}
          </button>
        </template>
      </div>
    </div>
    <AddWeaponModal
      v-if="showModal === modalTypes.weapons"
      @select="addEquipment"
      @close="closeModal"
    />
    <AddArmorModal
      v-if="showModal === modalTypes.armors"
      :type="equipmentType"
      @select="addEquipment"
      @close="closeModal"
    />
    <AddTalismanModal
      v-if="showModal === modalTypes.talisman"
      @input="addEquipment"
      @close="closeModal"
    />
    <Snackbar
      v-if="shareUrl"
      @close="shareUrl = ''"
    >
      <a :href="shareUrl" class="font-medium text-yellow-400">Link</a> copied to clipboard.
    </Snackbar>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import config from '~/app.config'
import createLink from '~/common/create-link'
import SkillsCard from '~/components/SkillsCard'
import WeaponCard from '~/components/WeaponCard'
import TalismanCard from '~/components/TalismanCard'
import ArmorCard from '~/components/ArmorCard'
import AddWeaponModal from '~/components/AddWeaponModal'
import AddArmorModal from '~/components/AddArmorModal'
import AddTalismanModal from '~/components/AddTalismanModal'
import Snackbar from '~/components/Snackbar'
import DotsVerticalIcon from '~/components/icons/DotsVerticalIcon'
import DocumentDuplicateIcon from '~/components/icons/DocumentDuplicateIcon'
import ShareIcon from '~/components/icons/ShareIcon'
import TrashIcon from '~/components/icons/TrashIcon'
import XIcon from '~/components/icons/XIcon'

export default {
  name: 'BuildList',
  components: { AddTalismanModal, AddArmorModal, AddWeaponModal, TrashIcon, Snackbar, ShareIcon, DocumentDuplicateIcon, DotsVerticalIcon, XIcon, ArmorCard, TalismanCard, WeaponCard, SkillsCard },
  props: {
    index: {
      type: Number,
      required: true
    },
    value: {
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
      showMenu: false,
      shareUrl: '',
      equipmentType: '',
      showModal: '',
      modalTypes: {
        weapons: 'weapons',
        armors: 'armors',
        talisman: 'talisman'
      }
    }
  },
  computed: {
    equipmentTypes () {
      return config.equipmentTypes
    }
  },
  methods: {
    ...mapMutations({
      equip: 'sets/equip',
      unequip: 'sets/unequip',
      decorate: 'sets/decorate',
      undecorate: 'sets/undecorate',
      removeSet: 'sets/remove'
    }),
    addEquipment (item) {
      this.closeModal()

      this.equip({
        index: this.index,
        type: this.equipmentType,
        item
      })
    },
    removeEquipment (type) {
      this.unequip({
        index: this.index,
        type
      })
    },
    addDecoration (type, { slot, decoration }) {
      this.decorate({
        index: this.index,
        type,
        slot,
        decoration
      })
    },
    removeDecoration (type, slot) {
      this.undecorate({
        index: this.index,
        type,
        slot
      })
    },
    showEquipmentModal (type) {
      this.equipmentType = type

      if (type === 'weapon') {
        this.showModal = this.modalTypes.weapons
      } else if (type === 'talisman') {
        this.showModal = this.modalTypes.talisman
      } else {
        this.showModal = this.modalTypes.armors
      }
    },
    closeModal () {
      this.showModal = ''
    },
    clickOutsideMenuHandler () {
      this.showMenu = false
    },
    menuClickHandler (menu) {
      this.showMenu = false

      switch (menu) {
        case 'copy':
          this.copyHandler()
          break
        case 'share':
          this.shareHandler()
          break
        case 'delete':
          this.deleteHandler()
      }

      this.$emit(`click:${menu}`)
    },
    copyHandler () {
      // @todo Copy set to own set
    },
    shareHandler () {
      const url = createLink(this.value)
      navigator.clipboard.writeText(url)
        .then(() => {
          this.shareUrl = url
        })
    },
    deleteHandler () {
      this.removeSet(this.index)
    }
  }
}
</script>

<style scoped>

</style>
