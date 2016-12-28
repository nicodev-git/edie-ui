import React from 'react'
import Modal from 'react-bootstrap-modal'
import {
    Button
} from 'react-bootstrap'
import {
  // findIndex, // Never used
  assign
  // clone // Never used
} from 'lodash'
import { connect } from 'react-redux'
import { reduxForm, Field, change } from 'redux-form'
import axios from 'axios'
import { closeSettingUserModal, addSettingUser, updateSettingUser } from '../../../../../actions'
import { ROOT_URL } from '../../../../../actions/config'

class UserModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: true,
      defaultMaps: [],
      roles: []
    }

    this.renderInput = this.renderInput.bind(this)
  }

  componentWillMount () {
        // $.when(
        //     this.loadDefaultMaps(),
        //     this.loadRoles()
        // ).always(() => {
        //     this.setState({ loading: false })
        // })

  }

  loadDefaultMaps () {
    return $.get(`${ROOT_URL}${Api.dashboard.getMaps}?draw=1`).done(res => { // eslint-disable-line no-undef
      this.setState({
        defaultMaps: res.data
      })
    })
  }

  loadRoles () {
    return $.get(`${ROOT_URL}${Api.user.getRoles}`, { // eslint-disable-line no-undef
      sid: this.context.sid
    }).done(res => {
      if (!res.object) return

      this.setState({ roles: res.object.map(item => item.role) })
    })
  }

  renderInput (field) {
    return (
            <div className="row margin-md-bottom">
                <label className="control-label col-md-3 text-right">{field.label}</label>
                <div className="col-md-6">
                    <input {...field.input} type={field.type} className="form-control"/>
                </div>

                {field.name === 'pincode'
                  ? <div className="col-md-3 margin-xs-top">
                        <a href="javascript:;" className="btn btn-default btn-sm" onClick={this.onClickPin.bind(this)}>Generate</a>
                    </div>
                  : null
                }
            </div>
    )
  }

  renderContent () {
    const { handleSubmit } = this.props

    return (
            <div>
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                    <Field name="username" component={this.renderInput} type="text" label="Username"/>
                    <Field name="fullname" component={this.renderInput} type="text" label="Full Name"/>
                    <Field name="password" component={this.renderInput} type="password" label="Password"/>
                    <Field name="email" component={this.renderInput} type="text" label="Email"/>
                    <Field name="phone" component={this.renderInput} type="text" label="Phone"/>
                    <Field name="pincode" component={this.renderInput} type="text" label="Pin Code"/>

                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3 text-right">Default
                            Map</label>
                        <div className="col-md-6">
                            <select className="form-control" ref="defaultmap">{
                                this.state.defaultMaps.map(item =>
                                    <option key={item.id} value={item.id}>{item.mapname}</option>
                                )
                            }</select>
                        </div>
                    </div>

                    <div className="row margin-md-bottom">
                        <label className="control-label col-md-3 text-right">Role</label>
                        <div className="col-md-6">
                            <select className="form-control" ref="role">{
                                this.state.roles.map(item =>
                                    <option key={item} value={item}>{item}</option>
                                )
                            }</select>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button className="btn-primary btn-sm" type="submit">Save</Button>
                        <Button className="btn-sm margin-sm-left"
                          onClick={this.onClickClose.bind(this)}>Cancel</Button>
                    </div>
                </form>
            </div>
    )
  }

  onHide () {
    this.onClickClose()
  }

  closeModal () {
    this.props.closeSettingUserModal()
  }

  onClickClose () {
    this.closeModal()
  }

  handleFormSubmit (values) {
    const { editUser } = this.props

    let user = assign({}, editUser, values)

    console.log(values)

    if (editUser) {
      this.props.updateSettingUser(user)
    } else {
      this.props.addSettingUser(user)
    }
  }

  onClickPin () {
    axios.get('/genpin').then(response => {
      this.props.dispatch(change('userEditForm', 'pincode', response.data))
    })
  }

  render () {
    return (
      <Modal
        show={this.state.open}
        onHide={this.onHide.bind(this)}
        aria-labelledby="ModalHeader"
        className="bootstrap-dialog type-primary"
      >

        <div className="modal-header">
          <h4 className="modal-title bootstrap-dialog-title">
            User Detail
          </h4>
          <div className="bootstrap-dialog-close-button">
            <button className="close" onClick={this.onClickClose.bind(this)}>×</button>
          </div>
        </div>

        <div className="modal-body bootstrap-dialog-message">
          {this.renderContent()}
        </div>
      </Modal>
    )
  }
}

UserModal.defaultProps = {

}

function mapStateToProps (state) {
  return {
    editUser: state.settings.editUser,
    initialValues: state.settings.editUser
  }
}

const actions = {
  addSettingUser,
  updateSettingUser,
  closeSettingUserModal
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'userEditForm'
  })(UserModal)
)
