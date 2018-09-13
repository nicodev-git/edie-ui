import React from 'react'
import { Field } from 'redux-form'

import {
  Modal,
  CardPanel,
  FormSelect,
  FormInput
} from 'components/modal/parts'
import {Button} from "@material-ui/core";

const mapItemTypes = [

]

export default class MapItemModalView extends React.Component {
  render() {
    const {onSubmit, onClose} = this.props

    return (
      <Modal title="Map Item" onRequestClose={onClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Detail">
            <FormSelect name="type" component={FormSelect} options={mapItemTypes}/>

          </CardPanel>

          <div className="padding-md">
            <Button variant="raised" type="submit" className="margin-md-top">Save</Button>
          </div>
        </form>
      </Modal>
    )
  }
}