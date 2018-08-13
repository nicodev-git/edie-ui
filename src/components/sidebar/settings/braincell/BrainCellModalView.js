import React, {Component} from 'react'
import {Field} from 'redux-form'
import {Button, Checkbox, IconButton, Tooltip} from '@material-ui/core'
import AddIcon from '@material-ui/icons/AddCircle'
import DeleteIcon from '@material-ui/icons/Delete'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import {findIndex, find} from 'lodash'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core'
import ParamsTableHead from './ParamsTableHead'
import InlineEdit from 'components/common/ReactEditInline'
import {
  FormInput,
  FormSelect,
  Modal,
  CardPanel,
  FormCheckbox
} from 'components/modal/parts'

import {brainCellTypes, brainCellValueTypes, severities} from 'shared/Global'

// const dirOptions = [{
//     label: 'External', value: 'external'
// }, {
//     label: 'Internal', value: 'internal'
// }]

const runOnOptions = [{
  label: 'Srflow', value: 'srflow'
}, {
  label: 'IM', value: 'im'
}, {
  label: 'AAA', value: 'aaa'
}, {
  label: 'Eddie', value: 'eddie'
}, {
  label: 'Device', value: 'device'
}]

export default class BrainCellModalView extends Component {
  renderValue() {
    const {allValues, workflows, functions} = this.props
    const {type, valueType} = allValues || {}
    if (type === 'Grok' || type === 'Classification' || type === 'ProductClassification' || type === 'Tag') return null

    if (type === 'Incident') {
      return (
        <div>
          <Field name="value" component={FormInput} floatingLabel="Format" className="margin-md-right valign-top"
                 fullWidth/>
          <Field name="severity" component={FormSelect} className="margin-md-right valign-top" floatingLabel="Severity"
                 options={severities}/>
          <Field name="blockIP" component={FormCheckbox} label="BlockIP" className="margin-sm-top"/>
        </div>
      )
    } else if (valueType === 'WORKFLOW') {
      return (
        <Field name="value" component={FormSelect} floatingLabel="Value" className="margin-md-right valign-top"
               options={workflows.map(w => ({label: w.name, value: w.name}))}
        />
      )
    } else if (valueType === 'FUNCTION') {
      if (type === 'CommandPattern') {
        // return (
        //   <Field name="value" component={FormSelect} floatingLabel="Function" className="margin-md-right valign-top"
        //          options={functions}
        //   />
        // )
        return [
          <Field key="3" name="value" component={FormSelect} floatingLabel="Function"
                 className="margin-md-right valign-top"
                 options={functions}
          />,
          /*
            <Field key="4" name="functionMethod" component={FormInput} floatingLabel="Method" className="margin-md-right valign-top"/>,
            <Field key="5" name="externalstatus" component={FormSelect} floatingLabel="Internal/External" className="margin-md-right valign-top"
                   options={dirOptions}
            />,
            externalstatus === 'external' ? (
                <Field key="6" name="runOn" component={FormSelect} floatingLabel="Run On" className="margin-md-right valign-top"
                       options={runOnOptions}/>
            ) : null*/
        ]
      }
    }

    return (
      <Field name="value" component={FormInput} floatingLabel="Value" className="margin-md-right valign-top"/>
    )
  }

