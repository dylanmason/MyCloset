import React, {useEffect, useState} from "react";
import { FlatList, StyleSheet } from "react-native";
import {
    Text,
    Link,
    VStack,
    Box,
    ScrollView,
    Image,
} from "native-base";
import config from '../config.json';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EvilIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";

export default function Profile({ route, navigation }:any) {

    const [posts, setPosts] = useState<any>([])
    const [profilePicture, setProfilePicture] = useState<any>("");
    const [userName, setUserName] = useState<any>("");

    useFocusEffect(
      React.useCallback(() => {
        load();
      }, [userName])
    );

    const load = async () => {
            const token = await AsyncStorage.getItem('auth');
            setUserName(token);
            const userData = await fetch(`${config.USER_INFO_LOCAL_API}?userName=${userName}`)
            let userJson = await userData.json();
            console.log('userData is:', userJson);
            console.log(userJson.profilePicture);
            setProfilePicture(userJson.profilePicture);
            console.log("profilePicture is:", profilePicture);
            const postData = await fetch(`${config.USERPOSTDATA_LOCAL_API}?userName=${userName}`)
            let postJson = await postData.json();
            postJson = postJson.reverse();
            setPosts(postJson);
            console.log("posts are:", postJson);
    }

    const Posts = () => {
        return (
            <FlatList 
            data={posts}
            renderItem={({ item, index }) => {
                return index !== 2 ? (
                    <Link onPress={() => navigation.navigate('Post', {
                        userName: userName,
                        image: item.image,
                        clothes: item.clothes,
                        height: item.height,
                        width: item.width
                    })}>
                    <Image size={135.2} borderRadius={140} mr='1%' alt="img" source={{uri: item.image}}/>
                    </Link>
                ) : (
                    <Link onPress={() => navigation.navigate('Post', {
                        userName: userName,
                        image: item.image,
                        clothes: item.clothes,
                        height: item.height,
                        width: item.width
                    })}>
                    <Image size={135.2} borderRadius={140} alt="img" source={{uri: item.image}}/>
                    </Link>
                )
            }}
            numColumns={3}
            columnWrapperStyle={styles.row}
            />
        )
    }

    return (
        <Box justifyContent='center' alignItems='center' flex={1} zIndex={1}>
        {
            (profilePicture === "") ? (
                <Box>
                </Box>
            ) : (
                <>
                <Link justifyItems='center' alignItems='center' position="absolute" top={16} right={30} zIndex={2} onPress={() =>  {
                    navigation.navigate('Settings', {profilePicture: profilePicture, userName: userName});
                }}>
                <EvilIcons name='pencil' size={36} color='gray' />
                </Link>
                <VStack w="100%" space={2} alignItems='center' flex={1} mt="15%">
                <Link onPress={() => console.log('pressed')}>
                <Image size={175} borderRadius={175} alt="img" source={{uri: profilePicture}} />
                </Link>
                <Box>
                <Text fontWeight="thin" fontSize="lg">{userName}</Text>
                </Box>
                <Box borderWidth="1%" borderColor="gray.200" w="80%">
                </Box>
                <Box justifyContent='center' alignItems='center' flex={1} w="100%" mt="-2%">
                <ScrollView w="100%" h="600" p={2} showsVerticalScrollIndicator={false} mb="10%">
                <Box justifyContent='center' alignItems='left' flex={1}>
                <Posts />
                </Box>
                </ScrollView>
                </Box>
                </VStack>
                </>
            )
        }
        </Box>
    );
}

const styles = StyleSheet.create ({
    row: {
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: '1%'
    }
})
