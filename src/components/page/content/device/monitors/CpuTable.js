import React from 'react'

class CpuTable extends React.Component {
  componentWillMount () {
    this.props.fetchMonitorCpu()
  }
  renderContent () {
    const {monitorCpu} = this.props
    if (!monitorCpu) return null
    const cpus = monitorCpu.dataobj
    return (cpus.length ? cpus : [cpus]).map((d, i) =>
      <div key={i} className="inline-block">
        <img src="/images/cpu.gif" width="80"/>
        <div className="centered text-white" style={{marginTop: '-4px'}}>
          {d.Usage}%
        </div>
      </div>
    )
  }
  render () {
    return (
      <div className="inline-block">
        {this.renderContent()}
      </div>
    )
  }
}

export default CpuTable
