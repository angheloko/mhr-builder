<template>
  <div class="rounded border shadow flex flex-col w-full bg-white text-sm py-2">
    <div class="pb-2 px-1 border-b grid place-items-center">
      <h4 class="font-medium text-center">
        Talisman
      </h4>
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
  name: 'TalismanCard',
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
