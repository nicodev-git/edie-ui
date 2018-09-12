import React from 'react'

import {
  Modal,
  CardPanel
} from 'components/modal/parts'

export default class ProductPickModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selIndex: -1
    }
  }

  onClickRow (selIndex) {
    this.setState({selIndex})
    this.props.onPick(this.props.products[selIndex])
  }

  render() {
    const {products, onClose} = this.props

    return (
      <Modal title="Product" onRequestClose={onClose}>
        <CardPanel title="Product">
          <div style={{maxHeight: 400, overflow: 'auto'}}>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
              </thead>
              <tbody>
              {products.map((t, i) =>
                <tr key={t.id} onClick={() => this.onClickRow(i)}>
                  <td>{t.name}</td>
                  <td>{t.description}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </CardPanel>
      </Modal>
    )
  }
}