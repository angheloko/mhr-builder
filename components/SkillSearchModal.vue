<template>
  <Modal
    title="Skills"
    @close="$emit('close')"
  >
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
      <div v-else class="px-4 py-2 space-y-4">
        <div v-for="item of results" :key="item.slug" class="rounded border shadow">
          <div class="p-2 border-b font-medium">
            {{ item.name }}
          </div>
          <div class="p-2 border-b">
            {{ item.description }}
          </div>
          <ul>
            <li
              v-for="(description, index) of item.levels"
              :key="index"
              class="flex mb-1 border-b last:border-none p-2 items-center"
            >
              <div class="pr-2 flex-none font-light text-xs uppercase">
                Lv {{ index + 1 }}:
              </div>
              <div class="flex-auto text-sm">
                {{ description }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </Search>
  </Modal>
</template>

<script>
import { debounce } from 'lodash'
import Search from './Search'
import Modal from './Modal'

export default {
  name: 'SkillSearchModal',
  components: { Modal, Search },
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
      let queryBuilder = this.$content('skills').sortBy('name')

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
