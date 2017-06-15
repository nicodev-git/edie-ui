import React from 'react'
import { Dialog, Checkbox } from 'material-ui'

import { TwoButtonsBlockCustom } from 'components/modal/parts'

class SearchFieldsModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, fields, selectedSearchFields, onCheck} = this.props
    return (
      <Dialog open title="Fields">
        <div className="row" style={{maxHeight: '500px', overflow: 'auto'}}>
          {fields.map(p =>
            <div key={p.path} className="col-md-4">
              <Checkbox
                label={p.path.replace(/\.dataobj\./gi, '.').replace(/dataobj\./gi, '')}
                checked={selectedSearchFields.indexOf(p.path) >= 0}
                onCheck={(e, checked) => onCheck(checked, p.path)}/>
            </div>
          )}
        </div>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
      </Dialog>
    )
  }
}

export default SearchFieldsModalView
