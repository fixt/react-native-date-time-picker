/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

import DateTimePicker from 'react-native-date-time-picker';

class DateTimeExamples extends Component {
  constructor(props) {
    super(props);

    var currentDateTime = new Date();
    var hourAhead = currentDateTime.getMinutes() + 60;
    currentDateTime.setMinutes(hourAhead);
    currentDateTime.getMinutes() >= 30 ? currentDateTime.setMinutes(30) : currentDateTime.setMinutes(0);

    var validDate = this.dateRestrictor(currentDateTime, true);

    this.state = {
      selectedDate: validDate,
      minimumDate: validDate
    };
  }

  dateRestrictor(date, isCurrentTime) {
    var hour = date.getHours(),
        minutes = date.getMinutes();

    if (hour > 18 && isCurrentTime) {
      date.setHours(10);
      date.setMinutes(30);
      date.setDate(date.getDate() + 1);
    }
    else if (hour > 18) {
      date.setHours(18);
    }
    else if (hour < 10 || (hour == 10 && minutes < 30)) {
      date.setHours(10);
      date.setMinutes(30);
    }

    return date;
  }

  handleDateChange (date) {
    var validDate = this.dateRestrictor(date);
    console.log("currently selected date: " + validDate);
    this.setState({ selectedDate: validDate })
  }

  render() {
    var { selectedDate, minimumDate } = this.state;
    return (
      <View style={styles.container}>
        <DateTimePicker
          mode='datetime'
          date={selectedDate}
          minimumDate={minimumDate}
          minuteInterval={30}
          onDateChange={this.handleDateChange.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default DateTimeExamples;
