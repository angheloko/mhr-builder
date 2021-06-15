<template>
  <div class="rounded border shadow flex flex-col w-full bg-white text-sm py-2">
    <div class="pb-2 px-1 border-b grid place-items-center">
      <h4 class="font-medium text-center">
        {{ value.name }}
      </h4>
    </div>
    <div class="text-center border-b p-1 grid grid-cols-3">
      <div class="p-1 border-r">
        <div class="font-light text-xs mb-1">
          Attack
        </div>
        <div>
          {{ value.attack }}
        </div>
      </div>
      <div class="p-1 border-r">
        <div class="font-light text-xs mb-1">
          Affinity
        </div>
        <div>
          {{ value.affinity }}
        </div>
      </div>
      <div class="p-1">
        <div class="font-light text-xs mb-1">
          Defense
        </div>
        <div>
          {{ value.defense }}
        </div>
      </div>
    </div>
    <div class="text-center border-b p-1">
      <div class="font-light text-xs pb-1">
        Element
      </div>
      <div v-if="value.element.length > 0" class="flex flex-wrap justify-center">
        <div
          v-for="(element, elementIndex) of value.element"
          :key="elementIndex"
          class="w-1/2 sm:w-1/3 p-1 flex-initial"
        >
          <div>
            {{ element.attack }}
          </div>
          <div class="font-light text-xs">
            {{ element.type }}
          </div>
        </div>
      </div>
      <div v-else class="italic">
        None
      </div>
    </div>
    <CardDecorations
      :can-decorate="canDecorate"
      :slots="value.slots"
      :decorations="value.decorations"
      @click:slot="$emit('click:slot', $event)"
      @remove="$emit('undecorate', $event)"
    />
    <div class="text-center p-1 flex-grow">
      <div class="font-light text-xs pb-1">
        Rampage skills
      </div>
      <div>
        <ul v-if="value.rampSkills">
          <li v-for="(skill, skillIndex) of value.rampSkills" :key="skillIndex">
            {{ skill }}
          </li>
        </ul>
        <div v-else class="italic">
          None
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardDecorations from './CardDecorations'

export default {
  name: 'WeaponCard',
  components: { CardDecorations },
  props: {
    value: {
      type: Object,
      required: true
    },
    canDecorate: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
