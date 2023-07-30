import React from "react";
import {
    Text,
    Link,
    VStack,
    HStack,
    Button,
    Image,
    Box,
    Input,
} from "native-base";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import config from "../config.json";

export default function Settings({ route, navigation }: any) {
    const [profilePicture, setProfilePicture] = React.useState<any>(route?.params?.profilePicture);
    const [userName, setUserName] = React.useState<any>("");

    useFocusEffect(
      React.useCallback(() => {
        load();
      }, [])
    );

    const load = async () => {
        const auth = await AsyncStorage.getItem('auth');
        setUserName(auth);
        console.log("username is:", auth);
        const info = await fetch(`${config.USER_INFO_LOCAL_API}?userName=${auth}`);
        let response = await info.json();
        setProfilePicture(response.profilePicture);
        console.log("image is:", profilePicture);
    }

    const pressed = async () => {
        await AsyncStorage.removeItem('auth');
        navigation.replace('Login');
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
            setProfilePicture('data:image/png;base64,' + result.assets[0].base64);
        }
    };

    return (
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Link justifyItems='center' alignItems='center' position="absolute" top={20} left={30} zIndex={2} onPress={() =>  {
            navigation.goBack();
        }}>
        <AntDesign name='left' size={25} color='black' />
        </Link>
        <Box justifyContent='center' alignItems='center'>
        <VStack w="100%" space={8} alignItems='center' mb="5%">
        <Link onPress={pickImage}>
        <Box shadow="5">
        <Image size={275} borderRadius={275} alt="img" source={{uri: profilePicture}}/>
        </Box>
        </Link>
        <Box justifyContent='center'>
        <Text fontSize={30} fontWeight='hairline'>{userName}</Text>
        </Box>
        <Link onPress={() => navigation.navigate('Username', {userName: userName})}>
        <Text fontSize={20} fontWeight='hairline'>Change Username</Text>
        </Link>
        <Box borderColor="muted.300" borderWidth="1%" w={125} mt="-4%" mb="5%"></Box>
        <Link onPress={() => navigation.navigate('Password', {userName: userName})}>
        <Text fontSize={20} fontWeight='hairline'>Change Password</Text>
        </Link>
        <Box borderColor="muted.300" borderWidth="1%" w={125} mt="-4%"></Box>
        <Box justifyContent='center' alignItems='center' mt="15%">
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
