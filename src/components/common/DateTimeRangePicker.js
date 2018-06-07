import React from 'react';
import $ from 'jquery';
import 'bootstrap-daterangepicker';
import PropTypes from 'prop-types'

let events = ['Show', 'Hide', 'ShowCalendar', 'HideCalendar', 'Apply', 'Cancel'];

function getOptions() {
  return [
    '<input>',
    'applyClass',
    'autoApply',
    'autoUpdateInput',
    'alwaysShowCalendars',
    'buttonClasses',
    'cancelClass',
    'dateLimit',
    'drops',
    'endDate',
    'isInvalidDate',
    'linkedCalendars',
    'locale',
    'maxDate',
    'minDate',
    'opens',
    'parentEl',
    'ranges',
    'showDropdowns',
    'showWeekNumbers',
    'singleDatePicker',
    'startDate',
    'template',
    'timePicker',
    'timePicker24Hour',
    'timePickerIncrement',
    'timePickerSeconds',
    'timeZone',
  ];
}

class DatetimeRangePicker extends React.Component {

  static propTypes = {

    startDate: PropTypes.any,
    endDate: PropTypes.any,
    children: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.object,

    callback: PropTypes.func,
    onEvent: PropTypes.func,
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onShowCalendar: PropTypes.func,
    onHideCalendar: PropTypes.func,
    onApply: PropTypes.func,
    onCancel: PropTypes.func,
  };

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};

    this.$picker = undefined;
    this.picker = undefined;
    this.options = getOptions();

    this.handleCallback = this.handleCallback.bind(this);
  }

  componentDidMount() {
    this.$picker = $(this.refs.picker);
    // initialize
    this.$picker.daterangepicker(this.getOptionsFromProps(), this.handleCallback);
    // attach event listeners
    events.forEach(event => {
      let lcase = event.toLowerCase();
      this.$picker.on(lcase + '.daterangepicker', this.makeEventHandler('on' + event));
    });
  }

  componentWillUnmount() {
    this.getPicker().remove();
  }

  setOptionsFromProps() {
    let currentOptions = this.getOptionsFromProps();
    let keys = Object.keys(currentOptions);
    if (this.$picker) {
      if (currentOptions) {
        keys.forEach(key => {
          this.applyOptionToPicker(key, currentOptions[key]);
        });
      }
    }
  }

  getPicker() {
    return this.$picker && this.$picker.data('daterangepicker');
  }

  getOptionsFromProps() {
    let options = {};
    let props = this.props;
    let value;
    this.options.forEach(name => {
      if (props.hasOwnProperty(name)) {
        value = props[name];

        switch (name) {
          case 'startDate':
          case 'endDate':
            if (value) {
              options[name] = value;
            }
            break;

          case 'locale':
            if (value && typeof value === 'object') {
              let picker = this.getPicker();
              if (picker) {
                value = $.extend({}, value, picker.locale);
              }
            }
            options[name] = value;
            break;

          default:
            options[name] = value;
        }
      }
    });
    return options;
  }

  applyOptionToPicker(key, value) {
    if (this.$picker) {
      this.$picker.data('daterangepicker')[key] = value;
    }
  }

  handleCallback(start, end) {
    if (typeof this.props.callback === 'function') {
      this.props.callback(start, end);
    }
  }

  makeEventHandler(eventType) {
    return (event, picker) => {
      if (this.props.onEvent) {
        this.props.onEvent(event, picker);
      }
      if (typeof this.props[eventType] === 'function') {
        this.props[eventType](event, picker);
      }
    };
  }

  render() {
    this.setOptionsFromProps();

    return (
      <div ref="picker" style={this.props.style} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }

}

export default DatetimeRangePicker;
