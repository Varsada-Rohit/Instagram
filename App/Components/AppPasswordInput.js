import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppTextInput from './AppTextInput';
import AppTouchableIcon from './AppTouchableIcon';
import Color from '../Config/Color';
import AppButton from './AppButton';

function AppPasswordInput({...otherPerameters}) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <AppTextInput secureTextEntry={!visible} {...otherPerameters} />
      <AppTouchableIcon
        style={styles.eyeIcon}
        name={visible ? 'eye-outline' : 'eye-off-outline'}
        color={visible ? Color.blue : Color.grey}
        size={25}
        onPress={() => setVisible(!visible)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  eyeIcon: {
    position: 'absolute',
    top: 21,
    right: 20,
  },
});

export default AppPasswordInput;
