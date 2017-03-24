import React from 'react'
import FlatButton from 'material-ui/FlatButton'
import { buttonStyle, buttonTextStyle, buttonDisabledStyle } from '../../../style/materialStyles'

const WizardButtons = ({onClose, onDiagram, onPrev, onNext, current, steps}) => (
  <div className="text-right mb-none form-buttons">
    <FlatButton label="Cancel" onClick={onClose} style={buttonStyle} labelStyle={buttonTextStyle}/>
    <FlatButton label="Diagram" onClick={onDiagram} style={buttonStyle} labelStyle={buttonTextStyle}/>
    <FlatButton label="Previous" disabled={current === 1} onClick={onPrev}
      style={current === 1 ? buttonDisabledStyle : buttonStyle} labelStyle={buttonTextStyle}/>
    { current < steps
      ? (<FlatButton label="Next" onClick={onNext} style={buttonStyle} labelStyle={buttonTextStyle}/>) : null}
    { current === steps
      ? (<FlatButton label="Finish" type="submit" onClick={onClose} style={buttonStyle} labelStyle={buttonTextStyle}/>) : null}
  </div>
)
export default WizardButtons
