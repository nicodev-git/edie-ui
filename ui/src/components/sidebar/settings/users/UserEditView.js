import React from 'react'
import { FormControlLabel } from '@material-ui/core'

export default class UserEditView extends React.Component {
  render () {
    const {onHide, onSubmit, defaultmaps, roles, selectedRoles, onChangeRole,
      permissions, onChangePermission, mainMenu} = this.props
    return (
      <form onSubmit={onSubmit}>
        <div>
          <div className="col-md-12">
            <CardPanel title="User Settings" className="margin-md-bottom">
              <Field name="username" component={FormInput} label="Name" className="margin-md-right"/>
              <Field name="fullname" component={FormInput} label="Full Name" className="margin-md-right"/>

              <Field name="password" type="password" component={FormInput} label="Password" className="margin-md-right"/>
              <Field name="email" component={FormInput} label="Email" className="margin-md-right"/>

              <Field name="phone" component={FormInput} label="Phone" className="margin-md-right"/>
              <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="margin-md-right"/>

              <Field name="enabled" component={FormCheckbox} label="Enabled" />
            </CardPanel>
          </div>
        </div>

        <div>
          <div className="col-md-6">
            <CardPanel title="Roles">
              <table className="table table-hover">
                <tbody>
                {roles.map(r =>
                  <tr key={r.id}
                      onClick={() => this.setState({selectedRole: r})}
                      className={selectedRole && selectedRole.id === r.id ? 'selected' : ''}>
                    <td>
                      <FormControlLabel
                        control={
                          <Checkbox checked={selectedRoles.includes(r.name)}
                                    onChange={this.onCheckRole.bind(this, r.name)}/>
                        }
                        label={r.name}
                      />
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </CardPanel>

            <Button variant="raised" onClick={() => this.setState({selectedRole: null})}
                    className="margin-md-top">Show All</Button>

          </div>
          <div className="col-md-6">
            <CardPanel title="Permissions">
              <table className="table table-hover">
                <tbody>
                {mainMenu.map(p =>
                  <tr key={p.id}
                      className={!selectedRole || selectedRole.permissions.includes(p.roleMenuId) ? '' : 'hidden'}>
                    <td>
                      <FormControlLabel
                        control={
                          <Checkbox checked={permissions.includes(p.roleMenuId)}
                                    onChange={this.onCheckPermission.bind(this, p.roleMenuId)}/>
                        }
                        label={p.title}
                      />
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </CardPanel>
          </div>
        </div>

        <div>
          <div className="col-md-12">
            <SubmitBlock name="Save"/>
          </div>
        </div>
      </form>
    )
  }
}
