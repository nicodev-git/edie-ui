import React from 'react'

export default class UserEditView extends React.Component {
  render () {
    const {onHide, onSubmit, defaultmaps, roles, selectedRoles, onChangeRole,
      permissions, onChangePermission, mainMenu} = this.props
    return (
      <form onSubmit={onSubmit}>
        <div>
          <div className="col-md-12">
            <CardPanel title="User Settings" className="margin-md-bottom">
              <Field name="username" component={FormInput} label="Name" className="mr-dialog"/>
              <Field name="fullname" component={FormInput} label="Full Name" className="mr-dialog"/>

              <Field name="password" type="password" component={FormInput} label="Password" className="mr-dialog"/>
              <Field name="email" component={FormInput} label="Email" className="mr-dialog"/>

              <Field name="phone" component={FormInput} label="Phone" className="valign-top mr-dialog"/>
              <Field name="defaultMapId" component={FormSelect} label="Default Map" options={defaultmaps} className="valign-top mr-dialog"/>

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
                      <Checkbox label={r.name} checked={selectedRoles.includes(r.name)}
                                onCheck={this.onCheckRole.bind(this, r.name)}/>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </CardPanel>

            <Button variant="raised" label="Show All" onTouchTap={() => this.setState({selectedRole: null})}
                          className="margin-md-top"/>

          </div>
          <div className="col-md-6">
            <CardPanel title="Permissions">
              <table className="table table-hover">
                <tbody>
                {mainMenu.map(p =>
                  <tr key={p.id}
                      className={!selectedRole || selectedRole.permissions.includes(p.roleMenuId) ? '' : 'hidden'}>
                    <td>
                      <Checkbox label={p.title} checked={permissions.includes(p.roleMenuId)}
                                onCheck={this.onCheckPermission.bind(this, p.roleMenuId)}/>
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
