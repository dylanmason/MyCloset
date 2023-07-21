import React, {useEffect, useState} from "react";
import {
    Text,
    Link,
    VStack,
    Box,
    Input,
    Button,
    Icon,
    useToast,
    HStack,
    Pressable,
} from "native-base";
import config from "../config.json";
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Login({navigation}: {navigation:any}) {
    
    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [show, setShow] = useState<boolean>(false);
    const toast = useToast();

    const emptyUserName = userName === "";
    const emptyPassword = password === "";

    const pressed = async () => {
        console.log(userName, password);
        if (!emptyUserName && !emptyPassword) {
            console.log(config.USER_AUTHENTICATION_LOCAL_API);
            console.log(userName, password);
            const credentials = await fetch(`${config.USER_AUTHENTICATION_LOCAL_API}?userName=${userName}&password=${password}`);
            const response = await credentials.json();
            // console.log(response);
            if (response.found === "true") {
                await AsyncStorage.setItem('auth', userName);
                toast.show({
                    render : () => {
                        return (
                            <Button p={2} 
                            w="300px" 
                            bg="white" 
                            pl={2} 
                            pr={2} 
                            borderRadius="md" 
                            shadow="5" 
                            justifyContent='center' 
                            flex={1} 
                            _pressed={{
                                bg: "white",
                                    opacity: "30"
                            }}
                            onPress={() => {
                                toast.closeAll();
                            }}>
                            <HStack space={3} justifyContent='center' flex={1}>
                            <Box>
                            <AntDesign name="checkcircle" size={24} color="green" />
                            </Box>
                            <Box>
                            <Text fontSize='md'>Welcome!</Text>
                            </Box>
                            </HStack>
                            </Button>
                        )
                    },
                    placement: "top",
                });
                navigation.replace('Features', { 
                    screen: 'Home', 
                    params: { userName: userName },
                });
            }
            else if (response.found === "null"){
                toast.show({
                    render : () => {
                        return (
                            <Button p={2} 
                            w="300px" 
                            bg="white" 
                            pl={2} 
                            pr={2} 
                            borderRadius="md" 
                            shadow="5" 
                            justifyContent='center' 
                            flex={1} 
                            _pressed={{
                                bg: "white",
                                    opacity: "30"
                            }}
                            onPress={() => {
                                toast.closeAll();
                            }}>
                            <HStack space={3} justifyContent='center' flex={1}>
                            <Box>
                            <AntDesign name="closecircle" size={24} color="red" />
                            </Box>
                            <Box>
                            <Text fontSize='md'>User not found</Text>
                            </Box>
                            </HStack>
                            </Button>
                        )
                    },
                    placement: "top",
                });
            }
        }
    }

    const handlePress = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
        <Box alignItems='center' justifyContent='center' flex={1}>
        <VStack space={5} alignItems='center' justifyContent='center' w="100%" h="100%" zIndex={1} position='absolute'>
        <Box alignItems='center' justifyContent='center'>
        <Text fontSize='5xl' fontWeight="hairline" color="error.600">My Closet</Text>
        </Box>
        <Box alignItems='center' bg="error.700" h="60%" w="75%" opacity={20} borderRadius={20} shadow="5">
        </Box>
        </VStack>
        <VStack space={10} alignItems='center' justifyContent='center' zIndex={2} mt="10%">
        <Input w="60%" variant='rounded' placeholder="Username" borderColor="white" color="white" placeholderTextColor="light.400" selectionColor="light.600" _focus={{
            borderColor: "white",
                bg: "error.700" + "20"
        }}
        onChangeText={(text) => setUserName(text)}
        InputLeftElement={<Icon as={<Ionicons name="ios-person-circle-outline" />} size={5} ml="2" color="light.400" />}
        />
        <Input w="60%" variant='rounded' placeholder="Password" borderColor="white" color="white" placeholderTextColor="light.400" selectionColor="light.600" _focus={{
            borderColor: "white",
                bg: "error.700" + "20"
        }}
        onChangeText={(text) => setPassword(text)}
        InputLeftElement={<Icon as={<Ionicons name="key" />} size={5} ml="2" color="light.400"/>} type={show ? "text" : "password"}
        InputRightElement={<Pressable onPress={() => setShow(!show)}>
            <Icon as={<Ionicons name={show ? "eye" : "eye-off"} />} size={5} mr="2" color="light.400" />
            </Pressable>}
        />
        <Button bg="error.600" borderRadius={25} justifyContent='center' alignItems='center' mt="25%" _pressed={{
            bg: "error.600",
                opacity: "30"
        }}
        onPress={pressed}
        shadow="3">
        <Text pt={2} pb={2} pl={20} pr={20} color="white">Sign in</Text>
        </Button>
        <Link mt="15%" onPress={() => navigation.navigate('SignUp')}>
        <Text color="white" underline>New User?</Text>
        </Link>
        </VStack>
        </Box>
        </TouchableWithoutFeedback>
    )
}
