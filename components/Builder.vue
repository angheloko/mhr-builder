<template>
  <div class="builder flex items-start overflow-x-auto p-2">
    <div
      v-if="showBottomMessage"
      class="absolute z-10 mx-auto inset-x-0 bottom-4 rounded shadow-md bg-gray-600 text-white w-80 p-2 text-center text-sm"
    >
      <a :href="setUrl" class="font-medium text-yellow-400">Link</a> copied to clipboard.
    </div>
    <SetPreviewModal
      v-if="showModal === 'preview'"
      :set="preview"
      @close="closePreviewModal"
    />
    <AddWeaponModal
      v-if="showModal === 'weapon'"
      @close="closeModal"
      @select="addEquipment"
    />
    <AddArmorModal
      v-if="showModal === 'armors'"
      :type="equipmentType"
      @close="closeModal"
      @select="addEquipment"
    />
    <AddTalismanModal
      v-if="showModal === 'talisman'"
      @close="closeModal"
      @input="addEquipment"
    />
    <SetDecorationModal
      v-if="showModal === 'decorations'"
      :level="decorationLevel"
      :selected="currentDecoration"
      @close="closeModal"
      @select="setDecoration"
    />
    <div v-for="(set, index) in sets" :key="index" class="flex flex-col h-full w-60 flex-none rounded bg-gray-300 mr-2 pb-4">
      <div class="p-2 text-right">
        <div class="relative">
          <button
            v-click-outside="hideBuildMenu"
            class="focus:outline-none"
            @click.stop="toggleBuildMenu(index)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
          <div
            v-if="showBuildMenu === index"
            class="origin-top-right absolute right-0 mt-2 rounded shadow bg-white flex flex-col w-28 z-10"
          >
            <button class="focus:outline-none flex items-center text-sm m-2" @click="share(index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Copy link
            </button>
            <button class="focus:outline-none flex items-center text-sm m-2 text-red-600" @click="removeSet(index)">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
      <div class="p-2">
        <SkillsCard :set="set" class="rounded p-2 border border-gray-400 text-sm" />
      </div>
      <div class="overflow-y-auto list-items px-2">
        <div v-for="(label, type) in equipmentTypes" :key="type" class="mb-2 last:mb-0">
          <div v-if="set[type]" class="relative mt-4">
            <WeaponCard
              v-if="type === 'weapon'"
              :item="set[type]"
              :can-decorate="true"
              @click-slot="showDecorationsModal(type, index, $event)"
              @remove-decoration="removeDecoration(type, index, $event)"
            />
            <TalismanCard
              v-else-if="type === 'talisman'"
              :item="set[type]"
              :can-decorate="true"
              @click-slot="showDecorationsModal(type, index, $event)"
              @remove-decoration="removeDecoration(type, index, $event)"
            />
            <ArmorCard
              v-else
              :item="set[type]"
              :can-decorate="true"
              @click-slot="showDecorationsModal(type, index, $event)"
              @remove-decoration="removeDecoration(type, index, $event)"
            />
            <button
              class="text-sm absolute -top-1 -right-1 text-white bg-red-400 rounded-full h-4 w-4 p-0.5"
              @click="removeEquipment(type, index)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <button v-else class="bg-gray-200 text-gray-600 rounded block w-full p-2 text-sm focus:outline-none" @click="showEquipmentModal(type, index)">
            Add {{ label }}
          </button>
        </div>
      </div>
    </div>
    <button class="w-60 flex-none rounded bg-gray-300 p-2 text-sm" @click="addNewSet">
      Add new set
    </button>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import AddArmorModal from './AddArmorModal'
import SetDecorationModal from './SetDecorationModal'
import AddWeaponModal from './AddWeaponModal'
import WeaponCard from './WeaponCard'
import ArmorCard from './ArmorCard'
import SkillsCard from './SkillsCard'
import TalismanCard from './TalismanCard'
import AddTalismanModal from './AddTalismanModal'
import SetPreviewModal from './SetPreviewModal'

