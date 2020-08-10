import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import AppButton from './App/Components/AppButton';
import Welcome from './App/Screens/Welcome';
import CreateAccount from './App/Screens/CreateAccount';
import AppTextInput from './App/Components/AppTextInput';
import Login from './App/Screens/Login';
import AuthNavigator from './App/Navigation/AuthNavigator';
import {NavigationContainer} from '@react-navigation/native';
import HomeNavigator from './App/Navigation/HomeNavigator';
import AuthContext from './App/Auth/Context';
import auth from '@react-native-firebase/auth';

function App() {
  const [user, setuser] = useState('');

  useEffect(() => {
    setuser(auth().currentUser);
  }, []);

  return (
    <AuthContext.Provider value={{user, setuser}}>
      <NavigationContainer>
        {user ? <HomeNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default App;
