import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login';
import Example from './Home';
import Example2 from './AdminHome';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="AdminHome" component={Example2} />
            <Stack.Screen name="UserHome" component={Example} />
        </Stack.Navigator>
    );
};

export default Navigation

