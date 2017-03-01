import React from 'react'
import { appendComponent, removeComponent } from '../../../../util/Component'
import PortModal from './PortModal'
import { Field } from 'redux-form'

// import {findIndex} from 'lodash'
const customPortIndex = -1
export default class PortList extends React.Component {
  constructor (props) {
    super(props)

    let config = this.props.config

    this.state = {
      items: config.items.map(item => item),
      selected: config.items.length > 1 ? config.items[0].value : null,
      customPort: ''
    }

    // let name = props.name
    // let values = props.values
    // if (name && values[name] !== undefined) {
    //   values[name].forEach(port => {
    //     let index = findIndex(this.state.items, item => {
    //       return parseInt(item.value) === parseInt(port)
    //     })
    //     if (index >= 0) this.state.selected.push(index)
    //   })
    // }
  }

    // ////////////////////////////////////////////////////////////////

  onClickAdd () {
    appendComponent(
      <PortModal onClose={this.onCloseModal.bind(this)}/>
    )
  }

  onCloseModal (modal, data) {
    removeComponent(modal)

    if (data) {
      let items = this.state.items
      items.push({
        display: `${data.port} ${data.name}`,
        value: data.port
      })

      this.setState({items})
    }
  }

  onChange (selected, event) {
    this.setState({selected})
    this.props.change(this.props.config.name, selected === customPortIndex ? this.state.customPort : selected)
    // this.updateValue(selected.map(item => this.state.items[item].value))
  }

  onChangeCustomPort (e) {
    this.setState({
      customPort: e.target.value,
      selected: customPortIndex
    })
    this.props.change(this.props.config.name, e.target.value)
  }

  render () {
    const {config, values} = this.props
    const { items, customPort, selected } = this.state
    let ports = []

    items.forEach((item, i) => {
      ports.push(
        <div className="col-md-4 p-none pb-custom" key={i}>
          <label>
            <input type="radio" checked={selected === item.value} onChange={this.onChange.bind(this, item.value)}/>
            <span className="margin-xs-left">{item.display}</span>
          </label>
        </div>
      )
    })

    ports.push(
      <label className="col-md-4 p-none pb-custom" key="-1">
        <input type="radio" className="margin-xs-right" checked={selected === customPortIndex} onChange={this.onChange.bind(this, customPortIndex)}/>
        <input type="text" value={customPort} placeholder="Custom Port" onChange={this.onChangeCustomPort.bind(this)} onFocus={this.onChange.bind(this, customPortIndex)}/>
      </label>
    )

    let extra = []
    config.extra && config.extra.forEach(item => {
      let itemConfig = $.extend({}, item, {useColumn: true}) // eslint-disable-line no-undef
      extra.push(this.props.buildInput(itemConfig, values))
    })

    return (
      <div data-name={config.name}>
        <div className="row" style={{margin: '8px 0 0 0'}}>
          {ports}
        </div>
        <Field type="hidden" name={config.name} component="input"/>
      </div>
    )
  }
}

PortList.defaultProps = {
  config: {},
  values: {},
  buildInput: null
}
