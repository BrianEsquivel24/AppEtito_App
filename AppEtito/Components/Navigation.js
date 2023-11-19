import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

//imports screens de user
import Profile from './UsersComponents/Profile/Profile';
import AgregarLocationUser from './UsersComponents/Profile/CreateLocationUser';
import AgregarPaymentMethodUser from './UsersComponents/Profile/CreatePaymentUser';

//imports screens
import Search from './UsersComponents/Search/Search';
import RestaurantList from './UsersComponents/Search/RestaurantList';
import FoodsList from './UsersComponents/Search/FoodsList';

import Cart from './UsersComponents/CartAndPayment/Cart';

//imports de home
import Home from './Home';


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

const AgregDirec = createStackNavigator();
const Restaurants = createStackNavigator();
const ProfileS = createStackNavigator();

export const HomeBottons = () => {
  return (
    <AgregDirec.Navigator>
      <AgregDirec.Screen name='Home' component={Home} options={{ headerShown: false }} />
    </AgregDirec.Navigator>
  )
}

export const SearchBottons = () => {
  return (
    <Restaurants.Navigator>
      <Restaurants.Screen name='Search' component={Search} options={{ headerShown: false }} />
      <Restaurants.Screen name='RestaurantList' component={RestaurantList} options={{ headerShown: false }} />
      <Restaurants.Screen name='FoodsList' component={FoodsList} options={{ headerShown: false }} />
    </Restaurants.Navigator>
  )
}

export const ProfileBottons = () => {
  return (
    <ProfileS.Navigator>
      <ProfileS.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <ProfileS.Screen name='AgregarLocationUser' component={AgregarLocationUser} options={{ headerShown: false }} />
      <ProfileS.Screen name='AgregarPaymentMethodUser' component={AgregarPaymentMethodUser} options={{ headerShown: false }} />
    </ProfileS.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export const NavTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeBottons"
        component={HomeBottons}
        options={{
          headerShown: false,
          tabBarLabel: 'Welcome',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          )
        }}
      />
      <Tab.Screen
        name="SearchBottons"
        component={SearchBottons}
        options={{
          headerShown: false,
          tabBarLabel: 'Búsqueda',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'search' : 'search-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
          tabBarLabel: 'Carrito',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'cart' : 'cart-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileBottons"
        component={ProfileBottons}
        options={{
          headerShown: false,
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

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
      <StackAdminCrud.Screen name='AdminScreen' component={AdminScreen} options={{ headerShown: false }} />
      <StackAdminCrud.Screen name='AgregarAdmin' component={AgregarAdmin} options={{ headerShown: false }} />
      <StackAdminCrud.Screen name='UpdateAdmin' component={UpdateAdmin} options={{ headerShown: false }} />
    </StackAdminCrud.Navigator>
  )
}

export const CategoryCrud = () => {
  return (
    <StackCategoryCrud.Navigator>
      <StackCategoryCrud.Screen name='CategoryScreen' component={CategoryScreen} options={{ headerShown: false }} />
      <StackCategoryCrud.Screen name='AgregarCategory' component={CreateCategory} options={{ headerShown: false }} />
      <StackCategoryCrud.Screen name='UpdateCategory' component={UpdateCategory} options={{ headerShown: false }} />
    </StackCategoryCrud.Navigator>
  )
}

export const RestaurantCrud = () => {
  return (
    <StackRestaurantCrud.Navigator>
      <StackRestaurantCrud.Screen name='RestaurantScreen' component={RestaurantScreen} options={{ headerShown: false }} />
      <StackRestaurantCrud.Screen name='AgregarRestaurant' component={AgregarRestaurant} options={{ headerShown: false }} />
      <StackRestaurantCrud.Screen name='UpdateRestaurant' component={UpdateRestaurant} options={{ headerShown: false }} />
    </StackRestaurantCrud.Navigator>
  )
}

export const FoodCrud = () => {
  return (
    <StackFoodCrud.Navigator>
      <StackFoodCrud.Screen name='FoodScreen' component={FoodScreen} options={{ headerShown: false }} />
      <StackFoodCrud.Screen name='AgregarFood' component={AgregarFood} options={{ headerShown: false }} />
      <StackFoodCrud.Screen name='UpdateFood' component={UpdateFood} options={{ headerShown: false }} />
    </StackFoodCrud.Navigator>
  )
}

export const UserCrud = () => {
  return (
    <StackUserCrud.Navigator>
      <StackUserCrud.Screen name='UserScreen' component={UserScreen} options={{ headerShown: false }} />
      <StackUserCrud.Screen name='AgregarUser' component={AgregarUser} options={{ headerShown: false }} />
      <StackUserCrud.Screen name='UpdateUser' component={UpdateUser} options={{ headerShown: false }} />
    </StackUserCrud.Navigator>
  )
}

export const LocationCrud = () => {
  return (
    <StackLocationCrud.Navigator>
      <StackLocationCrud.Screen name='LocationScreen' component={LocationScreen} options={{ headerShown: false }} />
      <StackLocationCrud.Screen name='AgregarLocation' component={AgregarLocation} options={{ headerShown: false }} />
      <StackLocationCrud.Screen name='UpdateLocation' component={UpdateLocation} options={{ headerShown: false }} />
    </StackLocationCrud.Navigator>
  )
}

export const PaymentMethodCrud = () => {
  return (
    <StackPaymentCrud.Navigator>
      <StackPaymentCrud.Screen name='PaymentMethodScreen' component={PaymentMethodScreen} options={{ headerShown: false }} />
      <StackPaymentCrud.Screen name='AgregarPaymentMethod' component={AgregarPaymentMethod} options={{ headerShown: false }} />
      <StackPaymentCrud.Screen name='UpdatePaymentMethod' component={UpdatePaymentMethod} options={{ headerShown: false }} />
    </StackPaymentCrud.Navigator>
  )
}

export const AdminNav = () => {
  return (
    <StackAdmin.Navigator>
      <StackAdmin.Screen name='AdminHome' component={AdminHome} options={{ headerShown: false }} />
      <StackAdmin.Screen name='AdminCrud' component={AdminCrud} options={{ headerShown: false }} />
      <StackAdmin.Screen name='CategoryCrud' component={CategoryCrud} options={{ headerShown: false }} />
      <StackAdmin.Screen name='FoodCrud' component={FoodCrud} options={{ headerShown: false }} />
      <StackAdmin.Screen name='LocationCrud' component={LocationCrud} options={{ headerShown: false }} />
      <StackAdmin.Screen name='PaymentMethodCrud' component={PaymentMethodCrud} options={{ headerShown: false }} />
      <StackAdmin.Screen name='RestaurantCrud' component={RestaurantCrud} options={{ headerShown: false }} />
      <StackAdmin.Screen name='UserCrud' component={UserCrud} options={{ headerShown: false }} />
    </StackAdmin.Navigator>
  )
}



const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="AdminView" component={AdminNav} options={{ headerShown: false }} />
      <Stack.Screen name="UserHome" component={NavTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default Navigation

