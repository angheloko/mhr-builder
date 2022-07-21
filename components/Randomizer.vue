<template>
  <div class="generator h-full">
    <div>
      <h1
        v-if="!isSubmitted"
        class="text-sm font-medium px-4 py-2"
      >
        Generate a random set
      </h1>
    </div>
    <div class="overflow-y-auto">
      <div v-if="!isSubmitted" class="px-4 py-2">
        <div class="border rounded p-2 mb-2">
          <div class="text-sm text-gray-700 font-bold mb-1">
            Armor rank
          </div>
          <label class="flex items-center space-x-2 mb-2">
            <input
              v-model="armorRank"
              type="radio"
              name="armorRank"
              class="h-4 w-4 rounded-full"
              value="2"
            >
            <span class="font-medium text-sm">Master rank only</span>
          </label>
          <label class="flex items-center space-x-2">
            <input
              v-model="armorRank"
              type="radio"
              name="armorRank"
              class="h-4 w-4 rounded rounded-full"
              value="1"
            >
            <span class="font-medium text-sm">High rank only</span>
          </label>
          <div class="text-xs text-gray-500 mt-1">
            Only armors from the selected rank will be included.
          </div>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center h-full text-sm">
        <div v-if="isGenerating">
          <svg class="animate-spin m-auto h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
          <p class="text-sm mt-2">
            Generating sets...
          </p>
        </div>
        <div v-else class="w-2/3 text-center">
          <h2 class="text-lg mb-5">
            Done! 🎉
          </h2>
          <p class="mb-6">
            If you see any problems with the data, found any bugs, or would like to suggest a new feature, please
            <a href="https://github.com/angheloko/mhr-builder/issues" class="text-blue-600 font-bold">submit an issue</a> or
            <a href="mailto:angheloko@gmail.com" class="text-blue-600 font-bold">drop me an email</a>.
          </p>
          <button
            class="bg-blue-600 text-white font-medium text-sm px-4 rounded h-8"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    <div>
      <div v-if="!isSubmitted" class="text-right px-4 py-2 border-t">
        <button
          class="bg-blue-600 text-white font-medium text-sm px-4 rounded h-8"
          @click="submit"
        >
          Generate
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  name: 'Randomizer',
  data () {
    return {
      isSubmitted: false,
      isGenerating: false,
      armorRank: 2
    }
  },
  methods: {
    ...mapMutations({
      addSet: 'sets/add'
    }),
    submit () {
      this.isSubmitted = true
      this.isGenerating = true

      setTimeout(() => {
        this.generate().then(() => {
          this.isGenerating = false
        })
      }, 300)
    },
    async generate () {
      const promises = []
      promises.push(this.loadArmors('head'))
      promises.push(this.loadArmors('chest'))
      promises.push(this.loadArmors('arms'))
      promises.push(this.loadArmors('waist'))
      promises.push(this.loadArmors('legs'))

      const result = await Promise.all(promises)
      const headArmors = result[0]
      const chestArmors = result[1]
      const armsArmors = result[2]
      const waistArmors = result[3]
      const legsArmors = result[4]

      for (const head of headArmors) {
        for (const chest of chestArmors) {
          for (const arms of armsArmors) {
            for (const waist of waistArmors) {
              for (const legs of legsArmors) {
                const set = cloneDeep({
                  talisman: null,
                  weapon: null,
                  head,
                  chest,
                  arms,
                  waist,
                  legs
                })

                this.addSet(set)
              }
            }
          }
        }
      }
    },
    async loadArmors (type) {
      const promises = []
      const armors = []

      // All armors with the specified skills.
      const promise1 = this.$content(`${type}-armors`)
        .where({
          rank: parseInt(this.armorRank)
        }).fetch()
      promises.push(promise1)

      const results = await Promise.all(promises)

      for (const result of results) {
        for (const armor of result) {
          armors.push(armor)
        }
      }

      this.shuffleArray(armors)
      return armors.slice(0, 1)
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
    }
  }
}
</script>

<style scoped>
.generator {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
