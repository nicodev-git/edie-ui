import React from 'react'

import { findIndex, assign, concat } from 'lodash'
import d3 from 'd3'
import moment from 'moment'
import Transition from 'react-addons-css-transition-group'

import 'react-datepicker/dist/react-datepicker.css'

import { appendComponent, removeComponent } from 'util/Component.jsx'
import { showAlert } from 'components/shared/Alert.jsx'

import { format } from 'shared/Global.jsx'

class Incidents extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: 'demo',
            scenarioCount: 0,
            playing: false,

            sliderPos: 0,
            sliderMax: 1,

            attackInfo: []
        }

        assign(this, {
            svg: null,

            scope: {
                maxSize: 6,
                animationSpeed: "2600",
                arcThickness: "2",
                borderColor: "#63233d",
                fadeOutSpeed: "1000",
                latestAttacks: [],
            },

            attackers: [],
            devices: [],
            connections: [],
            scenario: [],

            currentPlay: {
                scene: null,
                stopped: true,
                pause: false,
                screen: 0,
                frame: 0,
            },

            incidentTimer: 0,
        })
    }

    componentDidMount() {
        let me = this

        let $svg = $(me.refs.mapsvg)
        me.svg = d3.select(me.refs.mapsvg)


        me.targetCenter = {
            x: $svg.width() / 2,
            y: $svg.height() / 2,
        }

        me.addAttackers();
        me.addDevices();
        me.initScenario();

        me.setState({
            scenarioCount: me.scenario.length
        })
    }

    render() {
        var me = this
        const { mode, scenarioCount } = this.state

        var currenttime = ''
        if (me.currentPlay && me.currentPlay.scene) {
            currenttime = moment(me.currentPlay.scene[0].time + me.state.sliderPos * 1000).format('HH:mm:ss')
        }

        return (
            <div className="flex-vertical" style={{flex: 1}}>
                <div className="inline form-inline padding-sm">
                    <label style={{marginRight: "3px"}}>Choose:</label>
                    <select className="form-control input-sm margin-sm-left"
                            value={mode} onChange={this.onChangeMode.bind(this)}>
                        <option value='real'>Real</option>
                        <option value='demo'>Demo</option>
                    </select>
                    {this.renderScenarioSelect()}

                    <select className={"form-control input-sm margin-md-left " + (mode == 'real' ? '' : 'hidden')}>

                    </select>
                    <a href="javascript:;" style={{padding: "2px"}}
                       className="margin-md-left" onClick={() => {showAlert("Scenario Description")}}>
                        Description
                    </a>
                </div>

                <div className="flex-vertical" style={{flex: 1, backgroundColor: '#23272D', position: 'relative'}}>
                    <svg ref="mapsvg" style={{flex: 1}}></svg>

                    {this.renderAttackInfo()}

                    <div className="text-center" style={{height: "26px"}}>
                        <div style={{position: 'absolute', left: '19px'}}>
                            {
                                this.state.playing ?
                                    <a href="javascript:;" onClick={this.onClickPause.bind(this)}>
                                        <img src="/images/btn_pause.png"  style={{width: "23px"}}/>
                                    </a>
                                    :
                                    <a href="javascript:;" onClick={this.onClickPlay.bind(this)}>
                                        <img src="/images/btn_play.png" style={{width: "23px"}}/>
                                    </a>
                            }


                            <a href="javascript:;" onClick={this.onClickStop.bind(this)} className="margin-sm-left">
                                <img src="/images/btn_stop.png"  style={{width: "23px"}}/>
                            </a>

                            {this.renderTime()}
                        </div>
                        <div style={{color:"white", paddingTop: "3px"}}>{currenttime}</div>
                    </div>
                </div>
            </div>
        )
    }

    renderScenarioSelect() {

        let items = []
        for (var i = 0; i < this.state.scenarioCount; i++) {
            items.push(<option value={i} key={i}>Scenario {i + 1}</option>)
        }

        return (
            <select className="form-control input-sm margin-md-left"
                    ref="scenario">
                {items}
            </select>
        )
    }

    renderTime(){
        var me = this
        var tx = new Date('2016-1-1 00:00:00') - 0;


        return (
            <div className="inline margin-md-left" style={{color:"white"}}>
                <span>{moment(tx + me.state.sliderPos * 1000).format('m:ss')}</span>
                <span>/</span>
                <span>{moment(tx + me.state.sliderMax * 1000).format('m:ss')}</span>
            </div>
        )
    }

    renderAttackInfo() {
        return (
            <div style={{position: 'absolute', left: 0, top: 0}}>
                {this.state.attackInfo.map(info =>
                    <Transition transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={500}
                                transitionAppear={true} transitionAppearTimeout={500} key={info.id + 'transition'}>
                        <div className="attacker-bubble-in"
                             style={{left:info.left + 'px', top: info.top + 'px'}}
                             key={info.id}>
                            <div className="text-content">
                                <span className="sectionHeadline">IP: {info.ip}</span><br/>
                                <span className="sectionHeadline">Time: {info.time}</span><br/>
                                <span className="sectionHeadline">Incident: {info.type}</span><br/>
                            </div>
                        </div>
                    </Transition>
                )}
            </div>
        )
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onChangeMode(e) {
        this.setState({ mode: e.target.value })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addAttackers() {
        var me = this;
        var s = me.svg;

        var height = parseInt(s.style('height'));
        var x = me.targetCenter.x * 2 * 0.6;
        var y = 0;
        for(var i = 0;i < 8; i++) {
            var attacker = {
                id: 300 + i,
                name: Math.ceil(Math.random()*255) + '.' + Math.ceil(Math.random()*255)
                + '.' + Math.ceil(Math.random()*255) + '.' + Math.ceil(Math.random()*255),
                attacks: 0,

                x: x,
                y: me.targetCenter.y + y,
                //x: me.targetCenter.x + (Math.random() - 0.5) * 2 * me.targetCenter.x * 0.8,
                //y: me.targetCenter.y + (Math.random() - 0.5) * 2 * me.targetCenter.y * 0.8,
                img: "/images/ninja.png",

                visible: false,
                bubbles: [],
            }
            me.attackers.push(attacker);


            y = y <= 0 ? (-y + 100) : -y;

            if ((me.targetCenter.y + y) < 0 || (me.targetCenter.y + y + 30) > height) {
                y = 0;
                x += 100;
            }
        }

        assign(me.attackers[0], {
            name: 'Eitan',
            y: me.targetCenter.y,
        })
    }

    addDevices() {
        var me = this;
        var s = me.svg;

        var icons = [{
            title: "Windows Server", img: "windows.png", type: "server"
        }, {
            title: "Linux Server", img: "linux.png", type: "linuxserver"
        }, {
            title: "Router", img: "router.png", type: "router"
        }, {
            title: "Firewall", img: "firewall.png", type: "firewall"
        }, {
            title: "Internet", img: "inticon.png", type: "internet"
        }, {
            title: "Website", img: "website.png", type: "website"
        }, {
            title: "Custom Device", img: "pcs.png", type: "custom"
        }, {
            title: "Oracle DB", img: "db2.png", type: "db-oracle"
        }, {
            title: "MSSQL DB", img: "db2.png", type: "db-mssql"
        }, {
            title: "MySQL DB", img: "db2.png", type: "db-mysql"
        }, {
            title: "PC", img: "pcs.png", type: "pc"
        }, {
            title: "Antivirus", img: "antivirus.png", type: "antivirus"
        }, {
            title: "NAC", img: "nac.png", type: "nac"
        }, {
            title: "Safend", img: "usb.png", type: "safend"
        }, {
            title: "IPS", img: "ips.png", type: "ips"
        }];

        var x = me.targetCenter.x * 2 * 0.4;
        var y = 0;
        var height = parseInt(s.style('height'));
        for(var i = 0;i < 10; i++) {

            var icon = icons[parseInt(Math.random() * (icons.length - 1))]
            var device = {
                id: 100 + i,
                name: 'Device ' + i,
                attacks: 0,

                x: x,
                y: me.targetCenter.y + y,
                //x: me.targetCenter.x + (Math.random() - 0.5) * 2 * me.targetCenter.x * 0.8,
                //y: me.targetCenter.y + (Math.random() - 0.5) * 2 * me.targetCenter.y * 0.8,
                img: "/images/" + icon.img,
                devicetype: icon.type,
                visible: false,
                bubbles: [],
            }
            me.devices.push(device);

            y = y <= 0 ? (-y + 100) : -y;

            if ((me.targetCenter.y + y) < 0 || (me.targetCenter.y + y + 30) > height) {
                y = 0;
                x -= 100;
            }
        }

        assign(me.devices[0], {
            name: 'Germany',
            img: '/images/linux.png',
        });

        assign(me.devices[1], {
            name: 'Incidents',
            img: '/images/linux.png',
        });

        assign(me.devices[2], {
            name: 'hackers.com',
            img: '/images/website.png',
        })
    }

    initScenario() {
        var me = this;
        var scene1 = [{
            time: new Date('2015-06-01 05:01:22') - 0,
            attacks: [{
                from: me.attackers[0],
                to: me.devices[0],
                type: 'Possible Bot HTTP Request.AA',
                count: 1,

                linetype: 'curve',
                color: 'red',
            }, {
                from: me.attackers[0],
                to: me.devices[0],
                type: 'Possible Bot HTTP Request.AB',
                count: 1,

                linetype: 'curve',
                color: 'red',
            }, {
                from: me.attackers[0],
                to: me.devices[0],
                type: 'Possible Bot HTTP Request.AC',
                count: 1,

                linetype: 'curve',
                color: 'red',
            }, {
                from: me.attackers[0],
                to: me.devices[0],
                type: 'Possible Bot HTTP Request.AD',
                count: 1,

                linetype: 'curve',
                color: 'red',
            }, {
                from: me.attackers[0],
                to: me.devices[0],
                type: 'Possible Bot HTTP Request.AE',
                count: 1,

                linetype: 'curve',
                color: 'red',
            }, {
                from: me.attackers[0],
                to: me.devices[0],
                type: 'Possible Bot HTTP Request.AF',
                count: 1,

                linetype: 'curve',
                color: 'red',
            }],
        }, {
            time: new Date('2015-06-01 05:01:25') - 0,
            attacks: [{
                from: me.attackers[0],
                to: me.devices[1],
                type: 'Possible Bot HTTP Request.AA',
                count: 3,

                linetype: 'curve',
                color: 'blue',
            }],
        }, {
            time: new Date('2015-06-01 05:01:29') - 0,
            attacks: [{
                from: me.attackers[0],
                to: me.devices[1],
                type: 'Possible Bot HTTP Request.AA',
                count: 1,

                linetype: 'straight',
                color: 'yellow',
            }],
        }, {
            time: new Date('2015-06-01 05:01:31') - 0,
            attacks: [{
                from: me.devices[0],
                to: me.devices[2],
                count: 1,
                type: '',

                linetype: 'straight',
                color: 'green',
            }],
        }];

        me.scenario.push(scene1);


        var scene2 = [];

        var lasttime = new Date('2015-06-01 05:01:29') - 0;
        for(var i = 0; i < 10; i++) {
            scene2.push({
                type: 'Possible Bot HTTP Request.AA',
                count: 1,

                time: lasttime,
                attacks: [{
                    from: me.attackers[i % 8],
                    to: me.devices[i],
                    linetype: 'curve',
                    color: ['red', 'blue', 'yellow'][parseInt(Math.random() * 100) % 3],
                }],
            });
            lasttime += parseInt(1 + Math.random() * 4) * 1000;
        }

        for(var i = 0; i < 5; i++) {
            var attacks = [];
            for(var j = 0; j < 3; j++) {
                attacks.push({
                    from: me.attackers[Math.floor(Math.random() * 100) % 8],
                    to: me.devices[Math.floor(Math.random() * 100) % 10],
                    type: 'Possible Bot HTTP Request.AA',
                    count: parseInt(1 + Math.random() * 3),

                    linetype: 'curve',
                    color: ['red', 'blue', 'yellow'][parseInt(Math.random() * 100) % 3],
                });
            }
            scene2.push({
                time: lasttime,
                attacks: attacks,
            });
            lasttime += parseInt(1 + Math.random() * 4) * 1000;
        }
        scene2[0].attacks[0].count = 3;

        me.scenario.push(scene2);


        let id = parseInt(Math.random() * 10000)
        me.scenario.forEach(scene => {
            scene.forEach(screen => {
                screen.attacks.forEach(attack => {
                    attack.id = id++
                })
            })
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    onClickPlay() {
        const me = this
        var index = me.refs.scenario.value;
        me.play(me.scenario[index]);
        me.setState({playing: true})
    }

    onClickPause() {
        var me = this
        me.pause();
        me.pauseAnimation();
        me.setState({playing: false})
    }

    onClickStop() {
        var me = this
        if(me.currentPlay && !me.currentPlay.stopped) {
            me.onPlayEnd();
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    play(scene) {
        var me = this;
        if (!me.currentPlay.stopped) {
            if (me.currentPlay.paused) {
                me.currentPlay.paused = false;

                me.resumeAnimation();
                me.enableTimer(true);
                return;
            } else {
                me.stop();
                setTimeout(() => {
                    me.play(scene);
                }, 1000);
                return;
            }
        }


        me.reset();

        var diff = 1;
        if(scene.length >= 2) {
            diff = scene[scene.length - 1].time - scene[0].time;
            diff = parseInt(diff/1000);
        }
        me.setState({
            sliderMax: diff,
        })
        me.currentPlay.duration = diff;

        scene.forEach(screen => {
            screen.attacks.forEach(attack => {
                attack.from.attacks++;
                attack.to.attacks++;
            });
        });

        // me.updateProgress();

        me.currentPlay.scene = scene;
        me.currentPlay.stopped = false;
        me.currentPlay.screen = 0;
        me.currentPlay.paused = false;


        me.enableTimer(true);
        me.playScreen();
    }

    reset() {
        var me = this;
        $(me.refs.mapsvg).children().remove();
        me.svg.append("text").attr("class", "layer");
        //p.find('.attacker-popup').remove();

        me.connections = [];
        me.setState({
            sliderPos: 0
        })

        me.devices.forEach(device => {
            device.visible = false;
            device.attacks = 0;
            device.bubbles = [];
        });

        me.attackers.forEach(attacker => {
            attacker.visible = false;
            attacker.attacks = 0;
            attacker.bubbles = [];
        });
    }

    stop() {
        var me = this;

        me.enableTimer(false);

        if (!me.currentPlay) return;
        me.currentPlay.stopped = true;
        clearTimeout(me.currentPlay.timer);
    }

    pause() {
        var me = this;
        if (!me.currentPlay) return;
        me.currentPlay.paused = true;
        me.enableTimer(false);
    }

    ///////////////////////////////////////////////////////////////////////////


    playScreen() {
        var me = this;

        if (me.currentPlay.stopped || me.currentPlay.paused) return;
        if (me.currentPlay.screen >= me.currentPlay.scene.length) {
            return;
        }

        var screen = me.currentPlay.scene[me.currentPlay.screen++];
        var attackTime = new Date(screen.time);

        screen.attacks.forEach(attack => {

            me.showObject(attack.from, true, () => {
                me.showObject(attack.to, true, () => {
                    me.playAttack(attack.from, attack.to, attack.color, attack.linetype, attack.count);

                    var seat = -1;
                    var attacker = attack.from;
                    for(var i = 0; i < attacker.bubbles.length; i++) {
                        if (!attacker.bubbles[i]) {
                            seat = i;
                            break;
                        }
                    }

                    if (seat < 0) {
                        attacker.bubbles.push(false);
                        seat = attacker.bubbles.length - 1;
                    }

                    var afterBubbleFade = () => {
                        attacker.bubbles[seat] = false;
                    }
                    var x = attack.from.x + 50;
                    var y = attack.from.y - 20;
                    var row = seat;
                    if (row > 0) {
                        //+ parseInt(seat / 3) * 65
                        if (row % 2 == 0) y += 65 * Math.ceil(row / 2)
                        else y -= 65 * Math.ceil(row / 2);
                    }
                    attacker.bubbles[seat] = me.showAttackInfo(
                        attack.id,
                        x, y,
                        attack.from.name,
                        moment(attackTime).format('YYYY-MM-DD HH:mm:ss'),
                        attack.type,
                        afterBubbleFade);

                });
            });


        })
    }

    playAttack(from, to, color, type, attacks, callback) {
        var me = this;
        var s = me.svg;
        var $scope = me.scope;

        var midXY = [(from.x + to.x) / 2, (from.y + to.y) / 2];
        var sameCountry = (to.x == from.x && to.y == from.y);
        var x = from.x,
            y = from.y,
            tx = to.x,
            ty = to.y,
            mx = midXY[0],
            my = midXY[1];
        var arcSharpness = 4 * Math.random();
        var cx = mx + (50 * arcSharpness);
        var cy = Math.abs(my - (50 * arcSharpness));

        var line = s.insert('svg:path', 'text.layer')
            .style('stroke-linecap', 'round')
            .style('stroke', color || 'red')
            .style('fill', 'none')
            .style('stroke-width', $scope.arcThickness)
            .attr('d', (datum) => {
                if (type == 'straight') {
                    var str = "M{0},{1}L{2},{3}";
                    return format(str, from.x, from.y, to.x, to.y);
                }

                if (type == 'curve') {

                    if (sameCountry) {
                        var widthConst = 10;
                        var heightConst = 10;
                        var str = "M{0},{1}T{2},{3}T{4},{5}T{6},{7}T{8},{9}";
                        return format(str, x, y, x + widthConst, y - heightConst, x, y - (2 * heightConst), x - widthConst, y - heightConst, x, y);
                    }

                    var str = "M{0},{1}S{2},{3},{4},{5}";
                    return format(str, x, y, cx, cy, tx, ty);
                }

                return '';
            }).data([{callback: callback}]);

        var length = line.node().getTotalLength();
        line.style("stroke-dasharray", length + " " + length)
            .style("stroke-dashoffset", length)
            .attr("trans", 0)
            .transition().duration($scope.fadeOutSpeed * 2)
            .style("stroke-dashoffset", 0)
            .attr("trans", 1)
            .transition().duration($scope.fadeOutSpeed / 2)
            .style('opacity', 0)
            .attr("trans", 2)
            .remove()
            .each('end', (d) => {
                var callback = d.callback;
                var index = me.connections.indexOf(line);
                if (index >= 0) me.connections.splice(index, 1);
                if(callback) callback();
            });

        me.connections.push(line);


        if (attacks > 1) {
            var coord = (x,y) => {
                if(!x) var x=0;
                if(!y) var y=0;
                return {x: x, y: y};
            }

            function B1(t) { return t*t*t }
            function B2(t) { return 3*t*t*(1-t) }
            function B3(t) { return 3*t*(1-t)*(1-t) }
            function B4(t) { return (1-t)*(1-t)*(1-t) }

            function A1(t) { return t*t}
            function A2(t) { return 2*t*(1-t)}
            function A3(t) { return (1-t)*(1-t)}


            function getBezier(percent,C1,C2,C3,C4) {
                var pos = new coord();
                pos.x = C1.x*B1(percent) + C2.x*B2(percent) + C3.x*B3(percent) + C4.x*B4(percent);
                pos.y = C1.y*B1(percent) + C2.y*B2(percent) + C3.y*B3(percent) + C4.y*B4(percent);
                return pos;
            }

            function getBezierVector(percent,C1,C2,C3,C4) {
                var pos = new coord();
                pos.x = (C1.x-C2.x)*A1(percent) + (C2.x-C3.x)*A2(percent) + (C3.x-C4.x)*B3(percent);
                pos.y = (C1.y-C2.y)*A1(percent) + (C2.y-C3.y)*A2(percent) + (C3.y-C4.y)*B3(percent);
                return pos;
            }

            var bt = getBezier(0.35, {x: x, y: y,}, {x: x, y: y,}, {x: cx, y: cy}, {x: tx, y: ty});
            var bv = getBezierVector(0.35, {x: x, y: y,}, {x: x, y: y,}, {x: cx, y: cy}, {x: tx, y: ty});

            var angle = Math.atan2(bv.y, bv.x);
            angle *= 180 / Math.PI;

            bt.y -= 6;

            var labelObj = s.insert("text", 'text.layer')
                .attr('text-anchor', 'middle')
                .attr('x', bt.x)
                .attr('y', bt.y)
                .attr('transform', "rotate(" + angle + " " + bt.x + "," + bt.y + ")")
                .attr('width', 50)
                .attr('height', 24)
                .text("X" + attacks)
                .attr("fill", color)
                .attr("font-size", "0.8em");

            labelObj.style('opacity', 0)
                .attr('trans', 0)
                .transition()
                .duration($scope.fadeOutSpeed * 2)
                .style('opacity', 1)
                .attr('trans', 1)
                .transition().duration($scope.fadeOutSpeed / 2)
                .style('opacity', 0)
                .attr('trans', 2)
                .remove();

            line.data()[0].labelObj = labelObj;
        }
    }

    showObject(device, anim, callback) {
        var me = this;
        var s = me.svg;
        var $scope = me.scope;

        device.attacks -= 1;

        var img, txt;
        if (device.visible) {

            img = device.imgObj;
            txt = device.labelObj;
        } else {
            img = s.append("svg:image");
            img.attr('x', device.x - 21)
                .attr('y', device.y - 21)
                .attr('width', 42)
                .attr('height', 42)
                .style('cursor', 'pointer')
                .style('opacity', 0)
                .attr("xlink:href", device.img);

            if (anim) {
                img.transition().duration($scope.fadeOutSpeed / 6)
                    .style('opacity', 1)
                    .each("end", () => {
                        if (callback) callback();
                    });
            } else {
                img.style('opacity', 1);
                if (callback) callback();
            }

            device.imgObj = img;

            if(device.name) {
                txt = s.append("text");
                txt.attr('text-anchor', 'middle')
                    .attr('x', device.x)
                    .attr('y', device.y + 30)
                    .attr('width', 80)
                    .attr('height', 24)
                    .text(device.name)
                    .attr("fill", "#fff")
                    .attr("font-size", "0.9em");

                if (anim) {
                    txt.style('opacity', 0)
                        .transition().duration($scope.fadeOutSpeed / 6)
                        .style('opacity', 1);
                } else {

                }

                //.transition().duration($scope.fadeOutSpeed * 2);

                device.labelObj = txt;
            }
        }

        if (device.visible) {
            if (callback) callback();
            return;
        }

        device.visible = true;
    }

    showAttackInfo(id, left, top, ip, time, type, callback){
        var me = this
        let {attackInfo} = me.state;
        let info = {
            id: id,
            left: left,
            top: top,
            ip: ip,
            time: time,
            type: type,
            callback: callback,
        }

        attackInfo.push(info)

        me.setState({ attackInfo }, () => {
            setTimeout(() => {
                let {attackInfo} = me.state;
                let index = attackInfo.indexOf(info)
                if (index >= 0) attackInfo.splice(index, 1)
                me.setState({ attackInfo }, () => {
                    callback()
                })
            }, 2000)
        })

        return info

        // var me = this;
        // var $scope = me.scope;
        //countryDrillDownContainer

        // var div = p.find('#attackerInfo').clone().removeAttr('id').addClass('attacker-popup');
        //in
        // div.find('#inc-ip').text("IP: " + ip);
        // div.find('#inc-time').text("Time: " +
        //     $.format.date(time, 'HH:mm:ss'));
        // div.find('#inc-monitortype').text("Incident: " + monitortype);
        //
        // div.insertAfter(p.find('#attackerInfo'));
        // div.css({
        //     position: 'absolute',
        //     left: left,
        //     top: top,
        // });

        // var bubble = d3.select(div[0]);
        //
        // bubble.data([{callback: callback}])
        //     .style('opacity', 0)
        //     .attr('trans', 0)
        //     .transition().duration($scope.fadeOutSpeed * 2)
        //     .style('opacity', 1)
        //     .attr('trans', 1)
        //     .transition().duration($scope.fadeOutSpeed / 2)
        //     .style('opacity', 0)
        //     .attr('trans', 2)
        //     .remove()
        //     .each('end', (d) => {
        //         var callback = d.callback;
        //         if(callback) callback();
        //     });
        //
        // div.show();
        //
        // return bubble;
    }

    ///////////////////////////////////////////////////////////////////////////

    resumeAnimation() {
        var me = this;
        var $scope = me.scope;
        //Line
        me.connections.forEach(line => {
            var obj = line;
            var trans = parseFloat(obj.attr("trans"));
            if (trans < 1) {
                obj = obj.transition().duration($scope.fadeOutSpeed * 2 * (1 - trans))
                    .style("stroke-dashoffset", 0)
                    .attr("trans", 1);
            }

            if (trans < 2) {
                obj.transition()
                    .duration($scope.fadeOutSpeed / 2 * (trans <= 1 ? 1 : (2 - trans)))
                    .style('opacity', 0)
                    .attr("trans", 2)
                    .remove()
                    .each('end', (d) => {
                        var callback = d.callback;
                        var index = me.connections.indexOf(line);
                        if (index >= 0) me.connections.splice(index, 1);
                        if(callback) callback();
                    });
            }

            //Label
            var labelObj = line.data()[0].labelObj;
            if (!labelObj) return;
            obj = labelObj;
            trans = parseFloat(obj.attr("trans"));

            if (trans < 1) {
                obj = obj.transition().duration($scope.fadeOutSpeed * 2 * (1 - trans))
                    .style("opacity", 1)
                    .attr("trans", 1);
            }

            if (trans < 2) {
                obj.transition()
                    .duration($scope.fadeOutSpeed / 2 * (trans <= 1 ? 1 : (2 - trans)))
                    .style('opacity', 0)
                    .attr("trans", 2)
                    .remove()
            }
        });

        //Objects
        var objects = concat([], me.devices, me.attackers);
        objects.forEach(object => {
            object.bubbles.forEach(bubble => {
                if(!bubble) return;
                var obj = bubble;
                var trans = parseFloat(obj.attr("trans"));

                if (trans < 1) {
                    obj = obj.transition().duration($scope.fadeOutSpeed * 2 * (1 - trans))
                        .style("opacity", 1)
                        .attr("trans", 1);
                }

                if (trans < 2) {
                    obj.transition()
                        .duration($scope.fadeOutSpeed / 2 * (trans <= 1 ? 1 : (2 - trans)))
                        .style('opacity', 0)
                        .attr("trans", 2)
                        .remove()
                        .each('end', (d) => {
                            var callback = d.callback;
                            if(callback) callback();
                        });
                }
            });
        });
    }

    pauseAnimation() {
        var me = this;

        me.connections.forEach(line => {
            if(line) {
                line.transition().duration( 0 );

                //Label
                var labelObj = line.data()[0].labelObj;
                if (labelObj) labelObj.transition().duration( 0 );
            }
        });

        var objects = concat([], me.devices, me.attackers);
        objects.forEach(object => {
            object.bubbles.forEach(bubble => {
                if(bubble) bubble.transition().duration( 0 );
            });
        });
    }
    ////////////////////////////////////////////////////

    enableTimer(enable) {
        var me = this;
        if (enable) {
            me.incidentTimer = setInterval(me.updateTimer.bind(me), 1000);
        } else {
            clearInterval(me.incidentTimer);
        }
    }

    updateTimer(){
        var me = this;

        if(me.currentPlay && !me.currentPlay.paused && !me.currentPlay.stopped) {
            // me.slider.update({
            //     from: me.slider.options.from + 1
            // });
            //
            // me.updateProgress();
            me.setState({
                sliderPos: me.state.sliderPos + 1
            }, () => {
                if (me.currentPlay.scene.length > me.currentPlay.screen) {
                    var screen = me.currentPlay.scene[me.currentPlay.screen];
                    if(me.state.sliderPos == parseInt((screen.time - me.currentPlay.scene[0].time) / 1000))
                        me.playScreen();
                }
                if (me.currentPlay.scene.length <= me.currentPlay.screen) {
                    me.onPlayEnd();
                    return false;
                }
            })
        }

        return true;
    }

    /////////////////////////////////////////////////////////////

    onPlayEnd() {
        var me = this;
        me.stop();
        me.setState({
            playing: false
        })
    }
}

Incidents.defaultProps = {}

export default Incidents