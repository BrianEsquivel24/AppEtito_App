import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//imports screans de admin
import AdminScreen from '../Components/AdminComponents/AdminScreen'
import CategoryScreen from '../Components/AdminComponents/CategoryScreen'
import FoodScreen from '../Components/AdminComponents/FoodScreen'
import LocationScreen from '../Components/AdminComponents/LocationScreen'
import PaymentMethodScreen from '../Components/AdminComponents/PaymentMethodScreen'
import RestaurantScreen from '../Components/AdminComponents/RestaurantScreen'
import UserScreen from '../Components/AdminComponents/UserScreen'


import Login from './Login';
import Example from './Home';
import AdminHome from './AdminHome';


const Stack = createStackNavigator();

const StackAdmin = createStackNavigator();

export const AdminNav = () =>{
    return(
        <StackAdmin.Navigator>
            <StackAdmin.Screen name='AdminHome' component={AdminHome}/>
            <StackAdmin.Screen name='AdminScreen' component={AdminScreen}/>
            <StackAdmin.Screen name='CategoryScreen' component={CategoryScreen}/>
            <StackAdmin.Screen name='FoodScreen' component={FoodScreen}/>
            <StackAdmin.Screen name='LocationScreen' component={LocationScreen}/>
            <StackAdmin.Screen name='PaymentMethodScreen' component={PaymentMethodScreen}/>
            <StackAdmin.Screen name='RestaurantScreen' component={RestaurantScreen}/>
            <StackAdmin.Screen name='UserScreen' component={UserScreen}/>
        </StackAdmin.Navigator>
    )
}

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="AdminCrud" component={AdminNav} options={{headerShown: false}} />
            <Stack.Screen name="UserHome" component={Example} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default Navigation

