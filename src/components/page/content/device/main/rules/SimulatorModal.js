import React from 'react'
import Modal from 'react-bootstrap-modal'

import {appendComponent, removeComponent} from '../../../../../../util/Component'
import { showAlert } from '../../../../../shared/Alert'

import ParsersModal from './ParsersModal'
import MTypeModal from './MTypeModal'

export default class SimulatorModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,

      parser: this.props.options.parser,

      mdata: [],
      selectedIndex: -1
    }
  }

    // //////////////////////////////////////////////////////////////////////////

  openModal () {
    this.setState({
      open: true
    })
  }

  onHide (success) {
    this.setState({
      open: false
    }, () => {
      this.props.onClose &&
            this.props.onClose(this, success)
    })
  }

  onClickClose () {
    this.onHide()
  }

    // //////////////////////////////////////////////////////////////////////////

  onChangeParser () {
    this.setState({
      parser: this.refs.parser.value
    })
  }

  onClickChoose () {
    this.showParsers(data => {
      this.setState({
        parser: data.parser
      })
    })
  }

  showParsers (callback) {
    appendComponent(
            <ParsersModal
              device={this.props.device}
              onClose={(modal, data) => {
                removeComponent(modal)

                if (data && callback) callback(data)
              }}
            />
        )
  }

    // //////////////////////////////////////////////////////////////////////////

  onClickAddM () {
    this.showEditM(null, item => {
      let mdata = this.state.mdata
      mdata.push(item)
      mdata = this.updateNumbers(mdata)

      this.setState({mdata})
    }, this.state.mdata.length + 1)
  }

  onClickEditM () {
    if (this.state.selectedIndex < 0) return
    let data = this.state.mdata[this.state.selectedIndex]
    this.showEditM(data, item => {
      let mdata = this.updateNumbers(this.state.mdata)
      this.setState({mdata})
    }, this.state.selectedIndex + 1)
  }

  onClickRemoveM () {
    if (this.state.selectedIndex < 0) return

    let mdata = this.state.mdata
    mdata.splice(this.state.selectedIndex, 1)
    mdata = this.updateNumbers(mdata)

    this.setState({mdata})
  }

  onClickMoveUpM () {
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
    })
  }

  onClickMoveDownM () {
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
    })
  }

  onClickRefreshM () {
    this.setState({
      mdata: [],
      selectedIndex: -1
    })
  }

  showEditM (item, callback, num) {
    appendComponent(
            <MTypeModal
              item={item}
              number={num}
              onClose={(modal, data) => {
                removeComponent(modal)

                if (data && callback) callback(data)
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
    // //////////////////////////////////////////////////////////////////////////

  onClickRun () {
    let params = {
      text: this.refs.text.value,
      filter1: this.refs.filter1.value,
      filter2: this.refs.filter2.value,
      parser: this.state.parser
    }

    let mdata = this.state.mdata
    mdata.forEach(item => {
      params[`m${item.number}`] = item.value
    })

    $.get(Api.rule.runSimulator, params) // eslint-disable-line no-undef
      .done(res => {
        $.each(res.object, (key, value) => { // eslint-disable-line no-undef
          let match = /^m(\d*)$/.exec(key)
          if (match && match.length > 1 && value) {
            let pos = parseInt(match[1]) - 1
            if (pos < 0) return

            let data = mdata[pos]
            if (data) {
              data.result = value
            } else {
              mdata.push({
                number: 1,
                value: 'Not Used',
                result: value
              })
            }

            mdata = this.updateNumbers(mdata)
            this.setState({
              mdata: mdata,
              selectedIndex: -1
            })
          }
        })
      }).fail(function (res) {
        showAlert('Service failed!')
      })
  }

  onClickAddRule () {
    const {onAddRule} = this.props

    let params = {
      rewriteval: this.refs.text.value,
      filter1: this.refs.filter1.value,
      filter2: this.refs.filter2.value,
      parser: this.state.parser
    }

    let mdata = this.state.mdata
    mdata.forEach(item => {
      params[`m${item.number}`] = item.value
    })

    onAddRule && onAddRule(params)
  }

  render () {
    // let rule = this.props.rule // Never used

    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            Simulator
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>
        <div className="modal-body bootstrap-dialog-message">
          <div className="panel panel-default panel-noborder">
            <div className="panel-heading" style={{display: this.props.options.hideAddButton ? 'none' : 'block'}}>
              <a href="javascript:;" onClick={this.onClickAddRule.bind(this)}>
                <i className="fa fa-x fa-plus-square" title="Add Rule" /></a>
            </div>
            <div className="panel-body">
              <div className="row margin-md-bottom">
                <label className="col-md-2 control-label">Text</label>
                <div className="col-md-10">
                  <textarea
                    className="form-control" ref="text" style={{minHeight: '90px'}}
                    defaultValue={this.props.options.message}
                  />
                </div>
              </div>

              <div className="row margin-md-bottom">
                <label className="col-md-2 control-label">Filter 1</label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control" ref="filter1"
                    defaultValue={this.props.options.prefilter1}
                  />
                </div>
              </div>

              <div className="row margin-md-bottom">
                <label className="col-md-2 control-label">Filter 2</label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control"
                    ref="filter2"
                    defaultValue={this.props.options.prefilter2}
                  />
                </div>
              </div>

              <div className="row margin-md-bottom">
                <label className="col-md-2 control-label">Parser</label>
                <div className="col-md-8">
                  <input
                    className="form-control"
                    ref="parser"
                    value={this.state.parser}
                    onChange={this.onChangeParser.bind(this)}
                  />
                </div>
                <div className="col-md-2 pr-none">
                  <a href="javascript:;" className="btn btn-primary btn-sm"
                    onClick={this.onClickChoose.bind(this)}>Choose</a>
                </div>
              </div>

              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-8">
                  <div className="padding-sm" style={{backgroundColor: '#f5f5f5'}}>

                    <a href="javascript:;" onClick={this.onClickAddM.bind(this)}
                      className="margin-sm-left"><i className="fa fa-x fa-plus-square" /></a>

                    <a href="javascript:;" onClick={this.onClickEditM.bind(this)}
                      className="margin-sm-left"><i className="fa fa-x fa-edit" /></a>

                    <a href="javascript:;" onClick={this.onClickRemoveM.bind(this)}
                      className="margin-sm-left"><i className="fa fa-x fa-trash-o" /></a>

                    <a href="javascript:;" onClick={this.onClickMoveUpM.bind(this)}
                      className="margin-sm-left"><i className="fa fa-x fa-caret-square-o-up" /></a>

                    <a href="javascript:;" onClick={this.onClickMoveDownM.bind(this)}
                      className="margin-sm-left"><i className="fa fa-x fa-caret-square-o-down" /></a>

                    <a href="javascript:;" onClick={this.onClickRefreshM.bind(this)}
                      className="margin-sm-left"><i className="fa fa-x fa-refresh" /></a>
                  </div>
                </div>
              </div>
              <div className="row margin-md-bottom">
                <div className="col-md-2" />
                <div className="col-md-8">
                  <table className="table table-hover" ref="match">
                    <thead>
                    <tr>
                      <th>Number</th>
                      <th>Type</th>
                      <th>Result</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                      this.state.mdata.map((item, i) =>
                        <tr key={i}
                          className={this.state.selectedIndex === i ? 'selected' : ''}
                          onClick={() => { this.setState({selectedIndex: i}) }}>

                          <td>{item.number}</td>
                          <td>{item.value}</td>
                          <td>{item.result}</td>

                        </tr>
                      )
                    }
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="text-right">
                <a href="javascript:;" className="btn btn-primary btn-sm btn-run"
                  onClick={this.onClickRun.bind(this)}>Run</a>
                <a href="javascript:;" className="btn btn-default btn-sm margin-sm-left"
                  onClick={this.onClickClose.bind(this)}>Close</a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
  }
}

SimulatorModal.defaultProps = {
  device: {},
  options: {},

  onClose: null,
  onAddRule: null
}
