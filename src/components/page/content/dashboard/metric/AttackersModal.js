import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Button } from 'react-bootstrap'
import { assign, findIndex } from 'lodash'
import { connect } from 'react-redux'

import InfiniteTable from 'components/shared/InfiniteTable.jsx'

import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'
import { dateFormatter, getSeverityIcon, getIncidenttypeIcon } from 'shared/Global.js'
import { appendComponent, removeComponent } from 'util/Component.js'
import countries from 'country-data/data/countries.json'

import { fetchAttackers } from 'actions/index'

class AttackersModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }

        this.cells = [{
            "displayName": "Source IP",
            "columnName": "ipaddress",
            "customComponent": (props) => {
                let row = props.rowData
                let val = props.data
                let index = findIndex(countries, {name: row.ipcountry})
                if (index < 0) return <span>{val}</span>

                let iso_code = (countries[index].alpha2 || "").toLowerCase();
                let flag;
                if(!iso_code) iso_code = "_European Union"
                if(iso_code) flag = <img src={'/images/flags/32/' + iso_code + '.png'} title={row.ipcountry}/>

                return <span>{flag}&nbsp;{val}</span>;
            }
        }, {
            "displayName": "# Of Attacks",
            "columnName": "result",
        }, {
            "displayName": "Attack Duration",
            "columnName": "min",
            "customComponent": (props) => {
                let row = props.rowData
                let val = props.data
                var from = this.dateFormatter2(val);
                var to = this.dateFormatter(row.max);
                return <span>{from + ' - ' + to}</span>
            }
        }, {
            "displayName": "Attack Risk",
            "columnName": "incidentseverity",
            "cssClassName": "text-center",
        }, {
            "displayName": "Attacked Systems",
            "columnName": "devicename",
        }]
    }

    render() {
        return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary modal-md">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Attackers Today
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message">
                    <InfiniteTable
                        url="/bi/getAllAttackers"
                        params={this.state.params}
                        cells={this.cells}
                        ref="table"
                        rowMetadata={{"key": "ipaddress"}}
                        bodyHeight={500}
                        selectable={true}
                    />
                </div>
            </Modal>
        )
    }

    renderTable() {

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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    dateFormatter(date) {
        var serverTZ = '+0300';
        var diff = (new Date() - new Date(date + " " + serverTZ)) / 1000;
        diff = diff.toFixed(0);
        if(diff < 1) diff = 1;
        var label = "";

        if(diff < 60) {
            label = "Attacking Now";

        } else if(diff < 3600) {
            diff = parseInt(diff / 60);
            if(diff == 1)
                label = diff + " minute ago" ;
            else
                label = diff + " minutes ago" ;
        } else {
            diff = parseInt(diff / 3600);
            if(diff == 1)
                label = diff + " hour ago" ;
            else
                label = diff + " hours ago" ;
        }

        return label;
    }

    dateFormatter2(date) {
        var serverTZ = '+0300';
        var diff = (new Date() - new Date(date + " " + serverTZ)) / 1000;
        diff = diff.toFixed(0);
        if(diff < 1) diff = 1;
        var label = "";

        if(diff < 60) {
            label = "Attacking Now";

        } else if(diff < 3600) {
            diff = parseInt(diff / 60);
            if(diff == 1)
                label = diff + " minute ago" ;
            else
                label = diff + " minutes ago" ;
        } else {
            diff = parseInt(diff / 3600);
            if(diff == 1)
                label = diff + " hour ago" ;
            else
                label = diff + " hours ago" ;
        }

        return label;
    }
}

AttackersModal.defaultProps = {
    onClose: null,
}


function mapStateToProps(state) {
    return {attackers: state.dashboard.attackers};
}

export default connect(mapStateToProps, { fetchAttackers })(AttackersModal)
