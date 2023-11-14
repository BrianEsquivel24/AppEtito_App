import React from 'react';
import { Box, Center, Heading, Image, Text, VStack, HStack, Badge } from 'native-base';

const Perfil = () => {
  return (
    <Box
      bg="white"
      p={4}
      rounded="lg"
      shadow={2}
      width="90%"
      mx="auto"
      mt={8}
    >
      <Center>
        <Image
          source={{ uri: 'https://placekitten.com/200/200' }}
          alt="Profile Picture"
          size={16}
          borderRadius={999}
          mb={4}
        />
        <Heading size="lg">John Doe</Heading>
        <Text color="gray.500" fontSize="md" textAlign="center">
          Frontend Developer | Passionate about creating amazing user experiences
        </Text>
      </Center>

      <VStack space={4} mt={4}>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Email:</Text>
          <Text>john.doe@example.com</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Phone:</Text>
          <Text>(123) 456-7890</Text>
        </HStack>
        <HStack justifyContent="space-between">
          <Text fontWeight="bold">Location:</Text>
          <Text>New York, USA</Text>
        </HStack>

        <HStack space={2}>
          <Badge>React</Badge>
          <Badge>JavaScript</Badge>
          <Badge>UI/UX</Badge>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Perfil;
