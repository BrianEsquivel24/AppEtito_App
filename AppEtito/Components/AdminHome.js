import React from "react";
import { Center, Container, Heading, NativeBaseProvider, VStack, Button } from "native-base";

const AdminHome = ({navigation}) => {
  return (
      <Center flex={1} >
        <Container>
          <Heading  mb={4}>
            Welcome Admin
          </Heading>
          <VStack space={2} flex={1} justifyContent="flex-end">
            {/* Agrega botones aquí según tus necesidades */}
            <Button size="lg" onPress={()=>navigation.navigate('AdminCrud')} >Admins</Button>
            <Button size="lg" onPress={()=>navigation.navigate('UserScreen')}>Users</Button>
            <Button size="lg" onPress={()=>navigation.navigate('FoodScreen')}>Foods</Button>
            <Button size="lg" onPress={()=>navigation.navigate('LocationScreen')}>Locations</Button>
            <Button size="lg" onPress={()=>navigation.navigate('RestaurantScreen')}>Restaurants</Button>
            <Button size="lg" onPress={()=>navigation.navigate('CategoryScreen')}>Categories</Button>
            <Button size="lg" onPress={()=>navigation.navigate('PaymentMethodScreen')}>Payment Methods</Button>
          </VStack>
        </Container>
      </Center>
  );
}

export default AdminHome
    