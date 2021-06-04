<template>
  <div class="rounded bg-gray-300 pb-4">
    <div class="p-2">
      <SkillsCard :set="set" class="rounded bg-gray-300 text-gray-600 p-2 text-sm" />
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
          <button class="text-sm bg-red-400 text-red-800 shadow rounded-full absolute -top-2 -right-2 p-1 h-6 w-6" @click="removeEquipment(type, index)">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <button v-else class="bg-gray-200 text-gray-600 rounded block w-full p-2 text-sm">
          {{ label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SkillsCard from './SkillsCard'
import WeaponCard from './WeaponCard'
import TalismanCard from './TalismanCard'
import ArmorCard from './ArmorCard'
export default {
  name: 'BuildList',
  components: { ArmorCard, TalismanCard, WeaponCard, SkillsCard },
  props: {
    set: {
      type: Object,
      required: true
    }
  },
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
      }
    }
  }
}
</script>

<style scoped>

</style>
