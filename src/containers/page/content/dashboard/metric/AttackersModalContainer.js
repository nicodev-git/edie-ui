import React from 'react'
import AttackersModal from '../../../../../components/page/content/dashboard/metric/AttackersModal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import countries from 'country-data/data/countries'

import { ROOT_URL } from '../../../../../actions/config'
import { fetchAttackers } from '../../../../../actions'

class AttackersModalContainer extends React.Component {
  render () {
    return (
      <AttackersModal {...this.props} />
    )
  }
}

AttackersModalContainer.defaultProps = {
  onClose: null
}

export default connect(
  state => ({
    attackers: state.dashboard.attackers,
    ROOT_URL,
    countries: []
  }),
  dispatch => ({
    ...bindActionCreators({ fetchAttackers }, dispatch)
  })
)(AttackersModalContainer)
