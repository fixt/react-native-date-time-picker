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
  render() {
    return (
      <View style={styles.container}>
        <DateTimePicker
          mode='datetime'
          date={new Date()}
          minuteInterval={20}
          onDateChange={(date) => { console.log(date); }}
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
