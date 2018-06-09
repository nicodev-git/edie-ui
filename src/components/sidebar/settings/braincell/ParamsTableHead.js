import React from 'react'
import {
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'

const columnData = [
    { id: 'key', numeric: false, disablePadding: false, label: 'Key' },
    { id: 'value', numeric: false, disablePadding: false, label: 'Value' },
]

export default class ParamsTableHead extends React.Component {
    render() {
        const { onSelectAllClick, numSelected, rowCount } = this.props

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox" style={{width: 50}}>
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected && numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {columnData.map(column => {
                        return (
                            <TableCell key={column.id} style={{padding: 0}}>
                                {column.label}
                            </TableCell>
                        )
                    }, this)}
                </TableRow>
            </TableHead>
        )
    }
}