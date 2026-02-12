import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function RootNav() {
  return (
    <Stack>
        <Stack.Screen name="(auth)" options={{
            headerShown: false
        }} />
        <Stack.Screen name="(public)" options={{
            headerShown: false
        }} />
    </Stack>
  )
}