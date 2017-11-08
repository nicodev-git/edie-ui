import React from 'react'

export default class GDeviceIO extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      loading: true,
      network: null,
      disk: null,
      up: false
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  componentDidMount () {
    this.startUpdate()
  }

  componentDidUpdate (prevProps, prevState) {
    if (JSON.stringify(prevProps.gauge) !== JSON.stringify(this.props.gauge)) {
      this.stopUpdate()
      setTimeout(() => {
        this.startUpdate()
      }, 10)
    }
  }

  componentWillUnmount () {
    this.stopUpdate()
  }

  startUpdate () {
    this.setState({
      disk: null,
      network:null,
      up: false
    })
    this.monitorSocket = new MonitorSocket({
      listener: this.onMonitorMessage.bind(this)
    })
    this.monitorSocket.connect(this.onSocketOpen.bind(this))

    checkAgentUp(this.getDeviceId(), up => {
      this.setState({up, loading: false})
    })
  }

  stopUpdate () {
    this.monitorSocket && this.monitorSocket.close()
  }
  ///////////////////////////////////////////////////////////////////

  onSocketOpen () {
    this.monitorSocket.send({
      action: 'enable-realtime',
      monitors: 'network',
      deviceId: this.getDeviceId()
    })
  }

  onMonitorMessage (msg) {
    if (msg.action === 'update' && msg.deviceId === this.getDeviceId()) {
      const {network} = msg.data
      const state = {}
      if (network) state.network = network
      // if (disk) state.disk = sumDisks(disk)
      state.loading = false

      this.setState(state)
    }
  }

  ////////////////////////////////////////////////////
  getDeviceId () {
    return this.props.gauge.deviceId
  }

  getDevice () {
    const {devices} = this.props
    const index = findIndex(devices, {id: this.getDeviceId()})
    if (index < 0) return null
    return devices[index]
  }

  onSubmit (options, values) {
    console.log(values)

    if (!values.name) {
      showAlert('Please type name.')
      return
    }
    const gauge = {
      ...this.props.gauge,
      ...values
    }

    this.props.updateDeviceGauge(gauge, this.props.device)
    options.onClickFlip()
  }
  getTitle () {
    const {gauge} = this.props
    const devices = this.props.allDevices || this.props.devices
    const index = findIndex(devices, {id: gauge.deviceId})
    if (index < 0) return gauge.name
    return `[${devices[index].name}] ${gauge.name}`
  }

  sumNetworks (networks) {
    let sent = 0
    let received = 0

    networks.forEach(p => {
      sent += p.BytesSentPerSec
      received += p.BytesReceivedPerSec
    })

    return {
      sent,
      received,
      sum: sent + received
    }
  }

  /////////////////////////////////////////////////////

  renderItem (item, i) {
    return (
      <div key={i} className="flex-1" style={{height: '100%', position: 'relative', overflow: 'hidden'}}>
        <Speedometer {...item}/>
      </div>
    )
  }

  renderFrontView () {
    const device = this.getDevice()


    if (!device) return <div />

    const up = this.state.up

    if (up) {
      const {network} = this.state
      const networkValue = this.sumNetworks(network)


      const items = [{
        title1: `${networkValue.sent} / ${networkValue.received}`,
        title2: 'Network',
        title3: 'Network Utilization',
        value: 0
      }]

      return (
        <div className="flex-1 flex-horizontal" style={{marginTop: 8}}>
          {items.map(this.renderItem.bind(this))}
        </div>
      )
    } else {
      return (
        <NoDataPanel />
      )
    }

  }

  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
        />
      </div>
    )
  }

  render () {
    return (
      <FlipView
        {...this.props}

        title={this.getTitle()}
        bodyStyle={{padding: "0px 20px 20px"}}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}
      />
    )
  }
}
