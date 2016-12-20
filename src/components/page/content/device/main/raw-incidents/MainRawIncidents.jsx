import React from 'react'
import Dimensions from 'react-dimensions'
import {withRouter} from 'react-router'
import { escapeRegExp } from 'lodash'
import { connect } from 'react-redux'
import {
    DropdownButton,
    ButtonGroup,
    MenuItem,
    Button
} from 'react-bootstrap'

import {appendComponent, removeComponent} from 'util/Component'
import { showAlert, showPrompt, showConfirm } from 'components/shared/Alert.jsx'

import {ResponsiveInfiniteTable} from 'components/shared/InfiniteTable.jsx'
import MarkIgnoreModal from './MarkIgnoreModal.jsx'
import SimulatorModal from '../rules/SimulatorModal.jsx'
import DeviceWizard from 'components/shared/wizard/DeviceWizard.jsx'

import MainTabs from '../MainTabs'
import TabPage from 'components/shared/TabPage'
import TabPageBody from 'components/shared/TabPageBody'
import TabPageHeader from 'components/shared/TabPageHeader'

import {fetchDeviceRawIncidents} from 'actions/index'

class MainRawIncidents extends React.Component {
    constructor(props) {
        super(props)

        const {device} = this.props

        this.state = {

            url: "/incidentstable/getRawIncidentsForDeviceidInDatatable",
            params: {
                deviceid: device.id,
                rawSeverity: '',
                text: '',
            },
        }

        this.cells = [{
            "displayName": "IP Address",
            "columnName": "ipaddress",
            "cssClassName": "width-140",
            "customComponent": props => {
                const row = props.rowData
                let data = ""
                const {externalIP} = this.props.device || {}
                if (externalIP) data += "WANIP: " + externalIP + "<br/>"
                data = data + "LAN IP:" + row.ipaddress

                return this.highlightRender({data})
            }
        }, {
            "displayName": "Message",
            "columnName": "message",
            "customComponent": this.highlightRender.bind(this)
        }, {
            "displayName": "Date",
            "columnName": "dateString",
            "cssClassName": "width-160",
            "customComponent": this.highlightRender.bind(this)
        }, {
            "displayName": "Reason",
            "columnName": "comment",
            "cssClassName": "width-200",
            "customComponent": this.highlightRender.bind(this)
        }]
    }

    componentWillMount() {
        this.props.fetchDeviceRawIncidents()
    }
    //
    // componentWillUnmount() {
    //     unlisten(this.listeners)
    // }

