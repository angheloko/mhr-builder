<template>
  <div class="flex flex-col h-full">
    <div class="px-4 py-2 border-b shadow">
      <input
        id="search"
        v-model="keywords"
        type="text"
        placeholder="Search"
        class="w-full rounded border-gray-300 text-sm p-2 mb-2"
        @input="search"
      >
      <div class="sm:flex sm:justify-start">
        <Dropdown
          v-for="filter of filterGroup"
          :key="filter.type"
          :label="filter.label"
          :required="filter.required || false"
          :options="filter.options"
          :value="activeFilters[filter.type]"
          class="mb-2 w-full sm:mr-2 last:mr-0 sm:w-52 sm:mb-0"
          @update="selectFilter(filter.type, $event)"
        />
      </div>
    </div>
    <div class="flex-grow overflow-y-auto overflow-x-hidden">
      <slot />
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import Dropdown from './Dropdown'

export default {
  name: 'Search',
  components: { Dropdown },
  props: {
    filters: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      keywords: '',
      activeFilters: {}
    }
  },
  computed: {
    filterGroup () {
      const items = []

      for (const key in this.filters) {
        items.push({
          type: key,
          ...this.filters[key]
        })
      }

      return items
    }
  },
  mounted () {
    for (const key in this.filters) {
      this.activeFilters[key] = ''
    }
    this.search()
  },
  methods: {
    selectFilter (type, value) {
      this.activeFilters[type] = value
      this.search()
    },
    search () {
      this.$emit('search', this.keywords, cloneDeep(this.activeFilters))
    }
  }
}
</script>

<style scoped>

</style>
