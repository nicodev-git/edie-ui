import Stomp from 'stompjs'

import { getLocation } from 'util/Location'
import { ROOT_URL } from 'actions/config'

export default class IncidentSocket {
  constructor (props) {
    this.ws = null
    this.mappings = {}
    this.reconnectOnClose = false
    this.connected = false
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
      me.stompClient.connect('', '', (frame) => {
        me.stompClient.subscribe('/frontendupdates', message => {
          console.log(JSON.parse(message.body))
        })
      })
    } catch (e) {
      console.log(e)
    }
  }

  close () {
    const me = this
    me.stompClient && me.stompClient.disconnect()
  }
}

export const incidentSocket = {
  ws: null,

  mappings: {},
  reconnectOnClose: false,

  id: '',

  init: function (id) {
    this.id = id
  },

  connect: function () {
    let me = this

    if (me.ws) {
      me.close()
      return
    }

    try {
      console.log('Incident Socket Connecting...')
      me.ws = new window.WebSocket(`ws://domain/incident`)
      me.ws.onopen = me.onOpen.bind(me)
      me.ws.onmessage = me.onMessage.bind(me)
      me.ws.onclose = me.onClose.bind(me)
      me.ws.onerror = me.onError.bind(me)
      me.reconnectOnClose = true
    } catch (e) {
      console.log(e)

      setTimeout(me.connect.bind(me), 3000)
    }
  },

  getId: function () {
    return this.id
  },

  addListener: function (msg, cb) {
    const me = this
    if (!msg || !cb) return
    if (!me.mappings[msg]) me.mappings[msg] = []

    me.mappings[msg].push(cb)
  },

  removeListener: function (msg, cb) {
    const me = this
    if (!msg || !cb) return

    let mappings = me.mappings[msg]
    if (!mappings) return

    const index = mappings.indexOf(cb)
    if (index >= 0) {
      mappings.splice(index, 1)
    }

    return true
  },

  close: function () {
    let me = this

    me.reconnectOnClose = false
    if (!me.ws) return
    me.ws.close()
    me.ws = null
  },

    // /////////////////////////////////

  onOpen: function (e) {
    console.log('Incident Socket Opened')
  },

  onMessage: function (e) {
    let me = this
    console.log(e.data)
        // console.log('New Socket Message');
    try {
      let msgObj = JSON.parse(e.data)
      me.notifyMessage(msgObj)
    } catch (e) {
      console.log(e)
    }
  },

  notifyMessage: function (msgObj) {
    const me = this
    const mapping = me.mappings[msgObj.type]

    if (!mapping) return
    mapping.forEach(cb => {
      try {
        cb(msgObj)
      } catch (e) {
        console.log(e)
      }
    })
  },

  onClose: function (e) {
    let me = this
    console.log('Incident Socket Closed')
    me.ws = null

    if (me.reconnectOnClose) {
            // Retry connection
      setTimeout(me.connect.bind(me), 5000)
    }
  },

  onError: function (e) {
    console.log(e)
  }
}