  renderGrokLines() {
    const {
      allValues, lines,
      onDeleteLine,
      selectedLineIndex, onLineClick, onLineChange
    } = this.props
    const {type} = allValues || {}
    if (type !== 'Grok') return null

    return (
      <CardPanel title="Patterns" tools={<DeleteIcon className="link" onClick={onDeleteLine}/>}>
        <table className="table table-p-sm table-hover">
          <tbody>
          {lines.map((p, index) =>
            <tr key={index}
                className={selectedLineIndex === index ? 'selected' : ''}
                onClick={onLineClick.bind(this, index)}>
              <td>
                <InlineEdit
                  activeClassName="editing"
                  text={p || '\u00a0'}
                  paramName="pattern"
                  change={onLineChange.bind(this, index)}
                  style={{
                    width: '100%',
                    display: 'block'
                  }}
                />
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </CardPanel>
    )
  }

  renderValueType() {
    const {allValues} = this.props
    const {type} = allValues || {}

    if (type === 'Classification' || type === 'ProductClassification' || type === 'Tag' || type === 'Incident' || type === 'Function') return null

    const index = findIndex(brainCellTypes, {value: type})
    let valueTypes = []
    if (index >= 0) {
      const cellType = brainCellTypes[index]
      valueTypes = brainCellValueTypes.filter(p => cellType.valueTypes.includes(p.value))
    }

    return (
      <Field name="valueType" component={FormSelect} floatingLabel="Action" className="margin-md-right valign-top"
             options={valueTypes}/>
    )
  }

  renderCategory() {
    const {allValues, categories, subcategories} = this.props
    const {type} = allValues || {}
    if (type !== 'Function') return null
    return (
      <CardPanel title="Category">
        <div>
          <Field name="runOn" component={FormSelect} floatingLabel="App" className="margin-md-right valign-top"
                 options={runOnOptions}/>
        </div>
        <div className="margin-md-top margin-md-bottom">
          <Field name="functionCategory" component={FormSelect} floatingLabel="Category"
                 className="margin-md-right valign-top" options={categories}/>
          <Field name="functionSubcategory" component={FormSelect} floatingLabel="Subcategory"
                 className="margin-md-right valign-top" options={subcategories}/>

          {type === 'Function' ? (
            <Field name="functionMethod" component={FormInput} floatingLabel="Method"
                   className="margin-md-right valign-top"/>
          ) : null}
        </div>
      </CardPanel>
    )
  }

  renderKey() {
    const {allValues} = this.props
    const {type} = allValues || {}
    if (type === 'Tag' || type === 'Incident' || type === 'Function' || type === 'Grok') return null
    const label = type === 'Command' ? 'Description' : 'Key'
    return (
      <Field name="key" component={FormInput} floatingLabel={label} className="margin-md-right valign-top"
             fullWidth/>
    )
  }

  renderProduct() {
    const {allValues, productTypes, productVendors, vendorProducts} = this.props
    const {type, productTypeId, productVendorId} = allValues || {}
    if (type !== 'ProductClassification') return null

    let vendors = productVendors || []
    if (productTypeId) {
      const type = find(productTypes, {id: productTypeId})
      if (type) vendors = vendors.filter(p => (type.vendorIds || []).includes(p.id))
    }
    let products = vendorProducts || []
    if (productVendorId) {
      const vendor = find(productVendors, {id: productVendorId})
      if (vendor) products = products.filter(p => (vendor.productIds || []).includes(p.id))
    }

    return (
      <div className="margin-md-top">
        <Field name="productTypeId" component={FormSelect} floatingLabel="Type"
               options={(productTypes || []).map(p => ({label: p.name, value: p.id}))}
               style={{minWidth: 150}} className="margin-sm-right"
        />
        <Field name="productVendorId" component={FormSelect} floatingLabel="Vendor"
               options={vendors.map(p => ({label: p.name, value: p.id}))}
               style={{minWidth: 150}} className="margin-sm-right"
        />
        <Field name="productId" component={FormSelect} floatingLabel="Product"
               options={(products || []).map(p => ({label: p.name, value: p.id}))}
               style={{minWidth: 150}}
        />
      </div>
    )
  }

  renderParams() {
    const {allValues, params, onAddParam, onDeleteParam} = this.props
    const {type} = allValues || {}
    if (type !== 'CommandPattern') return null
    return (
      <CardPanel title="Match" tools={<AddIcon className="link" onClick={onAddParam}/>}>
        <table className="table table-hover mb-none">
          <tbody>
          {params.map((p, i) =>
            <tr key={i}>
              <td>{p}</td>
              <td>
                <DeleteIcon className="link" onClick={() => onDeleteParam(i)}/>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </CardPanel>
    )
  }

  renderScript() {
    const {allValues, onClickScript} = this.props
    const {type, runOn} = allValues || {}
    if (type === 'Classification' || type === 'ProductClassification' || type === 'Tag' || type === 'Incident') return null
    if (runOn !== 'device') return null
    return (
      <CardPanel title="Script">
        <Field name="params2.script" component={FormCheckbox} label="Script"/>

        <label className="link margin-md-left text-underline"
               onClick={() => onClickScript('linuxShell')}>Linux</label>

        <label className="link margin-md-left text-underline"
               onClick={() => onClickScript('linuxShellResult')}>Result</label>

        <label className="link margin-lg-left text-underline"
               onClick={() => onClickScript('windowsShell')}>Windows</label>

        <label className="link margin-md-left text-underline"
               onClick={() => onClickScript('windowsShellResult')}>Result</label>


      </CardPanel>
    )
  }

  renderParams2() {
    const {
      allValues, params2Fields, onAddParam2Field, onDeleteParam2Field,
      params2Selected, onClickParam2Field
    } = this.props
    const {type} = allValues || {}
    if (type !== 'CommandPattern' && type !== 'Incident') return null

    let headStyle = {}
    if (params2Selected >= 0) {
      headStyle = {
        color: '#e10050',
        backgroundColor: '#fbe0ea'
      }
    }
    return (
      <CardPanel>
        <div className="padding-md-left" style={headStyle}>
          <div style={{display: 'flex', alignItems: 'center', width: '100%'}}>
            {params2Selected >= 0 ? (
              <Typography color="inherit" variant="subheading">
                1 selected
              </Typography>
            ) : (
              <Typography variant="title">Params</Typography>
            )}
            <div style={{flex: 1}}>
            </div>
            <div>
              {params2Selected >= 0 ? (
                <IconButton onClick={onDeleteParam2Field}>
                  <DeleteIcon/>
                </IconButton>
              ) : (
                <IconButton onClick={onAddParam2Field}>
                  <AddIcon/>
                </IconButton>
              )}
            </div>
          </div>
        </div>
        <Table>
          <ParamsTableHead
            numSelected={params2Selected >= 0 ? 1 : 0}
            rowCount={params2Fields.length}
          />
          <TableBody>
            {params2Fields.map((p, i) =>
              <TableRow
                hover
                onClick={() => onClickParam2Field(i)}
                role="checkbox"
                aria-checked={params2Selected === i}
                tabIndex={-1}
                key={i}
                selected={params2Selected === i}>

                <TableCell padding="checkbox">
                  <Checkbox checked={params2Selected === i}/>
                </TableCell>
                <TableCell padding="none">{p.key}</TableCell>
                <TableCell padding="none">{p.value}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardPanel>
    )
  }

  renderTagTooltip(tag) {
    const {
      allValues, brainCells
    } = this.props
    const {type} = allValues || {}
    if (type !== 'Grok') return ''

    const cell = brainCells.filter(p => (p.type === 'Classification' || p.type === 'ProductClassification') && ((p.params2 || {}).tags || []).includes(tag))
    if (!cell.length) return ''
    return cell[0].key || ''
  }

  renderTags() {
    const {
      allValues, onClickAddTag, onClickDeleteTag, tags, allTags, onClickExistingTag
      // tagInputValue, onChangeTagInput, getTagSuggestionValue
    } = this.props
    const {type} = allValues || {}
    if (type !== 'Classification' && type !== 'Incident' && type !== 'Grok') return null
    return (
      <div>
        <CardPanel title="Existing Tags">
          <div>
            <Field name="tag" component={FormInput} label="Type Tag" className="valign-top"/>
            <AddIcon className="valign-top margin-sm-top" onClick={onClickAddTag}/>
          </div>
          <div className="margin-md-top">
            {allTags.filter(p => !tags.includes(p.name)).map((t, i) =>
              <Chip
                key={i}
                label={t.name}
                className="margin-md-right"
                onClick={() => onClickExistingTag(t.name)}
              />
            )}
          </div>
        </CardPanel>

        <CardPanel title="Selected Tags">
          <div>
            {tags.map((t, i) =>
              <Tooltip
                key={i}
                title={this.renderTagTooltip(t)}
              >
                <Chip
                  label={t}
                  onDelete={() => onClickDeleteTag(i)}
                  className="margin-md-right"
                />
              </Tooltip>
            )}
          </div>
        </CardPanel>
      </div>
    )
  }

  render() {
    const {
      onSubmit, onClickClose, noModal
    } = this.props

    const content = (
      <div>
        <form onSubmit={onSubmit}>
          <CardPanel title="BrainCell">
            <div>
              <Field name="name" component={FormInput} floatingLabel="Name" className="margin-md-right valign-top"
                     fullWidth/>
              <Field name="type" component={FormSelect} floatingLabel="Type"
                     className="margin-md-right valign-top hidden"
                     options={brainCellTypes}/>
              <Field name="description" component={FormInput} floatingLabel="Description"
                     className="margin-md-right valign-top" fullWidth/>
            </div>
            <div className="margin-sm-top">
              {this.renderKey()}
            </div>
            <div className="margin-sm-top">
              {this.renderValueType()}

              {this.renderValue()}
            </div>
            {this.renderProduct()}
          </CardPanel>


          {this.renderCategory()}
          {this.renderScript()}
          {this.renderParams()}
          {this.renderParams2()}
          {this.renderTags()}
          {this.renderGrokLines()}

          <div className="margin-md-top">
            <Button variant="raised" type="submit">OK</Button>
          </div>
        </form>
        {this.props.children}
      </div>
    )

    if (noModal) return content

    return (
      <Modal title="BrainCell" onRequestClose={onClickClose}>
        {content}
      </Modal>
    )
  }
}
