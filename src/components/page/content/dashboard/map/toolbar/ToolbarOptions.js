import React, { Component } from 'react'
import { ZoomOptions, DeleteObject, ColorPicker, LineWidthInc, LineWidthDec,
  TextChange, RotateHubLeft, RotateHubRight, ChangeLineType, OptionUploader,
  EditMapMenu} from './index'

class ToolbarOptions extends Component {
  render () {
    return (
      <div className="panel-options main-map-options" style={{top: '15px'}}>
        <ul className="nav nav-tabs" style={{background: 'transparent'}}>
          <ZoomOptions
            onMaximize={this.props.onMaximize}
            maximized={this.props.maximized}
            zooming={this.props.zooming}
            onZoomRect={this.props.onClickZoomRect}
            onZoomIn={this.props.onClickZoomIn}
            onZoomOut={this.props.onClickZoomOut}
            onZoomReset={this.props.onClickZoomReset}
          />
          <DeleteObject obj={this.props.obj} />
          <ColorPicker
            line={this.props.line}
            lineGroup={this.props.lineGroup}
            isPickerDisplayed={this.props.isPickerDisplayed}
            onColorPick={this.props.onColorPick}
            onPickerChange={this.props.onPickerChange}
            onPickerClose={this.props.onPickerClose}
          />
          <LineWidthInc
            lineGroup={this.props.lineGroup}
            onLineWidthInc={this.props.onClickLineWidthInc}
          />
          <LineWidthDec
            lineGroup={this.props.lineGroup}
            onLineWidthInc={this.props.onClickLineWidthDec}
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickFontSizeUp}
            icon="fa fa-arrow-up"
            title="Increase Font Size"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickFontSizeDown}
            icon="fa fa-arrow-down"
            title="Decrease Font Size"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickAlignLeft}
            icon="fa fa-align-left"
            title="Align Left"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickAlignCenter}
            icon="fa fa-align-center"
            title="Align Center"
          />
          <TextChange
            text={this.props.text}
            onChange={this.props.onClickAlignLeft}
            icon="fa fa-align-right"
            title="Align Right"
          />
          <RotateHubLeft hub={this.props.hub} />
          <RotateHubRight hub={this.props.hub} />
          <ChangeLineType
            line={this.props.line}
            lineTypes={this.props.lineTypes}
            onChange={this.props.toggleLineTypes}
          />
          <OptionUploader />
          <EditMapMenu {...this.props}/>
        </ul>
      </div>
    )
  }
}

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
)

export default ToolbarOptions
