import { CategoryList } from '@/components/CategoryList';
import RestaurantHeader from '@/components/RestaurantHeader';
import RestaurantList from '@/components/RestaurantList';
import { Fonts } from '@/constants/theme';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const HEADER_HEIGHT = 60;
const RestaurantListPage = () => {
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });
  return (
    <View style={styles.container}>
      <RestaurantHeader title="Restaurants" scrollOffset={scrollOffset} />
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Restaurants</Text>
          <Text style={styles.pageSubtitle}>Delicious food delivered to your door</Text>
        </View>
        <CategoryList />

        <Text style={styles.allRestaurantsTitle}>All restaurants</Text>
        <RestaurantList />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontFamily: Fonts.brandBlack,
    fontSize: 30,
    color: '#000',
  },
  pageSubtitle: {
    fontFamily: Fonts.brand,
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    marginBottom: 16,
  },
  allRestaurantsTitle: {
    fontFamily: Fonts.brandBold,
    fontSize: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
export default RestaurantListPage;
