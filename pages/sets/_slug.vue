<template>
  <Scaffold>
    <div class="h-16 px-2 flex flex-col">
      <h1 class="text-lg whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ content.title }}
      </h1>
      <div class="text-sm h-9 overflow-hidden overflow-ellipsis flex-grow">
        {{ content.description }}
      </div>
    </div>
    <Canvas class="canvas">
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
  </Scaffold>
</template>

<script>
import createLink from '~/common/createLink'
import BuildList from '~/components/BuildList'
import Canvas from '~/components/Canvas'
import Snackbar from '~/components/Snackbar'
import Scaffold from '~/components/Scaffold'

export default {
  components: { Scaffold, Snackbar, Canvas, BuildList },
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
  head () {
    const url = `https://donlalicon.dev/blog/${this.content.slug}`

    return {
      title: this.content.title,
      link: [
        {
          rel: 'canonical',
          href: url
        }
      ],
      meta: [
        {
          hid: 'og:url',
          name: 'og:url',
          property: 'og:url',
          content: url
        },
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: `${this.content.title} - Monster Hunter Rise Set Builder`
        },
        {
          hid: 'description',
          name: 'description',
          content: this.content.description
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: this.content.description
        }
      ]
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
.canvas {
  height: calc(100vh - 7rem);
}
</style>
