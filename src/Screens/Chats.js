import {
    Image,
    StatusBar,
    StyleSheet, Text,
    TouchableOpacity, View,
    TextInput, FlatList,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useGetMessageQuery, useSendDataMutation } from '../Redux/GetApiCall'

const Chats = ({ route }) => {
    const { name, date, conversationsID, receiverId } = route.params;
    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [showData, setShowData] = useState(false);
    const [sendData] = useSendDataMutation();
    const response = useGetMessageQuery({ senderId: conversationsID, receiverId: receiverId });
    // console.log('messages ===========', response?.currentData?.data);

    useEffect(() => {
        console.log("useeffect");
        if (response?.currentData?.status === 200) {
            setMessages(response?.currentData?.data)
        } else {
            setMessage([])
        }
    }, [response])

    const toggleData = () => {
        setShowData(!showData);
    };

    const handelSendMessage = async () => {
        const payload = {
            senderId: conversationsID,
            receiverId: receiverId,
            message
        };

        try {
            const res = await sendData(payload);
            console.log("send=====", res);

            const newMessage = res?.data?.status === 200 ? res?.data?.data : {};
            console.log(newMessage, "new=======")
            setMessages((messages) => [...messages, newMessage]);
            setMessage('');
        } catch (error) {
            console.error("error===", error);
        }
    };

    return (
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#ffffff"
            />
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require("../assets/Images/arrow.png")} />
                        </TouchableOpacity>
                        <Image source={require("../assets/Images/user.png")} style={styles.image} />
                        <View>
                            <Text style={styles.name}>{name}</Text>
                            <Text style={{ fontSize: 14 }}>{date}</Text>
                        </View>
                    </View>
                    <View style={styles.ImagesContainer}>
                        <TouchableOpacity>
                            <Image source={require("../assets/Images/camera.png")}
                                style={styles.images} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleData}>
                            <Image source={require("../assets/Images/dots.png")}
                                style={styles.images} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{
                    paddingBottom: moderateScale(125)
                }}>
                    <FlatList
                        data={messages}
                        inverted={true}
                        renderItem={({ item }) => (
                            <View style={{
                                marginVertical: 5,
                                marginHorizontal: 8,
                                alignItems: item.receiver._id !== conversationsID ? 'flex-end' : 'flex-start',
                            }}>
                                <Text style={{
                                    backgroundColor: item.receiver._id !== conversationsID ? '#ddffd3' : '#ffffff',
                                    borderRadius: 10,
                                    padding: 10,
                                }}>{item.text}</Text>
                            </View>
                        )}
                    // onContentSizeChange={() => scrollToBottom()}
                    />

                </View>

                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                }}>
                    <View style={styles.search}>
                        <TouchableOpacity>
                            <Image source={require("../assets/Images/emoji.png")}
                                style={styles.images} />
                        </TouchableOpacity>
                        <TextInput
                            style={{
                                flex: 1,
                            }}
                            placeholder='Messages..'
                            value={message}
                            multiline={true}
                            onChangeText={(text) => setMessage(text)}
                        />
                        <View style={styles.ImagesContainer}>
                            <TouchableOpacity>
                                <Image source={require("../assets/Images/vector.png")}
                                    style={styles.images} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={require("../assets/Images/camera.png")}
                                    style={styles.images} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        message == '' ?
                            <TouchableOpacity style={styles.vioce}>
                                <Image source={require("../assets/Images/voice.png")}
                                    style={styles.images} tintColor={"white"} />
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.vioce} onPress={handelSendMessage}>
                                <Image source={require("../assets/Images/message.png")}
                                    style={styles.images} tintColor={"white"} />
                            </TouchableOpacity>
                    }
                </View>

                {showData && (
                    <View style={styles.popupMenu}>
                        <TouchableOpacity>
                            <Text style={styles.sorting}>Add to contact</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.sorting}>Block</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.sorting}>Search</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.sorting}>Clear Chat</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.sorting}>Setting</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View >
        </>
    )
}

export default Chats

const styles = StyleSheet.create({
    image: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(50)
    },
    container: {
        flex: 1
    },
    innerContainer: {
        flex: 1,
        backgroundColor: '#f8f1ee'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        padding: 5
    },
    headerContent: {
        flexDirection: 'row',
        gap: moderateScale(10),
        alignItems: 'center'
    },
    ImagesContainer: {
        flexDirection: 'row',
        gap: 15
    },
    images: {
        width: moderateScale(30),
        height: moderateScale(30)
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000'
    },
    popupMenu: {
        width: moderateScale(200),
        height: moderateScale(230),
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        borderRadius: 8,
        position: 'absolute',
        top: moderateScale(45),
        right: moderateScale(17)
    },
    sorting: {
        color: '#212529',
        fontSize: 20,
        padding: 10,
        fontWeight: '500'
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10),
        backgroundColor: '#ffffff',
        borderRadius: moderateScale(30),
        justifyContent: 'space-between',
        width: "85%"
    },
    vioce: {
        backgroundColor: '#1cbb60',
        padding: moderateScale(10),
        borderRadius: moderateScale(50),
        marginLeft: moderateScale(5)
    },
});
