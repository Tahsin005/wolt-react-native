import { Colors } from '@/constants/theme';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const SheetHandle = () => {
    if (Platform.OS !== 'android') return null;

    return (
        <View style={styles.container}>
            <View style={styles.handle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 12,
    },
    handle: {
        width: 36,
        height: 5,
        borderRadius: 3,
        backgroundColor: Colors.light,
    },
});

export default SheetHandle;
