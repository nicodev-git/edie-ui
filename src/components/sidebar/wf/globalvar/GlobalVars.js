import React from 'react'

import TabPage from 'components/common/TabPage'
import TabPageBody from 'components/common/TabPageBody'
import TabPageHeader from 'components/common/TabPageHeader'

export default class GlobalVars extends React.Component {
    componentDidMount () {
        this.props.fetchGlobalVars()
    }
    renderContents () {
        const {globalVars} = this.props
        return (
            <div className="flex-1" style={{overflow: 'auto', height: '100%'}}>
                <table className="table">
                    <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Name</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {globalVars.map(p =>
                        <tr key={p.id}>
                            <td className="width-280">{p.id}</td>
                            <td>{p.name}</td>
                            <td>{p.value}</td>
                        </tr>
                    )}
                    </tbody>

                </table>
            </div>
        )
    }
    render () {
        return (
            <TabPage>
                <TabPageHeader title="Global Vars">
                    <div className="text-center margin-md-top">
                        <div className="pull-right">
                        </div>
                    </div>
                </TabPageHeader>

                <TabPageBody history={this.props.history} location={this.props.location}>
                    {this.renderContents()}
                </TabPageBody>
            </TabPage>
        )
    }
}
