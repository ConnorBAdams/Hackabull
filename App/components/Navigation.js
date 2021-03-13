import React, { useState } from "react";
import * as firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

//#region Screen Imports
import LandingPageScreen from '../screens/LandingPageScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
//#endregion

/*
This is the navigation controller
The goal is to have the drawer navigator in here, the AppNavigator
- This will contain all of the locations within the sidebar
- Each of these can contain deeper navigation
Then each page that requires a deeper navigation will have its own 
stack navigation
Their respective implementation can be returned from this component
*/

const Tab = createBottomTabNavigator();
export default AppNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen name="Home Screen"
                component={HomeNavigator}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen name="My Profile"
                component={ProfileNavigator}
                options={{
                    tabBarLabel: 'My Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="contacts" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};


const HomeStack = createStackNavigator();
const HomeNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
        </HomeStack.Navigator>
    );
};


const ProfileStack = createStackNavigator();
const ProfileNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
            </ProfileStack.Navigator>
    );
};
