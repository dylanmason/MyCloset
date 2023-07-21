import React, {useEffect, useState} from "react";
import {
    Text,
    Link,
    HStack,
    VStack,
    Center,
    Image,
    Box,
    Input,
    Button,
    KeyboardAvoidingView,
    useToast,
    Icon,
    Spinner,
    Pressable,
} from "native-base";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import config from "../config.json";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp({ navigation }: any) {

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [image, setImage] = useState<any>("https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_960_720.png");
    const [show, setShow] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("");

    const handlePress = () => {
        Keyboard.dismiss();
    }

    const emptyUserName = userName === '';
    const emptyPassword = password === '';

    const toast = useToast();

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

    const pressed = async () => {
        const data = {
            userName: userName,
            password: password,
            profilePicture: image, 
        }

        if (!emptyUserName && !emptyPassword) {
            setStatus("success");
            const credentials = await fetch(`${config.USER_SIGNUP_LOCAL_API}`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const response = await credentials.json();
            console.log(response);
            if (response.found === "available") {
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
                            <Text fontSize='md'>Account Successfully Created!</Text>
                            </Box>
                            </HStack>
                            </Button>
                        )
                    },
                    placement: "top",
                });
                navigation.navigate('Login');
            }
            else if (response.found === "unavailable") {
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
                            <Text fontSize='md'>Username already exists</Text>
                            </Box>
                            </HStack>
                            </Button>
                        )
                    },
                    placement: "top",
                });
            }
        }
        else {
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
                        <Text fontSize='md'>Whoopsies!</Text>
                        </Box>
                        </HStack>
                        </Button>
                    )
                },
                placement: "top",
            });
        }
    }


    return (
        status !== "success" ? (
            <TouchableWithoutFeedback onPress={handlePress}>
            <KeyboardAvoidingView justifyContent='center' alignItems='center' flex={1} w="100%" h="100%" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Box alignItems='center' justifyContent='center' flex={1}>
            <VStack space={5} alignItems='center' justifyContent='center' w="100%" h="100%" zIndex={1} position='absolute'>
            <Box alignItems='center' justifyContent='center'>
            <Text fontSize='5xl' fontWeight="hairline" color="error.600">Welcome</Text>
            </Box>
            <Box alignItems='center' bg="error.700" h="60%" w="75%" opacity={20} borderRadius={20} shadow="5">
            </Box>
            </VStack>
            <VStack space={10} alignItems='center' justifyContent='center' zIndex={2} mt="10%">
            <Center mt="15%">
            <Link onPress={pickImage}>
            <Box shadow="5">
            <Image source={{uri: image}} alt="Profile picture" size={175} borderRadius={100} />
            </Box>
            </Link>
            </Center>
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
            <Button bg="error.600" borderRadius={25} justifyContent='center' alignItems='center' mt="15%" _pressed={{
                bg: "error.600",
                    opacity: "30"
            }}
            onPress={pressed}
            shadow="3">
            <Text pt={2} pb={2} pl={43} pr={43} color="white">Create Account</Text>
            </Button>
            </VStack>
            </Box>
            </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        ) : (
            <Box justifyContent='center' alignItems='center' flex={1}>
            <Spinner size="lg" color="error.600"/>
            </Box>
        )
    )
}
