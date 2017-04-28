import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import { Pagination } from 'react-bootstrap'

import Preloader from '../../../../shared/Preloader'
import DeviceWizardContainer from 'containers/shared/wizard/DeviceWizardContainer'
import LogMatchModal from './LogMatchModal'

import { appendComponent, removeComponent } from '../../../../../util/Component'

import { ROOT_URL } from '../../../../../actions/config'

export default class MonitorLogModal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,

      selectedType: 'error',
      files: [],
      selectedFile: '',
      translate: false,
      keyword: '',

      lines: [],
      text: '',

      activePage: 1,
      pageLength: 50,
      totalPages: 0
    }

    this.draw = 1
  }

  render () {
    const { selectedType } = this.state

    return (
      <Modal show={this.state.open} onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

          <div className="modal-header">
            <h4 className="modal-title bootstrap-dialog-title">
              Log
            </h4>
            <div className="bootstrap-dialog-close-button">
              <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
            </div>
          </div>

          <div className="modal-body bootstrap-dialog-message p-none">
            <div className="panel panel-default mb-none">
              <div className="panel-heading" style={{height: '40px'}}>

                <a href="javascript:"
                  className="pull-left margin-sm-left"
                  style={{marginTop: '2px'}}
                  onClick={this.onClickNew.bind(this)}>
                  <i className="fa fa-plus-square fa-lg" title="Add New File" />
                </a>
                <a href="javascript:"
                  className="pull-left margin-sm-left hidden"
                  style={{marginTop: '2px'}}
                  onClick={this.onClickMatch.bind(this)}>
                  <i className="fa fa-credit-card fa-lg" title="Add New Matcher" />
                </a>

                <select className="input-sm margin-md-left"
                  style={{marginTop: '-3px'}}
                  value={this.state.selectedFile}
                  onChange={this.onChangeFile.bind(this)}>
                    {
                      this.state.files.map(item =>
                        <option key={item.name} value={item.value}>{item.name}</option>
                      )
                    }
                </select>

                <select className="input-sm margin-sm-left"
                  style={{marginTop: '-3px'}}
                  value={this.state.selectedType}
                  onChange={this.onChangeType.bind(this)}>
                  <option value="error">Error</option>
                  <option value="all">All</option>
                </select>

                <div className="navbar-search"
                  style={{display: 'inline-block', marginTop: '-3px', padding: 0}}>
                  <input type="text" placeholder="Search …"
                    className="form-control"
                    ref="search"
                    onKeyUp={this.onSearchKeyUp.bind(this)}/>
                  <button className="btn" type="submit">
                      <i className="fa fa-search" />
                  </button>
                </div>

                <label>
                  <input type="checkbox" id="input-translate"
                    value={this.state.translate}
                    onChange={this.onChangeTranslate.bind(this)}/>Translate
                </label>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="controls col-sm-12">
                    <div style={{position: 'absolute', left: 0, top: '50%', right: 0, textAlign: 'center', display: 'none'}}>No Results!</div>
                    <div style={{height: '445px', overflow: 'auto'}}>
                      <table className={`table table-hover dataTable ${selectedType === 'error' ? '' : 'hidden'}`}>
                        <tbody>{
                          this.state.lines.map((item, index) => <tr key={index}>
                            <td dangerouslySetInnerHTML={{__html: item }} />
                          </tr>)
                        }</tbody>
                      </table>
                      <div className={`log-content ${selectedType === 'all' ? '' : 'hidden'}`}
                        dangerouslySetInnerHTML={{__html: this.state.text }} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <Pagination
                      prev
                      next
                      first
                      last
                      ellipsis
                      boundaryLinks
                      items={this.state.totalPages}
                      maxButtons={5}
                      activePage={this.state.activePage}
                      onSelect={this.onChangePage.bind(this)}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
      </Modal>
    )
  }

  componentWillMount () {
    this.loadFiles()
  }

  onHide () {
    this.onClickClose()
  }

  onClickClose () {
    this.props.onClose && this.props.onClose(this)
  }

  onClickNew () {
    let extraParams = {
      mapid: this.props.father.mapid,
      fatherid: this.props.father.id,
      x: 0,
      y: 0,
      width: 48,
      height: 48,
      timeout: 60000
    }

    let configParams = {
      mapid: this.props.father.mapid,
      fatherid: this.props.father.id
    }

    appendComponent(
      <DeviceWizardContainer
        deviceType={'monitor-log-file'}
        onClose={removeComponent}
        extraParams={extraParams}
        configParams={configParams}
      />
    )
  }

  onClickMatch () {
    appendComponent(
      <LogMatchModal onClose={removeComponent} />
    )
  }

  onChangeType (e) {
    this.setState({
      selectedType: e.target.value
    }, () => {
      this.loadFiles()
    })
  }

  onSearchKeyUp (e) {
    this.setState({
      keyword: e.target.value
    }, () => {
      this.loadLines()
    })
  }

  onChangeTranslate (e) {
    console.log(e.target.checked)
    this.setState({
      translate: e.target.checked
    }, () => {
      this.loadLines()
    })
  }

  onChangeFile (e) {
    this.setState({
      selectedFile: e.target.value
    }, () => {
      this.loadLines()
    })
  }

  onChangePage (eventKey) {
    this.setState({
      activePage: eventKey
    }, () => {
      this.loadLines()
    })
  }

  loadFiles () {
    let url = this.state.selectedType === 'all' ?
            Api.log.getFiles :
            Api.log.getErrorFiles

    let loader = appendComponent(<Preloader/>)

    $.get(`${ROOT_URL}${url}`, {
      deviceid: this.props.device.id
    }).done((data) => {
      if (!data) {
        hideLoading()
        return
      }

      let files = []
      if (this.state.selectedType === 'error') {
        files.push({
          value: '',
          name: '[All]'
        })
      }

      data.forEach(item => {
        files.push({
          value: item,
          name: item
        })
      })

      this.setState({ files })
    }).always(() => {
      removeComponent(loader)
    })
  }

  loadLines () {
    let url, params

    let type = this.state.selectedType

    if (type === 'all') {
      url = Api.log.getExistingContent
      params = {
        deviceid: this.props.device.id,
        log: this.state.selectedFile,
        length: this.state.pageLength,
        start: (this.state.activePage - 1) * this.state.pageLength,
        search: this.state.keyword,
        draw: this.draw++
      }
    } else {
      url = Api.log.getErrorsInLog
      params = {
        id: this.props.device.id,
        length: this.state.pageLength,
        filename: this.state.selectedFile,
        start: (this.state.activePage - 1) * this.state.pageLength,
        search: this.state.keyword,
        draw: this.draw++,
        heb7: this.state.translate
      }
    }

    let loader = appendComponent(<Preloader/>)

    $.get(`${ROOT_URL}${url}`, params).done((res) => {
      let totalPages = parseInt(Math.ceil(res.recordsTotal / this.state.pageLength))
      if (type === 'all') {
        let text = ''

        res.data.forEach(item => {
          text += `${highlightRender(item.line)}<br/>`
        })

        this.setState({ text, totalPages })
      } else {
        let lines = res.data.map(item => this.highlightRender(item.logfileline))
        this.setState({ lines, totalPages })
      }
    }).always(function () {
      removeComponent(loader)
    })
  }

  highlightRender (data) {
    if (!data) return ''
    if (!this.state.keyword) return data

    data = data.replace(new RegExp(escapeRegExp(me.keyword), 'gi'), (v) => {
      return `<span class="bg-highlight">${v}</span>`
    })

    return `<span>${data}</span>`
  }
}

MonitorLogModal.defaultProps = {
  device: {},
  father: {}
}
