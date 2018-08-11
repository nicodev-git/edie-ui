import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import {Modal, CardPanel} from 'components/modal/parts'
import FloatingMenu from 'components/common/floating/FloatingMenu'

const divStyle = {
  minHeight: 500
}

export default class ProductTypeVendorModalView extends React.Component {
  renderTypes () {
    const {productTypes} = this.props
    return (
      <CardPanel title="Vendor" className="flex-1">
        <div style={divStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productTypes.map(p =>
                <TableRow key={p.id} component="th" scope="row">
                  {p.name}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <FloatingMenu menuItems={[]}/>
      </CardPanel>
    )
  }
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose}>
        <div className="flex-horizontal">
          {this.renderTypes()}
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