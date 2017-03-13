import React from 'react'

const NewIncidentLabel = ({onNewIncident}) => (
  <a href="javascript:;" className="btn-new-incident" onClick={onNewIncident}>
    <i className="fa fa-book" title="New Incident" />
  </a>
)

export default NewIncidentLabel
