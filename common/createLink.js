import config from '~/app.config'

export default function (set) {
  const query = new URLSearchParams()

  for (const type of Object.getOwnPropertyNames(config.equipmentTypes)) {
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
          .filter(element => element)
          .map(element => element ? element.slug : '')
          .join()
        query.append(`${type}-deco`, decorations)
      }

      if (type === 'weapon') {
        query.append('weapon-type', equipment.type.replace('_', '-'))
      }
    }
  }

  return `${location.protocol}//${location.host}?${query.toString()}`
}
