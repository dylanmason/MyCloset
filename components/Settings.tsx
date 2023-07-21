import React from "react";
import {
    Text,
    Link,
    HStack,
    Center,
    NativeBaseProvider,
    VStack,
    Button,
    Box,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ navigation }: any) {

    const pressed = async () => {
        await AsyncStorage.removeItem('auth');
        navigation.replace('Login')
    }

    return (
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Button onPress={pressed}>
        <Text pl={40} pr={40} pt={2} pb={2}>
        Log out
        </Text></Button>
        </Box>
    );
}
