import React from 'react'
import MapMenu from './MapMenu'

const ToolbarOptions = ({ onNewIncident, onMaximize, maximized, zooming, onZoomRect, onZoomIn, onZoomOut,
  onZoomReset, onDelete}) => (



    <div className="panel-options main-map-options" style={{top: '15px'}}>
      <ul className="nav nav-tabs" style={{background: 'transparent'}}>

        <li className="dropdown margin-sm-left">
          <a
            href="javascript:;"
            className="option maximize p-none"
            onClick={onMaximize}
            style={{display: maximized ? 'none' : 'block'}}
          >
            <i className="fa fa fa-arrows-alt" title="Maximize" />
            <b className="caret" style={{position: 'absolute', left: '48%', top: '23px'}} />
          </a>
          <a
            href="javascript:;"
            className="option restore p-none"
            style={{display: maximized ? 'block' : 'none'}}
            onClick={onMaximize}
          >
            <i className="fa fa fa-compress" title="Restore" />
            <b className="caret" style={{position: 'absolute', left: '48%', top: '23px'}} />
          </a>
          <ul className="dropdown-menu drop-right">
            <li>
              <a
                href="javascript:;"
                className={`option ${zooming ? 'option-active' : ''}`}
                onClick={onZoomRect}
              >
                <i className="fa fa-search margin-md-right" />Zoom Rect
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="option"
                onClick={onZoomIn}
              >
                <i className="fa fa-search-plus margin-md-right" />Zoom In
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="option"
                onClick={onZoomOut}
              >
                <i className="fa fa-search-minus margin-md-right" />Zoom Out
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="option"
                onClick={onZoomReset}
              >
                <i className="fa fa fa-square-o margin-md-right" />Reset
              </a>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="javascript:"
            className="option trash p-none"
            style={{display: obj ? 'block' : 'none'}}
            onClick={onDelete}
          >
            <i className="fa fa-trash-o" title="Delete" />
          </a>
        </li>
        <li>
          <div
            className="input-group colorpicker-element"
            style={{display: lineGroup ? 'block' : 'none'}}
            onClick={this.onClickColorPicker.bind(this)}
          >
            <div className="input-group-addon">
              <i className="color-preview" style={{background: lineGroup ? line.getStrokeColor() : 'black'}} />
            </div>
          </div>

          {
            this.state.displayColorPicker ? <div style={popover}>
              <div style={cover} onClick={this.onCloseColorPicker.bind(this)}/>
              <ChromePicker
                color={lineGroup ? line.getStrokeColor() : 'black'}
                onChangeComplete={this.onChangeColorPicker.bind(this)}
              />
            </div> : null
          }

        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: lineGroup ? 'block' : 'none'}}
            onClick={this.props.onClickLineWidthInc}
          >
            <i className="fa fa-expand" title="Increase Line Width" />
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: lineGroup ? 'block' : 'none'}}
            onClick={this.props.onClickLineWidthDec}
          >
            <i className="fa fa-compress" title="Decrease Line Width" />
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: text ? 'block' : 'none'}}
            onClick={this.props.onClickFontSizeUp}
          >
            <i className="fa fa-arrow-up" title="Increase Font Size" />
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: text ? 'block' : 'none'}}
            onClick={this.props.onClickFontSizeDown}
          >
            <i className="fa fa-arrow-down" title="Decrease Font Size" />
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: text ? 'block' : 'none'}}
            onClick={this.props.onClickAlignLeft}
          >
            <i className="fa fa-align-left" title="Align Left" />
          </a>
        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: text ? 'block' : 'none'}}
            onClick={this.props.onClickAlignCenter}
          >
            <i className="fa fa-align-center" title="Align Center" />
          </a>

        </li>
        <li>
          <a
            href="javascript:;"
            className="option p-none"
            style={{display: text ? 'block' : 'none'}}
            onClick={this.props.onClickAlignRight}
          >
            <i className="fa fa-align-right" title="Align Right" />
          </a>
        </li>

        <li>
          <a href="javascript:;" className="option p-none" style={{display: hub ? 'block' : 'none'}}>
            <i className="fa fa-rotate-left" title="Rotate Left" />
          </a>
        </li>
        <li>
          <a href="javascript:;" className="option p-none" style={{display: hub ? 'block' : 'none'}}>
            <i className="fa fa-rotate-right" title="Rotate Right" />
          </a>
        </li>

        <li>
          <a
            href="javascript:;"
            onClick={this.toggleLineTypes.bind(this)}
            className="option p-none"
            style={{display: line ? 'block' : 'none'}}
          >
            <i className="fa fa-reply" title="Change Type" />
          </a>

          {this.renderLineTypes()}
        </li>
        <li>
          <img className="option uploader" src="/images/uploading.gif"
            style={{float: 'left', width: '18px', display: 'none', opacity: 0.5, marginLeft: '10px'}}/>
        </li>

        <li className={this.state.displayDevices ? '' : 'dropdown'} ref="liDevices">
          <a
            href="javascript:"
            onClick={this.onClickAdd.bind(this)}
            className={`option p-none ${this.state.displayDevices ? 'option-active' : ''}`}
          >
            <i className="fa fa-plus-square" title="Add" />
            <b className="caret" style={{position: 'absolute', left: '48%', top: '23px'}} />
          </a>
          <ul className="dropdown-menu drop-right">
            <li>
              <a href="javascript:;" onClick={this.props.onClickEdit}
                className={`option ${this.props.editable ? 'option-active' : ''}`}
              >
                <i className="fa fa-edit margin-md-right" />Edit
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                className="option edit-undo"
              >
                <i className="fa fa-undo margin-md-right" />Undo
              </a>
            </li>
          </ul>

          { this.state.displayDevices
            ? <DeviceMenu {...this.props} onClickItem={this.props.onClickDeviceItem} selectedItem={this.props.selectedItem}/>
            : null }
        </li>

        <li className="dropdown dropdown-settings">
          <a href="javascript:;" className="option p-none"><i className="fa fa-cog" title="Add" />
            <b className="caret" style ={{position: 'absolute', left: '48%', top: '23px'}} />
          </a>
          <ul className="dropdown-menu drop-right">
            <li>
              <a href="javascript:logout();"
                className="option"> <i className="fa fa-sign-out margin-md-right" />Log Out
              </a>
            </li>
          </ul>
        </li>

        <li className="dropdown active">
          <a href="#" data-toggle="dropdown" className="dropdown-toggle" style={{display: 'none'}} />
          <ul className="dropdown-menu" />
        </li>
      </ul>

      {}
    </div>
    <a href="javascript:;" id="map-header-toggle" onClick={this.onClickToggleMapHeader.bind(this)}>
      <img src="/images/arrow-up.png" width="14" height="14" className="up" />
      <img src="/images/arrow-down.png" width="14" height="14" className="down" />
    </a>
)

export default ToolbarOptions
