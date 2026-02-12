import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useUserStore from '@/hooks/use-userstore'

export default function RootNav() {
    const { isGuest, user } = useUserStore();
    return (
        <Stack>
            <Stack.Protected guard={isGuest || user}>
                <Stack.Screen name="(auth)" options={{
                    headerShown: false
                }} />
            </Stack.Protected>
            <Stack.Protected guard={!isGuest && !user}>
                <Stack.Screen name="(public)" options={{
                    headerShown: false
                }} />
            </Stack.Protected>
            
        </Stack>
    )
}