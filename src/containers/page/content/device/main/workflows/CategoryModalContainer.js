import React from 'react'
import CategoryModal from 'components/page/content/device/main/workflows/CategoryModal'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import {
  closeWfCategoryModal
} from 'actions'

@connect(
  state => ({
    editWfCategory: state.devices.editWfCategory,
    initialValues: state.devices.editWfCategory
  }), {
    closeWfCategoryModal
  }
)
@withRouter
export default class CategoryModalContainer extends React.Component {
  render() {
    return (
      <CategoryModal {...this.props} />
    )
  }
}
