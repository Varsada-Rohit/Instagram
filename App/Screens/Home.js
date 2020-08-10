import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppButton from '../Components/AppButton';
import useAuth from '../Auth/useAuth';

function Home() {
  const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <AppButton title="Logout" onPress={() => logout()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
