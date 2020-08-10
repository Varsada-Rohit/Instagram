import React from 'react';
import {View, StyleSheet, Image, Text, Button} from 'react-native';
import AppButton from '../Components/AppButton';
import Color from '../Config/Color';

function Welcome({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={{width: '50%', height: 100, alignSelf: 'center'}}
        resizeMode={'contain'}
        source={require('../Assests/instagram.png')}
      />
      <AppButton
        style={styles.createBtn}
        title="Create New Account"
        onPress={() => navigation.navigate('Signup')}
      />
      <AppButton
        style={{backgroundColor: 'transparent', marginVertical: 0}}
        textStyle={{color: Color.blue, fontSize: 18}}
        title={'Log In'}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: Color.white,
  },
  createBtn: {
    marginTop: 20,
    marginBottom: 15,
  },
  loginBtn: {
    backgroundColor: 'transparent',
  },
  loginText: {
    color: Color.blue,
  },
});

export default Welcome;
