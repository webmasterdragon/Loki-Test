import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import UserListScreen from './screens/UserList';
import UserInfoScreen from './screens/UserInfo';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: UserListScreen
    },
    User: {
      screen: UserInfoScreen
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(AppNavigator);
