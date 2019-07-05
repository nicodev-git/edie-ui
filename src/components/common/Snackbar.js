import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SearchIcon from '@material-ui/icons/Search'

const searchIconStyle = {
  marginTop: '6px'
}

export default class IncidentSnackbar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
    this.onClickAlert = this.onClickAlert.bind(this)

    this.searchIcon = <SearchIcon nativeColor="white" style={searchIconStyle}/>
    this.onSnackClose = this.onSnackClose.bind(this)
  }
  onSnackClose (reason) {
    // console.log(reason)
  }
  onClickAlert () {
    this.props.onClose()
    if (!this.props.action)
      return
    const {incident} = this.props.newIncidentMsg
    const q = `(id:${incident.id})`
    this.props.history.push('/search')
    this.props.updateQueryParams({
      q: `(type:incident) AND ${q}`,
      draw: 1
    }, {
      q,
      types: ['incident']
    }, this.props.history)
  }
  render () {
    const { newIncidentMsg } = this.props
    if (!newIncidentMsg) return null
    // const keep = userInfo && userInfo.keepIncidentAlert
    return (
      <div className="link" onClick={this.onClickAlert}>
        <Snackbar
          open
          action={this.props.action ? this.searchIcon : ''}
          message={newIncidentMsg.message}
          autoHideDuration={3600000 * 24 * 7}          
          onClose={this.props.onClose}
        />
        <span className="hidden">{newIncidentMsg.incident.id}</span>
      </div>
    )
  }
}
