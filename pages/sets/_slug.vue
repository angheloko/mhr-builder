<template>
  <Scaffold>
    <div class="flex flex-col h-full">
      <div class="px-4">
        <div class="text-xs mb-1">
          <NuxtLink to="/sets" class="text-blue-600 font-medium">
            Community sets
          </NuxtLink>
        </div>
        <h1 class="text-lg whitespace-nowrap overflow-hidden overflow-ellipsis">
          {{ content.title }}
        </h1>
        <div v-if="content.author" class="text-xs">
          by
          <a v-if="content.authorUrl" :href="content.authorUrl" class="text-blue-600 cursor-pointer">
            {{ content.author }}
          </a>
          <span v-else class="font-medium">
            {{ content.author }}
          </span>
        </div>
        <div class="my-4 text-sm">
          {{ content.description }}
        </div>
      </div>
      <Builder
        class="flex-grow px-4 py-2"
        :value="content.sets"
      />
    </div>
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
    return {
      title: this.content.title,
      link: [
        {
          rel: 'canonical',
          href: `https://mhr-builder.com/sets/${this.content.slug}`
        }
      ],
      meta: [
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

</style>
