<template>
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
        No weapons found.
      </template>
    </div>
    <div v-else class="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
      <div v-for="item of results" :key="item.slug" @click="selectItem(item)">
        <WeaponCard
          :value="item"
          class="h-full"
          :class="{ 'ring-2': value && value.slug === item.slug }"
        />
      </div>
    </div>
  </Search>
</template>

<script>
import { cloneDeep, debounce, isEmpty } from 'lodash'
import Search from './Search'
import WeaponCard from './WeaponCard'

export default {
  name: 'WeaponSearch',
  components: { WeaponCard, Search },
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      results: [],
      isLoading: true,
      filters: {
        type: {
          label: 'Type',
          required: true,
          options: [
            {
              value: 'great-sword',
              label: 'Great sword'
            },
            {
              value: 'long-sword',
              label: 'Long sword'
            },
            {
              value: 'sword-and-shield',
              label: 'Sword and shield'
            },
            {
              value: 'dual-blades',
              label: 'Dual blades'
            },
            {
              value: 'hammer',
              label: 'Hammer'
            },
            {
              value: 'hunting-horn',
              label: 'Hunting horn'
            },
            {
              value: 'lance',
              label: 'Lance'
            },
            {
              value: 'gunlance',
              label: 'Gunlance'
            },
            {
              value: 'switch-axe',
              label: 'Switch axe'
            },
            {
              value: 'charge-blade',
              label: 'Charge blade'
            },
            {
              value: 'insect-glaive',
              label: 'Insect glaive'
            },
            {
              value: 'bow',
              label: 'Bow'
            },
            {
              value: 'light-bowgun',
              label: 'Light bowgun'
            },
            {
              value: 'heavy-bowgun',
              label: 'Heavy bowgun'
            }
          ]
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
              order: 'asc',
              default: true
            },
            {
              value: 'attack',
              label: 'Attack',
              order: 'desc'
            },
            {
              value: 'affinity',
              label: 'Affinity',
              order: 'desc'
            },
            {
              value: 'defense',
              label: 'Defense',
              order: 'desc'
            }
          ]
        }
      }
    }
  },
  mounted () {
    let selected = 0

    if (this.value) {
      for (let i = 0; i < this.filters.type.options.length; i++) {
        const type = this.filters.type.options[i].value.replace('-', '_')
        if (this.value.type === type) {
          selected = i
        }
      }
    }

    this.$set(this.filters.type.options[selected], 'default', true)
  },
  methods: {
    selectItem (item) {
      this.$emit('select', cloneDeep(item))
    },
    debouncedSearch: debounce(function (keywords, filters) {
      this.search(keywords, filters)
    }, 500),
    search (keywords, filters) {
      for (const type in this.filters) {
        const defaultValue = this.filters[type].options.find(el => el.default === true)
        if (defaultValue !== undefined && (filters[type] === '' || filters[type] === undefined)) {
          filters[type] = defaultValue.value
        }
      }

      if (!filters.type) {
        return
      }

      const resourceName = `${filters.type}-weapons`

      let queryBuilder = this.$content(resourceName)

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
