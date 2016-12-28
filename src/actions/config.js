export const getServerDomain = () => {
  return 'imp.dev.securegion.com'
}

export const getServerURL = () => {
  return `http://${getServerDomain()}`
}

export const ROOT_URL = getServerURL()
