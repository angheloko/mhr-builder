<template>
  <div class="rounded border shadow flex flex-col w-full bg-white text-sm py-2">
    <div class="pb-2 px-1 border-b grid place-items-center">
      <h4 class="font-medium text-center">
        Talisman
      </h4>
    </div>
    <CardDecorations
      :can-decorate="canDecorate"
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
  name: 'TalismanCard',
  components: { SkillsList, CardDecorations },
  props: {
    item: {
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
