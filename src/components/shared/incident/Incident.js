import React from 'react'

import { appendComponent, removeComponent } from '../../../util/Component'
import IncidentDetailModal from './IncidentDetailModal'
import CommentsModal from './CommentsModal'
import IncidentEventsModal from './IncidentEventsModal'

export function showIncidentDetail (incident) {
  appendComponent(
        <IncidentDetailModal incident={incident}
          onClose={removeComponent}/>
    )
}

export function showIncidentRaw (incident) {
  appendComponent(
        <IncidentEventsModal
          incident={incident}
          onClose={(modal) => {
            removeComponent(modal)
          }}
        />
    )
}

export function showIncidentComments (sid, incident, cb) {
  appendComponent(
        <CommentsModal
          incident={incident}
          onClose={(modal) => {
            removeComponent(modal)
            cb && cb()
          }}
        />
    )
}
