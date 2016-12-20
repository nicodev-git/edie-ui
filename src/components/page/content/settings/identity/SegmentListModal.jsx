import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button,
} from 'react-bootstrap'

import InfiniteTable from 'components/shared/InfiniteTable.jsx'
import { showAlert, showConfirm } from 'components/shared/Alert.jsx'
import { appendComponent, removeComponent } from 'util/Component.jsx'

import SegmentModal from './SegmentModal.jsx'

class SegmentListModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }

        this.cells = [{
            "displayName": "Name",
            "columnName": "name",
        }, {
            "displayName": "Range",
            "columnName": "startip",
            "customComponent": (props) => {
                const row = props.rowData
                return <span>{row.startip + ' - ' + row.endip}</span>
            }
        }, {
            "displayName": "Location",
            "columnName": "location",
        }, {
            "displayName": "Country",
            "columnName": "country",
        }]
    }

    render() {

        const { identity } = this.props

        return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Segments
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message p-none">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <a href="javascript:;" onClick={this.onClickAdd.bind(this)} className="margin-sm-right">
                                <i className="fa fa-lg fa-plus-square"></i></a>
                            <a href="javascript:;" onClick={this.onClickEdit.bind(this)} className="margin-sm-right">
                                <i className="fa fa-lg fa-edit"></i></a>
                            <a href="javascript:;" onClick={this.onClickDelete.bind(this)} className="margin-sm-right">
                                <i className="fa fa-lg fa-trash-o"></i></a>
                        </div>
                        <div className="panel-body">
                            <InfiniteTable
                                url="/admin/getSegments"
                                params={{}}
                                cells={this.cells}
                                rowMetadata={{"key": "id"}}
                                selectable={true}
                                bodyHeight={400}
                                ref="segments"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    onHide() {
        this.onClickClose()
    }

    closeModal(data) {
        this.setState({ open: false}, () => {
            this.props.onClose &&
            this.props.onClose(this, data)
        })
    }

    onClickClose() {
        this.closeModal()
    }

    /////////////////////////////

    onClickAdd() {
        appendComponent(
            <SegmentModal onClose={this.onCloseModal.bind(this)}/>
        )
    }

    onClickEdit() {
        const selected = this.refs.segments.getSelected()
        if (!selected) return showAlert("Please select segment.")

        appendComponent(
            <SegmentModal onClose={this.onCloseModal.bind(this)}
                          segment={selected}/>
        )
    }

    onCloseModal(modal, segment) {
        removeComponent(modal)
        if (!segment) return

        this.refs.segments.refresh()
    }

    //////////////////////////////

    onClickDelete() {
        const selected = this.refs.segments.getSelected()
        if (!selected) return showAlert("Please select segment.")

        showConfirm("Click OK to remove.", (btn) => {
            if(btn != 'ok') return
            $.get(Api.admin.removeSegment, {
                id: selected.id
            }).done((res) => {
                if (!res.success) return showAlert("Remove failed!")

                this.refs.segments.refresh()
            }).fail(() => {
                showAlert("Remove failed!")
            })
        })

    }
}

SegmentListModal.defaultProps = {}

export default SegmentListModal