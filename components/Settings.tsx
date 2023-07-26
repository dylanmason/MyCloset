import React from "react";
import {
    Text,
    Link,
    VStack,
    HStack,
    Button,
    Image,
    Box,
} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings({ route, navigation }: any) {
    const [image, setImage] = React.useState<string>(route?.params?.profilePicture);
    const [userName, setUserName] = React.useState<string>(route?.params?.userName);

    const pressed = async () => {
        await AsyncStorage.removeItem('auth');
        navigation.replace('Login')
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        // console.log(result);

        if (!result.canceled) {
            // console.log(result.assets[0].base64);
            setImage('data:image/png;base64,' + result.assets[0].base64);
        }
    };

    return (
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Box justifyContent='center' alignItems='center'>
        <VStack space={8} alignItems='center' mb="15%">
        <Link onPress={pickImage}>
        <Box shadow="5">
        <Image size={275} borderRadius={275} alt="img" source={{uri: image}}/>
        </Box>
        </Link>
        <Box justifyContent='center'>
        <Text fontSize={30} fontWeight='hairline'>{userName}</Text>
        </Box>
        <Box justifyContent='center' alignItems='center' mt="25%">
        <Button bg="red.500" _pressed={{
            bg: "red.500",
            opacity: 0.5,
        }} 
        borderRadius={25}>
        <Text pl={37} pr={37} pt={2} pb={2}>
        Submit Changes
        </Text></Button>
        </Box>
        </VStack>
        </Box>
        <Button onPress={pressed} bg="red.500" _pressed={{
            bg: "red.500",
            opacity: 0.5,
        }} 
        borderRadius={25}>
        <Text pl={37} pr={37} pt={2} pb={2}>
        Log out
        </Text></Button>
        </Box>
    );
}
