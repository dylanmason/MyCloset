import React, {useEffect, useState} from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
    Text,
    Link,
    HStack,
    Input,
    Center,
    NativeBaseProvider,
    VStack,
    Box,
    ScrollView,
    Image,
    KeyboardAvoidingView
} from "native-base";
import config from '../config.json';

export default function Search({ navigation }: any) {
    
    const [users, setUsers] = useState<any>([]);
    const [filtered, setFiltered] = useState<any>([]);
    useEffect(() => {
        (async () => {
            const response = await fetch(`${config.GATHERUSERS_LOCAL_API}`);
            const json = await response.json();
            console.log(json);
            setUsers(json);
        })();
    }, [])
    
    const loadUsers = (text:any) => {
        if (text === "") {
            setFiltered([]);
        }
        else {
            let arr:any = [];
            users?.map((item:any) => {
                if (check(item.userName, text)) {
                    arr.push({
                        userName: item.userName,
                        profilePicture: item.profilePicture
                    });
                }
            });
            console.log(arr);
            setFiltered(arr);
        }
    }

    const check = (userName:any, search:any) => {
        if (search.length > userName.length) {
            return false;
        }

        for (let i = 0; i < search.length; i++) {
            if (search[i] !== userName[i]) {
                return false;
            }
        }

        return true;
    } 

    const Users = () => {
        return (
            <ScrollView w="75%" h="600" showsVerticalScrollIndicator={false}>
            {
                filtered?.map((item:any, index:any) => {
                    return (
                        <Link onPress={(() => navigation.navigate('UserProfile', { userName: item.userName, profilePicture: item.profilePicture }))}>
                        <HStack space={4} pt={2} pb={2}>
                        <Box justifyContent='center'>
                        <Image size={50} borderRadius={50} source={{uri: item.profilePicture}} alt="picture"/>
                        </Box>
                        <Box justifyContent='center'>
                        <Text fontSize='lg' fontWeight='hairline'>{item.userName}</Text>
                        </Box>
                        </HStack>
                        </Link>
                    )
                })
            }
            </ScrollView>
        )
    }

    const handlePress = () => {
        Keyboard.dismiss();
    }

    return (
        <Box flex={1}>
        <Box mt="5%" p={10}>
        <Input variant="rounded" placeholder="Search..." onChangeText={(text) => loadUsers(text)}/>
        </Box>
        <Center w="100%">
        <Users />
        </Center>
        </Box>
    );
}
