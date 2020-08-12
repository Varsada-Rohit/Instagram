import React, {useState} from 'react';
import {View, StyleSheet, Image, Text, PermissionsAndroid} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import Color from '../Config/Color';
import AppButton from '../Components/AppButton';
import useAuth from '../Auth/useAuth';
import auth from '@react-native-firebase/auth';
import ImageStorage from '../Backend/ImageStorage';

function SetProfile({navigation}) {
  const {register} = useAuth();
  const [profile, setProfile] = useState();

  const CheckPermission = async () => {
    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );
    if (result === 'granted') {
      ShowImagePicker();
    } else {
      console.log(result);
    }
  };

  // const ShowImagePicker = () => {
  //   ImagePicker.showImagePicker(
  //     {maxHeight: 400, maxWidth: 400},
  //     async (response) => {
  //       if (response.didCancel) {
  //         console.log('image picker canceled');
  //       } else if (response.error) {
  //         console.log('error in image picker', response.error);
  //       } else {
  //         setProfile(response.uri);
  //         const result = await ImageStorage.UploadImage(response.uri);
  //         console.log(result);
  //       }
  //     },
  //   );
  // };

  const ShowImagePicker = () => {
    try {
      ImagePicker.openPicker({width: 200, height: 200, cropping: true}).then(
        async (res) => {
          console.log(res);
          const result = await ImageStorage.UploadImage(res.path);
          setProfile(res.path);
        },
      );
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.profileView}>
          {!profile && (
            <Image
              style={styles.profile}
              source={require('../Assests/Camera.png')}
              resizeMode="contain"
            />
          )}
          {profile && (
            <Image
              source={{uri: profile}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          )}
        </View>
        <Text style={styles.title}>Add Profile Photo</Text>
        <Text style={styles.subTitle}>
          Add a profile photo so your friends know it's you.
        </Text>
      </View>
      <AppButton title="Add a Photo" onPress={() => CheckPermission()} />
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
    overflow: 'hidden',
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
