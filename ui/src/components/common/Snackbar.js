import React from 'react'
import Snackbar from 'material-ui/Snackbar'
import SearchIcon from 'material-ui/svg-icons/action/search'
import { assign } from 'lodash'

import { parseSearchQuery, severities } from 'shared/Global'

const searchIconStyle = {
  marginTop: '6px'
}

export default class IncidentSnackbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.onClickAlert = this.onClickAlert.bind(this)

    this.searchIcon = <SearchIcon color="white" style={searchIconStyle}/>
  }
  onClickAlert () {
    const {incident} = this.props.newIncidentMsg
    const query = (incident.description || '').replace(/:/gi, '')
    const newChips = parseSearchQuery(query)
    if (incident.devicename) {
      newChips.push({
        name: 'devicename',
        value: incident.devicename
      })
    }
    this.props.history.push('/search')
    this.props.updateQueryChips(newChips)
    this.props.updateSearchParams(assign({}, this.props.searchParams, {
      query: newChips.map(m => `${m.name}=${m.value}`).join(' and '),
      severity: severities.map(p => p.value).join(',')
    }), this.props.history)
  }
  render () {
    const { newIncidentMsg, userInfo } = this.props
    if (!newIncidentMsg) return null
    const keep = userInfo && userInfo.keepIncidentAlert
    return (
      <a href="javascript:;" onClick={this.onClickAlert}>
        <Snackbar
          open
          action={this.searchIcon}
          message={newIncidentMsg.message}
          autoHideDuration={8000}
          onActionTouchTap={this.onClickAlert}
          onRequestClose={keep ? this.fnEmpty : null}
        />
      </a>
    )
  }
}
