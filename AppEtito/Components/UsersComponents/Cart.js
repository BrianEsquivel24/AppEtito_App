import React from 'react';
import { Container, VStack, Heading, Text, Image } from 'native-base';

const Cart = () => {
  return (
    <Container>
      <VStack space={4} alignItems="center" mt={10}>
        
        <Heading fontSize="xl" fontWeight="bold">
          Carrito Vacío
        </Heading>
        <Text fontSize="md" color="gray.500">
          Tu carrito de compras está vacío. ¡Agrega productos para comenzar a comprar!
        </Text>
      </VStack>
    </Container>
  );
};

export default Cart;
