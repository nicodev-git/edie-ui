import React from 'react'
import {withRouter} from 'react-router'
import { Panel, PanelBody } from '../../../../shared/Panel'
import IncidentTable from './IncidentTable'

@withRouter
export default class MainIncidentPanel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.refreshTable = this.refreshTable.bind(this)
  }

  componentWillMount () {
    this.props.fetchIncidents()
  }

  renderTable () {
    return (
      <IncidentTable {...this.props} ref="table"/>
    )
  }

  onClickOpenModal (e) {
    e.preventDefault()

    this.props.router.push('/bigincidents')
  }

  onClickSearch () {

  }

  refreshTable () {
    this.refs.table && this.refs.table.getWrappedInstance() && this.refs.table.getWrappedInstance().refresh()
  }

  render () {
    const {hidden} = this.props
    if (hidden) return <div />

    return (
      <div className="incidents-row margin-sm-top flex-vertical flex-1"
        style={{minHeight: '600px'}}>
        <Panel className="margin-sm-bottom flex-vertical flex-1 main-panel table-panel">
          <PanelBody className="padding-xs flex-vertical flex-1">
            {this.renderTable()}
          </PanelBody>
        </Panel>
      </div>
    )
  }
}

MainIncidentPanel.defaultProps = {
  hidden: false
}
