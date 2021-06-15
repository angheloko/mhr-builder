<template>
  <div class="rounded border shadow flex flex-col w-full bg-white text-sm py-2">
    <div class="pb-2 px-1 border-b grid place-items-center">
      <h4 class="font-medium text-center">
        {{ value.name }}
      </h4>
    </div>
    <div class="text-center border-b p-1">
      <div class="font-light text-xs pb-1">
        Defense
      </div>
      <div>
        {{ value.baseDefense }}
      </div>
    </div>
    <div class="text-center border-b p-1">
      <div class="font-light text-xs pb-1">
        Resistance
      </div>
      <div class="flex flex-wrap justify-center">
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ value.fireResistance }}
          </div>
          <div class="font-light text-xs">
            Fire
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ value.waterResistance }}
          </div>
          <div class="font-light text-xs">
            Water
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ value.iceResistance }}
          </div>
          <div class="font-light text-xs">
            Ice
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ value.thunderResistance }}
          </div>
          <div class="font-light text-xs">
            Thunder
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ value.dragonResistance }}
          </div>
          <div class="font-light text-xs">
            Dragon
          </div>
        </div>
      </div>
    </div>
    <CardDecorations
      :can-decorate="canDecorate"
      :slots="value.slots"
      :decorations="value.decorations"
      @click:slot="$emit('click:slot', $event)"
      @remove="$emit('undecorate', $event)"
    />
    <SkillsList :skills="value.skills" />
  </div>
</template>

<script>
import CardDecorations from './CardDecorations'
import SkillsList from './SkillsList'
export default {
  name: 'ArmorCard',
  components: { SkillsList, CardDecorations },
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
