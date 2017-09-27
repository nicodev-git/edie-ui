import React from 'react'
import { Modal, CardPanel } from 'components/modal/parts'
import ReactJson from 'react-json-view'

export default class EntityDetailModalView extends React.Component {
  render () {
    const {onHide, detailEntity} = this.props
    return (
      <Modal title="Detail" onRequestClose={onHide}>
        <CardPanel title="Detail">
          <ReactJson
            name={false}
            displayDataTypes={false}
            displayObjectSize={false}
            src={detailEntity}
          />
        </CardPanel>
      </Modal>
    )
  }
}
