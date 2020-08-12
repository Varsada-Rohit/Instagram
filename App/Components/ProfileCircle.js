import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

function ProfileCircle() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.profile}
        source={require('../Assests/Profile.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    overflow: 'hidden',
    borderRadius: 15,
    marginHorizontal: 10,
  },
  profile: {
    height: '100%',
    width: '100%',
  },
});

export default ProfileCircle;
