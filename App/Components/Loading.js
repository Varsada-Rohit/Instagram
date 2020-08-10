import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Color from '../Config/Color';

function Loading({visible}) {
  if (!visible) {
    return null;
  }
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={visible} color={Color.black} size={80} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.8,
    justifyContent: 'center',
    backgroundColor: Color.white,
    zIndex: 1,
  },
});

export default Loading;
