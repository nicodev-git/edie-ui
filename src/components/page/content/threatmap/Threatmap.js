import React from 'react'
import Slider from 'rc-slider'
import { findIndex, assign } from 'lodash'
import d3 from 'd3'
import moment from 'moment'
import Transition from 'react-addons-css-transition-group'

import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import {lookup} from 'country-data'
// import country_latlng from 'shared/data/country-latlng.json'

const country_latlng = null

import { appendComponent, removeComponent } from '../../../../util/Component'
import Preloader from '../../../shared/Preloader'

import { format } from '../../../../shared/Global'

class ThreatMap extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      mode: 'demo',
      settings: false,

      startDate: moment().add(-15, 'days'),
      endDate: moment(),

      playing: false,
      sliderPos: 0,
      sliderMin: 0,
      sliderMax: 1,

      latestAttacks: [],

      popup: false,
      popupX: 0,
      popupY: 0,
      popupObject: null
    }

    assign(this, {
      vmap: null,
      svg: null,

      slider: null,

      attackers: [],
      devices: [],
      connections: [],
      blasts: [],

      scenario: [],
      countryNamesDisplayed: {},
      currentPlay: {
        scene: null,
        stopped: true,
        pause: false,
        screen: 0,
        frame: 0
      },

      buffer: [],
      buffertimer: 0,
      severities: ['High', 'Medium', 'Low'],
      lastIncidentId: 0,

      incidentTimer: 0,

      mode: null,

      scope: {
        maxSize: 6,
        animationSpeed: 2000,
        arcThickness: '2',
        borderColor: '#63233d',
        fadeOutSpeed: 1500
      },
      cancelled: false
    })

    this.initDemoScenario()
  }

  componentDidMount () {
    let me = this

    me.vmap = $(this.refs.mapDiv).vectorMap({
      map: 'world_mill_en',

      backgroundColor: '#193341',
      zoomMax: 1,

      regionStyle: {
        initial: {
          'fill': '#3C6A81',
          'fill-opacity': 0.8,
          'stroke': 'none',
          'stroke-width': 1,
          'stroke-opacity': 1
        }
      },

      onViewportChange: () => {
                // var height = $(window).height() - map.offset().top - 26;
                // map.css('height', height)
        setTimeout(() => {
          me.onViewportChange()
        }, 1)
      }
    }).vectorMap('get', 'mapObject')

    const $svg = $(this.refs.mapDiv).find('svg')
    me.svg = d3.select($svg[0])
    me.svg.append('text').attr('class', 'layer')

        // $svg.off('click').click(function(){
        //     //p.click();
        //     p.focus();
        // });

    me.buffertimer = setInterval(() => {
      let $scope = me.scope

      if (!me.buffer.length) return
      let row = me.buffer[0]
      me.buffer.splice(0, 1)

            // row.insertAfter(p.find('#tableContainer #spacerRow'));
            // row.children().css("opacity", 0.1).fadeTo(500, 1, 'swing');
            //

      let {latestAttacks} = this.state

      latestAttacks.unshift(row)
      if (latestAttacks.length > $scope.maxSize) {
        latestAttacks.pop()
      }

      this.setState({ latestAttacks })
    }, 500)

        // p.find('#select-mode').change();
  }

  componentWillUnmount () {
    let me = this

        // var removed = me.buffer.splice(0);
        // $.each(removed, function(i, item){
        //     item.find('.sourceCol p').tooltip('destroy');
        //     item.find('.destCol p').tooltip('destroy');
        // });

    me.cancelled = true
    me.stop()
    clearInterval(me.buffertimer)
    me.vmap.remove()

        // offIncidentAlert = false;

        // setTimeout(function(){
        //     if (fullscreen) fullscreen.cancel();
        // }, 1);
  }

  render () {
    return (
            <div style={{flex: 1}} className="flex-vertical">
                <div className="form-inline padding-sm">
                    <label className="pt-none control-label margin-sm-right">Mode</label>
                    <select className="form-control input-sm margin-lg-right"
                      value={this.state.mode} onChange={this.onChangeMode.bind(this)}>
                        <option value="real">Real/History</option>
                        <option value="demo">Demo</option>
                    </select>

                    <div className={`form-group ${this.state.mode === 'real' ? '' : 'hidden'}`}>

                        <div className="checkbox">
                            <label><input type="checkbox" checked={this.state.history} ref="history"
                              onChange={this.onChangeHistoryCheck.bind(this)}/>History</label>
                        </div>

                        <div className={`inline margin-md-left ${this.state.history ? '' : 'hidden'}`}>
                            <label className="pt-none control-label">From: </label>
                            <DatePicker ref="dateFrom" readOnly
                              selected={this.state.startDate} onChange={this.onChangeStartDate.bind(this)} />
                            <label className="pt-none control-label margin-sm-left">To: </label>
                            <DatePicker ref="dateFrom" readOnly
                              selected={this.state.endDate} onChange={this.onChangeEndDate.bind(this)} />
                        </div>
                    </div>

                    <div className="form-group pull-right inline">
                        <select ref="severity" className="hidden" multiple="multiple">
                            <option>High</option>
                            <option>Medium</option>
                            <option>Low</option>
                            <option>Audit</option>
                        </select>
                        <a href="javascript:;" onClick={this.onClickSettings.bind(this)}>
                            <i className="fa fa-x fa-cog valign-middle" />
                        </a>
                    </div>

                </div>
                <div style={{flex: 1, position: 'relative'}} className={(this.state.history || this.state.mode === 'demo') ? 'slider-visible' : ''}>
                    <div ref="mapDiv" style={{position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}} />

                    <div id="latestAttacksContainer">
                        <div id="latestAttacksContainerLeft" className="pinkBorder">
                            <div id="tableContainer">
                                <div id="tableHeaderRow">
                                    <div id="latestAttacksTimeCol">TIME</div>
                                    <div id="latestAttacksAttackCol">ATTACK</div>
                                    <div id="latestAttacksActionCol">ACTION</div>
                                    <div id="latestSeverityCol">SEVERITY</div>
                                    <div id="latestAttacksSourceCol">ATTACKING COUNTRY</div>
                                    <div id="latestAttacksDestCol">TARGET DEVICE</div>
                                </div>
                                <div className="attackRow" id="spacerRow">
                                    <div>
                                        &nbsp;
                                    </div>
                                </div>
                                {
                                    this.state.latestAttacks.map(item => this.renderRow(item))
                                }
                            </div>
                        </div>
                    </div>

                    {this.renderInfoPopup()}

                    <div className="play-controls">
                        <div className="inline">
                            {
                                this.state.playing ?
                                    (<a href="javascript:;" style={{padding: '2px'}}>
                                        <img src="/images/btn_pause.png" style={{width: '23px'}} onClick={this.onClickPause.bind(this)}/>
                                    </a>)
                                    :
                                    (<a href="javascript:;" style={{padding: '2px'}}>
                                        <img src="/images/btn_play.png" style={{width: '23px'}} onClick={this.onClickPlay.bind(this)}/>
                                    </a>)
                            }

                            <a href="javascript:;" style={{padding: '2px'}}>
                                <img src="/images/btn_stop.png" style={{width: '23px'}} onClick={this.onClickStop.bind(this)}/>
                            </a>

                            {this.renderTime()}

                        </div>
                        <div className="incident-time hidden" style={{color: 'white', paddingTop: '3px'}} />

                        <div className="play-timeline" style={{flex: 1, padding: '9px 20px'}}>
                            {this.renderSlider()}
                        </div>
                    </div>
                </div>

            </div>
    )
  }

  renderSlider () {
    const handleStyle = {
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      padding: '2px',
      border: '2px solid #ed5565',
      borderRadius: '3px',
      background: '#ed5565',
      fontSize: '14px',
      textAlign: 'center',
      zIndex: 3,

      minHeight: '20px',
      marginTop: '2px'
    }

    const CustomHandle = props => {
      const style = assign({left: `${props.offset}%`}, handleStyle)
      return (
                <div style={style} />
      )
    }
    CustomHandle.propTypes = {
      value: React.PropTypes.any,
      offset: React.PropTypes.number
    }

    return (
            <Slider min={this.state.sliderMin} max={this.state.sliderMax}
              value={this.state.sliderPos} handle={<CustomHandle />}
              onChange={this.onChangeSlider.bind(this)}/>
    )
  }

  renderTime () {
    let me = this
    let tx = new Date('2016-1-1 00:00:00') - 0

        // var currenttime = '';
        // if (me.currentPlay && me.currentPlay.scene) {
        //     currenttime = $.format.date(me.currentPlay.scene[0].time + me.slider.options.from * 1000, 'HH:mm:ss');
        // }
    return (
            <div className="inline" style={{color: 'white'}}>
                <span>{moment(tx + me.state.sliderPos * 1000).format('m:ss')}</span>
                <span>/</span>
                <span>{moment(tx + me.state.sliderMax * 1000).format('m:ss')}</span>
            </div>
    )
  }

  renderRow (item) {
    return (
            <div className="attackRow visible" key={item.id}>
                <div className="timeCol">
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={0}
                      transitionAppear transitionAppearTimeout={500}>
                        <p>{item.time}</p>
                    </Transition>
                </div>
                <div className="attackCol">
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={0}
                      transitionAppear transitionAppearTimeout={500}>
                        <p className="attackContainer">{item.type}</p>
                    </Transition>
                </div>
                <div className="actionCol">
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={0}
                      transitionAppear transitionAppearTimeout={500}>
                        <p>{item.action}</p>
                    </Transition>
                </div>
                <div className="severityCol">
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={0}
                      transitionAppear transitionAppearTimeout={500}>
                        <p>{item.severity}</p>
                    </Transition>
                </div>
                <div className="sourceCol">
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={0}
                      transitionAppear transitionAppearTimeout={500}>
                        <p>{item.attacker}</p>
                        <img src={`/images/flags/32/${item.attackerCountry.code}.png`}
                          title={item.attackerCountry.name}
                          width="20"
                          style={{marginTop: '-5px', maxHeight: '20px'}}/>
                    </Transition>
                </div>
                <div className="destCol">
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={0}
                      transitionAppear transitionAppearTimeout={500}>
                        <p>{item.target}</p>
                        <img src={`/images/flags/32/${item.targetCountry.code}.png`}
                          title={item.targetCountry.name}
                          width="20"
                          style={{marginTop: '-5px', maxHeight: '20px'}}/>
                    </Transition>
                </div>
            </div>
    )
  }

  renderInfoPopup () {
    let { popupObject } = this.state

    if (!popupObject) return

    return (
            <div id="countryDrillDownContainer"
              className={`pinkBorder active ${this.state.popup ? '' : 'hidden'}`}
              style={{left: `${this.state.popupX}px`, top: `${this.state.popupY}px`}}>
                    <a href="javascript:;" onClick={this.onClickPopupClose.bind(this)}>
                        <span className="modalCloseBtn">
                            <i className="fa fa-times" />
                        </span>
                    </a>
                <div id="countryDrillDowntitleContainer">
                    <div style={{marginRight: '5px'}} />Info
                </div>

                <div id="mostAttackingCountryContainer">
                    <span className="sectionHeadline">Name: {popupObject.name}</span>

                    <span className="sectionHeadline">Country: {popupObject.country}</span>

                    <span className="sectionHeadline">IP: {popupObject.ip}</span>
                </div>
            </div>
    )
  }

    // ///////////////////////////////////////////////////////////////

  initDemoScenario () {
    const me = this
    me.addAttackers()
    me.addDevices()

    let scene1 = [{
      time: new Date('2015-06-01 05:01:22') - 0,
      attacks: [{
        from: me.attackers[0],
        to: me.devices[0],
        type: 'Possible Bot HTTP Request.AA',
        count: 1,

        linetype: 'curve',
        color: 'red',
        severity: 'High'
      }, {
        from: me.attackers[0],
        to: me.devices[0],
        type: 'Possible Bot HTTP Request.AB',
        count: 1,

        linetype: 'curve',
        color: 'red',
        severity: 'High'
      }, {
        from: me.attackers[0],
        to: me.devices[0],
        type: 'Possible Bot HTTP Request.AC',
        count: 1,

        linetype: 'curve',
        color: 'red',
        severity: 'High'
      }, {
        from: me.attackers[0],
        to: me.devices[0],
        type: 'Possible Bot HTTP Request.AD',
        count: 1,

        linetype: 'curve',
        color: 'red',
        severity: 'High'
      }, {
        from: me.attackers[0],
        to: me.devices[0],
        type: 'Possible Bot HTTP Request.AE',
        count: 1,

        linetype: 'curve',
        color: 'red',
        severity: 'High'
      }, {
        from: me.attackers[0],
        to: me.devices[0],
        type: 'Possible Bot HTTP Request.AF',
        count: 1,

        linetype: 'curve',
        color: 'red',
        severity: 'High'
      }]
    }, {
      time: new Date('2015-06-01 05:01:25') - 0,
      attacks: [{
        from: me.attackers[0],
        to: me.devices[1],
        type: 'Possible Bot HTTP Request.AA',
        count: 3,

        linetype: 'curve',
        color: 'blue',
        severity: 'Low'
      }]
    }, {
      time: new Date('2015-06-01 05:01:29') - 0,
      attacks: [{
        from: me.attackers[1],
        to: me.devices[1],
        type: 'Possible Bot HTTP Request.AA',
        count: 1,

        linetype: 'straight',
        color: 'yellow',
        severity: 'Medium'
      }]
    }, {
      time: new Date('2015-06-01 05:01:31') - 0,
      attacks: [{
        from: me.attackers[1],
        to: me.devices[2],
        count: 1,
        type: '',

        linetype: 'straight',
        color: 'green',
        severity: 'Audit'
      }]
    }]

    let id = parseInt(Math.random() * 1000000)
    scene1.forEach(screen => {
      screen.attacks.forEach(item => {
        item.id = id++
      })
    })

    me.scenario.push(scene1)
  }

  addDevices () {
    let me = this

    let demoCountries = ['Russian Federation', 'Japan', 'Australia']

    for (let i = 0; i < 10; i++) {
      let device = {
        id: 100 + i,
        name: `Device ${i}`,

        ip: `${Math.ceil(Math.random() * 255)}.${Math.ceil(Math.random() * 255)
                 }.${Math.ceil(Math.random() * 255)}.${Math.ceil(Math.random() * 255)}`,

        country: demoCountries[i % 3], // countries[parseInt(Math.random() * 1000) % countries.length].name,

        img: '/images/threatmap/RoundedPin.png',

        visible: false,
        bubbles: []
      }
      me.devices.push(device)
    }
  }

  addAttackers () {
    let me = this

    let demoCountries = ['Germany', 'France', 'China']

    for (let i = 0; i < 8; i++) {
      let attacker = {
        id: 300 + i,
        name: `Attacker${i}`,

        ip: `${Math.ceil(Math.random() * 255)}.${Math.ceil(Math.random() * 255)
                 }.${Math.ceil(Math.random() * 255)}.${Math.ceil(Math.random() * 255)}`,
        country: demoCountries[i % 3], // countries[parseInt(Math.random() * 1000) % countries.length].name,

        img: '/images/threatmap/SquarePin.png',

        visible: false,
        bubbles: []
      }

      me.attackers.push(attacker)
    }
  }

    // ///////////////////////////////////////////////////////////////

  onChangeMode (e) {
    this.onClickStop()
    this.clear()

    this.setState({
      mode: e.target.value,
      history: false
    }, () => {
      if (this.state.mode === 'real') {
        this.onClickPlay()
      }
    })
  }

  onChangeHistoryCheck (e) {
    this.onClickStop()

    this.setState({
      history: e.target.checked
    })
  }

  onClickSettings () {
    this.setState({
      settings: !this.state.settings
    })
  }

  onChangeStartDate (date) {
    this.setState({
      startDate: date
    })
  }

  onChangeEndDate (date) {
    this.setState({
      endDate: date
    })
  }

  onChangeSlider (value) {
    this.onSeek(value)
  }

    // ///////////////////////////////////////////////////////////////

  onClickPlay () {
    const me = this
    const {history} = me.state
    if (history) {
      me.getHistoryEvents(function (scene) {
        me.play(scene)
        me.setState({ playing: true })
      })
    } else {
      me.play(me.scenario[0])
      me.setState({ playing: true })
    }
  }

  onClickPause () {
    const me = this
    me.pause()
    me.pauseAnimation()
    me.setState({ playing: false })
  }

  onClickStop () {
    let me = this
    if (me.currentPlay && !me.currentPlay.stopped) {
      me.cancelled = true
      me.onPlayEnd()
    }
  }

  onViewportChange () {
    let me = this
    if (!me.currentPlay || !me.currentPlay.scene) return
    let scenes = me.currentPlay.scene

        // Device
    let alldevices = []
    scenes.forEach(scene => {
      scene.attacks.forEach(attack => {
        if (alldevices.indexOf(attack.from) < 0) {
          me.updateObjectPosition(attack.from)
          alldevices.push(attack.from)
        }
        if (alldevices.indexOf(attack.to) < 0) {
          me.updateObjectPosition(attack.to)
          alldevices.push(attack.to)
        }
      })
    })

        // Line
    me.connections.forEach(line => {
      me.updateLinePosition(line)
    })

        // Blast
    me.blasts.forEach(blast => {
      me.updateBlastPosition(blast)
    })
  }
    // ///////////////////////////////////////////////////////////////////

  play (scene) {
    let me = this

    if (me.state.mode === 'real' && !me.state.history) {
      me.currentPlay.stopped = false
      me.currentPlay.pause = false
      me.cancelled = false
      me.onTickReal()
    } else {
      if (!me.currentPlay.stopped) {
        if (me.currentPlay.paused) {
          me.currentPlay.paused = false

          me.resumeAnimation()
          me.enableTimer(true)
          return
        } else {
          me.stop()
          setTimeout(() => {
            me.play(scene)
          }, 1000)
          return
        }
      }

      me.reset()

      let diff = 1
      if (scene.length >= 2) {
        diff = scene[scene.length - 1].time - scene[0].time
        diff = parseInt(diff / 1000)
      }

      me.currentPlay.duration = diff
      me.currentPlay.scene = scene
      me.currentPlay.stopped = false
      me.currentPlay.screen = 0
      me.currentPlay.paused = false

      this.setState({
        sliderMax: diff,
        sliderPos: 0
      }, () => {
        me.enableTimer(true)
        me.onPlayFrame()
      })
    }
  }

  pause () {
    let me = this
    if (me.state.mode === 'real' && !me.state.history) {
      me.stop()
      return
    }
    if (!me.currentPlay) return
    me.currentPlay.paused = true
    me.enableTimer(false)
  }

  stop () {
    let me = this
    me.enableTimer(false)

    if (!me.currentPlay) return
    me.currentPlay.stopped = true
    clearTimeout(me.currentPlay.timer)
  }

  reset () {
    let me = this
    let p = $(this.refs.mapDiv)

    p.find('.map-item').remove()
    p.find('.attacker-popup').remove()

    me.connections.forEach(line => {
      line.remove()
    })
    p.find('.connection').remove()

    me.connections = []

    me.blasts.forEach(item => {
      item.remove()
    })
    me.blasts = []

    me.setState({
      sliderPos: 0
    })

    me.devices.forEach(device => {
      device.visible = false
      device.attacks = 0
      device.bubbles = []
    })

    me.attackers.forEach(attacker => {
      attacker.visible = false
      attacker.attacks = 0
      attacker.bubbles = []
    })
  }

  clear () {
    let me = this
    let p = me.div

    me.cancelled = true
    me.onPlayEnd()
    me.reset()

    this.setState({
      sliderMax: 1,
      sliderPos: 0
    })

    me.currentPlay.scene = null
  }

    // ///////////////////////////////////////////////////////////////////

  resumeAnimation () {
    let me = this
    let $scope = me.scope
        // Line
    me.connections.forEach(line => {
      let obj = line
      let trans = parseFloat(obj.attr('trans'))
      if (trans < 1) {
        obj = obj.transition().duration($scope.fadeOutSpeed * 2 * (1 - trans))
                    .style('stroke-dashoffset', 0)
                    .attr('trans', 1)
      }

      if (trans < 2) {
        obj.transition()
                    .duration($scope.fadeOutSpeed / 2 * (trans <= 1 ? 1 : (2 - trans)))
                    .style('opacity', 0)
                    .attr('trans', 2)
                    .remove()
                    .each('end', function (d) {
                      let callback = d.callback
                      let index = me.connections.indexOf(line)
                      if (index >= 0) me.connections.splice(index, 1)
                      if (callback) callback()
                    })
      }

            // Label
      let labelObj = line.data()[0].labelObj
      if (!labelObj) return
      obj = labelObj
      trans = parseFloat(obj.attr('trans'))

      if (trans < 1) {
        obj = obj.transition().duration($scope.fadeOutSpeed * 2 * (1 - trans))
                    .style('opacity', 1)
                    .attr('trans', 1)
      }

      if (trans < 2) {
        obj.transition()
                    .duration($scope.fadeOutSpeed / 2 * (trans <= 1 ? 1 : (2 - trans)))
                    .style('opacity', 0)
                    .attr('trans', 2)
                    .remove()
      }
    })

        // Blast
    me.blasts.forEach(item => {
      let obj = item
      let trans = parseFloat(obj.attr('trans'))
      if (trans < 1) {
        obj = obj.transition().duration(($scope.fadeOutSpeed * 2 - 200) * (1 - trans))
                    .attr('trans', 1)
                    .transition().duration(100)
                    .style('opacity', 1)
      }

      if (trans < 2) {
        if (trans >= 1) {
          obj = obj.style('opacity', 2 - trans)
        }
        obj.transition()
                    .duration($scope.fadeOutSpeed / 2 * (trans <= 1 ? 1 : (2 - trans)))
                    .style('opacity', 0)
                    .attr('trans', 2)
                    .remove()
                    .each('end', function (d) {
                      let callback = d.callback
                      let index = me.connections.indexOf(item)
                      if (index >= 0) me.connections.splice(index, 1)
                      if (callback) callback()
                    })
      }
    })
  }

  pauseAnimation () {
    let me = this

    me.connections.forEach(line => {
      if (line) {
        line.transition().duration(0)

                // Label
        let labelObj = line.data()[0].labelObj
        if (labelObj) labelObj.transition().duration(0)
      }
    })

    me.blasts.forEach(item => {
      if (item) {
        item.transition().duration(0)
      }
    })
  }

  enableTimer (enable) {
    let me = this
    if (enable) {
      me.incidentTimer = setInterval(me.updateTimer.bind(me), 1000)
    } else {
      clearInterval(me.incidentTimer)
    }
  }

  updateTimer () {
    let me = this
    if (me.currentPlay && !me.currentPlay.paused && !me.currentPlay.stopped) {
      me.setState({
        sliderPos: me.state.sliderPos + 1
      }, () => {
        if (me.currentPlay.scene.length > me.currentPlay.screen) {
          let screen = me.currentPlay.scene[me.currentPlay.screen]
          if (me.state.sliderPos === parseInt((screen.time - me.currentPlay.scene[0].time) / 1000)) {
            me.onPlayFrame()
          }
        }
        if (me.currentPlay.scene.length <= me.currentPlay.screen) {
          me.onPlayEnd()
        }
      })
    }
  }

  updateLinePosition (line) {
    let me = this
    let data = line.data()[0]

    line.attr('d', () => {
      return me.drawConnection(data.from, data.to, data.type, data.arcSharpness)
    })
  }

  updateBlastPosition (blast) {
    let me = this
    let data = blast.data()[0]

    blast.attr('x', data.device.x - parseFloat(blast.attr('width')) / 2)
            .attr('y', data.device.y - parseFloat(blast.attr('height')) / 2)
  }

  updateObjectPosition (device) {
    let me = this

    if (!device.visible) return
    let img = device.imgObj
    if (img) {
            // device.country
      let latlng = me.getCountryLatLng(device.country)
      if (!latlng) return
      let xy = me.latLngToXY(latlng[0], latlng[1])
      device.x = xy[0]
      device.y = xy[1]

      img.attr('x', device.x - 10)
                .attr('y', device.y - 10)
    }

    let txt = device.labelObj
    if (txt) {
      txt.attr('x', device.x)
                .attr('y', device.y + 30)
    }
  }

    // ///////////////////////////////////////////////////////////////////

  onPlayFrame () {
    let me = this

    if (me.currentPlay.stopped || me.currentPlay.paused) return
    if (me.currentPlay.screen >= me.currentPlay.scene.length) return

    let screen = me.currentPlay.scene[me.currentPlay.screen++]

    screen.attacks.forEach(attack => {
      if (me.severities.indexOf(attack.severity) < 0) return

      me.addAttackRow(
                attack.id,
                attack.from,
                attack.to,
                moment(screen.time).format('HH:mm:ss'),
                attack.type || (((parseInt(Math.random() * 10) % 3) === 0) ?
                    'Possible Bot HTTP Request.AA' : 'Trojan-Banker.Win32.Bancos.N'),
                attack.action || '',
                attack.severity)

      me.showObject(attack.from, true, () => {
        me.showObject(attack.to, true, () => {
          me.showAttack(attack.from, attack.to, attack.color, attack.linetype, attack.count)
          me.showBlast(attack.to, attack.color)
        })
      })
    })
  }

  onPlayEnd () {
    let me = this
    me.stop()
    me.setState({ playing: false })
  }

  onTickReal () {
    let me = this

    let colors = {
      'high': 'red',
      'medium': 'yellow',
      'low': 'blue',
      'audit': 'green'
    }

    if (me.currentPlay.stopped/* || me.currentPlay.paused */) return
    $.get(`${Api.bi.threatMapEventsReal}?minutes=1`, {

    }).done((res) => {
      if (me.cancelled) return
      let incidents = []
      let lastId = me.lastIncidentId
      res.object.forEach(item => {
        if (item['id'] > me.lastIncidentId) {
          incidents.push(item)
          if (item['id'] > lastId) lastId = item['id']
        }
      })
      me.lastIncidentId = lastId

      if (incidents.length === 0) return

      me.reset()

      let scenes = me.buildScene(incidents)
      me.currentPlay.scene = scenes

      scenes.forEach(scene => {
        scene.attacks.forEach(attack => {
          if (me.severities.indexOf(attack.severity) < 0) return
          me.addAttackRow(attack.from,
                        attack.to,
                        moment(scene.time).format('HH:mm:ss'),
                        attack.type,
                        attack.action || '',
                        attack.severity)

          me.showObject(attack.from, true, () => {
            me.showObject(attack.to, true, () => {
              me.playAttack(attack.from, attack.to, attack.color, attack.linetype, attack.count)
              me.showBlast(attack.to, attack.color)
            })
          })
        })
      })
    }).always(() => {
      me.currentPlay.timer = setTimeout(() => {
        me.onTickReal()
      }, 5000)
    })
  }

  onSeek (newpos) {
    let me = this

    if (!me.currentPlay || !me.currentPlay.scene) return
    me.currentPlay.stopped = false
    me.pause()
    this.setState({playing: false})

    let scene = me.currentPlay.scene

    me.reset()

    let pos
    for (let i = 0; i < scene.length; i++) {
      let screen = scene[i]
      pos = parseInt((screen.time - scene[0].time) / 1000)

      me.currentPlay.screen = i
      if (pos < newpos) {
        screen.attacks.forEach(attack => {
          if (me.severities.indexOf(attack.severity) < 0) return
          me.showObject(attack.from, false)
          me.showObject(attack.to, false)
        })
      } else {
        break
      }
    }

    setTimeout(() => {
      this.setState({
        sliderPos: newpos,
        playing: true
      })

      me.currentPlay.paused = true
      me.play()
      if (pos === newpos) me.onPlayFrame()
    }, 0)
  }
    // ///////////////////////////////////////////////////////////////////

  addAttackRow (id, attacker, target, time, type, action, severity) {
    let me = this
        // var $scope = me.scope;
        //
        // var row = $($('#attack-row-template').html());
        //
        // row.find('.timeCol p').text(time);
        // row.find('.attackCol p').text(type);
        // row.find('.actionCol p').text(action);
        // row.find('.severityCol p').text(severity);
        // row.find('.sourceCol p').html(attacker.name || attacker.ip);
        // row.find('.sourceCol').append($(me.renderCountryFlag(attacker)));
        // row.find('.destCol p').html(target.name || target.ip);
        // row.find('.destCol').append($(me.renderCountryFlag(target)));
        //
        //
        // row.find('.sourceCol p').tooltip({
        //     title: attacker.ip,
        //     container: 'body',
        // });
        // row.find('.destCol p').tooltip({
        //     title: target.ip,
        //     container: 'body',
        // });

    if (me.buffer.length > 10) {
      let removed = me.buffer.splice(5)
            // $.each(removed, function(i, item){
            //     item.find('.sourceCol p').tooltip('destroy');
            //     item.find('.destCol p').tooltip('destroy');
            // });
    }
    me.buffer.push({
      id: id,
      time: time,
      type: type,
      action: action,
      severity: severity,
      attacker: attacker.name || attacker.ip,
      attackerCountry: me.findCountry(attacker),
      target: target.name || target.ip,
      targetCountry: me.findCountry(target)
    })
  }

  findCountry (attack) {
    const found = lookup.countries({name: attack.country})
    let iso_code
    if (found.length === 0) {
      return {
        name: '',
        code: '_European Union'
      }
    }

    return {
      name: found[0].name,
      code: found[0].alpha2.toLowerCase()
    }

        // if(iso_code) flag = "<img src='/images/flags/32/" + iso_code + ".png' title='" + attack.country + "' width='20' style='margin-top: -5px;'>";
  }

    // ///////////////////////////////////////////////////////////////////

  showObject (device, anim, callback) {
    let me = this
    let s = me.svg
    let $scope = me.scope

    let img, txt
    if (device.visible) {
      img = device.imgObj
      txt = device.labelObj
    } else {
            // device.country
      let latlng = me.getCountryLatLng(device.country)
      if (!latlng) return

      let xy = me.latLngToXY(latlng[0], latlng[1])
      device.x = xy[0]
      device.y = xy[1]

      img = s.append('svg:image')
      img.attr('x', device.x - 10)
                .attr('y', device.y - 10)
                .attr('width', 21)
                .attr('height', 21)
                .style('cursor', 'pointer')
                .style('opacity', 0)
                .attr('class', 'map-item')
                .attr('xlink:href', device.img)
                .data([{device: device}])
                .on('click', (d) => {
                  this.setState({
                    popup: true,
                    popupX: d.device.x,
                    popupY: d.device.y,
                    popupObject: d.device
                  })
                })

      if (anim) {
        img.transition().duration($scope.fadeOutSpeed / 6)
                    .style('opacity', 1)
                    .each('end', () => {
                      if (callback) callback()
                    })
      } else {
        img.style('opacity', 1)
        if (callback) callback()
      }

            // .transition().duration($scope.fadeOutSpeed * 2);

      device.imgObj = img

      if (device.name) {
        txt = s.append('text')
        txt.attr('text-anchor', 'middle')
                    .attr('x', device.x)
                    .attr('y', device.y + 30)
                    .attr('width', 80)
                    .attr('height', 24)
                    .text(device.name)
                    .attr('class', 'map-item')
                    .attr('fill', '#fff')
                    .attr('font-size', '0.9em')

        if (anim) {
          txt.style('opacity', 0)
                        .transition().duration($scope.fadeOutSpeed / 6)
                        .style('opacity', 1)
        } else {

        }

                // .transition().duration($scope.fadeOutSpeed * 2);

        device.labelObj = txt
      }
    }

    if (device.visible) {
      if (callback) callback()
      return
    }

    device.visible = true
  }

  showAttack (from, to, color, type, attacks, callback) {
    let me = this
    let s = me.svg
    let $scope = me.scope

    let arcSharpness = 4 * Math.random()
    let line = s.insert('svg:path', 'text.layer')
            .attr('class', 'connection')
            .style('stroke-linecap', 'round')
            .style('stroke', color || 'red')
            .style('fill', 'none')
            .style('stroke-width', $scope.arcThickness)
            .attr('d', (datum) => {
              return me.drawConnection(from, to, type, arcSharpness)
            }).data([{
              callback: callback,
              from: from,
              to: to,
              type: type,
              arcSharpness: arcSharpness
            }])

    let length = line.node().getTotalLength()
    line.style('stroke-dasharray', `${length} ${length}`)
            .style('stroke-dashoffset', length)
            .attr('trans', 0)
            .transition().duration($scope.fadeOutSpeed * 2)
            .style('stroke-dashoffset', 0)
            .attr('trans', 1)
            .transition().duration($scope.fadeOutSpeed / 2)
            .style('opacity', 0)
            .attr('trans', 2)
            .remove()
            .each('end', (d) => {
              let callback = d.callback
              let index = me.connections.indexOf(line)
              if (index >= 0) me.connections.splice(index, 1)
              if (callback) callback()
            })

    me.connections.push(line)
  }

  showBlast (device, color, callback) {
    let me = this
    let s = me.svg
    let $scope = me.scope

    let suffix = ''
    if (color === 'green') color = 'blue'
    if (color !== 'red') suffix = `-${color}`

    let images = {
      'low': {
        src: `/images/threatmap/tinyExplosion${suffix}.png`,
        width: 16,
        height: 16
      },

      'medium': {
        src: `/images/threatmap/smallExplosion${suffix}.png`,
        width: 46,
        height: 45
      },

      'high': {
        src: `/images/threatmap/bigExplosion${suffix}.png`,
        width: 57,
        height: 57
      }
    }

    let image = images['medium']
    if (!image) return

    let img = s.append('svg:image')
    img.attr('x', device.x - image.width / 2)
            .attr('y', device.y - image.height / 2)
            .attr('width', image.width)
            .attr('height', image.height)
            .style('cursor', 'pointer')
            .style('opacity', 0)
            .attr('class', 'map-item')
            .attr('xlink:href', image.src)
            .data([{
              callback: callback,
              device: device
            }])
            .on('click', (d) => {
              this.setState({
                popup: true,
                popupX: d.device.x,
                popupY: d.device.y,
                popupObject: d.device
              })
            })

            .attr('trans', 0)
            .style('opacity', 0)

            .transition().duration($scope.fadeOutSpeed * 2 - 200)
            .attr('trans', 1)
            .transition().duration(100)
            .style('opacity', 1)

            .transition().duration($scope.fadeOutSpeed * 2)
            .style('opacity', 0)
            .attr('trans', 2)
            .remove()
            .each('end', (d) => {
              let callback = d.callback
              let index = me.blasts.indexOf(img)
              if (index >= 0) me.blasts.splice(index, 1)
              if (callback) callback()
            })
    me.blasts.push(img)
  }

  drawConnection (from, to, type, arcSharpness) {
    let midXY = [(from.x + to.x) / 2, (from.y + to.y) / 2]
    let sameCountry = (to.x === from.x && to.y === from.y)
    let x = from.x,
      y = from.y,
      tx = to.x,
      ty = to.y,
      mx = midXY[0],
      my = midXY[1]
    let cx = mx + (50 * arcSharpness)
    let cy = Math.abs(my - (50 * arcSharpness))

    if (type === 'straight') {
      var str = 'M{0},{1}L{2},{3}'
      return format(str, from.x, from.y, to.x, to.y)
    }

    if (type === 'curve') {
      if (sameCountry) {
        let widthConst = 10
        let heightConst = 10
        var str = 'M{0},{1}T{2},{3}T{4},{5}T{6},{7}T{8},{9}'
        return format(str, x, y, x + widthConst, y - heightConst, x, y - (2 * heightConst), x - widthConst, y - heightConst, x, y)
      }

      var str = 'M{0},{1}S{2},{3},{4},{5}'
      return format(str, x, y, cx, cy, tx, ty)
    }

    return ''
  }

    // ///////////////////////////////////////////////////////////////////
  getHistoryEvents (cb) {
    const me = this
    const datefrom = this.state.startDate.format('YYYY-MM-DD HH:mm:ss')
    const dateto = this.state.endDate.format('YYYY-MM-DD HH:mm:ss')

    let loader = appendComponent(<Preloader/>)

    $.get(Api.bi.threatMapEventsHistory, {
      from: datefrom,
      to: dateto
    }).done((res) => {
      if (res.success && cb) {
        let scene = me.buildScene(res.object)
        me.currentPlay.scene = scene
        cb(scene)
      }
    }).always(() => {
      removeComponent(loader)
    })
  }

  buildScene (incidents) {
    let scene = []

    let devices = {}
    let attackers = {}
    let colors = {
      'high': 'red',
      'medium': 'yellow',
      'low': 'blue',
      'audit': 'green'
    }

    let screen
    incidents.forEach(item => {
      let deviceIP = item['destinationip']
      let device = devices[deviceIP]

      if (!device) {
        device = {
          id: deviceIP,

          ip: deviceIP,
          name: item['destinationName'],

          country: item['destinationCountry'] || item['devicecounty'],

          img: '/images/threatmap/RoundedPin.png',

          visible: false,
          bubbles: []
        }
        devices[deviceIP] = device
      }

      let attackerIP = item['ipcountry']
      let attacker = attackers[attackerIP]
      if (!attacker) {
        attacker = {
          id: attackerIP,

          ip: item['ipaddress'],
          name: item['name'],

          country: item['ipcountry'],

          img: '/images/threatmap/SquarePin.png',

          visible: false,
          bubbles: []
        }
        attackers[attackerIP] = attacker
      }

      let time = item['starttimestamp']
      if (!screen || screen.time !== time); {
        screen = {
          time: time,
          attacks: []
        }
        scene.push(screen)
      }

      let severity = item['incidentseverity'].toLowerCase()

      screen.attacks.push({
        from: attacker,
        to: device,
        type: item['description'],
        action: item['incidenttype'],
        count: 1,

        linetype: 'curve',
        color: colors[severity] || 'red',
        severity: severity
      })
    })

    return scene
  }

    // /////////////////////////////////////////////////////////////////////

  onClickPopupClose () {
    this.setState({
      popup: false
    })
  }

    // /////////////////////////////////////////////////////////////////////

  latLngToXY (lat, lng) {
    let me = this
    let pos = me.vmap.latLngToPoint(lat, lng)
    return [pos.x, pos.y]
  }

  getCountryLatLng (name) {
    let found = lookup.countries({name})
    if (found === 0) return null
    let code = found[0].alpha2
    if (!code) return null

    let latlng = country_latlng[code]
    if (!latlng || !latlng.length) return null

    return latlng
  }
}

ThreatMap.defaultProps = {}

export default ThreatMap
