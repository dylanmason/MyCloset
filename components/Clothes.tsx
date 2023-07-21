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
import { FontAwesome5 } from '@expo/vector-icons';
import {Linking} from "react-native";

export default function Clothes(props: any) {

    const openLink = (link: string) => {
        try {
            Linking.openURL(link);
        } catch (err) {
            console.error("Error opening link:", err);
        }
    }

    const Render = () => {
        return (
            <Box justifyContent="center" alignItems="center" flex={1} w="100%">
            <ScrollView horizontal={true} w="100%" h={150} p={2} showsHorizontalScrollIndicator={false}>
            <HStack alignItems="center" justifyContent="center" space={3} h="100%">
            {
            props?.clothes?.map((item: any, index: any) => {
                console.log(item.name);
                return (
                    <>
                    {
                        (item.link !== undefined && item.link !== "") ? (
                            <Link w={100} h="100%" onPress={() => openLink(item.link)}>
                            <Box borderRadius={15} bg="muted.200" w={100} h="100%" p={2} shadow="3" key={index}>
                            <Text fontSize="xl" fontWeight="semibold" mb="15%">{item.article}</Text>
                            <Text fontSize="xs">{item.name}</Text>
                            <Box position='absolute' left={0} bottom={0} p={3} flex={1}>
                            <Icon as={FontAwesome5} name="shopping-bag" size={4} color="black" />
                            </Box>
                            </Box>
                            </Link>
                        ) : (
                            <Box borderRadius={15} bg="muted.200" w={100} h="100%" p={2} shadow="3" key={index}>
                            <Text fontSize="xl" fontWeight="semibold" mb="15%">{item.article}</Text>
                            <Text fontSize="xs">{item.name}</Text>
                            </Box>
                        )
                    }

                    </>
                )
            })
            }
            </HStack>
            </ScrollView>
            </Box>
        )
    }
    return (
        <>
        <Render />
        </>
    )
}
