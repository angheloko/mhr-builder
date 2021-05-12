<template>
  <Modal @close="$emit('close')">
    <Search
      @search="debouncedSearch"
    >
      <div v-if="results.length === 0" class="grid place-items-center h-full">
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
          No decorations found.
        </template>
      </div>
      <div v-else class="grid grid-cols-3 gap-3 p-2 sm:grid-cols-4">
        <div
          v-for="item of results"
          :key="item.slug"
          class="border rounded shadow p-2"
          :class="{'border-blue-600': selected === item.slug}"
          @click="selectItem(item)"
        >
          <div class="font-medium text-sm">
            {{ item.name }}
          </div>
          <div class="text-xs">
            {{ item.skill }}
          </div>
        </div>
      </div>
    </Search>
  </Modal>
</template>

<script>
import { cloneDeep, debounce } from 'lodash'
import Modal from './Modal'
import Search from './Search'

export default {
  name: 'SetDecorationModal',
  components: { Search, Modal },
  props: {
    level: {
      type: Number,
      required: true
    },
    selected: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      results: [],
      isLoading: true
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', cloneDeep(item))
    },
    debouncedSearch: debounce(function (keywords, filters) {
      this.search(keywords, filters)
    }, 500),
    search (keywords) {
      let queryBuilder = this.$content('decorations')
        .where({
          level: this.level
        })
        .sortBy('name')

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
