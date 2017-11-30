export function strSorter(field, desc, a, b) {
  let value = (a[field] || '').toLowerCase().localeCompare((b[field] || '').toLowerCase())
  if (desc) value = -value
  return value
}

export function numSorter(field, desc, a, b) {
  let value = 0
  let n1 = a[field] || 0
  let n2 = b[field] || 0
  if (n1 > n2) value = -1
  else if (n1 < n2) value = 1
  if (desc) value = -value
  return value
}