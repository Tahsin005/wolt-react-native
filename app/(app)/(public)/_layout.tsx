import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ headerShown: false, contentStyle: { backgroundColor: "#fff" } }} />
        <Stack.Screen
          name="other-options"
          options={{
            headerShown: false,
            presentation: 'formSheet',
            title: '',
            sheetAllowedDetents: [0.6],
            sheetCornerRadius: 16,
            headerShadowVisible: false,
          }}
        />
    </Stack>
  )
}