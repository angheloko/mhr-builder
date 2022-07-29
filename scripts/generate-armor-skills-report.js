const fs = require('fs')
const { stringify } = require('csv-stringify/sync')
const files = [
  'content/arms-armors.json',
  'content/chest-armors.json',
  'content/head-armors.json',
  'content/legs-armors.json',
  'content/waist-armors.json'
]

const skills = {}
for (const file of files) {
  const contents = fs.readFileSync(file)
  const data = JSON.parse(contents)

  for (const equipment of data) {
    for (const skill of equipment.skills) {
      if (skills[skill.slug]) {
        skills[skill.slug].count++
        skills[skill.slug].equipments.push(equipment.slug)
      } else {
        skills[skill.slug] = {
          count: 1,
          equipments: [
            equipment.slug
          ]
        }
      }
    }
  }
}

const rows = [[
  'Slug',
  'Use count',
  'Usages'
]]
for (const [slug, skill] of Object.entries(skills)) {
  rows.push([
    slug,
    skill.count,
    skill.equipments.join(',\n')
  ])
}

console.log(stringify(rows))
