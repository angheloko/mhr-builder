<template>
  <div class="builder flex items-start overflow-x-auto p-2">
    <AddWeaponModal
      v-if="showModal === 'weapon'"
      @close="closeModal"
      @select="addEquipment"
    />
    <AddArmorModal
      v-if="showModal === 'armors'"
      :type="equipmentType"
      @close="closeModal"
      @select="addEquipment"
    />
    <AddTalismanModal
      v-if="showModal === 'talisman'"
      @close="closeModal"
      @input="addEquipment"
    />
    <SetDecorationModal
      v-if="showModal === 'decorations'"
      :level="decorationLevel"
      :selected="currentDecoration"
      @close="closeModal"
      @select="setDecoration"
    />
    <div v-for="(set, index) in sets" :key="index" class="flex flex-col h-full w-60 flex-none rounded bg-gray-300 mr-2 pb-4">
      <div class="text-right">
        <button class="text-sm p-1 h-6 w-6" @click="removeSet(index)">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-2">
        <SkillsCard :set="set" class="rounded bg-gray-300 text-gray-600 p-2 text-sm" />
      </div>
      <div class="overflow-y-auto list-items px-2">
        <div v-for="(label, type) in equipmentTypes" :key="type" class="mb-2 last:mb-0">
          <div v-if="set[type]" class="relative mt-4">
            <WeaponCard
              v-if="type === 'weapon'"
              :item="set[type]"
              :can-decorate="true"
              class="flex-grow"
              @click-slot="showDecorationsModal(type, index, $event)"
              @remove-decoration="removeDecoration(type, index, $event)"
            />
            <TalismanCard
              v-else-if="type === 'talisman'"
              :item="set[type]"
              :can-decorate="true"
              class="flex-grow"
              @click-slot="showDecorationsModal(type, index, $event)"
              @remove-decoration="removeDecoration(type, index, $event)"
            />
            <ArmorCard
              v-else
              :item="set[type]"
              :can-decorate="true"
              class="flex-grow"
              @click-slot="showDecorationsModal(type, index, $event)"
              @remove-decoration="removeDecoration(type, index, $event)"
            />
            <button class="text-sm bg-red-400 text-red-800 shadow rounded-full absolute -top-2 -right-2 p-1 h-6 w-6" @click="removeEquipment(type, index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button v-else class="bg-gray-200 text-gray-600 rounded block w-full p-2 text-sm" @click="showEquipmentModal(type, index)">
            Add {{ label }}
          </button>
        </div>
      </div>
    </div>
    <button class="w-60 flex-none rounded bg-gray-300 p-2 text-sm" @click="addNewSet">
      Add new set
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AddArmorModal from './AddArmorModal'
import SetDecorationModal from './SetDecorationModal'
import AddWeaponModal from './AddWeaponModal'
import WeaponCard from './WeaponCard'
import ArmorCard from './ArmorCard'
import SkillsCard from './SkillsCard'
import TalismanCard from './TalismanCard'
import AddTalismanModal from './AddTalismanModal'

export default {
  name: 'Builder',
  components: { AddTalismanModal, TalismanCard, SkillsCard, ArmorCard, WeaponCard, AddWeaponModal, SetDecorationModal, AddArmorModal },
  data () {
    return {
      equipmentTypes: {
        talisman: 'Talisman',
        weapon: 'Weapon',
        head: 'Head',
        chest: 'Chest',
        arms: 'Arms',
        waist: 'Waist',
        legs: 'Legs'
      },
      showModal: '',
      equipmentType: '',
      setIndex: 0,
      slot: 0,
      decorationLevel: 0,
      currentDecoration: ''
    }
  },
  computed: {
    ...mapGetters({
      sets: 'sets/sets'
    })
  },
  mounted () {
    this.loadSets()

    if (!this.sets.length) {
      this.addSet(this.newSet())
    }
  },
  methods: {
    ...mapMutations({
      loadSets: 'sets/load',
      addSet: 'sets/add',
      equip: 'sets/equip',
      unequip: 'sets/unequip',
      decorate: 'sets/decorate',
      undecorate: 'sets/undecorate',
      removeSet: 'sets/remove'
    }),
    newSet () {
      const set = {}
      for (const type in this.equipmentTypes) {
        set[type] = null
      }
      return set
    },
    closeModal () {
      this.showModal = ''
    },
    showEquipmentModal (type, index) {
      this.equipmentType = type
      this.setIndex = index

      this.showModal = type === 'weapon' || type === 'talisman'
        ? type
        : 'armors'
    },
    addNewSet () {
      this.addSet(this.newSet())
    },
    addEquipment (item) {
      this.showModal = ''

      this.equip({
        index: this.setIndex,
        type: this.equipmentType,
        item
      })
    },
    removeEquipment (type, index) {
      this.unequip({ index, type })
    },
    showDecorationsModal (type, index, { slot, level, current }) {
      this.equipmentType = type
      this.setIndex = index
      this.slot = slot
      this.decorationLevel = level
      this.currentDecoration = current ?? ''
      this.showModal = 'decorations'
    },
    setDecoration (decoration) {
      this.showModal = ''
      this.decorate({
        index: this.setIndex,
        type: this.equipmentType,
        slot: this.slot,
        decoration
      })
    },
    removeDecoration (type, index, slot) {
      this.undecorate({
        index,
        type,
        slot
      })
    }
  }
}
</script>

<style scoped>
.builder {
  height: calc(100vh - 3rem);
}
</style>
