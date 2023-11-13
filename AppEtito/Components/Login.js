import React, { useState } from 'react';
import { Container, HStack, Link, VStack, Input, Button, Text, Center, FormControl, Box, Heading } from 'native-base';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Peticion al back
    axios.post('http://192.168.1.73:8000/api/login/', {
      nombre: username,
      password: password,
    })
      .then(function (response) {
        // Aquí checa si es admin o user
        console.log(response.data.role);
        const userRole = response.data.role;
        if (userRole === 'admin') {
          // Navega a la pantalla de administrador
          navigation.navigate('AdminView');
        } else if (userRole === 'user') {
          // Navega a la pantalla de usuario regular
          navigation.navigate('UserHome');
        } else {
          // Falta poner un modal o algo que aparezca si no encuentra el usuario
          // ni en admin ni en user
          console.log("Usuario no encontrado");
        }
      })
      .catch(function (error) {
        // Los errores
        console.log(error);
      });
  };

  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
          color: "warmGray.50"
        }}>
          Welcome
        </Heading>
        <Heading mt="1" _dark={{
          color: "warmGray.200"
        }} color="coolGray.600" fontWeight="medium" size="xs">
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl>
            <FormControl.Label 
            >Nombre Usuario</FormControl.Label>
            <Input onChangeText={(text) => setUsername(text)}/>
          </FormControl>
          <FormControl>
            <FormControl.Label placeholder="Contraseña"
              
            >Password</FormControl.Label>
            <Input type="password" secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}/>
            <Link _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500"
            }} alignSelf="flex-end" mt="1">
              Forget Password?
            </Link>
          </FormControl>
          <Button mt="2" colorScheme="indigo" onPress={handleLogin}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text fontSize="sm" color="coolGray.600" _dark={{
              color: "warmGray.200"
            }}>
              I'm a new user.{" "}
            </Text>
            <Link _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm"
            }} href="#">
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
