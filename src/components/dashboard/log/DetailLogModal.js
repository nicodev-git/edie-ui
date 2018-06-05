import React from 'react'
import moment from 'moment'
import { keys, reverse } from 'lodash'
import axios from 'axios'

import DetailLogModalView from './DetailLogModalView'
import { encodeUrlParams } from 'shared/Global'
import { ROOT_URL } from 'actions/config'

export default class DetailLogModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      page: 0,
      loading: true
    }
  }

  getData (res) {
    const embedded = res._embedded
    const data = embedded[keys(embedded)[0]]
    return data
  }

  componentWillMount () {
    this.fetchLog()
  }

  componentDidUpdate (prevProps) {
    const {detailLogViewParam} = this.props
    if (prevProps.detailLogViewParam && detailLogViewParam && detailLogViewParam.index !== prevProps.detailLogViewParam.index) {
      this.fetchLog()
    }
  }

  fetchLog () {
    const {page} = this.state
    const {detailLogViewParam} = this.props
    const {query} = detailLogViewParam

    this.setState({
      loading: true
    })

    if (page === 0) {
      const to = detailLogViewParam.data[detailLogViewParam.index].entity.timestamp
      axios.all([
        axios.get(`${ROOT_URL}/search/query?${encodeUrlParams({
          ...query,
          from: 0,
          to,
          sortDir: 'desc'
        })}`),
        axios.get(`${ROOT_URL}/search/query?${encodeUrlParams({
          ...query,
          from: to + 1,
          to: moment().endOf('year'),
          sortDir: 'asc'
        })}`)
      ]).then(res => {
        const data1 = reverse(this.getData(res[0].data))
        const data2 = this.getData(res[1].data)

        this.setState({data: [...data1, ...data2], loading: false})
      })
    }/* else if (page < 0) {
      axios.get(`${ROOT_URL}/search/query?${encodeUrlParams({
        ...query,
        sortDir: 'desc',
        page: -page + 1
      })}`).then(res => {
        this.setState({data: this.getData(res.data), loading: false})
      })
    } else {
      axios.get(`${ROOT_URL}/search/query?${encodeUrlParams({
        ...query,
        from: query.to + 1,
        to: moment().endOf('year'),
        page,
        sortDir: 'asc'
      })}`).then(res => {
        this.setState({data: this.getData(res.data), loading: false})
      })
    }*/
  }

  onHide () {
    this.props.showDetailLogModal(false)
  }

  onClickPrev () {
    const params = this.props.detailLogViewParam

    this.props.showDetailLogModal(true, {
      ...params,
      index: params.index - 1
    })
    // this.setState({
    //   page: this.state.page - 1
    // }, () => {
    //   this.fetchLog()
    // })
  }

  onClickNext () {
    const params = this.props.detailLogViewParam

    this.props.showDetailLogModal(true, {
      ...params,
      index: params.index + 1
    })
    // this.setState({
    //   page: this.state.page + 1
    // }, () => {
    //   this.fetchLog()
    // })
  }

  render () {
    const params = this.props.detailLogViewParam
    return (
      <DetailLogModalView
        onHide={this.onHide.bind(this)}
        rowId={params.data[params.index].id}
        items={this.state.data}
        page={params.index}
        size={params.data.length}
        loading={this.state.loading}
        onClickPrev={this.onClickPrev.bind(this)}
        onClickNext={this.onClickNext.bind(this)}
      />
    )
  }
}
