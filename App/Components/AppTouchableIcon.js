import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function AppTouchableIcon({style, onPress, name, color, size}) {
  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={onPress}>
        <MaterialCommunityIcons name={name} color={color} size={size} />
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppTouchableIcon;
