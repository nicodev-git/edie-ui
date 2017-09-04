import React from 'react';
import {TextField, SelectField, MenuItem, RaisedButton, Checkbox} from 'material-ui'

export default class Monitor extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedItem: null,
        };
        this.onChange = this.onChange.bind(this);
    }
    onChange(event, key, payload) {
        this.setState({selectedItem: payload});
    }   
    render() {
        const { devices } = this.props        
        const { selectedItem } = this.state;  
        let monitorNames = [];
        selectedItem && selectedItem.monitors.map((monitor, index) => {
            monitorNames.push(<div key={index}>{monitor.name}</div>)
        }) 
        return (
         <div className="tabs-custom flex-vertical flex-1">
         <div className="padding-lg-left">
            <SelectField
                floatingLabelText="Devices" 
                value={selectedItem} 
                className="valign-top"
                onChange={this.onChange}
            >
                {(devices || []).map(p =>
                <MenuItem key={p.id} value={p} primaryText={p.name}/>
                )}
            </SelectField>          
        </div>
        <div>
        {monitorNames}       
        </div>
      </div>
        );
    }
}