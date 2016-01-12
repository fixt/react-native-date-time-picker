'use strict';

import React, { Component, View } from 'react-native';
import WheelView from 'react-native-wheel';
import makeRange from '../utils/make-range';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December']

const days = makeRange(1, 31);
const years = makeRange(1, 9999);
              

export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    const { date } = props;
    const dateIndices = this.getDateIndices(date);

    this.state = dateIndices;
  }

  getDateIndices(date) {
    const monthIndex = date.getMonth();
    const dayIndex = date.getDate() - 1;
    const yearIndex = date.getFullYear() - 1;

    return {
      monthIndex: monthIndex,
      dayIndex: dayIndex,
      yearIndex: yearIndex 
    };
  }

  isValidDate(date) {
    const minimumDate = this.props.minimumDate || 0;
    const maximumDate = this.props.maximumDate || Infinity;
    if (date > minimumDate && date < maximumDate) {
      return true;
    }
    return false;
  }

  setDateState(newDate, props) {
    const { onDateChange } = props;

    if (this.isValidDate(newDate)) { 
      const dateIndices = this.getDateIndices(newDate);
      this.setState(dateIndices);
      onDateChange(newDate);
      return true;
    }
    return false; 
  }

  onMonthChange(index) {
    const { dayIndex, yearIndex } = this.state;
    const newDate = new Date(yearIndex + 1, index, dayIndex + 1); 

    return this.setDateState(newDate, this.props);
  }

  onDayChange(index) {
    const { monthIndex, yearIndex } = this.state;
    const newDate = new Date(yearIndex + 1, monthIndex, index + 1); 

    return this.setDateState(newDate, this.props);
  }
  
  onYearChange(index) {
    const { monthIndex, dayIndex } = this.state;
    const newDate = new Date(index + 1, monthIndex, dayIndex + 1); 

    return this.setDateState(newDate, this.props);
  }

  render() {
    const { style } = this.props;
    const { monthIndex, dayIndex, yearIndex } = this.state;
    
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center'
      }}
      >
        <WheelView
          style={{
            width: 150,
            height: 153,
          }}
          onItemChange={this.onMonthChange.bind(this)}
          values={months}
          isLoop={true}
          selectedIndex={monthIndex}
          textSize={20}
        />
        <WheelView
          style={{
            width: 50,
            height: 153,
          }}
          onItemChange={this.onDayChange.bind(this)}
          values={days}
          isLoop={true}
          selectedIndex={dayIndex}
          textSize={20}
        />
        <WheelView
          style={{
            width: 100,
            height: 153,
          }}
          onItemChange={this.onYearChange.bind(this)}
          values={years}
          isLoop={true}
          selectedIndex={yearIndex}
          textSize={20}
        />
      </View>
    );
  }
}

DatePicker.propTypes = {
  date: React.PropTypes.instanceOf(Date),
  maximumDate: React.PropTypes.instanceOf(Date),
  minimumDate: React.PropTypes.instanceOf(Date),
  onDateChange: React.PropTypes.func.isRequired,
}
