import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import {Modal, CardPanel} from 'components/modal/parts'
import FloatingMenu from 'components/common/floating/FloatingMenu'

const divStyle = {
  height: 500,
  overflow: 'auto'
}

export default class ProductTypeVendorModalView extends React.Component {
  renderTypes () {
    const {productTypes, onClickAddType, onClickEditType, onClickDeleteType} = this.props
    return (
      <CardPanel title="Vendor Type" className="flex-1">
        <div style={divStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productTypes.map(p =>
                <TableRow key={p.id}>
                  <TableCell  component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell className="nowrap">
                    <EditIcon className="link margin-sm-right" onClick={() => onClickEditType(p)}/>
                    <DeleteIcon className="link" onClick={() => onClickDeleteType(p)}/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <FloatingMenu menuItems={[]} onClickMain={onClickAddType}/>
      </CardPanel>
    )
  }
  renderVendors () {
    const {productVendors, onClickAddVendor, onClickEditVendor, onClickDeleteVendor} = this.props

    return (
      <CardPanel title="Vendor" className="flex-1">
        <div style={divStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productVendors.map(p =>
                <TableRow key={p.id}>
                  <TableCell  component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell className="nowrap">
                    <EditIcon className="link margin-sm-right" onClick={() => onClickEditVendor(p)}/>
                    <DeleteIcon className="link" onClick={() => onClickDeleteVendor(p)}/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <FloatingMenu menuItems={[]} onClickMain={onClickAddVendor}/>
      </CardPanel>
    )
  }
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose} contentStyle={{width: 1000}}>
        <div className="flex-horizontal">
          {this.renderTypes()}
          <div style={{width: 12}}></div>
          {this.renderVendors()}
        </div>
        {this.props.children}
      </Modal>
    )
  }
}