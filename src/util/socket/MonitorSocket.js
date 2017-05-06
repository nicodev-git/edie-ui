import { getLocation } from 'util/Location'
import { ROOT_URL } from 'actions/config'

export default class MonitorSocket {
  constructor (props) {
    this.ws = null
    this.reconnectOnClose = false
    this.connecting = false
    this.needDestroy = false
    this.listener = props.listener
  }

  connect (cb) {
    const me = this

    if (me.ws) {
      me.close()
      return
    }

    try {
      const domain = getLocation(ROOT_URL || document.location.href).host

      me.ws = new window.WebSocket(`ws://${domain}/monitorupdate`)
      me.connecting = true
      me.ws.onopen = (frame) => {
        me.connecting = false

        console.log('%c >>> Connected monitor socket', 'color: green')

        if (me.needDestroy) {
          setTimeout(() => me.close(), 1)
          return
        }
        cb && cb()
      }
      me.ws.onclose = me.onClose.bind(me)
      me.ws.onmessage = me.onMessage.bind(me)
    } catch (e) {
      console.log(e)
    }
  }

  onMessage (e) {
    console.log(e)
    if (this.listener) {
      this.listener(e)
    }
    // if (!func) return
    // try {
    //   const msgObj = JSON.parse(e.body)
    //   func(msgObj)
    // } catch (e) {
    //   console.log(e)
    // }
  }

  onClose () {
    console.log('%c --- Closed monitor socket', 'color: green')
  }

  send (msg) {
    this.ws.send(JSON.stringify(msg))
    return true
  }

  close () {
    const me = this
    me.needDestroy = true
    me.ws.close()
  }
}
