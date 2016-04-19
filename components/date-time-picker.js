'use strict';

import React, { Component, View } from 'react-native';
import WheelView from 'react-native-wheel';
import makeRange from '../utils/make-range';

const MILLIS_DAY = 86400000;
const MINDATE = new Date(1999, 11, 31, 0, 0, 0, 0);
const MAXDATE = new Date(new Date().getFullYear() + 25, 11, 31, 0, 0, 0, 0);

const dateRange = ({ minDisplayDate, maxDisplayDate }) => {
  let dates = [];
  let start = minDisplayDate ? minDisplayDate.getTime() : MINDATE.getTime();
  let end = maxDisplayDate ? maxDisplayDate.getTime() : MAXDATE.getTime();

  for (start; start <= end; start += MILLIS_DAY) {
    dates.push(new Date(start));
  }

  return dates;
};

const renderDates = (dates) => {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth();
  const thisDay = today.getDate();
  const todayStart = new Date(thisYear, thisMonth, thisDay, 0, 0, 0 ,0);
  const todayEnd = new Date(thisYear, thisMonth, thisDay, 23, 59, 59, 999);
  let year;
  return dates.map((date) => {
    if (todayStart <= date && todayEnd > date) {
      return "Today";
    } else {
      return date.toDateString().replace(/\s\d*?$/, "");
    }
  });
};

var dates = [];
var dateStrings = [];
const hours = makeRange(1, 12);
var minutes = [];
const ampm = ['AM', 'PM'];

export default class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    const { minuteInterval, date } = props;
    let dateIndices = this.getDateIndices(date);
    minutes = makeRange(0, 59, minuteInterval, true);
    dates = dateRange(props);
    dateStrings = renderDates(dates);

    this.state = dateIndices;
  }

  getDateIndices(date) {
    const { minuteInterval, minDisplayDate } = this.props;
    const minDate = minDisplayDate || MINDATE;

    let dateIndex = date.getTime() - minDate.getTime();
    dateIndex = Math.floor(dateIndex / MILLIS_DAY);
    let hourIndex = date.getHours() % 12;
    const ampmIndex = hourIndex === date.getHours() ? 0 : 1;
    hourIndex = hourIndex === 0 ? 11 : hourIndex - 1;
    const minuteIndex = Math.floor(date.getMinutes() / minuteInterval);

    return {
      dateIndex,
      hourIndex,
      minuteIndex,
      ampmIndex
    };
  }

  setDateState(date) {
    const { minDisplayDate, maxDisplayDate, onDateChange } = this.props;
    const minimumDate = this.props.minimumDate || minDisplayDate || MINDATE;
    const maximumDate = this.props.maximumDate || maxDisplayDate || MAXDATE;


    if (date < minimumDate) {
      var dateIndices = this.getDateIndices(minimumDate);
      var newDate = minimumDate;
    } else if (date > maximumDate) {
      var dateIndices = this.getDateIndices(maximumDate);
      var newDate = maximumDate;
    } else {
      var dateIndices = this.getDateIndices(date);
      var newDate = date;
    }

    this.setState(dateIndices);
    onDateChange(newDate);
  }

  getNewDate(dateIndex, hourIndex, minuteIndex, ampmIndex) {
    let hours = hourIndex + 1;
    hours = ampmIndex === 0 ? hours : hours + 12;
    hours = hours === 12 ? 0 : hours;
    hours = hours === 24 ? 12 : hours;
    let minutes = minuteIndex * this.props.minuteInterval;
    let newDate = new Date(dates[dateIndex]);
    newDate.setHours(hours, minutes);
    return newDate;
  }

  onDateChange(index) {
    const { minuteInterval } = this.props;
    const { hourIndex, minuteIndex, ampmIndex } = this.state;
    let newDate = this.getNewDate(index, hourIndex, minuteIndex, ampmIndex);
    this.setDateState(newDate);
  }

  onHourChange(index) {
    const { minuteInterval } = this.props;
    const { dateIndex, minuteIndex, ampmIndex } = this.state;
    let newDate = this.getNewDate(dateIndex, index, minuteIndex, ampmIndex);
    this.setDateState(newDate);
  }

  onMinuteChange(index) {
    const { minuteInterval } = this.props;
    const { dateIndex, hourIndex, ampmIndex } = this.state;
    let newDate = this.getNewDate(dateIndex, hourIndex, index, ampmIndex);
    this.setDateState(newDate);
  }

  onAmpmChange(index) {
    const { minuteInterval } = this.props;
    const { dateIndex, hourIndex, minuteIndex } = this.state;
    let newDate = this.getNewDate(dateIndex, hourIndex, minuteIndex, index);
    this.setDateState(newDate);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setDateState(nextProps.date);
    }
  }

  render() {
    const { dateIndex, hourIndex, minuteIndex, ampmIndex } = this.state;
    const { textSize } = this.props;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
        <WheelView
          style={{
            width: 150,
            height: 153,
          }}
          onItemChange={this.onDateChange.bind(this)}
          values={dateStrings}
          isLoop={false}
          selectedIndex={dateIndex}
          textSize={textSize}
        />
        <WheelView
          style={{
            width: 50,
            height: 153,
          }}
          onItemChange={this.onHourChange.bind(this)}
          values={hours}
          isLoop={true}
          selectedIndex={hourIndex}
          textSize={textSize}
        />
        <WheelView
          style={{
            width: 50,
            height: 153,
          }}
          onItemChange={this.onMinuteChange.bind(this)}
          values={minutes}
          isLoop={true}
          selectedIndex={minuteIndex}
          textSize={textSize}
        />
        <WheelView
          style={{
            width: 50,
            height: 153,
          }}
          onItemChange={this.onAmpmChange.bind(this)}
          values={ampm}
          isLoop={false}
          selectedIndex={ampmIndex}
          textSize={textSize}
        />
      </View>
    );
  }
};

DateTimePicker.defaultProps = {
  date: new Date(),
  maximumDate: new Date(new Date().getFullYear() + 25, 11, 31),
  minimumDate: new Date(1999, 11, 31),
  minuteInterval: 1,
  textSize: 20,
};

DateTimePicker.propTypes = {
  date: React.PropTypes.instanceOf(Date),
  maximumDate: React.PropTypes.instanceOf(Date),
  minimumDate: React.PropTypes.instanceOf(Date),
  minuteInterval: React.PropTypes.oneOf([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30]),
  onDateChange: React.PropTypes.func.isRequired,
  textSize: React.PropTypes.number,
};
