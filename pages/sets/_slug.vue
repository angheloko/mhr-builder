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
        :index="index"
        :value="set"
      />
    </Canvas>
  </Scaffold>
</template>

<script>
import BuildList from '~/components/BuildList'
import Canvas from '~/components/Canvas'
import Scaffold from '~/components/Scaffold'

export default {
  components: { Scaffold, Canvas, BuildList },
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
  }
}
</script>

<style scoped>
.canvas {
  height: calc(100vh - 7rem);
}
</style>
