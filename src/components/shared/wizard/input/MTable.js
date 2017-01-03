import React from 'react'
import { forIn } from 'lodash'
import { InputBase } from 'react-serial-forms'

import { util } from '../WizardUtil'
import { appendComponent, removeComponent } from '../../../../util/Component'

import MTypeModal from './MTypeModal'

export default class MTable extends InputBase {
  constructor (props) {
    super(props)

    let mdata = []

    forIn(props.values, (value, key) => {
      if (/^m\d*$/.exec(key) && value) {
        mdata.push({
          number: mdata.length + 1,
          value: value
        })
      }
    })

    this.state = {
      mdata: mdata,
      selectedIndex: -1
    }
  }

  getInitialValue () {
    return this.getCurrentValue()
  }

  render () {
    let config = this.props.config
    // let values = this.props.values // Never used

    // let width = util.calcWidth(config.width) // Never used
    //
    // let defaultValue = config.value
    // if (config.name && values[config.name] !== undefined)
    //     defaultValue = values[config.name]

    let input = (
      <div className="panel panel-default panel-noborder">
        <div className="panel-heading" style={{height: '35px'}}>
          <h4 className="panel-title" />
          <div className="panel-options">
            <a href="javascript:;"
              onClick={this.onClickAdd.bind(this)}><i className="fa fa-x fa-plus-square" /></a>
            <a href="javascript:;" className="margin-xs-left"
              onClick={this.onClickEdit.bind(this)}><i className="fa fa-x fa-edit" /></a>
            <a href="javascript:;" className="margin-xs-left"
              onClick={this.onClickRemove.bind(this)}><i className="fa fa-x fa-trash-o" /></a>
            <a href="javascript:;" className="margin-xs-left"
              onClick={this.onClickUp.bind(this)}><i className="fa fa-x fa-caret-square-o-up" /></a>
            <a href="javascript:;" className="margin-xs-left"
              onClick={this.onClickDown.bind(this)}><i className="fa fa-x fa-caret-square-o-down" /></a>
          </div>
        </div>
        <div className="panel-body"
          style={{maxHeight: '250px', minHeight: '70px', overflowY: 'auto', overflowX: 'hidden'}}>
          <table className="table table-hover dataTable">
            <thead>
              <tr>
                <th>Number</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.mdata.map((item, i) =>
                <tr key={i}
                  className={this.state.selectedIndex === i ? 'selected' : ''}
                  onClick={() => { this.setState({selectedIndex: i}) }} >
                    <td>{item.number}</td>
                    <td>{item.value}</td>
                </tr>
              )
            }
            </tbody>
          </table>
        </div>
      </div>
    )

    return util.wrapInputs(null, input, config['useColumn'])
  }

  onClickAdd () {
    this.showEditM(null, item => {
      let mdata = this.state.mdata
      mdata.push(item)
      mdata = this.updateNumbers(mdata)

      this.setState({mdata}, () => {
        this.changeValue()
      })
    }, this.state.mdata.length + 1)
  }

  onClickEdit () {
    if (this.state.selectedIndex < 0) return
    let data = this.state.mdata[this.state.selectedIndex]
    this.showEditM(data, item => {
      let mdata = this.updateNumbers(this.state.mdata)
      this.setState({mdata}, () => {
        this.changeValue()
      })
    }, this.state.selectedIndex + 1)
  }

  onClickRemove () {
    if (this.state.selectedIndex < 0) return

    let mdata = this.state.mdata
    mdata.splice(this.state.selectedIndex, 1)
    mdata = this.updateNumbers(mdata)

    this.setState({mdata}, () => {
      this.changeValue()
    })
  }

  onClickUp () {
    let pos = this.state.selectedIndex
    if (pos <= 0) return

    let mdata = this.state.mdata

    let temp = mdata[pos]
    mdata[pos] = mdata[pos - 1]
    mdata[pos - 1] = temp

    mdata = this.updateNumbers(mdata)
    this.setState({
      mdata: mdata,
      selectedIndex: pos - 1
    }, () => {
      this.changeValue()
    })
  }

  onClickDown () {
    let pos = this.state.selectedIndex
    let mdata = this.state.mdata
    if (pos < 0 || pos >= mdata.length - 1) return

    let temp = mdata[pos]
    mdata[pos] = mdata[pos + 1]
    mdata[pos + 1] = temp

    mdata = this.updateNumbers(mdata)
    this.setState({
      mdata: mdata,
      selectedIndex: pos + 1
    }, () => {
      this.changeValue()
    })
  }

    // ////////////////////////////////////////////////

  showEditM (item, callback, num) {
    appendComponent(
      <MTypeModal
        item={item}
        number={num}
        onClose={(modal, data) => {
          removeComponent(modal)
          if (data && callback) {
            callback(data)
          }
        }}
      />
    )
  }

  updateNumbers (mdata) {
    mdata.forEach((item, i) => {
      item.number = i + 1
    })

    return mdata
  }

  getCurrentValue () {
    let value = {}
    this.state.mdata.forEach(item => {
      value[`m${item.number}`] = item.value
    })
    return value
  }

  changeValue () {
    this.updateValue(this.getCurrentValue())
  }
}

MTable.defaultProps = {
  config: {},
  values: {}
}
