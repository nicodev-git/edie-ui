import React from 'react'
import {Dialog} from 'material-ui'
import InfiniteTable from 'components/shared/InfiniteTable'
import { Button } from 'react-bootstrap'
import Select from 'react-select'

const IncidentsModalView = ({show, onHide, onClose, header, onFilter, onChange,
  value, options, params, cells, picker, url, onClick1, onClick2, onClick3}) => (
  <Dialog open title={header} onRequestClose={onClose}>
    <div className="form-inline"
      style={{'verticalAlign': 'middle', 'lineHeight': 2.2}}>

        <input type="text" placeholder="Search" className="form-control input-sm"
          onChange={onFilter}
          ref="search"/>

        <Select
          value={value}
          options={options}
          onChange={onChange}
          multi
          clearable={false}
          className="select-severity"
          style={{minWidth: '85px'}}
          searchable={false}
          autosize={false}
        />

        <select className="form-control text-primary margin-md-left input-sm"
          onChange={onFilter}
          ref="fixed" defaultValue="0">
            <option value="-1">Any</option>
            <option value="0">Unfixed</option>
            <option value="1">Fixed</option>
        </select>
        {picker}
    </div>

    <InfiniteTable
      url={url}
      params={params}
      cells={cells}
      ref="table"
      rowMetadata={{'key': 'incidentid'}}
      bodyHeight={500}
      selectable
    />

    <div style={{borderTop: '1px solid gray', paddingTop: '4px'}}>
      <Button bsStyle="primary" onClick={onClick1}>Fix All</Button>
      <Button bsStyle="primary" className="margin-sm-left"
        onClick={onClick2}>Add Exception</Button>
      <Button bsStyle="primary" className="margin-sm-left"
        onClick={onClick3}>Open</Button>
    </div>
  </Dialog>
)

export default IncidentsModalView
