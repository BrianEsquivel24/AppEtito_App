import React from "react";
import { Container, Text, Heading, Center, NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native'
import Navigation from "./Components/Navigation";


export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Navigation/> 
      </NativeBaseProvider>
    </NavigationContainer>
  );
};