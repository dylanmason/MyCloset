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
    KeyboardAvoidingView,
    Button
} from "native-base";
import config from '../config.json';
import Clothes from "./Clothes";
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserProfile({ route, navigation }: any) {
    let userName = route.params.userName;
    let profilePicture = route.params.profilePicture;
    const [myUserName, setMyUserName] = useState<any>("");
    const [following, setFollowing] = useState<any>([]);
    const [followers, setFollowers] = useState<any>([]);
    const [status, setStatus] = useState<boolean>(false);
    const [posts, setPosts] = useState<any>([]);
    const [verified, setVerified] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('auth');  
            setMyUserName(token);
            console.log(token);
            const postData = await fetch(`${config.USERPOSTDATA_LOCAL_API}?userName=${userName}`)
            let json = await postData.json();
            json = json.reverse();
            setPosts(json);
            const userData = await fetch(`${config.USER_INFO_LOCAL_API}?userName=${userName}`)
            const user = await userData.json();
            setFollowers(user.followers);
            setFollowing(user.following);
            setVerified(user.verified);
            console.log(user.followers);
            const found = user.followers.length > 0 && user.followers.map((user: any) => user.userName === token);
            if (found) {
                console.log('in if');
                setStatus(true);
            }
            else {
                console.log('in else');
                setStatus(false);
            }
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

    const follow = async () => {
        setStatus(true);    
        console.log('in follow', status);
        console.log(userName, myUserName);
        const response = await fetch(`${config.UPDATE_FOLLOWING_LOCAL_API}?userName=${userName}&myUserName=${myUserName}&action=true`);
        setFollowers([...followers, {userName: myUserName}]);
        console.log(followers);
        console.log("followers.length: ", followers.length);
    }

    const unfollow = async () => {
        setStatus(false);
        console.log('in unfollow', status);
        console.log(userName, myUserName);
        const response = await fetch(`${config.UPDATE_FOLLOWING_LOCAL_API}?userName=${userName}&myUserName=${myUserName}&action=false`);
        setFollowers(followers.filter((user: any) => user.userName !== myUserName));
        console.log(followers);
    }

    return (
      <Box justifyContent="center" alignItems="center" flex={1} zIndex={1}>
        <Link
          justifyItems="center"
          alignItems="center"
          position="absolute"
          top={20}
          left={30}
          zIndex={2}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <AntDesign name="left" size={25} color="black" />
        </Link>
        <VStack w="100%" space={2} alignItems="center" flex={1} mt="15%">
          <Link onPress={() => console.log("pressed")} shadow="5">
            <Image
              size={175}
              borderRadius={175}
              alt="img"
              source={{ uri: profilePicture }}
            />
          </Link>
          <HStack space={2} justifyContent="center" alignItems="center">
            <Text fontWeight="thin" fontSize="4xl">
              {userName}
            </Text>
            {verified ? (
              <Box>
                <AntDesign name="checkcircle" size={28} color="#10b981" />
              </Box>
            ) : null}
          </HStack>
          <Box>
            {status === true ? (
              <Button
                bg="error.400"
                onPress={unfollow}
                _pressed={{ bg: "error.400", opacity: 0.5 }}
                shadow="2"
                borderRadius={40}
              >
                <Text
                  fontSize="lg"
                  fontWeight="thin"
                  pl={30}
                  pr={30}
                  pt={2}
                  pb={2}
                >
                  Unfollow
                </Text>
              </Button>
            ) : (
              <Button
                bg="green.300"
                onPress={follow}
                _pressed={{ bg: "green.300", opacity: 0.5 }}
                shadow="2"
                borderRadius={40}
              >
                <Text
                  fontSize="lg"
                  fontWeight="thin"
                  pl={37}
                  pr={37}
                  pt={2}
                  pb={2}
                >
                  Follow
                </Text>
              </Button>
            )}
          </Box>
          <HStack space={2} alignItems="center" mt="2%" h="5%">
            <Box justifyContent="center" alignItems="center">
              <Text fontWeight="thin" fontSize="lg">
                {posts.length} Posts
              </Text>
            </Box>
            <Box borderWidth={1} h="90%" borderColor="muted.300"></Box>
            <Box justifyContent="center" alignItems="center">
              <Text fontWeight="thin" fontSize="lg">
                {followers.length} Followers
              </Text>
            </Box>
            <Box borderWidth={1} h="90%" borderColor="muted.300"></Box>
            <Box justifyContent="center" alignItems="center">
              <Text fontWeight="thin" fontSize="lg">
                {following.length} Following
              </Text>
            </Box>
          </HStack>
          <Box borderWidth="1%" borderColor="gray.200" w="80%"></Box>
          <Box
            justifyContent="center"
            alignItems="center"
            flex={1}
            w="100%"
            mt="-2%"
          >
            <ScrollView
              w="100%"
              h="600"
              p={2}
              showsVerticalScrollIndicator={false}
              mb="10%"
            >
              <Box justifyContent="center" alignItems="left" flex={1}>
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
