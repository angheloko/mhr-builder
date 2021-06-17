<template>
  <Scaffold>
    <div class="h-24 px-4">
      <div class="text-xs mb-1">
        <NuxtLink to="/sets" class="text-blue-600 font-medium">
          Community sets
        </NuxtLink>
      </div>
      <h1 class="text-lg mb-2 whitespace-nowrap overflow-hidden overflow-ellipsis">
        {{ content.title }}
      </h1>
      <div class="text-sm overflow-hidden overflow-ellipsis">
        {{ content.description }}
      </div>
    </div>
    <Builder
      class="builder px-4 py-2"
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
  height: calc(100vh - 9rem);
}
</style>
