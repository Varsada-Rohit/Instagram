import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import UploadPost from '../Screens/UploadPost';
import UploadCaption from '../Screens/UploadCaption';

const Stack = createStackNavigator();

export default function UploadProfileNavigator() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen name="selectPhoto" component={UploadPost} />
      <Stack.Screen
        name="UploadCaption"
        component={UploadCaption}
        options={{title: 'New Post'}}
      />
    </Stack.Navigator>
  );
}
