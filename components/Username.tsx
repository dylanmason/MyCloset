import React, { useState } from "react";
import {
  Text,
  Link,
  VStack,
  HStack,
  Button,
  Image,
  Box,
  Input,
  useToast,
  Spinner,
  KeyboardAvoidingView,
} from "native-base";
import config from "../config.json";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableWithoutFeedback, Keyboard, Platform } from "react-native";

export default function Username({ route, navigation }: any) {
  const [userName, setUserName] = React.useState<string>("");
  const oldUserName = route?.params?.userName;
  const [status, setStatus] = useState<string>("");

  const toast = useToast();

  const emptyUserName = userName === "";

  const pressed = async () => {
    try {
      if (!emptyUserName) {
        setStatus("success");
        const response = await fetch(
          `${config.UPDATE_USERNAME_LOCAL_API}?newUserName=${userName}&oldUserName=${oldUserName}`
        );
        const res = await response.json();
        console.log(res);
        if (res.found === "available") {
          await AsyncStorage.removeItem("auth");
          await AsyncStorage.setItem("auth", userName);
          const auth = await AsyncStorage.getItem("auth");
          console.log(auth);
          toast.show({
            render: () => {
              return (
                <Button
                  p={2}
                  w="300px"
                  bg="white"
                  pl={2}
                  pr={2}
                  borderRadius="md"
                  shadow="5"
                  justifyContent="center"
                  flex={1}
                  _pressed={{
                    bg: "white",
                    opacity: "30",
                  }}
                  onPress={() => {
                    toast.closeAll();
                  }}
                >
                  <HStack space={3} justifyContent="center" flex={1}>
                    <Box>
                      <AntDesign name="checkcircle" size={24} color="green" />
                    </Box>
                    <Box>
                      <Text fontSize="md">Account Successfully Created!</Text>
                    </Box>
                  </HStack>
                </Button>
              );
            },
            placement: "top",
          });
          navigation.goBack();
        } else if (res.found === "unavailable") {
          toast.show({
            render: () => {
              return (
                <Button
                  p={2}
                  w="300px"
                  bg="white"
                  pl={2}
                  pr={2}
                  borderRadius="md"
                  shadow="5"
                  justifyContent="center"
                  flex={1}
                  _pressed={{
                    bg: "white",
                    opacity: "30",
                  }}
                  onPress={() => {
                    toast.closeAll();
                  }}
                >
                  <HStack space={3} justifyContent="center" flex={1}>
                    <Box>
                      <AntDesign name="closecircle" size={24} color="red" />
                    </Box>
                    <Box>
                      <Text fontSize="md">Username already exists</Text>
                    </Box>
                  </HStack>
                </Button>
              );
            },
            placement: "top",
          });
          setStatus("");
        }
      } else {
        toast.show({
          render: () => {
            return (
              <Button
                p={2}
                w="300px"
                bg="white"
                pl={2}
                pr={2}
                borderRadius="md"
                shadow="5"
                justifyContent="center"
                flex={1}
                _pressed={{
                  bg: "white",
                  opacity: "30",
                }}
                onPress={() => {
                  toast.closeAll();
                }}
              >
                <HStack space={3} justifyContent="center" flex={1}>
                  <Box>
                    <AntDesign name="closecircle" size={24} color="red" />
                  </Box>
                  <Box>
                    <Text fontSize="md">Whoopsies!</Text>
                  </Box>
                </HStack>
              </Button>
            );
          },
          placement: "top",
        });
        setStatus("");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return status !== "success" ? (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        justifyContent="center"
        alignItems="center"
        flex={1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Link
          justifyItems="center"
          alignItems="center"
          position="absolute"
          top={20}
          left={30}
          onPress={() => {
            navigation.goBack();
          }}
        > 
        <AntDesign name='left' size={25} color='black' />
        </Link>
        <Box justifyContent="center" alignItems="center" mb="35%">
          <Text fontSize="4xl" fontWeight="hairline">
            Edit Username
          </Text>
        </Box>
        <Input
          fontWeight="thin"
          selectionColor="light.600"
          _focus={{
            borderColor: "black",
            bg: "error.300" + "20",
          }}
          placeholder="New Username"
          variant="rounded"
          w="75%"
          onChangeText={(text) => setUserName(text)}
        />
        <Box justifyContent="center" alignItems="center" mt="30%">
          <Link onPress={pressed}>
            <Text fontSize={20} fontWeight="hairline">
              Change Username
            </Text>
          </Link>
          <Box borderColor="muted.300" borderWidth={1} w={125} mt="2%"></Box>
        </Box>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  ) : (
    <Box justifyContent="center" alignItems="center" flex={1}>
      <Spinner size="lg" color="error.600" />
    </Box>
  );
}
