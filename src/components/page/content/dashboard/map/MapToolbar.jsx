import React from 'react'

import { ChromePicker } from 'react-color'
import { findIndex } from 'lodash'

import MapMenu from './MapMenu.jsx'
import DeviceMenu from './DeviceMenu.jsx'

import { lineTypes } from 'shared/Global.jsx'

import NewIncidentModal from './NewIncidentModal.jsx'
// import { appendComponent, removeComponent } from 'util/Component.jsx'

export default class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedObj: null,
            cmap: null,

            displayColorPicker: false,

            displayLineType: false,
            displayDevices: false,

            headerCollapsed: false,
        }

        this.lineTypes = lineTypes

        this.loadLineTypes()

        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

        document.addEventListener('click', this.handleClick, false);
    }

    componentWillUnmount() {

        document.removeEventListener('click', this.handleClick, false);
    }

    loadLineTypes() {

        // $.get(Api.deviceadmin.getShapeTypes)
        // .done((res) => {
        //
        //     let lineTypes = this.lineTypes
        //
        //     $.each(res || [], function(i, type){
        //
        //         let index = findIndex(lineTypes, {typename: type.devicename})
        //         if (index >= 0) lineTypes[index]['typeid'] = type.devicetype
        //     });
        //
        //     this.setState({lineTypes})
        // });
    }

    render() {

        const cmap = this.state.cmap
        const obj = this.state.selectedObj

        const line = obj ? cmap.selectedLine() : null
        const lineGroup = line ? line.objectSubType == MapItemType.ShapeLineGroup : false
        const text = obj ? cmap.selectedText() : null
        const hub = obj ? cmap.selectedLonghub() : null

        const zooming = cmap && cmap.zooming == true;

        const popover = {
            position: 'absolute',
            zIndex: '2',
            left: '-40px',
            top: '30px',

        }
        const cover = {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }

        return (
            <div className={"panel-heading text-center map-heading " + (this.state.headerCollapsed ? "collapsed" : "")}>
                <MapMenu />

                <a href="javascript:;" className="btn-new-incident" onClick={this.onClickNewIncident.bind(this)}>
                    <i className="fa fa-book" title="New Incident"></i>
                </a>

                <div className="panel-options main-map-options" style={{top: "15px"}}>
                    <ul className="nav nav-tabs" style={{background: "transparent"}}>
                        
                        <li className="dropdown margin-sm-left">
                            <a href="javascript:;" className="option maximize p-none"
                               onClick={this.onClickMaximize.bind(this)}
                               style={{display: this.props.maximized ? "none" : "block"}}>
                                <i className="fa fa fa-arrows-alt" title="Maximize"></i>
                                <b className="caret" style={{position: "absolute", left: "48%", top: "23px"}}></b>
                            </a>
                            <a href="javascript:;" className="option restore p-none"
                               style={{display: this.props.maximized ? "block" : "none"}}
                               onClick={this.onClickMaximize.bind(this)}>
                                <i className="fa fa fa-compress" title="Restore"></i>
                                <b className="caret" style={{position: "absolute", left: "48%", top: "23px"}}></b>
                            </a>
                            <ul className="dropdown-menu drop-right">
                                <li>
                                    <a href="javascript:;" className={"option " + (zooming ? "option-active" : "")}
                                       onClick={this.props.onClickZoomRect}>
                                        <i className="fa fa-search margin-md-right"></i>Zoom Rect
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;"
                                       className="option"
                                       onClick={this.props.onClickZoomIn}>
                                        <i className="fa fa-search-plus margin-md-right"></i>Zoom In
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;"
                                       className="option"
                                       onClick={this.props.onClickZoomOut}>
                                        <i className="fa fa-search-minus margin-md-right"></i>Zoom Out
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;"
                                       className="option"
                                       onClick={this.props.onClickZoomReset}>
                                        <i className="fa fa fa-square-o margin-md-right"></i>Reset
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="javascript:"
                               className="option trash p-none"  style={{display: obj ? "block" : "none"}}
                               onClick={this.props.onClickDelete}>
                                <i className="fa fa-trash-o" title="Delete"></i>
                            </a>
                        </li>
                        <li>
                            <div className="input-group colorpicker-element" style={{display: lineGroup ? "block" : "none"}}
                                 onClick={this.onClickColorPicker.bind(this)}>
                                <div className="input-group-addon">
                                    <i className="color-preview" style={{background: lineGroup ? line.getStrokeColor() : 'black'}}></i>
                                </div>
                            </div>

                            {
                                this.state.displayColorPicker ? <div style={ popover }>
                                    <div style={ cover } onClick={ this.onCloseColorPicker.bind(this) }/>
                                    <ChromePicker color={lineGroup ? line.getStrokeColor() : 'black'}
                                                  onChangeComplete={this.onChangeColorPicker.bind(this)}/>
                                </div> : null
                            }

                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: lineGroup ? "block" : "none"}}
                               onClick={this.props.onClickLineWidthInc}>
                                <i className="fa fa-expand" title="Increase Line Width"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: lineGroup ? "block" : "none"}}
                                onClick={this.props.onClickLineWidthDec}>
                                <i className="fa fa-compress" title="Decrease Line Width"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: text ? "block" : "none"}}
                               onClick={this.props.onClickFontSizeUp}> <i className="fa fa-arrow-up" title="Increase Font Size"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: text ? "block" : "none"}}
                               onClick={this.props.onClickFontSizeDown}> <i className="fa fa-arrow-down" title="Decrease Font Size"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: text ? "block" : "none"}}
                               onClick={this.props.onClickAlignLeft}> <i className="fa fa-align-left" title="Align Left"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: text ? "block" : "none"}}
                               onClick={this.props.onClickAlignCenter}> <i className="fa fa-align-center" title="Align Center"></i>
                            </a>

                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: text ? "block" : "none"}}
                               onClick={this.props.onClickAlignRight}> <i className="fa fa-align-right" title="Align Right"></i>
                            </a>
                        </li>

                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display: hub ? "block" : "none"}}>
                                <i className="fa fa-rotate-left" title="Rotate Left"></i>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;"
                               className="option p-none"  style={{display:  hub ? "block" : "none"}}>
                                <i className="fa fa-rotate-right" title="Rotate Right"></i>
                            </a>
                        </li>

                        <li>
                            <a href="javascript:;" onClick={this.toggleLineTypes.bind(this)}
                               className="option p-none" style={{display: line ? "block" : "none"}}>
                                <i className="fa fa-reply" title="Change Type"></i>
                            </a>

                            {this.renderLineTypes()}
                        </li>
                        <li>
                            <img className="option uploader" src="/images/uploading.gif"
                                 style={{float: "left", width: "18px", display: "none", opacity:0.5, marginLeft: "10px"}}/>
                        </li>

                        <li className={this.state.displayDevices ? "" : "dropdown"} ref="liDevices">
                            <a href="javascript:" onClick={this.onClickAdd.bind(this)}
                               className={"option p-none " + (this.state.displayDevices ? "option-active" : "")}>
                                <i className="fa fa-plus-square" title="Add"></i>
                                <b className="caret" style={{position: "absolute", left: "48%", top: "23px"}}></b>
                            </a>
                            <ul className="dropdown-menu drop-right">
                                <li>
                                    <a href="javascript:;" onClick={this.props.onClickEdit}
                                       className={"option " + (this.props.editable ? "option-active" : "")}> <i className="fa fa-edit margin-md-right"></i>Edit
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:;"
                                       className="option edit-undo"> <i className="fa fa-undo margin-md-right"></i>Undo
                                    </a>
                                </li>
                            </ul>

                            {this.state.displayDevices ? 
                                <DeviceMenu onClickItem={this.props.onClickDeviceItem} selectedItem={this.props.selectedItem}/> : null}
                        </li>

                        <li className="dropdown dropdown-settings">
                            <a href="javascript:;" className="option p-none"><i className="fa fa-cog" title="Add"></i>
                                <b className="caret" style  ={{position: "absolute", left: "48%", top: "23px"}}></b>
                            </a>
                            <ul className="dropdown-menu drop-right">
                                <li>
                                    <a href="javascript:logout();"
                                       className="option"> <i className="fa fa-sign-out margin-md-right"></i>Log Out
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="dropdown active">
                            <a href="#" data-toggle="dropdown" className="dropdown-toggle" style={{display:"none"}}></a>
                            <ul className="dropdown-menu">
                            </ul>
                        </li>
                    </ul>

                    {}
                </div>
                <a href="javascript:;" id="map-header-toggle" onClick={this.onClickToggleMapHeader.bind(this)}>
                    <img src="/images/arrow-up.png" width="14" height="14" className="up" />
                    <img src="/images/arrow-down.png" width="14" height="14" className="down" />
                </a>
            </div>
        )
    }
    
    renderLineTypes() {

        if (!this.state.displayLineType) return null

        const popover = {
            position: 'absolute',
            zIndex: '2',
            right: "-10px",
            top: "30px",
        }

        const cover = {
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        }

        return (
            <div style={ popover }>
                <div style={ cover } onClick={ this.toggleLineTypes.bind(this) }/>
                <div id="linetypediv" className="panel-group">
                    <div className="panel panel-default">
                        <div className="panel-body"><ul>
                        {
                            this.lineTypes.map(item =>
                                <li key={item.typename}><a href="javascript:;" onClick={this.onClickLineType.bind(this, item)}>
                                    <div className="pull-left item-icon">
                                        <img src={item.image} data-type={item.type} data-typename={item.typename}/>
                                    </div>
                                    <div className="item-text">
                                        <strong>{item.title}</strong>
                                    </div>
                                </a></li>
                            )
                        }
                        </ul></div>
                    </div>
                </div>
            </div>
        )
    }

    /////////////////////////////////////////

    onClickAdd() {
        this.setState({
            displayDevices: !this.state.displayDevices,
        }, () => {
            this.props.onClickAdd(this.state.displayDevices)
        })
    }

    hideDeviceMenu() {
        this.setState({
            displayDevices: false
        })
    }

    /////////////////////////////////////////

    onClickColorPicker() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    onCloseColorPicker() {
        this.setState({ displayColorPicker: false })
    }

    onChangeColorPicker(color) {
        this.props.onChangeLineColor(color.hex)
    }

    /////////////////////////////////////////

    onClickMaximize() {
        this.props.onClickMaximize()
    }

    toggleLineTypes() {
        this.setState({ displayLineType: !this.state.displayLineType})
    }

    onClickLineType(item) {
        this.toggleLineTypes()

        var deviceTypeId = item['typeid'];
        var type = item['typename'];
        var imgUrl = item['image'];

        this.props.onChangeLineType(type, imgUrl, deviceTypeId)
    }

    onClickToggleMapHeader() {
        this.setState({ headerCollapsed: !this.state.headerCollapsed })
    }

    /////////////////////////////////////////

    renderBody() {
        /*return (
            <div class="panel panel-default mb-none" id="mapeditdiv">

                <div class="panel-body" style="overflow: hidden;padding: 0;position:relative;">
                    
                    

                    <div id="map-context-menu">
                        <ul class="dropdown-menu" role="menu" id="menu-firewall">
                            <li><a tabindex="-1" href="javascript:;"><i class="fa fa-edit fa-lg margin-sm-right"></i>Firewall Option1</a></li>
                        </ul>
                        <ul class="dropdown-menu" role="menu" id="menu-linux">
                            <li><a tabindex="-1" href="javascript:;"><i class="fa fa-edit fa-lg margin-sm-right"></i>Linux Option1</a></li>
                        </ul>
                        <ul class="dropdown-menu" role="menu" id="menu-longhub">
                            <li><a tabindex="-1" href="javascript:;" id="menuitem-longhub-edit"><i class="fa fa-edit fa-lg margin-sm-right"></i>Edit Segments</a></li>
                        </ul>
                        <ul class="dropdown-menu" role="menu" id="menu-normal">
                            <li><a tabindex="-1" href="javascript:;"><i class="fa fa-edit fa-lg margin-sm-right"></i>Normal Option1</a></li>
                        </ul>
                    </div>
                </div>
                <!-- div class="trash"><img src="/images/trash.png" width="70px"></div-->
            </div>
        )*/
    }

    handleClick (e) {

        //Detect device menu outer click
        if (this.state.displayDevices) {
            if (!this.refs.liDevices.contains(e.target)) {
                this.setState({ displayDevices: false }, () => {
                    this.props.onClickAdd(this.state.displayDevices)
                })
            }
        }

    }
    //////////////////////////////////////////////////////////////////////////

    onClickNewIncident() {
        // appendComponent(
        //     <NewIncidentModal
        //         onClose={removeComponent}
        //         sid={this.context.sid}/>
        // )
    }
}

Toolbar.contextTypes = {
    sid: React.PropTypes.string,
}

Toolbar.defaultProps = {
    onClickEdit: null,
    editable: false,
    maximized: false,

    selectedItem: {},
    onClickDeviceItem: null
}