import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Color from '../Config/Color';

function AppButton({title, onPress, style, textStyle, disabled = false}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.container, style, {opacity: disabled ? 0.3 : 1}]}
      activeOpacity={0.5}
      onPress={onPress}>
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.blue,
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Color.white,
  },
});

export default AppButton;
