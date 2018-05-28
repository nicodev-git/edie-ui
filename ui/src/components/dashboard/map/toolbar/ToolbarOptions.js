import React, { Component } from 'react'
import {IconButton} from '@material-ui/core'
import ArrowDownIcon from '@material-ui/icons/ArrowDownward'
import ArrowUpIcon from '@material-ui/icons/ArrowUpward'

import { DeleteObject, ColorPicker,
  TextChange, RotateHubLeft, RotateHubRight, ChangeLineType,
  EditMapMenu, DeviceMenuContainer } from './index'

const buttonStyle = {
  padding: '4px',
  width: 40,
  height: 40
}

class ToolbarOptions extends Component {
  render () {
    const {canEdit} = this.props
    return (
      <div className="panel-options main-map-options toolbar-options" style={{top: '0px'}}>
        <ColorPicker
          line={this.props.line}
          popover={this.props.popover}
          cover={this.props.cover}
          lineGroup={this.props.lineGroup}
          isPickerDisplayed={this.props.isPickerDisplayed}
          onColorPick={this.props.onColorPick}
          onPickerChange={this.props.onPickerChange}
          onPickerClose={this.props.onPickerClose}
        />

        <IconButton
          onClick={this.props.onClickLineWidthInc}
          className={this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}>
          <ArrowUpIcon nativeColor="#545454"/>
        </IconButton>

        <IconButton
          onClick={this.props.onClickLineWidthDec}
          className={this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}>
          <ArrowDownIcon nativeColor="#545454"/>
        </IconButton>

        <IconButton
          onClick={this.props.onClickFontSizeUp}
          className={this.props.obj && !this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}>
          <ArrowUpIcon nativeColor="#545454"/>
        </IconButton>

        <IconButton
          onClick={this.props.onClickFontSizeDown}
          className={this.props.obj && !this.props.lineGroup ? '' : 'hidden'}
          style={buttonStyle}>
          <ArrowDownIcon nativeColor="#545454"/>
        </IconButton>

        <DeleteObject obj={this.props.obj} onDelete={this.props.onClickDelete}/>
        {canEdit && <EditMapMenu
          onEdit={this.props.onMapEdit}
          onUndo={this.props.onEditMapUndo}/>}
        {canEdit && <DeviceMenuContainer {...this.props}/>}
        <div className="hidden">
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
        </div>
      </div>
    )
  }
}

export default ToolbarOptions
