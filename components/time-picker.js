'use strict';

import React, { Component, View } from 'react-native';
import WheelView from 'react-native-wheel';
import makeRange from '../utils/make-range';

const ampm = ['am', 'pm'];

const hours = makeRange(1, 12);
const minutes = makeRange(0, 59);
              
export default class TimePicker extends Component {
  render() {
    
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'center'
      }}
      >
        <WheelView
          style={{
            width: 150,
            height: 240,
          }}
          onItemChange={}
          values={hours}
          isLoop={true}
          selectedIndex={0}
          textSize={20}
        />
        <WheelView
          style={{
            width: 150,
            height: 240,
          }}
          onItemChange={}
          values={minutes}
          isLoop={true}
          selectedIndex={0}
          textSize={20}
        />
        <WheelView
          style={{
            width: 150,
            height: 240,
          }}
          onItemChange={}
          values={ampm}
          isLoop={false}
          selectedIndex={0}
          textSize={20}
        />
      </View>
    );
  }
}

