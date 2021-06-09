<template>
  <div class="absolute z-10 inset-0 md:fixed md:overflow-hidden">
    <div class="text-center block min-h-full h-full md:h-screen">
      <!--
        Background overlay, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0"
          To: "opacity-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100"
          To: "opacity-0"
      -->
      <div class="fixed inset-0 bg-white md:bg-gray-500 md:bg-opacity-75 md:transition-opacity" @click="$emit('close')" />

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden md:inline-block md:align-middle md:h-screen">&#8203;</span>

      <!--
        Modal panel, show/hide based on modal state.

        Entering: "ease-out duration-300"
          From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          To: "opacity-100 translate-y-0 sm:scale-100"
        Leaving: "ease-in duration-200"
          From: "opacity-100 translate-y-0 sm:scale-100"
          To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      -->
      <div
        class="h-screen w-full bg-white text-left transform transition-all align-bottom inline-flex flex-col md:max-w-screen-sm md:rounded-lg md:align-middle md:shadow-xl"
        :class="[ 'md:' + width, 'md:' + height ]"
      >
        <div class="p-2 text-right h-10 flex items-center justify-end">
          <button @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="modal__body flex-grow overflow-y-auto">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    width: {
      type: String,
      default: 'w-4/5'
    },
    height: {
      type: String,
      default: 'h-4/5'
    }
  }
}
</script>

<style scoped>
.modal__body {
  height: calc(100vh - 2.5rem);
}
</style>
