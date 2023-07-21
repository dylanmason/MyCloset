import React, {useEffect, useState} from "react";
import { Ionicons } from '@expo/vector-icons';
import {
    NativeBaseProvider,
} from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './components/Home';
import Settings from './components/Settings';
import Search from './components/Search';
import Add from './components/Add';
import Login from './components/Login';
import SignUp from "./components/SignUp";
import UserProfile from "./components/UserProfile";
import Profile from "./components/Profile";
import Post from "./components/Post";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Features () {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color }) => {
                let iconName: any;

                if (route.name === 'Home') {
                    iconName = focused ? 'shirt' : 'shirt-outline';
                } 
                else if (route.name === 'Profile') {
                    iconName = focused ? 'person-circle' : 'person-circle-outline';
                } 
                else if (route.name === 'Search') {
                    iconName = focused ? 'search' : 'search-outline';
                }
                else if (route.name === 'Add') {
                    iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={30} color={color} />;
            },
            tabBarActiveTintColor: '#dc2626',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
                height: '11%',
                paddingTop: '3%',
            },
            title: "",
            headerShown: false
        })}
        >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Search" component={Search} />
    <Tab.Screen name="Add" component={Add} />
    <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
    );
}

export default function App() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState<any>("");

    useEffect(() => {
        (async () => {
            let status = await AsyncStorage.getItem('auth');
            console.log('token in app.tsx is:', status);
            setIsUserLoggedIn(status);
        })()
    }, [])

    return (
        <NativeBaseProvider>
        <NavigationContainer>
        <Stack.Navigator
        initialRouteName={isUserLoggedIn !== null ? "Features" : "Login"}
        screenOptions={{
            headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Features" component={Features} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Post" component={Post} />
        <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
        </NavigationContainer>
        </NativeBaseProvider>
    );
}
