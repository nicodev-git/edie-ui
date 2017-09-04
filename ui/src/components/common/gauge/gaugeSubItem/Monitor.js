import React from 'react';
import {TextField, SelectField, MenuItem, RaisedButton, Checkbox} from 'material-ui'

export default class Monitor extends React.Component {    
    render() {
        const {devices} = this.props        
        return (
         <div className="tabs-custom flex-vertical flex-1">
         <div className="padding-lg-left">
          <SelectField
            floatingLabelText="Devices" value={'123'} 
            className="valign-top">
            {(devices || []).map(p =>
              <MenuItem key={p.id} value={p.id} primaryText={p.name}/>
            )}
          </SelectField>          
        </div>
      </div>
        );
    }
}