import { Colors, Fonts } from '@/constants/theme';
import { curatedCollections, todaysDeals, trendingCuisines } from '@/data/discovery';
import { restaurants } from '@/data/restaurants';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Featured restaurants: top 5 by rating
const featuredRestaurants = [...restaurants]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

// Restaurants referenced in deals
const dealRestaurants = todaysDeals.map((deal) => ({
    ...deal,
    restaurant: restaurants.find((r) => r.id === deal.restaurantId)!,
}));

export default function DiscoveryPage() {
    const insets = useSafeAreaInsets();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 32 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Page Title */}
            <View style={[styles.titleContainer, { paddingTop: insets.top + 16 }]}>
                <Text style={styles.pageTitle}>Discovery</Text>
                <Text style={styles.pageSubtitle}>Explore new flavors near you</Text>
            </View>

            {/* Hero Banner */}
            <View style={styles.heroBannerContainer}>
                <LinearGradient
                    colors={['#01BEE5', '#0094DD']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.heroBanner}
                >
                    <View style={styles.heroContent}>
                        <View style={styles.heroTextContainer}>
                            <Text style={styles.heroTitle}>What's good today?</Text>
                            <Text style={styles.heroSubtitle}>
                                Discover handpicked restaurants, trending dishes, and exclusive deals
                            </Text>
                        </View>
                        <View style={styles.heroIconContainer}>
                            <Ionicons name="compass" size={56} color="rgba(255,255,255,0.3)" />
                        </View>
                    </View>
                    {/* Decorative circles */}
                    <View style={styles.heroCircle1} />
                    <View style={styles.heroCircle2} />
                </LinearGradient>
            </View>

            {/* Curated Collections */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Curated for you</Text>
                </View>
                <FlatList
                    horizontal
                    data={curatedCollections}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.collectionCard, { backgroundColor: item.backgroundColor }]}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.collectionIconContainer, { backgroundColor: item.textColor + '20' }]}>
                                <Ionicons name={item.icon as any} size={22} color={item.textColor} />
                            </View>
                            <Text style={[styles.collectionTitle, { color: item.textColor }]}>
                                {item.title}
                            </Text>
                            <Text style={[styles.collectionSubtitle, { color: item.textColor }]}>
                                {item.subtitle}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

            {/* Featured Restaurants */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured restaurants</Text>
                    <TouchableOpacity style={styles.seeAllButton}>
                        <Text style={styles.seeAllText}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={featuredRestaurants}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <Link href={`/(modal)/(restaurant)/${item.id}`} asChild>
                            <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
                                <Image source={item.image!} style={styles.featuredImage} />
                                <View style={styles.featuredInfo}>
                                    <Text style={styles.featuredName} numberOfLines={1}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.featuredDescription} numberOfLines={1}>
                                        {item.description}
                                    </Text>
                                    <View style={styles.featuredMeta}>
                                        <View style={styles.ratingBadge}>
                                            <Ionicons name="star" size={12} color="#F59E0B" />
                                            <Text style={styles.ratingText}>{item.rating}</Text>
                                        </View>
                                        <Text style={styles.metaDot}>•</Text>
                                        <Ionicons name="time-outline" size={13} color={Colors.muted} />
                                        <Text style={styles.metaText}>{item.deliveryTime}</Text>
                                        <Text style={styles.metaDot}>•</Text>
                                        <Text style={styles.metaText}>€{item.deliveryFee.toFixed(2)}</Text>
                                    </View>
                                    {item.tags.length > 0 && (
                                        <View style={styles.tagRow}>
                                            {item.tags.slice(0, 2).map((tag) => (
                                                <View key={tag} style={styles.tag}>
                                                    <Text style={styles.tagText}>{tag}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </TouchableOpacity>
                        </Link>
                    )}
                />
            </View>

            {/* Trending Cuisines */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Trending cuisines</Text>
                </View>
                <View style={styles.cuisineGrid}>
                    {trendingCuisines.map((cuisine) => (
                        <TouchableOpacity
                            key={cuisine.id}
                            style={[styles.cuisinePill, { backgroundColor: cuisine.backgroundColor }]}
                            activeOpacity={0.7}
                        >
                            <Ionicons name={cuisine.icon as any} size={18} color="#333" />
                            <Text style={styles.cuisineName}>{cuisine.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Today's Deals */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Today's deals</Text>
                    <View style={styles.dealsBadge}>
                        <Ionicons name="pricetag" size={12} color={Colors.secondary} />
                        <Text style={styles.dealsBadgeText}>{todaysDeals.length} offers</Text>
                    </View>
                </View>
                <FlatList
                    horizontal
                    data={dealRestaurants}
                    keyExtractor={(item) => item.restaurantId}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                    renderItem={({ item }) => (
                        <Link href={`/(modal)/(restaurant)/${item.restaurantId}`} asChild>
                            <TouchableOpacity style={styles.dealCard} activeOpacity={0.9}>
                                <View style={styles.dealImageContainer}>
                                    <Image source={item.restaurant.image!} style={styles.dealImage} />
                                    <View
                                        style={[
                                            styles.discountBadge,
                                            { backgroundColor: item.badgeColor },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.discountText,
                                                { color: item.badgeTextColor },
                                            ]}
                                        >
                                            {item.discountText}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.dealInfo}>
                                    <Text style={styles.dealName} numberOfLines={1}>
                                        {item.restaurant.name}
                                    </Text>
                                    <Text style={styles.dealDescription} numberOfLines={1}>
                                        {item.restaurant.description}
                                    </Text>
                                    <View style={styles.dealMeta}>
                                        <Ionicons name="star" size={12} color="#F59E0B" />
                                        <Text style={styles.dealRating}>{item.restaurant.rating}</Text>
                                        <Text style={styles.metaDot}>•</Text>
                                        <Text style={styles.metaText}>
                                            {item.restaurant.deliveryTime}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Link>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
        color: Colors.muted,
        marginTop: 4,
    },

    // Hero Banner
    heroBannerContainer: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 8,
    },
    heroBanner: {
        borderRadius: 16,
        padding: 20,
        overflow: 'hidden',
        minHeight: 140,
        justifyContent: 'center',
    },
    heroContent: {
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 1,
    },
    heroTextContainer: {
        flex: 1,
        paddingRight: 12,
    },
    heroTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 22,
        color: '#fff',
        marginBottom: 6,
    },
    heroSubtitle: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        lineHeight: 18,
    },
    heroIconContainer: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heroCircle1: {
        position: 'absolute',
        top: -30,
        right: -20,
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.08)',
    },
    heroCircle2: {
        position: 'absolute',
        bottom: -40,
        left: -20,
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.06)',
    },

    // Sections
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 20,
        color: '#000',
    },
    seeAllButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: Colors.primaryLight,
    },
    seeAllText: {
        fontSize: 13,
        fontWeight: '600',
        color: Colors.secondary,
    },
    horizontalList: {
        paddingHorizontal: 16,
        gap: 12,
    },

    // Curated Collections
    collectionCard: {
        width: 150,
        borderRadius: 14,
        padding: 16,
        justifyContent: 'space-between',
        minHeight: 120,
    },
    collectionIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    collectionTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 15,
        marginBottom: 2,
    },
    collectionSubtitle: {
        fontSize: 11,
        opacity: 0.7,
    },

    // Featured Restaurants
    featuredCard: {
        width: 240,
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.15)',
        elevation: 2,
    },
    featuredImage: {
        width: '100%',
        height: 130,
        backgroundColor: '#e0e0e0',
    },
    featuredInfo: {
        padding: 12,
    },
    featuredName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 2,
    },
    featuredDescription: {
        fontSize: 13,
        color: Colors.muted,
        marginBottom: 8,
    },
    featuredMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginBottom: 8,
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#FEF9E7',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#92400E',
    },
    metaDot: {
        color: '#ccc',
        fontSize: 13,
    },
    metaText: {
        fontSize: 12,
        color: Colors.muted,
    },
    tagRow: {
        flexDirection: 'row',
        gap: 6,
    },
    tag: {
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 6,
    },
    tagText: {
        fontSize: 11,
        color: Colors.secondary,
        fontWeight: '500',
    },

    // Trending Cuisines
    cuisineGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        gap: 10,
    },
    cuisinePill: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 24,
        gap: 6,
    },
    cuisineName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },

    // Today's Deals
    dealsBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: Colors.primaryLight,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    dealsBadgeText: {
        fontSize: 12,
        fontWeight: '600',
        color: Colors.secondary,
    },
    dealCard: {
        width: 220,
        borderRadius: 12,
        backgroundColor: '#fff',
        overflow: 'hidden',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.15)',
        elevation: 2,
    },
    dealImageContainer: {
        position: 'relative',
    },
    dealImage: {
        width: '100%',
        height: 120,
        backgroundColor: '#e0e0e0',
    },
    discountBadge: {
        position: 'absolute',
        bottom: 8,
        left: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },
    discountText: {
        fontSize: 12,
        fontWeight: '700',
    },
    dealInfo: {
        padding: 12,
    },
    dealName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#000',
        marginBottom: 2,
    },
    dealDescription: {
        fontSize: 13,
        color: Colors.muted,
        marginBottom: 6,
    },
    dealMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    dealRating: {
        fontSize: 12,
        fontWeight: '700',
        color: '#92400E',
    },
});