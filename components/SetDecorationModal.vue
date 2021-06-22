<template>
  <Modal
    @close="$emit('close')"
  >
    <Search
      :filters="filters"
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
      <div v-else class="grid grid-cols-2 gap-2 p-4 sm:grid-cols-4 sm:gap-4">
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
import Search from './Search'
import Modal from './Modal'
import cleanContent from '~/common/clean-content'

export default {
  name: 'SetDecorationModal',
  components: { Modal, Search },
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
      isLoading: true,
      filters: {
        level: {
          label: 'Level',
          required: true,
          options: []
        }
      }
    }
  },
  mounted () {
    const options = [
      {
        value: 1,
        label: 'Decoration 1'
      },
      {
        value: 2,
        label: 'Decoration 2'
      },
      {
        value: 3,
        label: 'Decoration 3'
      }
    ]
    for (let i = 0; i < options.length; i++) {
      options[i].default = options[i].value === this.level
      if (options[i].value <= this.level) {
        this.filters.level.options.push(options[i])
      }
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('select', cleanContent(cloneDeep(item)))
    },
    debouncedSearch: debounce(function (keywords, filters) {
      this.search(keywords, filters)
    }, 500),
    search (keywords, filters) {
      const defaultLevel = this.filters.level.options.find(el => el.default === true)
      const level = filters.level || defaultLevel?.value

      let queryBuilder = this.$content('decorations')
        .sortBy('name')

      if (keywords) {
        queryBuilder = queryBuilder.search(keywords)
      }

      if (level) {
        queryBuilder.where({
          level
        })
      } else {
        queryBuilder.where({
          level: {
            $lte: this.level
          }
        })
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
