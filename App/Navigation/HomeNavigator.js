import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from '../Screens/Home';
import UploadPost from '../Screens/UploadPost';

const Stack = createStackNavigator();

export default HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UploadPost" component={UploadPost} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
