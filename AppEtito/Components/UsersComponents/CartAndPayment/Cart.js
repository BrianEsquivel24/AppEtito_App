// Cart.js
import React from 'react';
import { Container, VStack, Heading, Text, Image, Box, Button, HStack, ScrollView } from 'native-base';
import { useCart } from '../CartContext';

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
      <Container>
        <VStack space={4} alignItems="center" mt={10}>
          <Heading fontSize="xl" fontWeight="bold">
            Carrito de Compras
          </Heading>

          {/* Mostrar los elementos del carrito */}
          {cart.map((item) => (
            <Box
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
                size={200}
                resizeMode="contain"
              />
              <VStack p={4}>
                <Heading size="md">{item.name}</Heading>
                <Text>{item.description}</Text>
                <Text>Precio: {item.price}</Text>

                {/* Botones para agregar o reducir la cantidad */}
                <HStack space={2} alignItems="center" mt={2}>
                  <Button onPress={() => handleReduceQuantity(item)} >-</Button>
                  <Text>{item.quantity}</Text>
                  <Button onPress={() => handleAddQuantity(item)} >+</Button>
                </HStack>

                {/* Mostrar el subtotal por producto */}
                <Text fontWeight="bold" fontSize="md" mt={2}>
                  Subtotal: {(item.price * item.quantity).toFixed(2)}
                </Text>
                <Button onPress={() => handleRemoveFromCart(item)} >Eliminar del carrito</Button>
              </VStack>
            </Box>
          ))}

          {/* Mostrar el total */}
          <Text fontWeight="bold" fontSize="lg" mt={4}>
            Total: {total.toFixed(2)}
          </Text>

          {total > 0 && (
            <Button onPress={goToCheckout}>Pagar</Button>
          )}


          {/* Mostrar un mensaje si el carrito está vacío */}
          {cart.length === 0 && <Text>El carrito está vacío.</Text>}
        </VStack>


      </Container>
    </ScrollView>
  );
};

export default Cart;
