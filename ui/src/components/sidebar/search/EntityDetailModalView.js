import React from 'react'
import {Checkbox} from 'material-ui'

import { Modal, CardPanel } from 'components/modal/parts'
import ReactJson from 'react-json-view'

export default class EntityDetailModalView extends React.Component {
  render () {
    const {onHide, detailEntity, isShowNull, onCheckShowNull} = this.props
    return (
      <Modal title="Detail" onRequestClose={onHide} contentStyle={{width: 1035, maxWidth: 'initial'}}>
        <CardPanel title="Detail">
          <Checkbox label="Show Null" checked={isShowNull} onCheck={onCheckShowNull}/>
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
