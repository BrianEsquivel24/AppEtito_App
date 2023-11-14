import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//imports screans de admin 

//components Admin
import AdminScreen from './AdminComponents/Admin/AdminScreen'
import AgregarAdmin from './AdminComponents/Admin/CreateAdmin';
import UpdateAdmin from './AdminComponents/Admin/UpdateAdmin';

//components Category
import CategoryScreen from './AdminComponents/Category/CategoryScreen'
import CreateCategory from './AdminComponents/Category/CreateCategory'
import UpdateCategory from './AdminComponents/Category/UpdateCategory';

//components Foods
import FoodScreen from './AdminComponents/Food/FoodScreen'
import AgregarFood from './AdminComponents/Food/CreateFood';
import UpdateFood from './AdminComponents/Food/UpdateFood';


import LocationScreen from './AdminComponents/Location/LocationScreen'
import PaymentMethodScreen from './AdminComponents/PaymentMethod/PaymentMethodScreen'

//componets Restaurant
import RestaurantScreen from './AdminComponents/Restaurant/RestaurantScreen'
import AgregarRestaurant from './AdminComponents/Restaurant/CreateRestaurant';
import UpdateRestaurant from './AdminComponents/Restaurant/UpdateRestaurant';

import UserScreen from './AdminComponents/User/UserScreen'



import Login from './Login';
import Example from './Home';
import AdminHome from './AdminHome';


const Stack = createStackNavigator();

const StackAdmin = createStackNavigator();

const StackAdminCrud = createStackNavigator();

const StackCategoryCrud = createStackNavigator();

const StackRestaurantCrud = createStackNavigator();

const StackFoodCrud = createStackNavigator();

export const AdminCrud = () => {
    return (
        <StackAdminCrud.Navigator>
            <StackAdminCrud.Screen name='AdminScreen' component={AdminScreen} />
            <StackAdminCrud.Screen name='AgregarAdmin' component={AgregarAdmin} />
            <StackAdminCrud.Screen name='UpdateAdmin' component={UpdateAdmin}/>
        </StackAdminCrud.Navigator>
    )
}

export const CategoryCrud = () => {
    return (
        <StackCategoryCrud.Navigator>
            <StackCategoryCrud.Screen name='CategoryScreen' component={CategoryScreen} />
            <StackCategoryCrud.Screen name='AgregarCategory' component={CreateCategory} />
            <StackCategoryCrud.Screen name='UpdateCategory' component={UpdateCategory}/>
        </StackCategoryCrud.Navigator>
    )
}

export const RestaurantCrud = () => {
    return (
        <StackRestaurantCrud.Navigator>
            <StackRestaurantCrud.Screen name='RestaurantScreen' component={RestaurantScreen} />
            <StackRestaurantCrud.Screen name='AgregarRestaurant' component={AgregarRestaurant} />
            <StackRestaurantCrud.Screen name='UpdateRestaurant' component={UpdateRestaurant}/>
        </StackRestaurantCrud.Navigator>
    )
}

export const FoodCrud = () => {
    return (
        <StackFoodCrud.Navigator>
            <StackFoodCrud.Screen name='FoodScreen' component={FoodScreen} />
            <StackFoodCrud.Screen name='AgregarFood' component={AgregarFood} />
            <StackFoodCrud.Screen name='UpdateFood' component={UpdateFood}/>
        </StackFoodCrud.Navigator>
    )
}


export const AdminNav = () => {
    return (
        <StackAdmin.Navigator>
            <StackAdmin.Screen name='AdminHome' component={AdminHome} />
            <StackAdmin.Screen name='AdminCrud' component={AdminCrud} />
            <StackAdmin.Screen name='CategoryCrud' component={CategoryCrud} />
            <StackAdmin.Screen name='FoodCrud' component={FoodCrud} />
            <StackAdmin.Screen name='LocationScreen' component={LocationScreen} />
            <StackAdmin.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} />
            <StackAdmin.Screen name='RestaurantCrud' component={RestaurantCrud} />
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

