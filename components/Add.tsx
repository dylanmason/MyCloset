import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";
import {
    VStack,
    Box,
    Center,
    Text,
    FormControl,
    Input,
    IconButton,
    Button,
    Icon,
    Image,
    useToast,
    HStack,
    Link,
    KeyboardAvoidingView,
    TextArea,
    ScrollView,
    Spinner,
} from "native-base"
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import config from '../config.json';

export default function Add({ navigation }: any) {
    const [image, setImage] = useState<any>("https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_960_720.png");
    const [height, setHeight] = useState<number>(0);
    const [width, setWidth] =useState<number>(0);
    const [caption, setCaption] = useState<any>("");
    const [hat, setHat] = useState<string>("");
    const [hatLink, setHatLink] = useState<string>("");
    const [glasses, setGlasses] = useState<string>("");
    const [glassesLink, setGlassesLink] = useState<string>("");
    const [hoodie, setHoodie] = useState<string>("");
    const [hoodieLink, setHoodieLink] = useState<string>("");
    const [coat, setCoat] = useState<string>("");
    const [coatLink, setCoatLink] = useState<string>("");
    const [shirt, setShirt] = useState<string>("");
    const [shirtLink, setShirtLink] = useState<string>("");
    const [watch, setWatch] = useState<string>("");
    const [watchLink, setWatchLink] = useState<string>("");
    const [pants, setPants] = useState<string>("");
    const [pantsLink, setPantsLink] = useState<string>("");
    const [shorts, setShorts] = useState<string>("");
    const [shortsLink, setShortsLink] = useState<string>("");
    const [socks, setSocks] = useState<string>("");
    const [socksLink, setSocksLink] = useState<string>("");
    const [shoes, setShoes] = useState<string>("");
    const [shoesLink, setShoesLink] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const toast = useToast();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        // console.log(result);

        if (!result.canceled) {
            // console.log(result.assets[0].base64);
            const uri = 'data:image/png;base64,' + result.assets[0].base64;
            setImage(uri);
            setHeight(result.assets[0].height);
            setWidth(result.assets[0].width);
        }
        else {
            setImage("https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_960_720.png");
        }
    };

    const post = async () => {
        setStatus("uploading");
        const clothesData = prepData();
        const data = {
            userName: "Dylan",
            date: new Date().toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}),
            caption: caption,
            image: image,
            clothes: clothesData,
            height: height,
            width: width
        }
        const response = await fetch(`${config.UPLOADPOST_LOCAL_API}`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const json = await response.json();
        setStatus(json.status);
        console.log(status);
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
                    <Text fontSize='md'>Post successfully created!</Text>
                    </Box>
                    </HStack>
                    </Button>
                )
            },
            placement: "top",
        });
        navigation.navigate('Features', { screen: 'Home' });
    }

    const prepData = () => {
        let postData: any = [];
        
        if (hat !== "") {
            let obj: any = {}
            obj.article = 'Hat'
            obj.name = hat
            if (hatLink !== "") {
                obj.link = hatLink
            }
            postData.push(obj);
        }
        if (glasses !== "") {
            let obj: any = {}
            obj.article = 'Glasses'
            obj.name = glasses
            if (glassesLink !== "") {
                obj.link = glassesLink
            }
            postData.push(obj);
        }
        if (hoodie !== "") {
            let obj: any = {}
            obj.article = 'Hoodie'
            obj.name = hoodie
            if (hoodieLink !== "") {
                obj.link = hoodieLink
            }
            postData.push(obj);
        }
        if (coat !== "") {
            let obj: any = {}
            obj.article = 'Coat'
            obj.name = coat
            if (coatLink !== "") {
                obj.link = coatLink
            }
            postData.push(obj);
        }
        if (shirt !== "") {
            let obj: any = {}
            obj.article = 'Shirt'
            obj.name = shirt
            if (shirtLink !== "") {
                obj.link = shirtLink
            }
            postData.push(obj);
        }
        if (watch !== "") {
            let obj: any = {}
            obj.article = 'Watch'
            obj.name = watch
            if (watchLink !== "") {
                obj.link = watchLink
            }
            postData.push(obj);
        }
        if (pants !== "") {
            let obj: any = {}
            obj.article = 'Pants'
            obj.name = pants
            if (pantsLink !== "") {
                obj.link = pantsLink
            }
            postData.push(obj);
        }
        if (shorts !== "") {
            let obj: any = {}
            obj.article = 'Shorts'
            obj.name = shorts
            if (shortsLink !== "") {
                obj.link = shortsLink
            }
            postData.push(obj);
        }
        if (socks !== "") {
            let obj: any = {}
            obj.article = 'Socks'
            obj.name = socks
            if (socksLink !== "") {
                obj.link = socksLink
            }
            postData.push(obj);
        }
        if (shoes !== "") {
            let obj: any = {}
            obj.article = 'Shoes'
            obj.name = shoes
            if (shoesLink !== "") {
                obj.link = shoesLink
            }
            postData.push(obj);
        }

        return postData;
    }

    const handlePress = () => {
        Keyboard.dismiss();
    }

    return (
        <>
        {
            (status !== "uploading") ? (
                <TouchableWithoutFeedback onPress={handlePress}>
                <KeyboardAvoidingView justifyContent='center' alignItems='center' flex={1} behavior='position' keyboardVerticalOffset={-125}>
                <VStack space={5} mt="20%" alignItems='center' flex={1} w="100%">
                <Center>
                <Link onPress={pickImage}>
                <Box shadow="5">
                <Image source={{uri: image}} size={250} borderRadius={200} alt="picture" />
                </Box>
                </Link>
                </Center>
                <Center w="100%">
                <TextArea autoCompleteType="on" placeholder='Caption' alignItems="normal" h={20} maxW="58%" borderRadius={10} onChangeText={(text) => setCaption(text)}/>
                </Center>
                <Center w="100%">
                <ScrollView size={250} showsVerticalScrollIndicator={false}>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Hat" variant='rounded' onChangeText={(text) => setHat(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setHatLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Glasses" variant='rounded' onChangeText={(text) => setGlasses(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setGlassesLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Hoodie" variant='rounded' onChangeText={(text) => setHoodie(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setHoodieLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Coat" variant='rounded' onChangeText={(text) => setCoat(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setCoatLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Shirt" variant='rounded' onChangeText={(text) => setShirt(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setShirtLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Watch" variant='rounded' onChangeText={(text) => setWatch(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setWatchLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Pants" variant='rounded' onChangeText={(text) => setPants(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setPantsLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Shorts" variant='rounded' onChangeText={(text) => setShorts(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setShirtLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Socks" variant='rounded' onChangeText={(text) => setSocks(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setSocksLink(text)}/>
                </Box>
                </VStack>
                <VStack space={2} justifyContent='center' alignItems='center' p={2} borderColor='gray.300' borderWidth={1} borderRadius={15} mb={5}>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Shoes" variant='rounded' onChangeText={(text) => setShoes(text)}/>
                </Box>
                <Box alignItems='center' justifyContent='center' flex={1}>
                <Input placeholder="Link" variant='rounded' onChangeText={(text) => setShoesLink(text)}/>
                </Box>
                </VStack>
                </ScrollView>
                </Center>
                <Center mt="5%">
                <Button 
                borderRadius={20} 
                justifyContent='center' 
                alignItems='center' 
                bg="error.600" 
                _pressed={{
                    bg: "error.600",
                        opacity: "30"
                }}
                onPress={post}>
                <Text pt={2} pb={2} pl={20} pr={20} color="white">
                Submit
                </Text>
                </Button>
                </Center>
                </VStack>
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            ) : (
                <Box justifyContent='center' alignItems='center' flex={1}>
                <Spinner color="error.600" size="lg" />
                </Box>
            )
        }
        </>
    );
}
