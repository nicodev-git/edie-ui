import React, {Component} from 'react'
import {Field} from 'redux-form'
import EditIcon from '@material-ui/icons/Edit'
import {find} from 'lodash'

import {
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  FormControlLabel
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import classNames from 'classnames'

import {
  FormInput,
  FormSelect,
  Modal,
  FormTextArea,
  CardPanel,
  FormCheckbox
} from 'components/modal/parts'
import { appletColors as colors } from 'shared/Global'
import AppletCard from 'components/common/AppletCard'

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
    fontSize: '16px'
  },
})

const arrowStyle = {
  marginTop: 70
}

const inputOutputWidth = {
  width: 220
}

class ShapeEditModalView extends Component {
  renderDevices () {
    const {
      servers, applyDeviceIds,
      onCheckAppliedDevice, onChangeApplyAllDevices,
      classes, allValues
    } = this.props

    const {applyAllDevices} = allValues || {}

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
                  <Field
                    name="applyAllDevices"
                    component={FormCheckbox} label=""
                    onChange={onChangeApplyAllDevices}
                    indeterminate={applyDeviceIds.length > 0 && applyDeviceIds.length < servers.length}
                  />
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

  renderInput () {
    const {
      playbookObjects, inputFields, onCheckInputField, inputObj
    } = this.props
    return (
      <div className="margin-md-right" style={inputOutputWidth}>
        <div className="text-right" style={arrowStyle}>
          <Field
            name="inputName" component={FormSelect} floatingLabel="Input"
            fullWidth className="text-left"
            options={playbookObjects.map(p => ({label: p.name, value: p.name}))}/>
        </div>
        <div style={{maxHeight: 350, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
            <tr>
              <th>Var</th>
            </tr>
            </thead>
            <tbody>
            {(inputObj ? (inputObj.vars || []) : []).map((p, i) =>
              <tr key={i}>
                <td>
                  <FormControlLabel
                    className="margin-sm-left"
                    control={
                      <Checkbox
                        checked={inputFields.includes(p)}
                        onChange={(e) => onCheckInputField(p, e.target.checked)}/>
                    }
                    label={p}
                  />
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderInputOutput () {
    const {allValues} = this.props
    const {title, description, img} = allValues || {}
    return (
      <CardPanel title="Input/Output">
        <div className="flex-horizontal">
          <div className="flex-1"></div>
          {this.renderInput()}

          <div>
            <img src="/images/right-arrow.png" className="valign-middle" style={arrowStyle} alt=""/>
            <AppletCard
              color={colors[0]}
              name={title}
              desc={description || title}
              img={`/images/${img || ''}`}
            />
            <img src="/images/right-arrow.png" className="valign-middle" style={arrowStyle} alt=""/>
          </div>
          {this.renderOutput()}
          <div className="flex-1"></div>
        </div>
      </CardPanel>
    )
  }

  renderOutput () {
    const {
      playbookObjects, allValues, outputFields, onCheckOutputField
    } = this.props
    const {outputName} = allValues || {}
    const outputObj = find(playbookObjects, {name: outputName}) || {}

    return (
      <div className="margin-md-left" style={inputOutputWidth}>
        <div style={arrowStyle}>
          <Field
            name="outputName" component={FormSelect} floatingLabel="Output"
            className="margin-md-right" fullWidth
            options={playbookObjects.map(p => ({label: p.name, value: p.name}))}/>
        </div>
        <div style={{maxHeight: 350, overflow: 'auto'}}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Var</th>
              </tr>
            </thead>
            <tbody>
            {(outputObj.vars || []).map((p, i) =>
              <tr key={i}>
                <td>
                  <FormControlLabel
                    className="margin-sm-left"
                    control={
                      <Checkbox
                        checked={outputFields.includes(p)}
                        onChange={(e) => onCheckOutputField(p, e.target.checked)}/>
                    }
                    label={p}
                  />
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderScript () {
    const {
      onClickEditField,
      fields, inputObj
    } = this.props
    return (
      <CardPanel title="Script">
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
          {(inputObj ? (inputObj.vars || []) : []).map((p, i) =>
            <tr key={i}>
              <td>{p}</td>
              <td>{fields[p] || ''}</td>
              <td>
                <EditIcon className="link" onClick={() => onClickEditField(i, p)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </CardPanel>
    )
  }

  render () {
    const {onSubmit, onClickClose,
      onClickTest, shapeScriptResult,
      children, noModal
    } = this.props
    const content = (
      <div>
        <form onSubmit={onSubmit}>
          <CardPanel title="Shape">
            <Field name="title" component={FormInput} floatingLabel="Name" className="margin-md-right"/>
            <Field name="description" component={FormInput} floatingLabel="Description" style={{width: 350}}
                   className="margin-sm-top"/>
          </CardPanel>

          {this.renderInputOutput()}
          {this.renderScript()}
          {this.renderDevices()}

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
      </div>
    )
    if (noModal) return content
    return (
      <Modal title="Shape" contentStyle={{width: 1000}} onRequestClose={onClickClose}>
        {content}
      </Modal>
    )
  }
}
export default withStyles(toolbarStyles)(ShapeEditModalView)