    highlightRender(props){
        let data = props.data || ''
        data = data.replace(/(\\r\\n)+/gi, '<br/>')
        data = data.replace(/(\\n)+/gi, '<br/>')
        data = data.replace(/\\t/gi, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')

        let keyword = this.state.params.text

        if (keyword) {
            data = data.replace(new RegExp(escapeRegExp(keyword), 'gi'), function(v){
                return '<span class="bg-highlight">' + v + '</span>';
            });
        }

        return <span style={{fontSize: '11px'}} dangerouslySetInnerHTML={{__html: data }}/>;
    }

    render() {
        const {device} = this.props
        return (
            <TabPage>
                <TabPageHeader title={device.name}>
                    <div className="text-center margin-md-top">
                        <div className="pull-right">
                            <ButtonGroup>

                                <Button onClick={this.onClickMakeRule.bind(this)}>Make Rule</Button>
                                <Button onClick={this.onClickDeleteRaw.bind(this)}>Delete All</Button>
                                <Button onClick={this.onClickMarkIgnored.bind(this)}>Mark as ignored</Button>
                                <Button onClick={this.onClickRawSimulator.bind(this)}>Simulator</Button>

                            </ButtonGroup>
                        </div>

                        <div style={{margin: "0 auto", position: 'relative', width: '550px', textAlign: 'center'}}>
                            <div className="inline" style={{position: 'relative'}}>
                                <input type="text" placeholder="Search" className="form-control"
                                       style={{width: "100%", paddingLeft: "35px"}}
                                       onChange={this.onFilterChange}
                                       ref="search"/>
                                <a className="btn" href="javascript:;" style={{position: "absolute", left: 0, top: 0}}>
                                    <i className="fa fa-search"></i></a>
                            </div>
                        </div>
                    </div>
                </TabPageHeader>

                <TabPageBody tabs={MainTabs} tab={2}>
                    {this.renderTable()}
                </TabPageBody>
            </TabPage>
        )
    }

    renderTable() {
        return (
            <ResponsiveInfiniteTable
                cells={this.cells}
                ref="table"
                rowMetadata={{"key": "id"}}
                selectable={true}
                onRowDblClick={this.onRowDblClick.bind(this)}

                useExternal={false}
                data={this.props.rawIncidents}
            />
        )
    }

    render2() {
        return (
            <InfiniteTable
                url={this.state.url}
                params={this.state.params}
                cells={this.state.cells}
                ref="table"
                rowMetadata={{"key": "id"}}
                bodyHeight={this.props.containerHeight}
                selectable={true}
                onRowDblClick={this.onRowDblClick.bind(this)}
            />
        )
    }


    getTable() {
        return this.refs.table.refs.wrappedInstance
    }

    onFilterChange(params) {
        this.setState({
            params: Object.assign({}, this.state.params, {
                text: params.text
            }),
        })
    }

    onRowDblClick(sel) {
        this.onClickMakeRule()
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickMakeRule() {
        this.showMakeRule()
    }

    onClickDeleteRaw() {
        
        let count = this.getTable().getTotalCount()

        if (count == 0) return alert("No incidents.")
        showConfirm("Do you want to delete " + count + " raw incident"
            + (count > 1 ? "s" : "") + "?", btn => {
            if (btn != 'ok') return;

            setLoadingState(true);
            showLoading();
            $.get(Api.incidents.deleteRawIncidents, {
                deviceid: this.props.device.id,
                text: this.state.params.text,
            }).done(res => {
                if (res.success) {
                    this.getTable().refresh()
                } else {
                    showAlert("Failed!");
                }
            }).fail(() => {
                showAlert("Failed!");
            }).always(() => {
                hideLoading();
            })
        });
    }

    onClickMarkIgnored() {var data = this.getTable().getSelected();
        if(!data) {
            showAlert('Please choose a row to mark.');
            return;
        }
        
        appendComponent(
            <MarkIgnoreModal
                device={this.props.device}
                message={data.message}
                onClose={this.onCloseMarkIgnore.bind(this)}
            />
        )
    }

    onCloseMarkIgnore(modal, success) {
        removeComponent(modal)
        if (success) this.getTable().refresh()
    }

    showMakeRule(){

        let data = this.getTable().getSelected();

        if(!data) {
            showAlert('Please choose a row.');
            return;
        }

        const extra = {
            deviceid: this.props.device.id,
            idrulesNew: data.idrulesNew,
            remoteip: data.remoteip,
        }

        const config = {
            mapid: this.props.device.mapid,
            fatherid : 0,
        }

        appendComponent(
            <DeviceWizard
                deviceType="devicerule"
                onClose={removeComponent}
                extraParams={extra}
                configParams={config}
                onFinish={() => {
                    this.getTable().refresh()
                }}
                values={data}
            />
        )

        // let wizard = $('#devicerules-wizard');
        // wizard.stepwizard('devicerule', (finished, config) => {
        //     if(finished){
        //         this.getTable().refresh()
        //     } else {;
        //
        //     }
        //     $('#devicerules-wizard').hide();
        // }, {
        //     deviceid: this.props.device.id,
        //     idrulesNew: data.idrulesNew,
        //     remoteip: data.remoteip,
        // }, {
        //     mapid: this.props.device.mapid,
        //     fatherid : 0,
        // }, 'Add Rule', [
        //     '<div style="display: inline-block; width: 105px; padding-top: 10px; text-align: center;" class="btn btn-primary btn-wizard-rawmsg">'+
        //     '<div style="width: 100%; text-align: center; font-size: 11px;"><i class="fa fa-book" style="font-size: 15px;"></i> Raw Message</div></div>'
        // ]);
        //
        // $.each(data, (key, value) => {
        //     let input = $('#devicerules-wizard').find('[name=' + key +  ']');
        //     if(!input.length) return;
        //     let tag = input.prop('tagName').toLowerCase();
        //     let monitortype = input.attr('monitortype');
        //     if(tag =='input' && type == 'text'){
        //         input.val(value);
        //     } else if(tag == 'select') {
        //         input.val(value);
        //     } else if(tag == 'input' && type == 'checkbox'){
        //         input.prop('checked', value == 1);
        //     }
        // });
        //
        // wizard.find('.btn-wizard-rawmsg').off('click').click(function(){
        //     $('#rawtextdiv').center().show();
        //     $('#rawtextdiv').find('.rawtext').text(data.message);
        // });
    }

    onClickRawSimulator() {
        let options = this.getTable().getSelected() || {};

        appendComponent(
            <SimulatorModal
                options={options}
                device={this.props.device}
                onClose={removeComponent}
                onAddRule={this.onAddRule.bind(this)}
            />
        )
    }

    onAddRule(values) {
        const extra = {
            deviceid: this.props.device.id
        }

        const config = {
            mapid: this.props.device.mapid,
            fatherid : 0,
        }

        appendComponent(
            <DeviceWizard
                deviceType="devicerule"
                onClose={removeComponent}
                extraParams={extra}
                configParams={config}
                values={values || {}}
                onFinish={() => {}}
            />
        )
    }
}

MainRawIncidents.defaultProps = {
}

function mapStateToProps(state) {
    return {
        device: state.dashboard.selectedDevice,
        rawIncidents: state.devices.rawIncidents
    }
}

export default withRouter(connect(mapStateToProps, {fetchDeviceRawIncidents})(MainRawIncidents))