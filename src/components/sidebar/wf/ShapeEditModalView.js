import React, {Component} from 'react'
import {Field} from 'redux-form'
import AddIcon from '@material-ui/icons/AddCircle'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import classNames from 'classnames'

import {
  FormInput,
  Modal,
  FormTextArea,
  CardPanel
} from 'components/modal/parts'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
})

class ShapeEditModalView extends Component {
  renderDevices () {
    const {
      servers,
      applyAllDevices, applyDeviceIds,
      onCheckAppliedDevice, onChangeApplyAllDevices,
      classes
    } = this.props

    return (
      <CardPanel title="Applied Devices">
        <div>
          <Toolbar className={classNames(classes.root, {
            [classes.highlight]: applyDeviceIds.length > 0,
          })}>
            <div className={classes.title}>
              {applyAllDevices || applyDeviceIds.length > 0 ? (
                <Typography color="inherit" variant="subheading">
                  {applyAllDevices ? 'All' : applyDeviceIds.length} selected
                </Typography>
              ) : (
                <Typography variant="title">
                  Applied Devices
                </Typography>
              )}
            </div>
          </Toolbar>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="default" style={{width: 50}}>
                  {/*<Field*/}
                    {/*name="applyAllDevices"*/}
                    {/*component={FormCheckbox} label=""*/}
                    {/*onChange={onChangeApplyAllDevices}*/}
                    {/*indeterminate={applyDeviceIds.length > 0 && applyDeviceIds.length < servers.length}*/}
                  {/*/>*/}
                </TableCell>
                <TableCell padding="none"><b>All Devices</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {servers.map(p => {
                const isSelected = applyDeviceIds.includes(p.id)
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={p.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox" style={{width: 50}}>
                      <Checkbox checked={applyAllDevices || isSelected} onChange={onCheckAppliedDevice}
                                value={p.id}/>
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {p.name}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardPanel>
    )
  }

  renderOutput () {
    return (
      <CardPanel title="Output">
        <Field name="outputName" component={FormInput} floatingLabel="Output Object" className="margin-md-right"/>

      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose,
      onClickAddField, onClickEditField, onClickDeleteField,
      fields,
      onClickTest, shapeScriptResult,
      children
    } = this.props
    return (
      <Modal title="Shape" contentStyle={{width: 1000}} onRequestClose={onClickClose}>
        <form onSubmit={onSubmit}>
          <CardPanel title="Shape">
            <Field name="title" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
            <Field name="description" component={FormInput} floatingLabel="Description" fullWidth
                   className="margin-sm-top"/>
          </CardPanel>

          <CardPanel title="Script" tools={<AddIcon className="link" onClick={onClickAddField}/>}>
            <Field name="script" component={FormTextArea} style={{width: '100%', height: 300, fontSize: '14px'}}/>

            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Testing Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {fields.map((p, i) =>
                <tr key={i}>
                  <td>{p.name}</td>
                  <td>{p.value}</td>
                  <td>
                    <EditIcon className="link" onClick={() => onClickEditField(i)}/>
                    <DeleteIcon className="link" onClick={() => onClickDeleteField(i)}/>
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </CardPanel>

          {/*{this.renderDevices()}*/}

          <CardPanel title="Test Result">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Device</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
              {shapeScriptResult.map((s, i) =>
                <tr key={i}>
                  <td>{s.name}</td>
                  <td>{s.output}</td>
                </tr>
              )}
              </tbody>
            </table>
          </CardPanel>

          <div className="form-buttons">
            <Button variant="raised" type="submit" color="primary">Save</Button>
            <Button variant="raised" className="margin-md-left" onClick={onClickTest}>Test</Button>
          </div>
        </form>
        {children}
      </Modal>
    )
  }
}
export default withStyles(toolbarStyles)(ShapeEditModalView)