import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from '../Screens/Welcome';
import CreateAccount from '../Screens/CreateAccount';
import Login from '../Screens/Login';
import CreatePassword from '../Screens/CreatePassword';
import SetProfile from '../Screens/SetProfile';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Signup" component={CreateAccount} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Password" component={CreatePassword} />
      <Stack.Screen name="SetProfile" component={SetProfile} />
    </Stack.Navigator>
  );
}
