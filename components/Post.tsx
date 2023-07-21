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
import Clothes from "./Clothes";
import { AntDesign } from '@expo/vector-icons';

export default function Post({ route, navigation }:any) {
    console.log(route);
    let userName = route.params.userName;
    let image = route.params.image;
    let clothes = route.params.clothes;
    let height = route.params.height;
    let width = route.params.width;
    
    const Render = () => {
        return (
            <VStack justifyContent='center' alignItems='center' space={3} p={2} m={3} mb="10%" w="75%">
            <Box justifyContent='center' alignItems='center' shadow="5">
            {
                height > width ? (
                    <Image h={500} w={300} borderRadius={20} alt="img" source={{uri: image}} />
                ) : (
                    <Image h={200} w={300} borderRadius={20} alt="img" source={{uri: image}} />
                )
            }
            </Box>
            <Box w="100%" mt="5%" alignItems='center' justifyContent='center' flex={1} mb="-10%">
            <Clothes clothes={clothes} />
            </Box>
            </VStack>
        )
    }

    console.log(clothes);
    return (
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Box justifyContent='center' alignItems='center' pt={20} flex={1} w="100%">
        <Link justifyItems='center' alignItems='center' position="absolute" top={20} left={30} zIndex={2} onPress={() =>  {
            navigation.goBack();
        }}>
        <AntDesign name='left' size={25} color='black' />
        </Link>
        <ScrollView mt="10%" w="100%" h="100" p={2}>
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Render />
        </Box>
        </ScrollView>
        </Box>
        </Box>
    )
}
