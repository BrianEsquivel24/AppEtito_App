import React from "react";
import { Center, Container, Heading, NativeBaseProvider, VStack, Button, HStack,Icon, Text} from "native-base";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado este paquete
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';

const AdminHome = ({ navigation }) => {
  return (
    <View style={styles.mainContainer}>
    <View style={styles.container}>
    <Text style={styles.title}>AppEtito</Text>
    <Button  
     
           style={styles.button}
           onPress={() => navigation.navigate('AdminCrud')}
           startIcon={<Icon as={Ionicons} name="people" size={4} />}
          >
          Administradores</Button>
          <Button  
            onPress={() => navigation.navigate('UserCrud')}
            style={styles.button}
            startIcon={<Icon as={Ionicons} name="people" size={4} />}
            >Usuarios</Button>

        <Button  
            onPress={() => navigation.navigate('FoodCrud')}
            style={styles.button}
            startIcon={<Icon as={Ionicons} name="pizza" size={4} />}
            >Comidas</Button>
        <Button  
            onPress={() => navigation.navigate('LocationCrud')}
            style={styles.button}
            startIcon={<Icon as={Ionicons} name="navigate" size={4} />}>Direcciones</Button>
        <Button  
            onPress={() => navigation.navigate('RestaurantCrud')}
            style={styles.button}
            startIcon={<Icon as={Ionicons} name="beer" size={4} />}>Restaurantes</Button>
        <Button  
            onPress={() => navigation.navigate('CategoryCrud')}
            style={styles.button}
            startIcon={<Icon as={Ionicons} name="bookmarks" size={4} />}
            >Categorias</Button>
        <Button  
            onPress={() => navigation.navigate('PaymentMethodCrud')}
            style={styles.button}
            startIcon={<Icon as={Ionicons} name="cart" size={4} />}>Metodos de pago</Button>
        <Button  
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
           >Cerrar sesión</Button>

      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  mainContainer:{
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container:{
  
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent:'center',
    flex: 1,
  },

  title: {
    
    color: '#344340',
    fontWeight: 'bold',
    fontSize: 60, 
    lineHeight: 80,
  },
  subtitle:{
    fontSize: 20,
    color:'gray',
  },
  button:{
    width:'80%',
    height:50,
    borderRadius:25,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
   marginTop: 25,
   backgroundColor: '#FF8300',
   fontSize: 20, 
  },
  TextInput:{
    paddingStart: 20,
    borderColor: 'gray',
    padding: 10,
    width: '90%',
    height: 50,
    marginTop:20,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  
});

export default AdminHome;