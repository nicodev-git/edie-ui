import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'

import {Panel, PanelHeader, PanelOptions, PanelBody} from '../../../../shared/Panel'
import IncidentTable from './IncidentTable'

import { fetchIncidents, fixIncident, ackIncident } from '../../../../../actions'

class MainIncidentPanel extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
    }

    this.refreshTable = this.refreshTable.bind(this)
  }

  componentWillMount () {
    this.props.fetchIncidents()
  }

  render () {
    const {hidden} = this.props
    if (hidden) return <div />

    return (
            <div className="incidents-row margin-sm-top flex-vertical flex-1"
              style={{minHeight: '600px'}}>
                <Panel className="margin-sm-bottom flex-vertical flex-1">
                    <PanelHeader title="Incidents">
                        <PanelOptions>
                            <a href="javascript:;" onClick={this.onClickSearch.bind(this)}>
                                <i className="fa fa-search" />
                            </a>
                            <a href="javascript:;" className="margin-sm-left"
                              onClick={this.onClickOpenModal.bind(this)}>
                                <i className="fa fa-external-link" /></a>
                        </PanelOptions>
                    </PanelHeader>
                    <PanelBody className="padding-xs flex-vertical flex-1">
                        {this.renderTable()}
                    </PanelBody>
                </Panel>
            </div>
    )
  }

  renderTable () {
    return (
            <IncidentTable ref="table"
              incidents={this.props.incidents}
              fixIncident={this.props.fixIncident}
              ackIncident={this.props.ackIncident}/>
    )
  }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  onClickOpenModal (e) {
    e.preventDefault()

    this.props.router.push('/bigincidents')
  }

    // ///////////////////////////////////

  onClickSearch () {
        // emit(EVENTS.SEARCH_CLICKED, '')
  }

    // ////////////////////////////////////

  refreshTable () {
        // console.log("Received Incident Fixed!")
    this.refs.table &&
        this.refs.table.getWrappedInstance() &&
        this.refs.table.getWrappedInstance().refresh()
  }
}

MainIncidentPanel.defaultProps = {
  hidden: false
}

const mapStateToProps = (state) => {
  const { incidents } = state.dashboard
  return { incidents }
}

const actions = {
  fetchIncidents,
  fixIncident, ackIncident
}

export default withRouter(connect(mapStateToProps, actions)(MainIncidentPanel))
