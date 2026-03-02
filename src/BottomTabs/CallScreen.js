import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CallScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff'
      }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1cbb60' }}>Call Screen</Text>
    </View>
  )
}

export default CallScreen

const styles = StyleSheet.create({})