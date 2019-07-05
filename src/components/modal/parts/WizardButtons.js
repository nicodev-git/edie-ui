import React from 'react'
import {Button} from '@material-ui/core'
import { buttonStyle } from 'style/common/materialStyles'

const WizardButtons = ({onClose, onDiagram, onPrev, onNext, current, steps, isDiagramButton}) => (
  <div className="text-right mb-none form-buttons">
    { isDiagramButton
      ? (<Button variant="raised" onClick={onDiagram}>Diagram</Button>) : null}
    {(steps > 1)
      ? (<Button variant="raised" disabled={current === 1} onClick={onPrev}>Previous</Button>) : null}
    { current < steps
      ? (<Button variant="raised" onClick={onNext} style={buttonStyle}>Next</Button>) : null}
    { current === steps
      ? (<Button variant="raised" type="submit" style={buttonStyle}>Finish</Button>) : null}
  </div>
)
export default WizardButtons
