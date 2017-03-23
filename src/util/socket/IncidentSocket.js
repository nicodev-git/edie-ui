import Stomp from 'stompjs'
import {keys} from 'lodash'

import { getLocation } from 'util/Location'
import { ROOT_URL } from 'actions/config'

export default class IncidentSocket {
  constructor (props) {
    this.ws = null
    this.reconnectOnClose = false
    this.connecting = false
    this.needDestroy = false
    this.listeners = props.listeners
    this.id = props.id || ''
  }

  connect () {
    const me = this

    if (me.ws) {
      me.close()
      return
    }

    try {
      const domain = getLocation(ROOT_URL || document.location.href).host

      me.ws = new window.WebSocket(`ws://${domain}/frontendupdates`)
      me.stompClient = Stomp.over(me.ws)
      me.connecting = true
      me.stompClient.connect('', '', (frame) => {
        me.connecting = false

        if (me.needDestroy) {
          setTimeout(() => me.close(), 1)
          return
        }
        keys(me.listeners).forEach(path => {
          me.stompClient.subscribe(`/frontendupdates/${path}`, me.onMessage.bind(me, me.listeners[path]))
        })
        me.stompClient.debug = null
      })
    } catch (e) {
      console.log(e)
    }
  }

  onMessage (func, e) {
    if (!func) return
    try {
      const msgObj = JSON.parse(e.body)
      func(msgObj)
    } catch (e) {
      console.log(e)
    }
  }

  addListener (msg, cb) {
    const me = this
    if (!msg || !cb) return
    if (!me.mappings[msg]) me.mappings[msg] = []

    me.mappings[msg].push(cb)
  }

  removeListener (msg, cb) {
    const me = this
    if (!msg || !cb) return

    let mappings = me.mappings[msg]
    if (!mappings) return

    const index = mappings.indexOf(cb)
    if (index >= 0) {
      mappings.splice(index, 1)
    }

    return true
  }

  close () {
    const me = this
    me.needDestroy = true
    if (me.stompClient && !me.connecting) {
      me.stompClient.debug = window.console.log
      me.stompClient.disconnect()
    }
  }
}
