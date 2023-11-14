import React from "react";
import { Center, Container, Heading, NativeBaseProvider, VStack, Button, HStack,Icon} from "native-base";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de tener instalado este paquete


const AdminHome = ({ navigation }) => {
  return (
    <Center flex={1}>
    <Container alignItems="center">
      <Heading mb={10} >Welcome Admin</Heading>
      <VStack  space={2}  justifyContent="center" alignItems="center">
        <Button  size="lg"
            onPress={() => navigation.navigate('AdminCrud')}
            bg="success.600"
            mb={3}
            width="100%"
            rounded="full"
            startIcon={<Icon as={Ionicons} name="people" size={4} />}
            _text={{ textAlign: 'left', marginLeft: 2 }}
            
          >
          Admins</Button>
          
        <Button  size="lg" alignItems="center"
            onPress={() => navigation.navigate('UserCrud')}
            bg="success.600"
            mb={3}
            width="108%" 
            rounded="full" 
            startIcon={<Icon as={Ionicons} name="people" size={4} />}
            >Users</Button>
        <Button  size="lg"
            onPress={() => navigation.navigate('FoodCrud')}
            bg="success.600"
            mb={3}
            width="108%" 
            rounded="full" 
            alignItems="center"
            startIcon={<Icon as={Ionicons} name="pizza" size={4} />}
            >Foods</Button>
        <Button  size="lg"
            onPress={() => navigation.navigate('LocationCrud')}
            bg="success.600"
            mb={3}
            width="100%" 
            rounded="full" 
            startIcon={<Icon as={Ionicons} name="navigate" size={4} />}>Locations</Button>
        <Button  size="lg"
            onPress={() => navigation.navigate('RestaurantCrud')}
            bg="success.600"
            mb={3}
            width="100%" 
            rounded="full" 
            startIcon={<Icon as={Ionicons} name="beer" size={4} />}>Restaurants</Button>
        <Button  size="lg"
            onPress={() => navigation.navigate('CategoryCrud')}
            bg="success.600"
            mb={3}
            width="100%" 
            rounded="full" 
            startIcon={<Icon as={Ionicons} name="bookmarks" size={4} />}
            >Categories</Button>
        <Button  size="lg"
            onPress={() => navigation.navigate('PaymentMethodCrud')}
            bg="success.600"
            mb={2}
            width="90%" 
            rounded="full"
            justifyContent="center" 
            startIcon={<Icon as={Ionicons} name="cart" size={4} />}>Payment Methods</Button>
      </VStack>
    </Container>
  </Center>
  );
}

export default AdminHome;