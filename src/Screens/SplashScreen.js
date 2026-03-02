import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from 'react-native-size-matters';

const SplashScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("BottomTabs")
        })

    }, [])
    return (
        <View style={styles.container}>
            <StatusBar
                barStyle="light-content"
                backgroundColor="#ffffff"
            />
            <View style={styles.imageContainer}>
                <Image source={require("../assets/Images/logo.png")}
                    style={styles.logo}
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={{
                    color: '#7f7973',
                    fontSize: moderateScale(16),
                }}>from</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image source={require("../assets/Images/meta.png")}
                        style={{
                            width: moderateScale(50),
                            height: moderateScale(50),
                            tintColor: '#1cbb60'
                        }} />
                    <Text style={{
                        color: '#1cbb60',
                        fontSize: moderateScale(16),
                    }}>meta</Text>
                </View>
            </View>
        </View>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: moderateScale(80),
        height: moderateScale(80),
        tintColor: '#1cbb60'
    },
    textContainer: {
        position: 'absolute',
        bottom: moderateScale(20),
        alignItems: 'center',
    },
});
