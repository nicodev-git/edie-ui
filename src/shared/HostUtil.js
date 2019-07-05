import axios from 'axios'
import { ROOT_URL } from 'actions/config'
import { isWindowsDevice } from 'shared/Global'

export const resolveAddr = (props, cb) => {
  if (!props.wanip) {
    cb && cb(props)
    return
  }

  const cred = props.credential && props.credential.length > 0 ? props.credential[0] : null
  axios.get(`${ROOT_URL}/getHostname`, {
    params: {
      iporhost: props.wanip,
      user: props.useIntegratedSecurity ? '' : (cred ? cred.username : ''),
      password: props.useIntegratedSecurity ? '' : (cred ? cred.password : ''),
      isWindows: isWindowsDevice(props),
      collectorId: props.collectorId,
      noCred: !!props.noCred
    }
  }).then(r1 => {
    r1.data = r1.data || {}
    r1.data.host = r1.data.host || 'Unknown'
    r1.data.os = r1.data.os || 'Unknown'

    if (r1.data && r1.data.host && r1.data.os) {
      props.hostname = r1.data.host
      if (!props.name) props.name = props.hostname
      props.osDetails = r1.data.os
      cb && cb(props)
    } else {
      cb && cb(null, 'Host resolve failed')
    }
  }).catch(() => {
    cb && cb(null, 'Host resolve failed')
  })
}
