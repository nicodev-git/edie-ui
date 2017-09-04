import React from 'react';

export default class Device extends React.Component {   
    
    render() {
        const {devices, selectedServers, selectedDevice, selectedRight, selectedMonitor,
            onSelectDevice, onSelectRight, onSelectMonitor, onClickAddServer, onClickRemoveServer,
            tableClass, height
          } = this.props
        return ( <div className="padding-md-left padding-md-right">
        <div className="row">
          <div className="col-md-12">
          <div style={{height: height || 450, overflow: 'auto', border: '1px solid gray'}}>
          <table className={`table table-hover ${tableClass}`}>
            <tbody>
            <tr>
              <td style={{textAlign:'center'}}><b>Devices</b></td>
            </tr>
            {(devices || []).map((p, i) =>
              <tr key={p.id}>
                <td
                  className={selectedDevice && selectedDevice.id === p.id ? 'selected' : ''}
                  >{p.name}</td>
               
              </tr>
            )}
            </tbody>
          </table>
        </div>
          </div>
        </div>
      </div>
        );
    }
}