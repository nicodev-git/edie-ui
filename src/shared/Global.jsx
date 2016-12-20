import moment from 'moment'
import {reduce, isNull, isUndefined, isArray} from 'lodash'

export const imageBaseUrl = '/images/'
export const extImageBaseUrl = '/externalpictures?name='

export const DragTypes = {
    DEVICE: 'device',
    DIVIDER: 'divider',
}

export const lineTypes = [{
    title: 'Lightning',
    image: '/images/light.svg',
    type: 'lightning',
    typename: 'lightening'
},{
    title: 'Lightning',
    image: '/images/lightning2.png',
    type: 'lightning',
    typename: 'Yellow Lightning'
},{
    title: 'Line',
    image: '/images/line.gif',
    type: 'normal',
    typename: 'line'
},{
    title: 'Dashed Line',
    image: '/images/dashedline.png',
    type: 'dashed',
    typename: 'Dashed Line'
}]

export function getIncidenttypeIcon(incidenttype) {
    switch (incidenttype) {
        case "ssh root failed password":
            return "sysadmin.png";
        case "Failed password for root":
            return "sysadmin.png";
        case "unknown user":
            return "usersicon.png";
        case "SSH unknown user":
            return "usersicon.png";
        case "Root Login Attack pattern":
            return "sysadmin.png";
        case "root login":
            return "adminlogin.png";
        case "IPS":
            return "ips.png";
        case "NAC All Alerts":
            return "nac.png";
        case "Webservice Method failure":
            return "webservice.png";
        case "http failure":
            return "port.png";
        case "LogCheck failure":
            return "log-dir.png";
        case "ping failure":
            return "ping.png";
    }

    return "defaultincidenticon.png";
}

export function getSeverityIcon(severity) {
    var src = "";

    switch ((severity || '').toLowerCase()) {
        case "high":
            src = "high.png";
            break;
        case "low":
            src = "low.png";
            break;
        case "medium":
            src = "medium.png";
            break;
        default:
            src = "audit.png";
            break;
    }

    return "<img src='/images/" + src + "' title='" + severity + "' width=25>";
}

export function dateFormatter(datetime) {
    var date = datetime.substring(0, 10);
    var time = datetime.substring(11, 16);
    var today = moment().format('YYYY-MM-DD');
    if (today == date) return "Today " + time;

    var yesterday = moment(new Date(new Date() - 3600 * 24 * 1000)).format('YYYY-MM-DD');
    if (yesterday == date) return "Yesterday " + time;

    var diff = new Date() - new Date(date);
    if (diff <= 0) return 'Today';

    var seconds = diff / 1000;
    var minutes = seconds / 60;
    var hours = minutes / 60;
    var days = Math.floor(hours / 24);
    var years = Math.floor(days / 365);

    var str = '';
    if (years > 0) {
        days -= years * 365;
        str += years + " year" + (years > 1 ? "s" : "");
    }

    var months = Math.floor(days / 30);
    if (months > 0) {
        days -= months * 30;
        if (str) str += ' ';
        str += months + " month" + (months > 1 ? "s" : "");
    }

    if (days > 0) {
        if (str) str += ' ';
        str += days + " day" + (days > 1 ? "s" : "");
    }

    if (str) str += " ago";
    str += " " + time;

    return str;

    //return $.timeago(date) + " " + time;
}

export function format() {
    var args = arguments;
    return args[0].replace(/{(\d+)}/g, function(match, number) {
        return typeof args[1 + parseInt(number)] != 'undefined' ? args[1 + parseInt(number)] : match;
    });
}

export const globalState = {
    fullscreen: false,
}

export function encodeUrlParams(obj) {
    var qs = reduce(obj, function (result, value, key) {
        if (!isNull(value) && !isUndefined(value)) {
            if (isArray(value)) {
                result += reduce(value, function (result1, value1) {
                    if (!isNull(value1) && !isUndefined(value1)) {
                        result1 += key + '=' + value1 + '&';
                        return result1
                    } else {
                        return result1;
                    }
                }, '')
            } else {
                result += key + '=' + value + '&';
            }
            return result;
        } else {
            return result
        }
    }, '').slice(0, -1);
    return qs;
};