import {useEffect, useState} from "react";
import { FlatList, StyleSheet } from "react-native";
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
import Clothes from "./Clothes";
import { AntDesign } from '@expo/vector-icons';

export default function UserProfile({ route, navigation }: any) {
    let userName = route.params.userName;
    let profilePicture = route.params.profilePicture;
    const [posts, setPosts] = useState<any>([])

    useEffect(() => {
        (async () => {
            const postData = await fetch(`${config.USERPOSTDATA_LOCAL_API}?userName=${userName}`)
            let json = await postData.json();
            json = json.reverse();
            setPosts(json);
        })();
    }, [userName]);

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
        <Link justifyItems='center' alignItems='center' position="absolute" top={20} left={30} zIndex={2} onPress={() =>  {
            navigation.goBack();
        }}>
        <AntDesign name='left' size={25} color='black' />
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
