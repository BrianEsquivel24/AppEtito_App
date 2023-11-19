import React from "react";
import { Container, Text, Heading, Center, NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native'
import Navigation from "./Components/Navigation";
import { CartProvider } from './Components/UsersComponents/CartContext';


export default function App() {
  return (
    <NavigationContainer>
      <CartProvider>
        <NativeBaseProvider>
          <Navigation />
        </NativeBaseProvider>
      </CartProvider>
    </NavigationContainer>
  );
};