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
      @click-slot="$emit('click-slot', $event)"
      @remove-decoration="$emit('remove-decoration', $event)"
    />
    <div class="text-center p-1 flex-grow">
      <div class="font-light text-xs p-1">
        Skills
      </div>
      <div>
        <ul v-if="item.skills.length > 0">
          <li v-for="(skill, skillIndex) of item.skills" :key="skillIndex">
            {{ skill.name }} Lv {{ skill.level }}
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
  name: 'TalismanCard',
  components: { CardDecorations },
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
