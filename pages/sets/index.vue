<template>
  <Scaffold>
    <div class="p-4 max-w-screen-sm m-auto">
      <div class="mb-4">
        <h1 class="text-xl mb-2">
          Community sets
        </h1>
        <div>
          A showcase of fun and creative builds from the community.
        </div>
      </div>
      <div
        v-for="doc of result"
        :key="doc.slug"
        class="px-2 py-4 border rounded shadow mb-4"
      >
        <NuxtLink :to="`/sets/${doc.slug}`">
          <h2>
            {{ doc.title }}
          </h2>
        </NuxtLink>
        <div v-if="doc.author" class="text-xs">
          by
          <a v-if="doc.authorUrl" :href="doc.authorUrl" class="text-blue-600 cursor-pointer">
            {{ doc.author }}
          </a>
          <span v-else class="font-medium">
            {{ doc.author }}
          </span>
        </div>
        <div class="text-sm my-2">
          {{ doc.description }}
        </div>
      </div>
    </div>
  </Scaffold>
</template>

<script>
import Scaffold from '../../components/Scaffold'

export default {
  name: 'Index',
  components: { Scaffold },
  async asyncData ({ $content }) {
    const result = await $content('sets').sortBy('createdAt', 'desc').fetch()
    return {
      result
    }
  },
  head () {
    return {
      title: 'Community sets',
      link: [
        {
          rel: 'canonical',
          href: 'https://mhr-builder.com/sets'
        }
      ],
      meta: [
        {
          hid: 'og:title',
          name: 'og:title',
          property: 'og:title',
          content: 'Community sets - Monster Hunter Rise Set Builder'
        },
        {
          hid: 'description',
          name: 'description',
          content: 'A showcase of fun and creative builds from the community.'
        },
        {
          hid: 'og:description',
          name: 'og:description',
          property: 'og:description',
          content: 'A showcase of fun and creative builds from the community.'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
