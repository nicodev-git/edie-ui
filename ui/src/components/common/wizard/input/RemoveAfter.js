import React from 'react'

import {FormSelect} from 'components/modal/parts'

export default class RemoveAfter extends React.Component {
  render () {
    return (
      <div className="inline-block">
        <Field
          name="remove_after" component={FormSelect} options={durationOptions}
          style={{width: 80, paddingLeft: 15}} className="valign-middle"/>
        <Field
          name="remove_after_unit" component={FormSelect} options={durationUnits}
          style={{width: 120}} className="valign-middle"/>
      </div>
    )
  }
}
