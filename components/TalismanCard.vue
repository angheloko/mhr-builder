<template>
  <div class="rounded border shadow flex flex-col w-full bg-white text-sm py-2">
    <div class="pb-2 px-1 border-b grid place-items-center">
      <h4 class="font-medium text-center">
        Talisman
      </h4>
    </div>
    <CardDecorations
      :slots="value.slots"
      :decorations="value.decorations"
      :read-only="readOnly"
      @add="$emit('decorate', $event)"
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
    readOnly: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>

</style>
