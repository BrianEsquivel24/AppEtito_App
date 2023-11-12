import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//imports screans de admin 

//components Admin
import AdminScreen from './AdminComponents/Admin/AdminScreen'
import AgregarAdmin from './AdminComponents/Admin/CreateAdmin';

import CategoryScreen from './AdminComponents/Category/CategoryScreen'
import FoodScreen from './AdminComponents/Food/FoodScreen'
import LocationScreen from './AdminComponents/Location/LocationScreen'
import PaymentMethodScreen from './AdminComponents/PaymentMethod/PaymentMethodScreen'
import RestaurantScreen from './AdminComponents/Restaurant/RestaurantScreen'
import UserScreen from './AdminComponents/User/UserScreen'



import Login from './Login';
import Example from './Home';
import AdminHome from './AdminHome';


const Stack = createStackNavigator();

const StackAdmin = createStackNavigator();

const StackAdminCrud = createStackNavigator();

export const AdminCrud = () => {
    return (
        <StackAdminCrud.Navigator>
            <StackAdminCrud.Screen name='AdminScreen' component={AdminScreen} />
            <StackAdminCrud.Screen name='AgregarAdmin' component={AgregarAdmin} />
        </StackAdminCrud.Navigator>
    )
}

export const AdminNav = () => {
    return (
        <StackAdmin.Navigator>
            <StackAdmin.Screen name='AdminHome' component={AdminHome} />
            <StackAdmin.Screen name='AdminCrud' component={AdminCrud} />
            <StackAdmin.Screen name='CategoryScreen' component={CategoryScreen} />
            <StackAdmin.Screen name='FoodScreen' component={FoodScreen} />
            <StackAdmin.Screen name='LocationScreen' component={LocationScreen} />
            <StackAdmin.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} />
            <StackAdmin.Screen name='RestaurantScreen' component={RestaurantScreen} />
            <StackAdmin.Screen name='UserScreen' component={UserScreen} />
        </StackAdmin.Navigator>
    )
}

const Navigation = () => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="AdminView" component={AdminNav} options={{ headerShown: false }} />

            
            <Stack.Screen name="UserHome" component={Example} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Navigation

