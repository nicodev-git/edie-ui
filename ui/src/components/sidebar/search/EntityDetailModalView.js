import React from 'react'
import { Modal, CardPanel } from 'components/modal/parts'
import ReactJson from 'react-json-view'

export default class EntityDetailModalView extends React.Component {
  render () {
    const {onHide, detailEntity} = this.props
    return (
      <Modal title="Detail" onRequestClose={onHide} contentStyle={{width: 1035, maxWidth: 'initial'}}>
        <CardPanel title="Detail">
          <div style={{width: '100%', overflow: 'auto'}}>
            <ReactJson
              name={false}
              displayDataTypes={false}
              displayObjectSize={false}
              src={detailEntity}
            />
          </div>

        </CardPanel>
      </Modal>
    )
  }
}
