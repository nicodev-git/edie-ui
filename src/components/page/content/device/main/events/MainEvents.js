import React, { Component } from 'react'
// import Dimensions from 'react-dimensions' // Never used
import { escapeRegExp } from 'lodash'
import moment from 'moment'
import {
    ButtonGroup,
    Button
} from 'react-bootstrap'

import { appendComponent, removeComponent } from '../../../../../../util/Component'
import { showAlert, showConfirm } from '../../../../../shared/Alert'

import { ResponsiveInfiniteTable } from '../../../../../shared/InfiniteTable'
import MarkIgnoreModal from '../raw-incidents/MarkIgnoreModal'
import SimulatorModal from '../rules/SimulatorModal'
import DeviceWizardContainer from '../../../../../../containers/shared/wizard/DeviceWizardContainer'

import MainTabs from '../MainTabs'
import TabPage from '../../../../../shared/TabPage'
import TabPageBody from '../../../../../shared/TabPageBody'
import TabPageHeader from '../../../../../shared/TabPageHeader'

import { ROOT_URL } from '../../../../../../actions/config'

export default class MainEvents extends Component {
  constructor (props) {
    super(props)

    const {device} = this.props

    this.state = {

      url: '/incidentstable/getRawIncidentsForDeviceidInDatatable',
      params: {
        deviceid: device.id
      }
    }

    this.cells = [{
      'displayName': 'IP Address',
      'columnName': 'ip',
      'cssClassName': 'width-140',
      'customComponent': props => {
        const row = props.rowData
        let data = ''
        const {externalIP} = this.props.device || {}
        if (externalIP) data += `WANIP: ${externalIP}<br/>`
        data = `${data}LAN IP:${row.ip}`

        return this.highlightRender({data})
      }
    }, {
      'displayName': 'Datetime',
      'columnName': 'datetime',
      'cssClassName': 'width-200',
      'customComponent': props => {
        const row = props.rowData
        let data = moment(row.datetime).format('YYYY-MM-DD HH:mm:ss').toString()
        return this.highlightRender({data})
      }
    }, {
      'displayName': 'Rawdata',
      'columnName': 'rawdata',
      'customComponent': this.highlightRender.bind(this)
    }, {
      'displayName': 'Description',
      'columnName': 'description',
      'customComponent': this.highlightRender.bind(this)
    }]
  }

  // componentWillMount () {
  //   const {device} = this.props
  //   this.props.fetchDeviceEvents(device.id)
  // }

