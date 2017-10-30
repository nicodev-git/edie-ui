import React from 'react'
import {Checkbox} from 'material-ui'
import JSONTree from 'react-json-tree'
// import ReactJson from 'react-json-view'

import { Modal, CardPanel } from 'components/modal/parts'

/*
<ReactJson
              name={false}
              displayDataTypes={false}
              displayObjectSize={false}
              src={detailEntity}
              valueRenderer={valueRenderer}
            />
 */
export default class EntityDetailModalView extends React.Component {
  render () {
    const {onHide, detailEntity, isShowNull, onCheckShowNull, valueRenderer} = this.props
    return (
      <Modal title="Detail" onRequestClose={onHide} contentStyle={{width: 1035, maxWidth: 'initial'}}>
        <CardPanel title="Detail">
          <Checkbox label="Show Null" checked={isShowNull} onCheck={onCheckShowNull}/>
          <div style={{width: '100%', overflow: 'auto'}}>
            <JSONTree
              data={detailEntity}
              invertTheme
              shouldExpandNode={() => true}
            />
          </div>

        </CardPanel>
      </Modal>
    )
  }
}
