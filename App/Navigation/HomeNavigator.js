import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Screens/Home';

const Stack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
