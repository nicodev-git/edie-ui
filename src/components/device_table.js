import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchDevices} from '../actions'
import {Link} from 'react-router'
import Griddle from 'griddle-react'
import SearchBar from '../containers/search_bar'

class DeviceTable extends Component {

  constructor (props) {
    super(props)

    this.onRowClick = this.onRowClick.bind(this)
  }

  componentWillMount () {
    this.props.fetchDevices(0, 20)
  }

  renderWeather (resource) {
    const name = resource.name
    const type = resource.type

        // const { lon, lat } = cityDate.city.coord;

    return (
            <tr key={resource.id}>
                <td>{resource.name}</td>
                <td>{resource.type}</td>
            </tr>
    )
  }

  onRowClick (event) {
    console.log(event)
  }
  render () {
    return (
            <div >
                <table >
                    <tbody>
                    <tr>
                        <td width="98%">
                            <SearchBar />
                        </td>
                        <td width="2%">
                            <div className="text-xs-right" >
                                <Link to="/device" className="btn btn-success">New</Link>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                <Griddle resultsPerPage={15} bodyHeight={400} onRowClick={this.onRowClick} results={this.props.resources} columns={['name', 'type', 'eng_name']} />
            </div>
    )
  }
}

function mapStateToProps (state) {
  return {resources: state.resources.all}
}
export default connect(mapStateToProps, {fetchDevices})(DeviceTable)
