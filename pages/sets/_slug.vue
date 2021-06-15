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
    <Builder
      class="builder"
      :value="content.sets"
    />
  </Scaffold>
</template>

<script>
import Scaffold from '~/components/Scaffold'
import Builder from '~/components/Builder'

export default {
  components: { Builder, Scaffold },
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
.builder {
  height: calc(100vh - 7rem);
}
</style>
