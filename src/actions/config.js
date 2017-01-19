export const getServerURL = () => {
  // return `http://${getServerDomain()}`
  return process.env.BACKEND_URL
}

export const ROOT_URL = getServerURL()
