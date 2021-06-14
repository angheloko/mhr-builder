<template>
  <div class="rounded border shadow flex flex-col w-full bg-white text-sm py-2">
    <div class="pb-2 px-1 border-b grid place-items-center">
      <h4 class="font-medium text-center">
        {{ item.name }}
      </h4>
    </div>
    <div class="text-center border-b p-1">
      <div class="font-light text-xs pb-1">
        Defense
      </div>
      <div>
        {{ item.baseDefense }}
      </div>
    </div>
    <div class="text-center border-b p-1">
      <div class="font-light text-xs pb-1">
        Resistance
      </div>
      <div class="flex flex-wrap justify-center">
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ item.fireResistance }}
          </div>
          <div class="font-light text-xs">
            Fire
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ item.waterResistance }}
          </div>
          <div class="font-light text-xs">
            Water
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ item.iceResistance }}
          </div>
          <div class="font-light text-xs">
            Ice
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ item.thunderResistance }}
          </div>
          <div class="font-light text-xs">
            Thunder
          </div>
        </div>
        <div class="w-1/3 p-1 flex-initial">
          <div>
            {{ item.dragonResistance }}
          </div>
          <div class="font-light text-xs">
            Dragon
          </div>
        </div>
      </div>
    </div>
    <CardDecorations
      :can-decorate="canDecorate"
      :can-click-skill="canClickSkill"
      :slots="item.slots"
      :decorations="item.decorations"
      @click:slot="$emit('click:slot', $event)"
      @click:skill="$emit('click:skill', $event)"
      @remove:decoration="$emit('remove:decoration', $event)"
    />
    <SkillsList :skills="item.skills" />
  </div>
</template>

<script>
import CardDecorations from './CardDecorations'
import SkillsList from './SkillsList'
export default {
  name: 'ArmorCard',
  components: { SkillsList, CardDecorations },
  props: {
    item: {
      type: Object,
      required: true
    },
    canDecorate: {
      type: Boolean,
      default: false
    },
    canClickSkill: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    decorations () {
      return this.item.decorations
        ? this.item.decorations.filter(value => value)
        : [null, null, null]
    }
  }
}
</script>

<style scoped>
</style>
