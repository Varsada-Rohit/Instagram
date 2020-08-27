import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Home from '../Screens/Home';
import UploadPost from '../Screens/UploadPost';
import UploadProfileNavigator from './UploadProfileNavigator';
import Temp from '../Screens/Temp';
import UserProfile from '../Screens/UserProfile';
import {Image, View} from 'react-native';

const Tab = createBottomTabNavigator();

export default HomeNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: 'black',
        inactiveTintColor: 'black',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'UploadPost') {
            iconName = 'plus';
          } else {
            return (
              <View
                style={{
                  borderWidth: focused ? 1 : 0,
                  padding: 2,
                  borderRadius: 14,
                }}>
                <Image
                  source={require('../Assests/Account.png')}
                  style={{height: 20, width: 20}}
                />
              </View>
            );
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="UploadPost" component={UploadProfileNavigator} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
    </Tab.Navigator>
  );
};
