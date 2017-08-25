import React from 'react'
import axios from 'axios'
import moment from 'moment'

import FlipView from './FlipView'
import GEditView from './GEditView'

import {showAlert} from 'components/common/Alert'
// import { ROOT_URL } from 'actions/config'

export default class GNews extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      articles: []
    }
    this.renderBackView = this.renderBackView.bind(this)
    this.renderFrontView = this.renderFrontView.bind(this)
  }

  onSubmit (options, values) {
    console.log(values)

    if (!values.name) {
      showAlert('Please type name.')
      return
    }
    const gauge = {
      ...this.props.gauge,
      ...values
    }

    this.props.updateDeviceGauge(gauge, this.props.device)
    options.onClickFlip()
  }

  componentWillMount () {
    this.fetchArticles()
  }

  onClickDelete () {
    this.props.removeDeviceGauge(this.props.gauge, this.props.device)
  }

  fetchArticles () {
    axios.get('http://www.cyber-security.io/rcontent/search/findAllPublicArticles?type=rss&type=text&draw=1&page=0&size=20&sort=dateCreated,desc').then(res => {
      this.setState({
        articles: res.data._embedded.contents
      })
    })
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderFrontView () {
    return (
      <div className="flex-1 padding-md" style={{overflow: 'auto'}}>
        <table className="table">
          <tbody>
          {this.state.articles.map(p =>
            <tr>
              <td>{p.subject}</td>
              <td className="nowrap"><small>{moment(p.dateUpdated).fromNow()}</small></td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )
  }
  renderBackView (options) {
    return (
      <div>
        <GEditView
          {...this.props}
          onSubmit={this.onSubmit.bind(this, options)}
          hideSplit
        />
      </div>
    )
  }
  render () {
    return (
      <FlipView
        {...this.props}

        style={this.props.style}
        className={this.props.className}
        gauge={this.props.gauge}

        loading={this.state.loading}
        renderFrontView={this.renderFrontView}
        renderBackView={this.renderBackView}

        onClickDelete={this.onClickDelete.bind(this)}
      />
    )
  }
}
