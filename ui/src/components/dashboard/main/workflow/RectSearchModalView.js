import React from 'react'

import {Modal} from 'components/modal/parts'
import CardPanel from "../../../modal/parts/CardPanel";

export default class RectSearchModalView extends React.Component {
  render () {
    const {onHide} = this.props
    return (
      <Modal title="Search Result" onRequestClose={onHide}>
        <CardPanel title="Search Result">

        </CardPanel>
      </Modal>
    )
  }
}
