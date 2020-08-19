import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Home from '../Screens/Home';
import UploadPost from '../Screens/UploadPost';
import UploadProfileNavigator from './UploadProfileNavigator';

const Tab = createBottomTabNavigator();

export default HomeNavigator = () => {
  return (
    <Tab.Navigator 
    tabBarOptions={{showLabel:false,activeTintColor:'black',inactiveTintColor:'black'}}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? 'home'
            : 'home-outline';
        } else if (route.name === 'UploadPost') {
          iconName = 'plus';
        }

        // You can return any component that you like here!
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UploadPost" component={UploadProfileNavigator}  />
    </Tab.Navigator>
  );
};
