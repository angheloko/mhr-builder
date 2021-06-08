<template>
  <Search
    @search="debouncedSearch"
  >
    <div v-if="results.length === 0" class="grid place-items-center h-full text-sm">
      <template v-if="isLoading">
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </template>
      <template v-else>
        No skills found.
      </template>
    </div>
    <div v-else class="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
      <div v-for="item of results" :key="item.slug">
        {{ item }}
      </div>
    </div>
  </Search>
</template>

<script>
import { debounce } from 'lodash'
import Search from './Search'

export default {
  name: 'SkillSearch',
  components: { Search },
  data () {
    return {
      results: [],
      isLoading: false
    }
  },
  methods: {
    debouncedSearch: debounce(function (keywords) {
      this.search(keywords)
    }, 500),
    search (keywords) {
      let queryBuilder = this.$content('skills')

      if (keywords) {
        queryBuilder = queryBuilder.search(keywords)
      }

      this.isLoading = true
      queryBuilder.fetch().then((results) => {
        this.results = results
        this.isLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
