import React from 'react'
import {appendComponent, removeComponent} from '../../../../util/Component'
import { InputBase } from 'react-serial-forms'
import PortModal from './PortModal'

import {findIndex} from 'lodash'

export default class PortList extends InputBase {
  constructor (props) {
    super(props)

    let config = this.props.config

    this.state = {
      items: config.items.map(item => item),
      selected: []
    }

    let name = props.name
    let values = props.values
    if (name && values[name] !== undefined) {
      values[name].forEach(port => {
        let index = findIndex(this.state.items, item => {
          return parseInt(item.value) === parseInt(port)
        })
        if (index >= 0) this.state.selected.push(index)
      })
    }
  }

  getInitialValue () {
    return []
  }

  render () {
    let config = this.props.config
    let values = this.props.values
    let ports = []

    this.state.items.forEach((item, i) => {
      ports.push(
                <div className="col-md-4 p-none pb-custom" key={i}>
                    <label>
                        <input type="checkbox"
                          value={item.value}
                          checked={this.state.selected.indexOf(i) >= 0}
                          onChange={this.onChange.bind(this, i)}/>
                        <span className="margin-xs-left">{item.display}</span>
                    </label>
                </div>
            )
    })

    let extra = []
    config.extra.forEach(item => {
      let itemConfig = $.extend({}, item, {useColumn: true}) // eslint-disable-line no-undef
      extra.push(this.props.buildInput(itemConfig, values))
    })

    return (
            <div data-name={config.name}>
                <div className="row" style={{margin: '8px 0 0 0'}}>
                    {ports}
                </div>
                <div className="row" style={{margin: 0}}>
                    <div className="col-md-1">
                        <a href="javascript:;" onClick={this.onClickAdd.bind(this)}>Add</a>
                    </div>
                    {extra}
                </div>
            </div>
    )
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

  onChange (index, event) {
    let selected = this.state.selected
    let pos = selected.indexOf(index)
    if (pos >= 0) {
      selected.splice(pos, 1)
    } else {
      selected.push(index)
    }

    this.setState({selected})

    this.updateValue(selected.map(item => this.state.items[item].value))
  }
}

PortList.defaultProps = {
  config: {},
  values: {},
  buildInput: null
}
