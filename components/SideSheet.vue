<template>
  <div class="absolute z-10 inset-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="$emit('close')" />
    <div class="absolute w-4/5 md:w-80 bg-white h-screen right-0 flex flex-col">
      <div class="p-2 h-12 flex items-center justify-between">
        <div>
          {{ heading }}
        </div>
        <button @click="$emit('close')">
          <CloseIcon />
        </button>
      </div>
      <div class="p-2 flex-grow">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import CloseIcon from './icons/CloseIcon'
export default {
  name: 'SideSheet',
  components: { CloseIcon },
  props: {
    heading: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
