import React, { Component } from 'react'
import SimpleModalContainer from '../../../../../containers/modal/SimpleModalContainer'
import { validate } from '../../../../modal/validation/NameValidation'

export default class MapSaveModal extends Component {
  doAction (values) {
    console.log('doing some action when form submitted')
    console.log(values)
    // TODO
    /* document.location.href = `${'/exportmap' + '?'}$.param({
      ${name},
      mapid: ${this.props.mapId}
    })` */
  }

  render () {
    let header = 'Export map'
    let content = [
      {name: 'Name'},
      {name: 'Description'}
    ]
    return (
      <SimpleModalContainer
        header={header}
        content={content}
        doAction={this.doAction.bind(this)}
        onClose={this.props.onClose}
        validate={validate}
      />
    )
  }
}
