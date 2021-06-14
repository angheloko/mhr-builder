<template>
  <Canvas>
    <BuildList
      v-for="(set, index) of content.sets"
      :key="index"
      :set="set"
      @click:copy="copy(index)"
      @click:share="share(index)"
    />
    <Snackbar
      v-if="setUrl"
      @close="setUrl = ''"
    >
      <a :href="setUrl" class="font-medium text-yellow-400">Link</a> copied to clipboard.
    </Snackbar>
  </Canvas>
</template>

<script>
import BuildList from '~/components/BuildList'
import Canvas from '~/components/Canvas'
import createLink from '~/common/createLink'
import Snackbar from '~/components/Snackbar'

export default {
  components: { Snackbar, Canvas, BuildList },
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
      setUrl: ''
    }
  },
  methods: {
    copy (index) {
      // @todo Copy set to own set
    },
    share (index) {
      const url = createLink(this.content.sets[index])
      navigator.clipboard.writeText(url)
        .then(() => {
          this.setUrl = url
        })
    }
  }
}
</script>

<style scoped>

</style>
