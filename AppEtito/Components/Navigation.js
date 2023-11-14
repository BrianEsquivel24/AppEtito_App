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

//components location
import LocationScreen from './AdminComponents/Location/LocationScreen'
import AgregarLocation from './AdminComponents/Location/CreateLocation';
import UpdateLocation from './AdminComponents/Location/UpdateLocation';

//components payment
import PaymentMethodScreen from './AdminComponents/PaymentMethod/PaymentMethodScreen'
import AgregarPaymentMethod from './AdminComponents/PaymentMethod/CreateMethodPayment';
import UpdatePaymentMethod from './AdminComponents/PaymentMethod/UpdateMethodPayment';

//componets Restaurant
import RestaurantScreen from './AdminComponents/Restaurant/RestaurantScreen'
import AgregarRestaurant from './AdminComponents/Restaurant/CreateRestaurant';
import UpdateRestaurant from './AdminComponents/Restaurant/UpdateRestaurant';

//components User
import UserScreen from './AdminComponents/User/UserScreen'
import AgregarUser from './AdminComponents/User/CreateUser';
import UpdateUser from './AdminComponents/User/UpdateUser';

import Login from './Login';
import Example from './Home';
import AdminHome from './AdminHome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Bottom = createBottomTabNavigator();

const Stack = createStackNavigator();

//Stacks para la part de admin
const StackAdmin = createStackNavigator();
const StackAdminCrud = createStackNavigator();
const StackCategoryCrud = createStackNavigator();
const StackRestaurantCrud = createStackNavigator();
const StackFoodCrud = createStackNavigator();
const StackUserCrud = createStackNavigator();
const StackLocationCrud = createStackNavigator();
const StackPaymentCrud = createStackNavigator();

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

export const UserCrud = () => {
    return (
        <StackUserCrud.Navigator>
            <StackUserCrud.Screen name='UserScreen' component={UserScreen} />
            <StackUserCrud.Screen name='AgregarUser' component={AgregarUser} />
            <StackUserCrud.Screen name='UpdateUser' component={UpdateUser}/>
        </StackUserCrud.Navigator>
    )
}

export const LocationCrud = () => {
    return (
        <StackLocationCrud.Navigator>
            <StackLocationCrud.Screen name='LocationScreen' component={LocationScreen} />
            <StackLocationCrud.Screen name='AgregarLocation' component={AgregarLocation} />
            <StackLocationCrud.Screen name='UpdateLocation' component={UpdateLocation}/>
        </StackLocationCrud.Navigator>
    )
}

export const PaymentMethodCrud = () => {
    return (
        <StackPaymentCrud.Navigator>
            <StackPaymentCrud.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} />
            <StackPaymentCrud.Screen name='AgregarPaymentMethod' component={AgregarPaymentMethod} />
            <StackPaymentCrud.Screen name='UpdatePaymentMethod' component={UpdatePaymentMethod}/>
        </StackPaymentCrud.Navigator>
    )
}

export const AdminNav = () => {
    return (
        <StackAdmin.Navigator>
            <StackAdmin.Screen name='AdminHome' component={AdminHome} />
            <StackAdmin.Screen name='AdminCrud' component={AdminCrud} />
            <StackAdmin.Screen name='CategoryCrud' component={CategoryCrud} />
            <StackAdmin.Screen name='FoodCrud' component={FoodCrud} />
            <StackAdmin.Screen name='LocationCrud' component={LocationCrud} />
            <StackAdmin.Screen name='PaymentMethodCrud' component={PaymentMethodCrud} />
            <StackAdmin.Screen name='RestaurantCrud' component={RestaurantCrud} />
            <StackAdmin.Screen name='UserCrud' component={UserCrud} />
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

