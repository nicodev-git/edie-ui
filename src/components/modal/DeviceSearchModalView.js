import React, { Component } from 'react'
import Modal from 'react-bootstrap-modal'
import Autocomplete from 'react-autocomplete'
import { Header, SubHeader, CloseButton } from './parts'

export default class DeviceSearchModalView extends Component {
  render () {
    const {show, onHide, value, selected, items, styles,
      onSelect, onChange, onRemove} = this.props
    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >
        <Header name="Device Search" />
        <div className="modal-body bootstrap-dialog-message">
          <div className="search-modal-container">
            <SubHeader name="Search:"/>
            <div className="inline" style={{position: 'relative'}}>
              <Autocomplete
                inputProps={{
                  name: 'Device',
                  id: 'device-autocomplete'
                }}
                className="form-control input-sm"
                menuStyle={{
                  borderRadius: '3px',
                  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  padding: '2px 0',
                  fontSize: '90%',
                  position: 'absolute',
                  overflow: 'auto',
                  maxHeight: '300px',
                  top: '100%',
                  left: 0
                }}
                ref="autocomplete"
                value={value}
                items={items}
                getItemValue={(item) => item.name}
                onSelect={onSelect}
                onChange={onChange}
                renderItem={(item, isHighlighted) => (
                    <div
                      style={isHighlighted ? styles.highlightedItem : styles.item}
                      key={item.id}
                      id={item.id}
                    >{item.name}</div>
                )}
              />
            </div>
          </div>
          <div className="margin-md-top" style={{height: '300px', overflow: 'auto'}}>
            <table className="table table-hover">
              <tbody>
              {
                selected.map(device =>
                  <tr key={device.id}>
                    <td>{device.name}</td>
                    <td style={{width: '40px'}}>
                      <a href="javascript:;" onClick={onRemove.bind(this, device)}>
                        <i className="fa fa-times" />
                      </a>
                    </td>
                  </tr>
                )
              }
              </tbody>
            </table>
          </div>
          <CloseButton onClose={onHide}/>
        </div>
      </Modal>
    )
  }
}
