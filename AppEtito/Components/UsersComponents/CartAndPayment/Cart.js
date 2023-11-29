// Cart.js
import React from 'react';
import { Container, VStack, Heading, Text, Image, Box, Button, HStack, ScrollView } from 'native-base';
import { useCart } from '../CartContext';
import { View, StyleSheet, TextInput, SafeAreaView } from 'react-native';

const Cart = ({ navigation }) => {
  const { cart, removeFromCart, addQuantity, reduceQuantity, total } = useCart();

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleAddQuantity = (item) => {
    addQuantity(item);
  };

  const handleReduceQuantity = (item) => {
    reduceQuantity(item);
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout');
  }

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.container}>
          <Heading style={styles.title}>
            Carrito
          </Heading>

          {cart.map((item) => (
            <Box
              style={styles.cardContainer}
              key={item.id}
              bg="white"
              shadow={2}
              rounded="lg"
              width="90%"
              overflow="hidden"
            >
              <Image
                source={{ uri: "http://192.168.1.73:8000" + item.image }}
                alt="Product Image"
                style={styles.cardImage}
                resizeMode="contain"
              />
              <VStack p={4}>
                <Heading style={styles.cardTitle}>{item.name}</Heading>
                <Text style={styles.text}>Precio: {item.price}</Text>

                
                <HStack space={2} justifyContent="center" alignItems="center" mt={2}>
                  <Button style={styles.cardButton} onPress={() => handleReduceQuantity(item)} >-</Button>
                  <Text>{item.quantity}</Text>
                  <Button style={styles.cardButton} onPress={() => handleAddQuantity(item)} >+</Button>
                </HStack>

                
                <Text style={styles.cardTitle}>
                  Subtotal: {(item.price * item.quantity).toFixed(2)}
                </Text>
                <Button style={styles.cardButton} onPress={() => handleRemoveFromCart(item)} >
                  <Text style={styles.buttonText}>Eliminar del carrito</Text>
                </Button>
              </VStack>
            </Box>
          ))}

          {/* Mostrar el total */}
          <Text fontWeight="bold" fontSize="lg" mt={4}>
            Total: {total.toFixed(2)}
          </Text>

          {total > 0 && (
            <Button style={styles.cardButton} onPress={goToCheckout}>
              <Text style={styles.buttonText}> Pagar</Text>
            </Button>
          )}


          {/* Mostrar un mensaje si el carrito está vacío */}
          {cart.length === 0 && <Text>El carrito está vacío.</Text>}
        </View>


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  },
  container: {

    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',

  },
  title: {
    paddingTop: 50,
    color: '#344340',
    fontWeight: 'bold',
    fontSize: 50,
    lineHeight: 80,
  },

  text: {
    paddingBottom: 5,
    alignContent: 'space-between',
    fontSize: 15,
    textAlign: 'center'
  },

  textTitles: {
    color: '#FF8300',
    paddingTop: 20,
    textAlign: 'center',
    fontSize: 20
  },

  button: {
    width: '80%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: '#FF8300',
    fontSize: 20,
    margin: 20,

  },
  cardContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#ffffff',
    width: '90%', // Ajusta el ancho según sea necesario
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center', // Alinea el texto al centro
  },
  cardImage: {
    width: 300,
    height: 200,
    marginBottom: 8,
    borderRadius: 8, // Ajusta según sea necesario
  },
  cardButton: {
    backgroundColor: '#FF8300',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  }
});

export default Cart;