  highlightRender (props) {
    let data = props.data || ''
    data = data.replace(/(\\r\\n)+/gi, '<br/>')
    data = data.replace(/(\\n)+/gi, '<br/>')
    data = data.replace(/\\t/gi, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

    let keyword = this.state.params.text

    if (keyword) {
      data = data.replace(new RegExp(escapeRegExp(keyword), 'gi'), function (v) {
        return `<span class="bg-highlight">${v}</span>`
      })
    }

    return <span style={{ fontSize: '11px' }} dangerouslySetInnerHTML={{ __html: data }}/> // eslint-disable-line react/no-danger
  }

  renderTable () {
    const {device} = this.props
    return (
      <ResponsiveInfiniteTable
        cells={this.cells}
        ref="table"
        rowMetadata={{'key': 'id'}}
        selectable
        onRowDblClick={this.onRowDblClick.bind(this)}

        url="/event/search/findBy"
        params={{
          deviceid: device.id,
          sort: 'datetime,desc'
        }}
        pageSize={20}
      />
    )
  }

  getTable () {
    return this.refs.table.refs.wrappedInstance
  }

  onFilterChange (params) {
    this.setState({
      params: Object.assign({}, this.state.params, {
        text: params.text
      })
    })
  }

  onRowDblClick (sel) {
    this.onClickMakeRule()
  }

  onClickMakeRule () {
    this.showMakeRule()
  }

  onClickDeleteRaw () {
    let count = this.getTable().getTotalCount()

    if (count === 0) return window.alert('No events.')
    showConfirm(`Do you want to delete ${count} event${count > 1 ? 's' : ''}?`, btn => {
      if (btn !== 'ok') return

      setLoadingState(true) // eslint-disable-line no-undef
      showLoading() // eslint-disable-line no-undef
      $.get(`${ROOT_URL}${Api.incidents.deleteRawIncidents}`, { // eslint-disable-line no-undef
        deviceid: this.props.device.id,
        text: this.state.params.text
      }).done(res => {
        if (res.success) {
          this.getTable().refresh()
        } else {
          showAlert('Failed!')
        }
      }).fail(() => {
        showAlert('Failed!')
      }).always(() => {
        hideLoading() // eslint-disable-line no-undef
      })
    })
  }

  onClickMarkIgnored () {
    let data = this.getTable().getSelected()
    if (!data) {
      showAlert('Please choose a row to mark.')
      return
    }

    appendComponent(
      <MarkIgnoreModal
        device={this.props.device}
        message={data.message}
        onClose={this.onCloseMarkIgnore.bind(this)}
      />
    )
  }

  onCloseMarkIgnore (modal, success) {
    removeComponent(modal)
    if (success) this.getTable().refresh()
  }

  showMakeRule () {
    let data = this.getTable().getSelected()

    if (!data) {
      showAlert('Please choose a row.')
      return
    }

    const extra = {
      deviceid: this.props.device.id,
      idrulesNew: data.idrulesNew,
      remoteip: data.remoteip
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0
    }

    appendComponent(
      <DeviceWizardContainer
        deviceType="devicerule"
        onClose={removeComponent}
        extraParams={extra}
        configParams={config}
        onFinish={() => {
          this.getTable().refresh()
        }}
        values={data}
      />
    )
  }

  onClickRawSimulator () {
    let options = this.getTable().getSelected() || {}

    appendComponent(
      <SimulatorModal
        options={options}
        device={this.props.device}
        onClose={removeComponent}
        onAddRule={this.onAddRule.bind(this)}
      />
    )
  }

  onAddRule (values) {
    const extra = {
      deviceid: this.props.device.id
    }

    const config = {
      mapid: this.props.device.mapid,
      fatherid: 0
    }

    appendComponent(
      <DeviceWizardContainer
        deviceType="devicerule"
        onClose={removeComponent}
        extraParams={extra}
        configParams={config}
        values={values || {}}
        onFinish={() => {}}
      />
    )
  }

  render () {
    const {device} = this.props

    console.log(this.props)

    return (
      <TabPage>
        <TabPageHeader title={device.name}>
          <div className="text-center margin-md-top">
            <div className="pull-right">
              <ButtonGroup>

                <Button onClick={this.onClickMakeRule.bind(this)}>Make Rule</Button>
                <Button onClick={this.onClickDeleteRaw.bind(this)}>Delete All</Button>
                <Button onClick={this.onClickMarkIgnored.bind(this)}>Mark as ignored</Button>
                <Button onClick={this.onClickRawSimulator.bind(this)}>Simulator</Button>

              </ButtonGroup>
            </div>

            <div style={{margin: '0 auto', position: 'relative', width: '550px', textAlign: 'center'}}>
              <div className="inline" style={{position: 'relative'}}>
                <input type="text" placeholder="Search" className="form-control"
                  style={{width: '100%', paddingLeft: '35px'}}
                  onChange={this.onFilterChange}
                  ref="search"/>
                <a className="btn" href="javascript:;" style={{position: 'absolute', left: 0, top: 0}}>
                  <i className="fa fa-search" /></a>
              </div>
            </div>
          </div>
        </TabPageHeader>

        <TabPageBody tabs={MainTabs(device.id)} tab={2}>
          {this.renderTable()}
        </TabPageBody>
      </TabPage>
    )
  }
}
