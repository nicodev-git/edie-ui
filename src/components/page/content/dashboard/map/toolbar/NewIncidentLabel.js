import React from 'react'

const NewIncidentLabel = ({onNewIncident}) => (
  <li>
    <a href="javascript:;" className="btn-new-incident" onClick={onNewIncident}>
      <i className="fa fa-book" title="New Incident" />
    </a>
  </li>
)

export default NewIncidentLabel
