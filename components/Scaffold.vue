<template>
  <div class="flex flex-col">
    <AppBar>
      <template #navigation>
        <button @click="showDrawer = true">
          <MenuIcon />
        </button>
      </template>
      <button
        class="bg-blue-600 text-white font-medium text-sm py-0 px-4 rounded ring h-8"
        @click="showGenerator = true"
      >
        Generate
      </button>
    </AppBar>
    <NavigationDrawer
      v-show="showDrawer"
      @close="showDrawer = false"
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
import NavigationDrawer from './NavigationDrawer'
import MenuIcon from './icons/MenuIcon'
import GeneratorModal from './GeneratorModal'

export default {
  name: 'Scaffold',
  components: { GeneratorModal, MenuIcon, NavigationDrawer, AppBar },
  data () {
    return {
      showGenerator: false,
      showDrawer: false
    }
  }
}
</script>

<style scoped>

</style>
