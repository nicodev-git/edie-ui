import React from 'react'
import { IconButton, Chip } from 'material-ui'
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import { CardPanel } from 'components/modal/parts'
import {isWindowsDevice} from 'shared/Global'
import { chipStyles } from 'style/common/materialStyles'

export default class CredPicker extends React.Component {
  onClickAdd () {
    this.props.showDeviceCredsPicker(1)
  }

  onClickDelete (index) {
    this.props.onClickDelete(index)
  }

  getCredentials() {
    const {credentials, extraParams, deviceCredentials} = this.props
    const deviceCreds = [...deviceCredentials]
    const isWin = isWindowsDevice({templateName: extraParams.templateName})

    credentials.forEach(p => {
      if (!p.global) return
      if (isWin && p.type === 'SSH') return
      if (!isWin && p.type === 'WINDOWS') return
      if (deviceCreds.filter(d => d.type === p.type).length === 0)
        deviceCreds.push(p)
    })

    return deviceCreds

  }

  renderButtons () {
    return (
      <div>
        <IconButton onTouchTap={this.onClickAdd.bind(this)} tooltip="Add Credentials">
          <AddCircleIcon size={32}/>
        </IconButton>
      </div>
    )
  }
  render () {
    const credentials = this.getCredentials()
    return (
      <CardPanel title="Credentials" tools={this.renderButtons()}>
        <div style={{minHeight: 200, maxHeight: 300, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>User</th>
              <th />
              <th />
            </tr>
            </thead>
            <tbody>
            {credentials.map((p, i) =>
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.type}</td>
                <td>{p.description}</td>
                <td>{p.username}</td>
                <td>
                  {p.global && p.default ? (
                    <div style={chipStyles.wrapper}>
                      <Chip style={chipStyles.chip}>{p.type}&nbsp;Default</Chip>
                    </div>
                  ) : null}
                </td>
                <th>
                  {!p.id ? (
                    <CloseIcon className="link" onTouchTap={this.onClickDelete.bind(this, i)}/>
                  ) : null}
                </th>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </CardPanel>
    )
  }
}
