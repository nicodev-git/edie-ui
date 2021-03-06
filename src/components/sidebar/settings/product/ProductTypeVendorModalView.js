import React from 'react'
import {Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import {Modal, CardPanel} from 'components/modal/parts'
import FloatingMenu from 'components/common/floating/FloatingMenu'

const divStyle = {
  height: 460,
  overflow: 'auto'
}

export default class ProductTypeVendorModalView extends React.Component {
  renderTypes () {
    const {productTypes, onClickAddType, onClickEditType, onClickDeleteType,
      selectedTypeId, onSelectType} = this.props
    return (
      <CardPanel title="Product Type" className="flex-1">
        <div style={divStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              <TableRow
                selected={!selectedTypeId}
                onClick={() => onSelectType(null)}>
                <TableCell>All</TableCell>
                <TableCell></TableCell>
              </TableRow>
              {productTypes.map(p =>
                <TableRow
                  key={p.id}
                  selected={selectedTypeId === p.id}
                  onClick={() => onSelectType(p)}
                >
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
    const {filteredVendors, onClickAddVendor, onClickEditVendor, onClickDeleteVendor,
      selectedVendorId, onSelectVendor} = this.props
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
              <TableRow
                selected={!selectedVendorId}
                onClick={() => onSelectVendor(null)}>
                <TableCell>All</TableCell>
                <TableCell></TableCell>
              </TableRow>
              {filteredVendors.map(p =>
                <TableRow
                  key={p.id}
                  selected={selectedVendorId === p.id}
                  onClick={() => onSelectVendor(p)}>
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
  renderProducts () {
    const {filteredProducts, onClickAddProduct, onClickEditProduct, onClickDeleteProduct} = this.props
    return (
      <CardPanel title="Product" className="flex-1">
        <div style={divStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map(p =>
                <TableRow key={p.id}>
                  <TableCell  component="th" scope="row">
                    {p.name}
                  </TableCell>
                  <TableCell className="nowrap">
                    <EditIcon className="link margin-sm-right" onClick={() => onClickEditProduct(p)}/>
                    <DeleteIcon className="link" onClick={() => onClickDeleteProduct(p)}/>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <FloatingMenu menuItems={[]} onClickMain={onClickAddProduct}/>
      </CardPanel>
    )
  }
  render () {
    const {onClickClose} = this.props
    return (
      <Modal title="Product" onRequestClose={onClickClose} contentStyle={{width: 1400}}>
        <div className="flex-horizontal">
          {this.renderTypes()}
          <div style={{width: 12}}></div>
          {this.renderVendors()}
          <div style={{width: 12}}></div>
          {this.renderProducts()}
        </div>
        {this.props.children}
      </Modal>
    )
  }
}