import React from 'react'

import {Modal, CardPanel} from 'components/modal/parts'
import FloatingMenu from 'components/common/floating/FloatingMenu'

const divStyle = {
  minHeight: 500
}

export default class ProductModalView extends React.Component {
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose}>
        <div className="flex-horizontal">
          <CardPanel title="Vendor" className="flex-1">
            <div style={divStyle}>

            </div>

            <FloatingMenu menuItems={[]}/>
          </CardPanel>
          <div style={{width: 12}}>
          </div>
          <CardPanel title="Vendor Type" className="flex-1">
            <div style={divStyle}>

            </div>
            <FloatingMenu menuItems={[]}/>
          </CardPanel>
        </div>
      </Modal>
    )
  }
}