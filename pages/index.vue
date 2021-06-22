<template>
  <Scaffold>
    <Builder
      class="h-full px-4 py-2"
      :value="sets"
      :read-only="false"
    >
      <button
        class="w-60 flex-none rounded bg-gray-300 p-2 text-sm"
        @click="addNewSet"
      >
        Add new set
      </button>
    </Builder>
    <SetPreviewModal
      v-if="showPreviewModal"
      :value="preview"
      @close="closePreview"
    />
  </Scaffold>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import config from '~/app.config'
import SetPreviewModal from '~/components/SetPreviewModal'
import Scaffold from '~/components/Scaffold'
import Builder from '~/components/Builder'

export default {
  components: { Builder, Scaffold, SetPreviewModal },
  head () {
    return {
      title: 'Home'
    }
  },
  data () {
    return {
      preview: {},
      showPreviewModal: false
    }
  },
  computed: {
    ...mapGetters({
      sets: 'sets/sets'
    }),
    equipmentTypes () {
      return config.equipmentTypes
    }
  },
  mounted () {
    this.loadSets()

    if (!this.sets.length) {
      this.addSet(this.newSet())
    }

    this.loadSetFromQuery()
  },
  methods: {
    ...mapMutations({
      loadSets: 'sets/load',
      addSet: 'sets/add'
    }),
    async loadSetFromQuery () {
      if (location.search) {
        const query = new URLSearchParams(location.search)
        let weaponPromise
        const equipmentPromises = []
        const decorationPromises = []
        const equipmentDecorations = {}
        const decorations = []
        const skillPromises = []
        const talismanSkills = {}
        const talisman = {
          skills: [],
          slots: []
        }

        this.preview = this.newSet()

        for (const type in this.equipmentTypes) {
          if (type !== 'talisman') {
            const slug = query.get(type)
            if (!slug) {
              continue
            }

            if (type === 'weapon') {
              const weaponType = query.get('weapon-type')
              if (weaponType) {
                weaponPromise = this.$content(`${weaponType}-weapons`, slug).fetch()
              }
            } else {
              equipmentPromises.push(this.$content(`${type}-armors`, slug).fetch())
            }
          }

          const decorationSlugs = query.get(`${type}-deco`) ? query.get(`${type}-deco`).split(',') : []
          equipmentDecorations[type] = decorationSlugs
          for (const decorationSlug of decorationSlugs) {
            if (decorationSlug) {
              decorationPromises.push(this.$content('decorations', decorationSlug).fetch())
            }
          }
        }

        if (decorationPromises.length > 0) {
          const results = await Promise.all(decorationPromises)
          for (const result of results) {
            decorations.push(result)
          }
        }

        talisman.slots = query.get('talisman-slot')
          ? query.get('talisman-slot').split(',').map(element => parseInt(element))
          : []

        const skillSlugs = query.get('talisman-skill') ? query.get('talisman-skill').split(',') : []
        for (const skillSlug of skillSlugs) {
          if (skillSlug) {
            const slugParts = skillSlug.split(':')
            skillPromises.push(this.$content('skills', slugParts[0]).fetch())
            talismanSkills[slugParts[0]] = parseInt(slugParts[1])
          }
        }

        if (skillPromises.length > 0) {
          const results = await Promise.all(skillPromises)
          for (const result of results) {
            talisman.skills.push({
              name: result.name,
              slug: result.slug,
              level: talismanSkills[result.slug]
            })
          }
        }

        if (talisman.skills.length > 0 || talisman.slots.length > 0) {
          this.preview.talisman = talisman
        }

        if (weaponPromise) {
          const result = await weaponPromise
          if (result) {
            this.preview.weapon = result
          }
        }

        if (equipmentPromises.length > 0) {
          const results = await Promise.all(equipmentPromises)
          for (const result of results) {
            this.preview[result.type] = result
          }
        }

        for (const type in equipmentDecorations) {
          if (this.preview[type]) {
            this.preview[type].decorations = this.preview[type].slots.map(() => null)

            for (let i = 0; i < equipmentDecorations[type].length; i++) {
              const slug = equipmentDecorations[type][i]
              if (slug) {
                const decoration = decorations.find(element => element.slug === slug)
                if (decoration) {
                  this.preview[type].decorations[i] = decoration
                }
              }
            }
          }
        }

        this.showPreviewModal = true
      }
    },
    newSet () {
      const set = {}
      for (const type in this.equipmentTypes) {
        set[type] = null
      }
      return set
    },
    addNewSet () {
      this.addSet(this.newSet())
    },
    closePreview () {
      this.$router.replace('/')
      this.showPreviewModal = false
    }
  }
}
</script>

<style scoped>
</style>
