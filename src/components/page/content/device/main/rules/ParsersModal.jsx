import React from 'react'
import Modal from 'react-bootstrap-modal'
import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'

export default class ParsersModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,

            data: [],

            selectedIndex: -1,
        }
    }

    componentWillMount() {
        this.loadParsers()
    }

    ////////////////////////////////////////////

    loadParsers() {
        $.get(Api.rule.getParsersForDevice, {
            deviceid: this.props.device.id
        }).done(res => {
            this.setState({
                data: res
            })
        });
    }


    ////////////////////////////////////////////

    render() {
        return (
        <Modal show={this.state.open} onHide={this.onHide.bind(this)}
               aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary">

            <div className="modal-header">
                <h4 className="modal-title bootstrap-dialog-title">
                    Parsers
                </h4>
                <div className="bootstrap-dialog-close-button">
                    <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
                </div>
            </div>

            <div className="modal-body bootstrap-dialog-message">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Parser</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((item, i) =>
                            <tr key={i}  
                                className={this.state.selectedIndex == i ? "selected" : ""}
                                onClick={() => {this.setState({selectedIndex: i})}}>
                                <td>{item}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
                <div className="text-right p-none">
                    <a href="javascript:;" className="btn btn-primary btn-sm margin-sm-right" onClick={this.onClickSave.bind(this)}>OK</a>
                    <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickClose.bind(this)}>Cancel</a>
                </div>
            </div>
        </Modal>
        )
    }

    openModal() {
        this.setState({
            open: true
        })
    }

    onHide(data) {
        this.setState({
            open: false
        }, () => {
            this.props.onClose &&
            this.props.onClose(this, data)
        })
    }

    onClickClose() {
        this.onHide()
    }

    onClickSave() {
        if (this.state.selectedIndex < 0) {
            showAlert("Please select parser.")
            return
        }

        let parser = this.state.data[this.state.selectedIndex]

        this.onHide({parser})
    }
}

ParsersModal.defaultProps = {
    device: {},

    onClose: null,
}