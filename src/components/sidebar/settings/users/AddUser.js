import React from 'react'
import {findIndex, assign} from 'lodash'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

import {Checkbox, Button} from '@material-ui/core'
import { Field } from 'redux-form'
import { FormInput, FormSelect, FormCheckbox, SubmitBlock, CardPanel } from 'components/modal/parts'
import {mainMenu} from 'components/sidebar/Config'
import { validate } from 'components/modal/validation/NameValidation'
import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'


export default class AddUser extends React.Component {
  render () {
    return (
      <div></div>
    )
  }
}
