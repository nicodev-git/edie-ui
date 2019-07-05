export function strSorter(field, desc, a, b) {
  let value = (a[field] || '').toLowerCase().localeCompare((b[field] || '').toLowerCase())
  if (desc) value = -value
  return value
}

export function numSorter(field, desc, a, b) {
  let value = (a[field] || 0) - (b[field] || 0)
  if (desc) value = -value
  return value
}