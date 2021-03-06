import React from 'react'
import moment from 'moment'
import ReactToolTip from 'react-tooltip'
import {debounce} from 'lodash'
import PageViewIcon from '@material-ui/icons/Pageview'

import { getSeverityIcon } from 'shared/Global'
import CommentsModal from 'components/common/incident/CommentsModal'
import InfiniteTable from 'components/common/InfiniteTable'
import { showPrompt } from 'components/common/Alert'

import {
  showIncidentDetail,
  showIncidentRaw
} from 'components/common/incident/Incident'

import {
  thumbup, thumpdown, done, notdone,
  rawtext, reason, openicon
} from 'style/common/materialStyles'
import EntityDetailModal from '../../../sidebar/search/EntityDetailModal'

const searchBtnStyle = {
  height: 22,
  marginTop: -4
}

export default class IncidentTable extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      openExceptionModal: false,
      commentModalVisible: false,
      incident: null
    }

    this.tooltipRebuild = debounce(ReactToolTip.rebuild, 100)

    this.cells = [{
      'displayName': 'Severity',
      'columnName': 'entity.severity',
      'cssClassName': 'text-center width-80',
      'customComponent': (props) => {
        return getSeverityIcon(props.data, 24)
      }
    }, {
      'displayName': 'Date/Time',
      'columnName': 'entity.startTimestamp',
      'cssClassName': 'nowrap text-center width-140',
      'customComponent': (props) => {
        const {data} = props
        if (!data) return <span/>
        return (
          <span data-tip={moment(new Date(data)).format('YYYY-MM-DD HH:mm:ss')}>
            {moment(new Date(data)).fromNow()}
          </span>
        )
      }
    }, {
      'displayName': 'System',
      'columnName': 'entity.monitorName',
      'cssClassName': 'width-200',
      'customComponent': p => {
        const {workflow} = p.rowData.entity
        return <span>{p.rowData.entity.devicename}({workflow || p.data})</span>
      }
    }, {
      'displayName': 'Incident',
      'columnName': 'entity.data',
      'customComponent': (props) => {
        let str = props.data ? JSON.stringify(props.data) : (props.rowData.entity.description || '')
        if (str.length > 500) str = `${str.substring(0, 500)}...`
        return (
          <div>
            {str}
            <div className="pull-right" style={searchBtnStyle}>
              <PageViewIcon onClick={this.onClickDetail.bind(this, props.rowData.entity)} className="link"/>
            </div>
          </div>
        )
      }
    }, {
      'displayName': 'Actions',
      'columnName': 'entity.actions',
      'cssClassName': 'nowrap width-220',
      'customComponent': (p) => {
        const row = p.rowData.entity
        row.id = p.rowData.id
        return (
          <div className="table-icons-container">
            <div onClick={() => showIncidentDetail(row)}>
              {openicon}
            </div>
            &nbsp;

            <div onClick={() => { props.ackIncident(row) }}>
              {row.acknowledged ? thumbup : thumpdown}
            </div>
            &nbsp;

            <div onClick={() => this.onClickFixIncident(row)}>
              {row.fixed ? done : notdone}
            </div>
            &nbsp;

            <div onClick={showIncidentRaw.bind(null, row)}>
              {rawtext}
            </div>
            &nbsp;

            {
              (row.fixed && !row.whathappened)
                ? <div onClick={this.showIncidentComments.bind(this, row)}>
                  {reason}
                </div>
                : null
            }

          </div>
        )
      }
    }]
  }
  onRowDblClick () {

  }
  showIncidentComments (incident) {
    this.setState({
      incident,
      commentModalVisible: true
    })
  }
  onClickFixIncident (incident) {
    showPrompt('Please type comment.', '', text => {
      if (!text) return

      const {userInfo} = this.props
      const user = userInfo ? userInfo.username : 'User'
      
      this.props.fixIncident(incident, user, text)
    })
  }
  onResultCountUpdate (total, data) {
    this.tooltipRebuild()
  }

  onClickDetail (detailData) {
    this.setState({
      detailData
    })
  }

  renderDetailModal () {
    const {detailData} = this.state
    if (!detailData) return null
    return (
      <EntityDetailModal
        detailEntity={detailData || {}}
        noHighlight
        onClose={() => this.setState({detailData: null})}
      />
    )
  }

  render () {
    const {incident} = this.state
    const {params} = this.props
    return (
      <div className="flex-1">
        <InfiniteTable
          cells={this.cells}
          ref="table"
          rowMetadata={{'key': 'id'}}
          selectable
          allowMultiSelect
          onRowDblClick={this.onRowDblClick.bind(this)}
          tableClassName="table-panel2"

          onUpdateCount={this.onResultCountUpdate.bind(this)}

          url="/search/query"
          params={params}
          rowHeight={40}
        />

        {this.state.commentModalVisible &&
        <CommentsModal
          incident={incident}
          updateDeviceIncident={this.props.updateDeviceIncident}
          onClose={() => {
            this.setState({commentModalVisible: false})
          }}/>}
        {this.renderDetailModal()}
        <ReactToolTip/>
      </div>
    )
  }
}
