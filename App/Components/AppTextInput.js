import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Color from '../Config/Color';

function AppTextInput({...otherPerameters}) {
  return (
    <View style={styles.container}>
      <TextInput
        {...otherPerameters}
        style={{fontSize: 18, paddingHorizontal: 10}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Color.mediumGrey,
    backgroundColor: Color.lightGrey,
    marginVertical: 10,
  },
});

export default AppTextInput;
