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
        selectedItem && selectedItem.monitors && selectedItem.monitors.map((monitor, index) => {
            monitorNames.push(<tr key={index}><td >{monitor.name}</td></tr>)
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
        <div className="col-md-12">
            <div style={{height:'350', overflow: 'auto', border: '1px solid gray', textAlign:'center'}}>
                <table className={`table table-hover `}>
                <tbody>
                <tr>
                    <td style={{ textAlign:'center'}}><b>Monitors</b></td>
                </tr>           
                    {monitorNames}
                </tbody>
                </table>
            </div>
        </div>
      </div>
        );
    }
}