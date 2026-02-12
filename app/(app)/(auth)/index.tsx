import useUserStore from '@/hooks/use-userstore';
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function Page() {
    const { setIsGuest } = useUserStore();

    return (
        <View>
            <Text>My index page</Text>
            <Button title='Go Login' onPress={() => setIsGuest(false)} />
        </View>
    )
}