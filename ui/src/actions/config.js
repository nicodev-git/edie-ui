const getServerURL = () => {
    return window.location.port === '3000' ? 'http://im.securegion.com' : window.location.origin;
}

export const ROOT_URL = getServerURL()
export const SRA_URL = 'http://aaa.securegion.com'