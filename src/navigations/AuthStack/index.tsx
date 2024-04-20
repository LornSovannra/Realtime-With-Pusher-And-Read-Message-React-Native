import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ChatScreen, HomeScreen} from '../../screens';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
