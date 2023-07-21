import React from "react";
import {
    Text,
    Link,
    HStack,
    VStack,
    Center,
    NativeBaseProvider,
    ScrollView,
    Image,
    Box,
    Icon,
} from "native-base";
import Clothes from "./Clothes";

export default function Home({ navigation }: any) {
    return (
        <Box justifyContent='center' alignItems='center' flex={1}>
        <Box justifyContent='center' alignItems='center' pt={20} flex={1} w="100%">
        <ScrollView w="100%" h="600" showsVerticalScrollIndicator={false}>
        <Box justifyContent='center' alignItems='center' flex={1}>
        <VStack justifyContent='center' alignItems='center' space={3} p={2} m={3} mb="10%" w="75%">
        <Box size={300} justifyContent='center' alignItems='center' shadow="3">
        <Image size={300} borderRadius={20} alt="img" source={{uri: "https://www.usnews.com/object/image/00000182-36c3-dbde-a7db-ffcbb92f0000/2-chamonix-mont-blanc-stock.jpg?update-time=1658776694235&size=responsiveFlow640"}}></Image>
        </Box>
        <Box w="100%" alignItems='center' justifyContent='center' flex={1}>
        <Clothes />
        </Box>
        </VStack>
        <VStack justifyContent='center' alignItems='center' space={3} p={2} m={3} mb="10%" w="75%">
        <Box size={300} justifyContent='center' alignItems='center' shadow="3">
        <Image size={300} borderRadius={20} alt="img" source={{uri: "https://www.usnews.com/object/image/00000182-36c3-dbde-a7db-ffcbb92f0000/2-chamonix-mont-blanc-stock.jpg?update-time=1658776694235&size=responsiveFlow640"}}></Image>
        </Box>
        <Clothes />
        </VStack>
        </Box>
        </ScrollView>
        </Box>
        </Box>
    );
}
