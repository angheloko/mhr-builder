<template>
  <portal to="modal">
    <div
      v-show="status"
      class="absolute z-10 inset-0 md:fixed md:overflow-hidden"
    >
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
        <div
          class="fixed inset-0 bg-white md:bg-gray-500 md:bg-opacity-75 md:transition-opacity"
          @click="close"
        />

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
          <div class="h-12 p-2 flex items-center space-x-2">
            <button @click="close">
              <CloseIcon />
            </button>
            <div>
              {{ title }}
            </div>
          </div>
          <div class="modal__body flex-grow overflow-y-auto">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import CloseIcon from './icons/CloseIcon'

export default {
  name: 'Modal',
  components: { CloseIcon },
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: 'w-4/5'
    },
    height: {
      type: String,
      default: 'h-4/5'
    }
  },
  computed: {
    ...mapGetters({
      status: 'modal/status'
    })
  },
  mounted () {
    this.show()
  },
  methods: {
    ...mapMutations({
      show: 'modal/show',
      hide: 'modal/hide'
    }),
    close () {
      this.hide()
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.modal__body {
  height: calc(100vh - 3rem);
}
</style>
