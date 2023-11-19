// Cart.js
import React from 'react';
import { Container, VStack, Heading, Text, Image, Box, Button, HStack, ScrollView } from 'native-base';


const MyButton = () => {

    return (
        <ScrollView>
            <Container>
                <VStack space={4} alignItems="center" mt={10}>
                    <Heading fontSize="xl" fontWeight="bold">
                       PAGAR
                    </Heading>

                </VStack>


            </Container>
        </ScrollView>
    );
};

export default MyButton;
