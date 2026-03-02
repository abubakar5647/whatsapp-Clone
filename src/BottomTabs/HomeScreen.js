import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { moderateScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import { useGetDataQuery } from '../Redux/GetApiCall'

const HomeScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([])

  // const usersID = ['667976aa29428f5d4f02f79c','667976aa29428f5d4f02f79d','667976aa29428f5d4f02f79e','667976aa29428f5d4f02f79f'];

  const senderedId = '667976aa29428f5d4f02f79c';

  const { data, isLoading } = useGetDataQuery(senderedId);

  console.log('data=====', data)

  if (isLoading) {
    return (
      <View
        style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  const handleFilter = (text) => {
    if (text) {
      let filteredList = data?.data.filter((item) =>
        item.username.toLowerCase().includes(text.toLowerCase()),
      )
      setFilterData(filteredList)
    }
    setSearch(text)
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
      />
      <View style={styles.statusBar}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1cbb60' }}>Whatsapp</Text>
        <View style={styles.ImagesContainer}>
          <TouchableOpacity>
            <Image source={require("../assets/Images/camera.png")}
              style={styles.images} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require("../assets/Images/dots.png")}
              style={styles.images} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff'
        }}>

        <View style={styles.search}>
          <Image source={require("../assets/Images/ai.png")}
            style={styles.images} />
          <TextInput
            style={{ flex: 1 }}
            value={search}
            multiline={true}
            onChangeText={handleFilter}
            placeholder='Ask Meta AI or Search'
          />
        </View>

        <View style={{
          marginBottom: 70
        }}>
          <FlatList
            data={search ? filterData : data?.data}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Chats', {
                  name: item.username,
                  date: item.timestamp,
                  conversationsID: senderedId,
                  receiverId: item._id
                })}
              >
                <View style={styles.listItem}>
                  <Image source={require("../assets/Images/user.png")} style={styles.dp} />
                  <View style={styles.textContainer}>
                    <View style={styles.header}>
                      <Text style={styles.heading}>{item.username}</Text>
                      <Text style={{ fontSize: 14, color: '#1cbb60' }}>{item.timestamp}</Text>
                    </View>
                    <Text style={styles.title}>{item.lastMessage}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImagesContainer: {
    flexDirection: 'row',
    gap: 15
  },
  images: {
    width: moderateScale(30),
    height: moderateScale(30)
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    padding: 15,
    alignItems: 'center'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: '#ADADAD24',
    paddingVertical: moderateScale(10),
    gap: moderateScale(10),
    marginHorizontal: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15
  },
  heading: {
    fontSize: moderateScale(15),
    fontWeight: '500',
    color: '#000000',
  },
  title: {
    fontSize: moderateScale(15),
    fontWeight: '400',
    color: '#000000',
  },
  time: {
    fontSize: moderateScale(12),
    fontWeight: '500',
    color: '#b9c0c1',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(15),
    backgroundColor: '#eef0f2',
    borderRadius: moderateScale(30),
    marginHorizontal: moderateScale(10)
  },
  dp: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(50)
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})