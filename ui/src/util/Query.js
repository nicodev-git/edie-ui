export function findField (parsed, field) {
  if (parsed.field) {
    return parsed.field === field ? { field: parsed } : null
  }

  if (parsed.left) {
    const res = findField(parsed.left, field)
    if (res && !res.parent) {
      res.parent = parsed
      res.type = 'left'
    }
    return res
  }

  if (parsed.right) {
    const res = findField(parsed.right, field)
    if (res && !res.parent) {
      res.parent = parsed
      res.type = 'right'
    }
    return res
  }

  return null
}
