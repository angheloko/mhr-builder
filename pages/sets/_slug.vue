<template>
  <Canvas>
    <div class="flex flex-col h-full w-60 flex-none rounded bg-gray-300 mr-2 pb-4">
      <h1>
        {{ content.title }}
      </h1>
      <div>
        {{ content.description }}
      </div>
    </div>
    <BuildList
      v-for="(set, index) of content.sets"
      :key="index"
      :set="set"
    >
      <div class="p-2 text-right">
        <div
          class="relative"
        >
          <button
            class="focus:outline-none"
            @click.stop="showMenu = index"
          >
            <DotsVerticalIcon />
          </button>
          <div
            v-if="showMenu === index"
            v-click-outside="hideMenu"
            class="origin-top-right absolute right-0 mt-2 rounded shadow bg-white flex flex-col w-28 z-10"
          >
            <button
              class="focus:outline-none flex items-center text-sm p-2 space-x-2"
              @click="copy(index)"
            >
              <DocumentDuplicateIcon />
              <span>Copy set</span>
            </button>
            <button
              class="focus:outline-none flex items-center text-sm p-2 space-x-2"
              @click="share(index)"
            >
              <ShareIcon />
              <span>Copy link</span>
            </button>
          </div>
        </div>
      </div>
    </BuildList>
  </Canvas>
</template>

<script>
import BuildList from '../../components/BuildList'
import Canvas from '../../components/Canvas'
import DotsVerticalIcon from '../../components/icons/DotsVerticalIcon'
import DocumentDuplicateIcon from '../../components/icons/DocumentDuplicateIcon'
import ShareIcon from '../../components/icons/ShareIcon'
import createLink from '../../common/createLink'

export default {
  components: { ShareIcon, DocumentDuplicateIcon, DotsVerticalIcon, Canvas, BuildList },
  async asyncData ({
    $content,
    params
  }) {
    const content = await $content('sets', params.slug).fetch()

    return {
      content
    }
  },
  data () {
    return {
      showMenu: -1
    }
  },
  methods: {
    hideMenu () {
      this.showMenu = -1
    },
    copy (index) {
      console.log(this.content.sets[index], index)
    },
    share (index) {
      const url = createLink(this.content.sets[index])
      this.$emitter.emit('snackbar', url)
    }
  }
}
</script>

<style scoped>

</style>
