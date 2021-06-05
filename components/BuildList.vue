<template>
  <div class="rounded bg-gray-300 pb-4">
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
