import React from "react";
import { Center, NativeBaseProvider } from "native-base";

const Example2 = () => {
  return <Center>
      <Center bg="primary.400" _text={{
      color: "white",
      fontWeight: "bold"
    }} height={200} width={{
      base: 200,
      lg: 250
    }}>
        This is the Center in admin
      </Center>
    </Center>;
}

export default Example2
    