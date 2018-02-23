import React from 'react'
import {Button} from 'material-ui'
import { buttonStyle, buttonDisabledStyle } from 'style/common/materialStyles'

const WizardButtons = ({onClose, onDiagram, onPrev, onNext, current, steps, isDiagramButton}) => (
  <div className="text-right mb-none form-buttons">
    { isDiagramButton
    ? (<Button variant="raised" label="Diagram" onClick={onDiagram} style={buttonStyle} />) : null}
    {(steps > 1)
      ? (<Button variant="raised" label="Previous" disabled={current === 1} onClick={onPrev}
        style={current === 1 ? buttonDisabledStyle : buttonStyle} />) : null}
    { current < steps
      ? (<Button variant="raised" label="Next" onClick={onNext} style={buttonStyle} />) : null}
    { current === steps
      ? (<Button variant="raised" label="Finish" type="submit" style={buttonStyle} />) : null}
  </div>
)
export default WizardButtons
