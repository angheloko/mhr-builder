const fs = require('fs')
const { stringify } = require('csv-stringify/sync')

const contents = fs.readFileSync('content/skills.json')
const data = JSON.parse(contents)
const rows = []

rows.push([
  'Slug',
  'Name',
  'Level'
])

for (const skill of data) {
  rows.push([
    skill.slug,
    skill.name,
    skill.level
  ])
}

console.log(stringify(rows))
