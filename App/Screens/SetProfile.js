import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import Color from '../Config/Color';
import AppButton from '../Components/AppButton';
import useAuth from '../Auth/useAuth';
import auth from '@react-native-firebase/auth';

function SetProfile({navigation}) {
  const {register} = useAuth();

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.profileView}>
          <Image
            style={styles.profile}
            source={require('../Assests/Camera.png')}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.title}>Add Profile Photo</Text>
        <Text style={styles.subTitle}>
          Add a profile photo so your friends know it's you.
        </Text>
      </View>
      <AppButton title="Add a Photo" />
      <AppButton
        style={{backgroundColor: 'transparent', marginVertical: 0}}
        textStyle={{color: Color.blue, fontSize: 18}}
        title={'Skip'}
        onPress={() => register(auth().currentUser)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 25,
    justifyContent: 'center',
  },
  profileView: {
    borderWidth: 2,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  profile: {
    width: 70,
    height: 70,
  },
  title: {
    fontSize: 30,
    marginVertical: 20,
  },
  subTitle: {
    fontSize: 18,
    color: Color.grey,
    textAlign: 'center',
    marginBottom: 15,
  },
});

export default SetProfile;
