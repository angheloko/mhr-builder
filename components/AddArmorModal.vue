<template>
  <Modal
    title="Select armor"
    @close="$emit('close')"
  >
    <Search
      :filters="filters"
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
          No armors found.
        </template>
      </div>
      <div v-else class="grid grid-cols-2 gap-2 p-4 sm:grid-cols-3 sm:gap-4 sm:px-4">
        <div v-for="item of results" :key="item.slug" @click="selectItem(item)">
          <ArmorCard :value="item" class="h-full" />
        </div>
      </div>
    </Search>
  </Modal>
</template>

<script>
import { debounce, cloneDeep, isEmpty } from 'lodash'
import { mapGetters } from 'vuex'
import Search from './Search'
import ArmorCard from './ArmorCard'
import Modal from './Modal'

export default {
  name: 'AddArmorModal',
  components: { Modal, ArmorCard, Search },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      results: [],
      isLoading: true,
      filters: {
        skills: {
          label: 'Skills',
          options: []
        },
        slot: {
          label: 'Slots',
          options: [
            {
              value: '1',
              label: 'Decoration 1'
            },
            {
              value: '2',
              label: 'Decoration 2'
            },
            {
              value: '3',
              label: 'Decoration 3'
            }
          ]
        },
        sort: {
          label: 'Sort by',
          required: true,
          options: [
            {
              value: 'name',
              label: 'Name',
              order: 'asc'
            },
            {
              value: 'maxDefense',
              label: 'Defense',
              order: 'desc'
            }
          ]
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      skills: 'skills/skills'
    }),
    resourceName () {
      return `${this.type}-armors`
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      for (const skill of this.skills) {
        this.filters.skills.options.push({
          value: skill.slug,
          label: skill.name
        })
      }
    },
    selectItem (item) {
      this.init()
      this.$emit('select', cloneDeep(item))
    },
    debouncedSearch: debounce(function (keywords, filters) {
      this.search(keywords, filters)
    }, 500),
    search (keywords, filters) {
      if (!this.type) {
        return
      }

      let queryBuilder = this.$content(this.resourceName)

      if (keywords) {
        queryBuilder = queryBuilder.search(keywords)
      }

      const conditions = {}

      for (const filter in filters) {
        // noinspection JSUnfilteredForInLoop
        if (filters[filter].length === 0) {
          continue
        }

        // noinspection JSUnfilteredForInLoop
        const value = filters[filter]

        // noinspection JSUnfilteredForInLoop
        switch (filter) {
          case 'skills':
            conditions['skills.slug'] = {
              $containsAny: [value]
            }
            break

          case 'slot':
            conditions.slots = {
              $contains: parseInt(value)
            }
            break

          case 'sort': {
            const option = this.filters.sort.options.find(element => element.value === value)
            queryBuilder = queryBuilder.sortBy(value, option.order)
            break
          }
        }
      }

      if (!isEmpty(conditions)) {
        queryBuilder = queryBuilder.where(conditions)
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
