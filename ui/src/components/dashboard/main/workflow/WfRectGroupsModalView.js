import React from 'react'

import { FormInput, FormSelect, SubmitBlock } from 'components/modal/parts'
import {Modal, CardPanel} from 'components/modal/parts'

export default class WfRectGroupsModalView extends React.Component {
  render () {
    return (
      <Modal title="Groups" onRequestClose={onHide}>
        <CardPanel title="Groups">

        </CardPanel>
      </Modal>
    )
  }
}
