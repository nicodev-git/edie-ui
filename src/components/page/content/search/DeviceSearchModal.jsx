import React from 'react'
import Modal from 'react-bootstrap-modal'
import Autocomplete from 'react-autocomplete'
import {findIndex} from 'lodash'
import { connect } from 'react-redux'

import { searchIncidentDevices } from 'actions/index'

const styles = {
    item: {
        padding: '2px 6px',
        cursor: 'default'
    },

    highlightedItem: {
        color: 'white',
        background: 'hsl(200, 50%, 50%)',
        padding: '2px 6px',
        cursor: 'default'
    },

    menu: {
        border: 'solid 1px #ccc'
    }
}

class DeviceSearchModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,

            value: '',
            loading: false,

            selected: props.selected || [],
        }
    }

    componentWillMount() {
        this.searchDevice('')
    }

    render() {
        return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Device Search
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×
                        </button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message form-inline">
                    <label className="inline margin-xs-right">Search: </label>
                    <div className="inline" style={{position: 'relative'}}>
                        <Autocomplete
                            inputProps={{
                            name: "Device",
                            id: "device-autocomplete",
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
                            left: 0,
                        }}
                            ref="autocomplete"
                            value={this.state.value}
                            items={this.props.incidentDevices}
                            getItemValue={(item) => item.name}
                            onSelect={(value, item) => {
                                    //this.setState({ value, devices: [ item ] })
                                    let {selected} = this.state
                                    const index = findIndex(selected, {id: value})
                                    if (index >= 0) return
                                    selected.push(item)
                                    this.setState({ value: '', selected})
                                }}
                            onChange={(event, value) => {
                                    this.setState({ value, loading: true })
                                    this.searchDevice(value)
                                }}
                            renderItem={(item, isHighlighted) => (
                                    <div
                                      style={isHighlighted ? styles.highlightedItem : styles.item}
                                      key={item.id}
                                      id={item.id}
                                    >{item.name}</div>
                                )}
                        />
                    </div>

                    <div className="margin-md-top" style={{minHeight: '200px'}}>
                        <table className="table table-hover">
                            <tbody>
                            {
                                this.state.selected.map(device =>
                                    <tr key={device.id}>
                                        <td>{device.name}</td>
                                        <td style={{width: '40px'}}>
                                            <a href="javascript:;" onClick={this.onClickRemove.bind(this, device)}>
                                                <i className="fa fa-times"></i>
                                            </a>
                                        </td>
                                    </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        )
    }

    onHide() {
        this.closeModal()
    }

    closeModal(data) {
        this.setState({open: false}, () => {
            this.props.onClose &&
            this.props.onClose(this, data)
        })
    }

    onClickClose() {
        this.closeModal(this.state.selected)
    }

    /////////////////////////////////////////

    searchDevice(keyword) {
        this.props.searchIncidentDevices({
            name: keyword
        })
    }

    onClickRemove(device) {
        let {selected} = this.state
        const index = selected.indexOf(device)
        if (index < 0) return
        selected.splice(index, 1)

        this.setState({selected})
    }
}

DeviceSearchModal.defaultProps = {
    onClose: null,
    selected: []
}

function mapStateToProps(state) {
    return {
        incidentDevices: state.search.incidentDevices,
    }
}

const actions = {
    searchIncidentDevices
}

export default connect(mapStateToProps, actions)(DeviceSearchModal)