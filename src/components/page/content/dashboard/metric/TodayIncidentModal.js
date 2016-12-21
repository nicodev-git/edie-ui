import React from 'react'
import Modal from 'react-bootstrap-modal'
import { Button } from 'react-bootstrap'
import moment from 'moment'
import Select from 'react-select'
import { assign } from 'lodash'

import InfiniteTable from 'components/shared/InfiniteTable.jsx'
import AddExceptionModal from './AddExceptionModal.js'

import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'
import { dateFormatter, getSeverityIcon, getIncidenttypeIcon } from 'shared/Global.js'
import { appendComponent, removeComponent } from 'util/Component.js'

import {
    showIncidentDetail,
    ackIncident,
    fixIncident,
    showIncidentRaw,
    showIncidentComments,
} from 'shared/action/IncidentAction.jsx'

class TodayIncidentModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,

            params: {
                text: "",
                fixed: "0",
                severity: ['High','Medium'],
            },

            severities: [
                { label: 'High', value: 'High'},
                { label: 'Medium', value: 'Medium'},
                { label: 'Low', value: 'Low'},
                { label: 'Audit', value: 'Audit'},
                { label: 'Ignore', value: 'Ignore'},
            ],

            selectedSeverity: ['High','Medium'],
        }

        this.cells = [{
            "displayName": "Status",
            "columnName": "incidenttype",
            "cssClassName": "text-center width-80",
            "customComponent": (props) => {
                return <img width="24"
                            src={"/images/" + getIncidenttypeIcon(props.data)}
                            data-tip={props.rowData.incidenttype || ""} />
            }
        }, {
            "displayName": "Severity",
            "columnName": "incidentseverity",
            "cssClassName": "text-center width-60",
            "customComponent": (props) => {
                return <span dangerouslySetInnerHTML={{__html: getSeverityIcon(props.data)}}/>
            },
        }, {
            "displayName": "Date/Time",
            "columnName": "starttimestamp",
            "cssClassName": "text-center width-140",
            "customComponent": (props) => {
                var date = dateFormatter(props.data);
                return <span data-tip={props.data}>{date}</span>;
            }
        }, {
            "displayName": "Device",
            "columnName": "fathername",
            "customComponent": (props) => {
                const row = props.rowData
                if (!row.device) return <span></span>
                if (row.device.shape=='Monitor') return <span>{row.fathername || ''}</span>
                if (row.device) return <span>{row.device.name || ''}</span>

                return <span></span>
            }
        },{
            "displayName": "Description",
            "columnName": "descriptioninfo",
            "customComponent": (props) => {
                var str = props.data;
                if (props.rowData.lastcomment) {
                    str += "<br/><b>Reason:</b> " + props.rowData.lastcomment;
                }

                return <span dangerouslySetInnerHTML={{__html: str }} />
            },
        }, {
            "displayName": "Actions",
            "columnName": "actions",
            "cssClassName": "nowrap width-200",
            "customComponent": (props) => {
                const row = props.rowData
                return (
                    <div>
                        <a href="javascript:;" onClick={() => { ackIncident(row, this.reloadTable.bind(this)) }}>
                            <img style={{height: "30px"}} title="Acknowledge"
                                 src={"/images/" + ( row.acknowledged ? "ack.png" : "noack.png")} />
                        </a>
                        &nbsp;

                        <a href="javascript:;" onClick={() => { fixIncident(this.context.sid, row, this.reloadTable.bind(this)) }}>
                            <img style={{height: "30px"}} title="Acknowledge"
                                 src={"/images/" + ( row.fixed ? "ok.png" : "notok.png")} />
                        </a>
                        &nbsp;

                    </div>
                )
            }
        }]

        this.onFilterChange = this.onFilterChange.bind(this)
    }

    render() {
        return (
            <Modal show={this.state.open} onHide={this.onHide.bind(this)}
                   aria-labelledby="ModalHeader" className="bootstrap-dialog type-primary modal-md">

                <div className="modal-header">
                    <h4 className="modal-title bootstrap-dialog-title">
                        Today Incidents
                    </h4>
                    <div className="bootstrap-dialog-close-button">
                        <button className="close"
                                onClick={this.onClickClose.bind(this)}>×</button>
                    </div>
                </div>

                <div className="modal-body bootstrap-dialog-message">

                    <div className="form-inline"
                         style={{"verticalAlign": "middle", "lineHeight": 2.2}}>

                        <input type="text" placeholder="Search" className="form-control input-sm"
                               onChange={this.onFilterChange}
                               ref="search"/>

                        <Select
                            value={this.state.selectedSeverity.join(',')}
                            options={this.state.severities}
                            onChange={this.onChangeSeverity.bind(this)}
                            multi={true}
                            clearable={false}
                            className="select-severity"
                            style={{minWidth: "85px"}}
                            searchable={false}
                            autosize={false}
                        />

                        <select className="form-control text-primary margin-md-left input-sm"
                                onChange={this.onFilterChange}
                                ref="fixed" defaultValue="0">
                            <option value="-1">Any</option>
                            <option value="0">Unfixed</option>
                            <option value="1">Fixed</option>
                        </select>
                    </div>

                    <InfiniteTable
                        url="/incidentstable/getTodaysIncidents"
                        params={this.state.params}
                        cells={this.cells}
                        ref="table"
                        rowMetadata={{"key": "incidentid"}}
                        bodyHeight={500}
                        selectable={true}
                    />

                    <div style={{borderTop: "1px solid gray", paddingTop: "4px"}}>
                        <Button bsStyle="primary" onClick={this.onClickFixAll.bind(this)}>Fix All</Button>
                        <Button bsStyle="primary" className="margin-sm-left"
                                onClick={this.onClickAddException.bind(this)}>Add Exception</Button>
                        <Button bsStyle="primary" className="margin-sm-left"
                                onClick={this.onClickOpen.bind(this)}>Open</Button>
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

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeSeverity(selected) {
        this.setState({
            selectedSeverity: selected.map(item => item.value)
        }, () => {
            this.onFilterChange()
        })
    }

    onFilterChange() {
        let {params} = this.state
        const refs = this.refs;
        params = assign(params, {
            text: refs.search.value,
            severity: this.state.selectedSeverity,
            fixed: refs.fixed.value,
        })

        this.setState({ params })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    updateTable() {
        this.refs.table &&
        this.refs.table.refresh()
    }

    reloadTable() {
        this.updateTable()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickFixAll() {
        showPrompt("Please type comment for all incidents.", "", (text) => {
            if(text == null) return

            $.get(Api.incidents.fixTodayIncidents, {
                comment: text,
            }).done(res => {
                this.reloadTable()
            })
        })
    }

    onClickAddException() {
        const sel = this.refs.table.getSelected()
        if (!sel) return showAlert("Please select incident.")


        appendComponent(
            <AddExceptionModal incident={sel}
                               onClose={removeComponent}/>
        )
    }

    onClickOpen() {
        const sel = this.refs.table.getSelected()
        if (!sel) return showAlert("Please select incident.")

        showIncidentDetail(sel)
    }

}

TodayIncidentModal.defaultProps = {}

export default TodayIncidentModal