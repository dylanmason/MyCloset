import React, {useEffect, useState} from "react";
import { LogBox } from "react-native";
import {
    VStack,
    ScrollView,
    Image,
    Box,
} from "native-base";
import Clothes from "./Clothes";
import config from "../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ route , navigation }: any) {

    LogBox.ignoreAllLogs();

    const [userName, setUserName] = useState<string>("");
    const [posts, setPosts] = useState<any>([]);
    const loggedIn = route?.params?.userName;

    useEffect(() => {
        handleUserToken();
        load();
    }, []);

    const handleUserToken = async () => {
        console.log("in handleUserToken");
        const token = await AsyncStorage.getItem('auth');
        console.log("token is", token);
        if (!token) {
            navigation.navigate('Login')
        }
        else {
            setUserName(token);
        }
        console.log(loggedIn);
    }

    const load = async () => {
        const response = await fetch(`${config.GATHERPOSTS_LOCAL_API}`);
        let json = await response.json();
        json = json.reverse();
        console.log(json);
        setPosts(json);
    }

    const Render = () => {
        return (
            posts?.map((item: any, index: any) => {
                let height: number = item.height;
                let width: number = item.width;
                return (
                    <VStack justifyContent='center' alignItems='center' space={3} p={2} m={3} mb="10%" w="75%" key={index}>
                    <Box justifyContent='center' alignItems='center' shadow="5">
                    {
                        height > width ? (
                            <Image h={500} w={300} borderRadius={20} alt="img" source={{uri: item.image}} />
                        ) : (
                            <Image h={200} w={300} borderRadius={20} alt="img" source={{uri: item.image}} />
                        )
                    }
                    </Box>
                    <Box w="100%" mt="5%" alignItems='center' justifyContent='center' flex={1} mb="-10%">
                    <Clothes clothes={item.clothes} />
                    </Box>
                    </VStack>
                )
            })
        )
    }

    return (
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Box justifyContent='center' alignItems='center' pt={20} flex={1} w="100%">
        <ScrollView w="100%" h="600" p={2} showsVerticalScrollIndicator={false}>
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Render />
        </Box>
        </ScrollView>
        </Box>
        </Box>
    );
}
