<template>
  <Modal
    width="w-1/2"
    height="h-1/2"
    @close="$emit('close')"
  >
    <div class="grid place-items-center">
      <div class="w-full p-2 md:p-4 text-sm">
        <h3 class="text-base mb-1">
          {{ value.name }}
        </h3>
        <div class="mb-1">
          {{ value.description }}
        </div>
        <ul class="my-2 border rounded">
          <li
            v-for="(level, index) of value.levels"
            :key="index"
            class="flex mb-1 border-b last:border-none p-2"
          >
            <div class="pr-2 flex-none">
              Lv {{ index + 1 }}:
            </div>
            <div class="flex-auto">
              {{ level }}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  name: 'SkillInfoModal',
  components: { Modal },
  props: {
    value: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
