<template>
  <div v-click-outside="hideOptions" class="relative">
    <button
      type="button"
      class="flex justify-between w-full rounded border border-gray-300 shadow-sm mb-1 p-2 bg-white text-sm hover:bg-gray-50"
      @click="showOptions = !showOptions"
    >
      {{ getLabel }}
      <!-- heroicons: solid/chevron-down -->
      <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
      </svg>
    </button>
    <div
      v-if="showOptions"
      class="z-20 absolute w-full rounded shadow-lg bg-white overflow-y-auto ring-1 ring-black ring-opacity-5 focus:outline-none"
      :class="classes"
    >
      <div class="py-1" role="none">
        <a
          v-for="(option, index) of getOptions"
          :key="index"
          href="#"
          class="block px-4 py-2 text-sm hover:bg-gray-100 hover:text-gray-900 flex justify-between items-center"
          @click="select(option.value)"
        >
          {{ option.label || 'None' }}
          <!-- heroicons: check -->
          <svg
            v-if="(value && value === option.value) || (!value && option.default)"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    label: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => ([])
    },
    value: {
      type: [String, Number],
      default: ''
    },
    required: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 56
    },
    bottom: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showOptions: false,
      default: null
    }
  },
  computed: {
    classes () {
      return [
        'max-h-' + this.height,
        {
          'bottom-11': this.bottom
        }
      ]
    },
    getOptions () {
      const options = [...this.options]

      if (!this.required) {
        options.splice(0, 0, {
          value: '',
          label: ''
        })
      }

      return options
    },
    getLabel () {
      if (this.value) {
        for (const option of this.options) {
          if (option.value === this.value) {
            return option.label
          }
        }
      }
      const defaultValue = this.options.find(element => element.default)
      return defaultValue?.label ?? this.label
    }
  },
  mounted () {
    this.default = this.options.find(element => element.default)
  },
  methods: {
    select (value) {
      this.hideOptions()
      this.$emit('update', value)
    },
    hideOptions () {
      this.showOptions = false
    }
  }
}
</script>

<style scoped>

</style>
