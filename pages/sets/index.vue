<template>
  <Scaffold>
    <div class="p-4 max-w-screen-sm m-auto">
      <div class="mb-4">
        <h1 class="text-xl mb-2">
          Community sets
        </h1>
        <div>
          A showcase of fun and creative sets from the community.
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
          <template v-else>
            {{ doc.author }}
          </template>
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
  }
}
</script>

<style scoped>

</style>
