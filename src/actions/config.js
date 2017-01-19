export const getServerDomain = () => {
  return 'localhost'
}

export const getServerURL = () => {
  return `http://${getServerDomain()}`
}

export const ROOT_URL = getServerURL()
