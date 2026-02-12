import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    scrollTo,
    useAnimatedReaction,
    useAnimatedRef,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

const iconDataSets = {
    set1: [
        { emoji: '🍕', color: '#FFE5CC' },
        { emoji: '🍔', color: '#F4D03F' },
        { emoji: '🍟', color: '#F8D7DA' },
        { emoji: '🌮', color: '#D5EDDA' },
        { emoji: '🍗', color: '#FADBD8' },
    ],
    set2: [
        { emoji: '🎮', color: '#D1ECF1' },
        { emoji: '🎧', color: '#E2E3E5' },
        { emoji: '☕', color: '#F4D03F' },
        { emoji: '🍿', color: '#FFE5CC' },
        { emoji: '🥤', color: '#F8D7DA' },
    ],
    set3: [
        { emoji: '🍰', color: '#FADBD8' },
        { emoji: '🍦', color: '#D1ECF1' },
        { emoji: '🍪', color: '#FFE5CC' },
        { emoji: '🎲', color: '#D5EDDA' },
        { emoji: '🕹️', color: '#E2E3E5' },
    ],
};

const ITEM_HEIGHT = 160;
const GAP = 10;
const SCROLL_SPEED = 30; // pixels per second

interface SmoothInfiniteScrollProps {
  scrollDirection?: 'up' | 'down';
  iconSet?: 'set1' | 'set2' | 'set3';
}

const SmoothInfiniteScroll = ({
    scrollDirection = 'down',
    iconSet = 'set1',
}: SmoothInfiniteScrollProps) => {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const scrollY = useSharedValue(0);

    const iconData = iconDataSets[iconSet];

    const items = [...iconData, ...iconData];

    const singleSetHeight =
        iconData.length * ITEM_HEIGHT + iconData.length * GAP;

    useEffect(() => {
        const duration = (singleSetHeight / SCROLL_SPEED) * 1000;

        scrollY.value = 0;

        scrollY.value = withRepeat(
            withTiming(singleSetHeight, { duration }),
            -1,
            false
        );
    }, [singleSetHeight]);

    useAnimatedReaction(
        () => scrollY.value,
        (y) => {
            const wrappedY = y % singleSetHeight;

            if (scrollDirection === 'down') {
                scrollTo(scrollRef, 0, wrappedY, false);
            } else {
                scrollTo(scrollRef, 0, singleSetHeight - wrappedY, false);
            }
        }
    );

    return (
        <Animated.ScrollView
            ref={scrollRef}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {items.map((item, idx) => (
                <View
                    key={idx}
                    style={[
                        styles.iconContainer,
                        { backgroundColor: item.color },
                    ]}
                >
                    <Text style={styles.emoji}>{item.emoji}</Text>
                </View>
            ))}
        </Animated.ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        gap: GAP,
        paddingVertical: 20,
    },
    iconContainer: {
        width: 160,
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        marginHorizontal: 5,

        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    emoji: {
        fontSize: 40,
    },
});

export default SmoothInfiniteScroll;
