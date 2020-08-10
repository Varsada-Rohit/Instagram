import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Color from '../Config/Color';
import AppButton from './AppButton';

function AuthFooter({style, text, btnText, onPress}) {
  return (
    <View style={[styles.container, style]}>
      <Text style={{color: Color.grey}}>{text}</Text>
      <AppButton
        style={{backgroundColor: 'transparent'}}
        textStyle={{color: Color.black, fontSize: 14}}
        title={btnText}
        onPress={onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

export default AuthFooter;