export default {
  name: 'Builder',
  components: { SetPreviewModal, AddTalismanModal, TalismanCard, SkillsCard, ArmorCard, WeaponCard, AddWeaponModal, SetDecorationModal, AddArmorModal },
  data () {
    return {
      equipmentTypes: {
        talisman: 'Talisman',
        weapon: 'Weapon',
        head: 'Head',
        chest: 'Chest',
        arms: 'Arms',
        waist: 'Waist',
        legs: 'Legs'
      },
      preview: {},
      showModal: '',
      equipmentType: '',
      setIndex: 0,
      slot: 0,
      decorationLevel: 0,
      currentDecoration: '',
      setUrl: '',
      showBottomMessage: false,
      showBuildMenu: -1
    }
  },
  computed: {
    ...mapGetters({
      sets: 'sets/sets',
      getSkill: 'skills/getSkill'
    })
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
      addSet: 'sets/add',
      equip: 'sets/equip',
      unequip: 'sets/unequip',
      decorate: 'sets/decorate',
      undecorate: 'sets/undecorate',
      removeSet: 'sets/remove'
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

        this.showModal = 'preview'
      }
    },
    newSet () {
      const set = {}
      for (const type in this.equipmentTypes) {
        set[type] = null
      }
      return set
    },
    closeModal () {
      this.showModal = ''
    },
    closePreviewModal () {
      this.$router.replace('/')
      this.showModal = ''
    },
    showEquipmentModal (type, index) {
      this.equipmentType = type
      this.setIndex = index

      this.showModal = type === 'weapon' || type === 'talisman'
        ? type
        : 'armors'
    },
    addNewSet () {
      this.addSet(this.newSet())
    },
    addEquipment (item) {
      this.showModal = ''

      this.equip({
        index: this.setIndex,
        type: this.equipmentType,
        item
      })
    },
    removeEquipment (type, index) {
      this.unequip({ index, type })
    },
    showDecorationsModal (type, index, { slot, level, current }) {
      this.equipmentType = type
      this.setIndex = index
      this.slot = slot
      this.decorationLevel = level
      this.currentDecoration = current ?? ''
      this.showModal = 'decorations'
    },
    setDecoration (decoration) {
      this.showModal = ''
      this.decorate({
        index: this.setIndex,
        type: this.equipmentType,
        slot: this.slot,
        decoration
      })
    },
    removeDecoration (type, index, slot) {
      this.undecorate({
        index,
        type,
        slot
      })
    },
    share (index) {
      const query = new URLSearchParams()
      const set = this.sets[index]

      for (const type in this.equipmentTypes) {
        if (set[type]) {
          const equipment = set[type]

          if (type === 'talisman') {
            if (equipment.slots !== undefined) {
              query.append(`${type}-slot`, equipment.slots.join())
            }

            if (equipment.skills !== undefined) {
              const skills = equipment.skills
                .map(element => element ? `${element.slug}:${element.level}` : '')
                .join()
              query.append(`${type}-skill`, skills)
            }
          } else {
            query.append(type, equipment.slug)
          }

          if (equipment.decorations !== undefined) {
            const decorations = equipment.decorations
              .map(element => element ? element.slug : '')
              .join()
            query.append(`${type}-deco`, decorations)
          }

          if (type === 'weapon') {
            query.append('weapon-type', equipment.type.replace('_', '-'))
          }
        }
      }

      this.setUrl = `${location.protocol}//${location.host}?${query.toString()}`
      navigator.clipboard.writeText(this.setUrl)
        .then(() => {
          this.showBottomMessage = true
          setTimeout(() => {
            this.showBottomMessage = false
          }, 3000)
        })
    },
    toggleBuildMenu (index) {
      this.showBuildMenu = this.showBuildMenu === index ? -1 : index
    },
    hideBuildMenu () {
      this.showBuildMenu = -1
    }
  }
}
</script>

<style scoped>
.builder {
  height: calc(100vh - 3rem);
}
</style>
