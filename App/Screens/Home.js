import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import AppButton from '../Components/AppButton';
import useAuth from '../Auth/useAuth';
import PostCard from '../Components/PostCard';

function Home() {
  const {logout} = useAuth();

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Home</Text>
        <AppButton title="Logout" onPress={() => logout()} />
        <PostCard />
        <PostCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Home;
