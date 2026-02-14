import { Fonts } from '@/constants/theme';
import { Stack } from 'expo-router';

const Page = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                    headerLargeTitle: true,
                    headerTitle: 'Stores',
                    headerLargeTitleStyle: {
                        fontFamily: Fonts.brandBold,
                        fontWeight: '900',
                        color: '#000',
                    },
                }}
            />
        </Stack>
    );
};
export default Page;
