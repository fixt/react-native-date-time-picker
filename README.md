# react-native-date-time-picker

###To use:

```
npm install --save react-native-date-time-picker
```

### iOS
It works out of the box.  It just gives you `DatePickerIOS` from `react-native`.

### Android
You'll need our fork of `react-native-wheel`, originally by shexiaoheng.
#### `settings.gradle`
```
include ':react-native-wheel-view'
project(':react-native-wheel-view').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-date-time-picker/node_modules/react-native-wheel')
```

#### `app/build.gradle`
```
dependencies {
  compile ...
  compile project(':react-native-wheel-view')
}
```

#### `MainActivity.java`
```
import co.fixt.wheel.WheelPackage;

...

.addPackage(new WheelPackage())

...
```

### To do
- [ ] Add date picker.
- [ ] Add time picker.
- [ ] Add support for `timeZoneOffsetInMinutes` property on `date-time-picker`.
- [ ] On fork of `react-native-wheel`, add snapback animation when the wheels are reseting.
- [ ] Move logic to `android` code (integrate further with react-native-wheel, merge projects).
- [ ] Add support for automatically switching between am/pm.
