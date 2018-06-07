import React from 'react'
import { ChromePicker } from 'react-color'

const ColorPicker = ({popover, cover, line, lineGroup, isPickerDisplayed,
  onColorPick, onPickerChange, onPickerClose }) => (
    <div
      className="input-group colorpicker-element"
      style={lineGroup ? null : {display: 'none'}}
      onClick={onColorPick}
    >
      <div className="input-group-addon">
        <i className="color-preview" style={{background: lineGroup ? line.getStrokeColor() : 'black'}} />
      </div>

      {
        isPickerDisplayed ? <div style={popover}>
          <div style={cover} onClick={onPickerClose}/>
          <ChromePicker
            color={lineGroup ? line.getStrokeColor() : 'black'}
            onChangeComplete={onPickerChange}
          />
        </div> : null
      }
    </div>
)

export default ColorPicker
