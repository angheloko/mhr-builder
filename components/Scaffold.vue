<template>
  <div class="flex flex-col">
    <AppBar class="h-12">
      <template #navigation>
        <button @click="showDrawer = true">
          <MenuIcon />
        </button>
      </template>
      <button
        class="border border-blue-600 text-blue-600 font-medium text-sm px-4 rounded h-8 mr-2"
        @click="showRandomizer = true"
      >
        Random
      </button>
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
    <div class="flex-grow main">
      <slot />
    </div>
    <GeneratorModal
      v-if="showGenerator"
      @close="closeGenerator"
    />
    <RandomizerModal
      v-if="showRandomizer"
      @close="closeRandomizer"
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
      showRandomizer: false,
      showDrawer: false
    }
  },
  methods: {
    closeGenerator () {
      this.showGenerator = false
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }
    },
    closeRandomizer () {
      this.showRandomizer = false
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' })
      }
    }
  }
}
</script>

<style scoped>
.main {
  height: calc(100vh - 3rem);
}
</style>
