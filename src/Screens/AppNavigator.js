import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import HomeScreen from '../BottomTabs/HomeScreen';
import UpdateScreen from '../BottomTabs/UpdateScreen';
import Comunities from '../BottomTabs/Comunities';
import CallScreen from '../BottomTabs/CallScreen';
import { moderateScale } from 'react-native-size-matters';
import Chats from './Chats';

const AppNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name='SplashScreen'
                    component={SplashScreen}
                />
                <Stack.Screen
                    name='Chats'
                    component={Chats}
                />
                <Stack.Screen
                    name='BottomTabs'
                    component={BottomTabs}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;

function BottomTabs() {
    const Tab = createBottomTabNavigator();
    const navigation = useNavigation()
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: moderateScale(70)
                },
                tabBarHideOnKeyboard: true
            }}>
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
                            <View style={styles.tabItem}>
                                <Image source={require("../assets/Images/home.png")}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: focused ? '#1cbb60' : 'black' }
                                    ]} />
                                <Text style={[
                                    styles.tabLabel,
                                    { color: focused ? '#1cbb60' : 'black' }
                                ]}>
                                    Chats
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="UpdateScreen"
                component={UpdateScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("UpdateScreen")}>
                            <View style={styles.tabItem}>
                                <Image source={require("../assets/Images/updates.png")}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: focused ? '#1cbb60' : 'black' }
                                    ]} />
                                <Text style={[
                                    styles.tabLabel,
                                    { color: focused ? '#1cbb60' : 'black' }
                                ]}>
                                    Updates
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="Comunities"
                component={Comunities}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("Comunities")}>
                            <View style={styles.tabItem}>
                                <Image source={require("../assets/Images/comunities.png")}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: focused ? '#1cbb60' : 'black' }
                                    ]} />
                                <Text style={[
                                    styles.tabLabel,
                                    { color: focused ? '#1cbb60' : 'black' }
                                ]}>
                                    Communities
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="CallScreen"
                component={CallScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("CallScreen")}>
                            <View style={styles.tabItem}>
                                <Image source={require("../assets/Images/calls.png")}
                                    style={[
                                        styles.tabIcon,
                                        { tintColor: focused ? '#1cbb60' : 'black' }
                                    ]} />
                                <Text
                                    style={[
                                        styles.tabLabel,
                                        { color: focused ? '#1cbb60' : 'black' }
                                    ]}>
                                    Calls
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabLabel: {
        fontSize: moderateScale(12),
        marginTop: moderateScale(4),
    },
});
