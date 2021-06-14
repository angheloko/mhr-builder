<template>
  <div class="flex flex-col">
    <AppBar>
      <button
        class="bg-blue-600 text-white font-medium text-sm py-0 px-4 rounded ring h-8"
        @click="showGenerator = true"
      >
        Generate
      </button>
      <button @click="showSideSheet = true">
        <MenuIcon />
      </button>
    </AppBar>
    <SideSheet
      v-show="showSideSheet"
      @close="showSideSheet = false"
    />
    <div class="flex-grow">
      <slot />
    </div>
    <GeneratorModal
      v-if="showGenerator"
      @close="showGenerator = false"
    />
  </div>
</template>

<script>
import AppBar from './AppBar'
import SideSheet from './SideSheet'
import MenuIcon from './icons/MenuIcon'
import GeneratorModal from './GeneratorModal'

export default {
  name: 'Scaffold',
  components: { GeneratorModal, MenuIcon, SideSheet, AppBar },
  data () {
    return {
      showGenerator: false,
      showSideSheet: false
    }
  }
}
</script>

<style scoped>

</style>
