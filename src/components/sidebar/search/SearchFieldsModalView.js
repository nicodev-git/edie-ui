import React from 'react'
import { Checkbox } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'

import { TwoButtonsBlockCustom, Modal, CardPanel } from 'components/modal/parts'

class SearchFieldsModalView extends React.Component {
  render () {
    const {onClickOK, onClickClose, fields, selectedSearchFields, onCheck} = this.props
    return (
      <Modal title="Fields" onRequestClose={onClickClose}>
        <CardPanel className="margin-md-bottom">
          <div className="row" style={{maxHeight: '500px', overflow: 'auto'}}>
            {fields.map(p =>
              <div key={p.path} className="col-md-4">
                <FormControlLabel
                  control={
                    <Checkbox checked={selectedSearchFields.indexOf(p.path) >= 0} onChange={(e, checked) => onCheck(checked, p.path)}/>
                  }
                  label={p.path.replace(/\.dataobj\./gi, '.').replace(/dataobj\./gi, '')}
                />
              </div>
            )}
          </div>
        </CardPanel>
        <TwoButtonsBlockCustom name1="OK" name2="Cancel" action1={onClickOK} action2={onClickClose}/>
      </Modal>
    )
  }
}

export default SearchFieldsModalView
