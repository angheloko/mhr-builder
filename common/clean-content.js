export default function (value) {
  const remove = [
    'dir',
    'path',
    'extension',
    'createdAt',
    'updatedAt'
  ]
  for (const property of remove) {
    delete value[property]
  }
  return value
}
