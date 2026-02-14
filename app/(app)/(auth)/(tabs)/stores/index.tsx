import { Colors, Fonts } from '@/constants/theme';
import { storeCategories, stores } from '@/data/stores';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
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

export default function StoresScreen() {
    const insets = useSafeAreaInsets();

    const renderStoreCategory = ({ item }: { item: typeof storeCategories[0] }) => (
        <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
            <View style={[styles.categoryIconContainer, { backgroundColor: item.backgroundColor }]}>
                <Ionicons name={item.icon as any} size={24} color="#333" />
            </View>
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderStoreCard = ({ item }: { item: typeof stores[0] }) => (
        <TouchableOpacity style={styles.storeCard} activeOpacity={0.9}>
            <Image source={item.image} style={styles.storeImage} />
            <View style={styles.storeInfo}>
                <Text style={styles.storeName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.storeDescription} numberOfLines={1}>{item.description}</Text>
                <View style={styles.storeMeta}>
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>{item.deliveryTime}</Text>
                    <Text style={styles.metaDot}>•</Text>
                    <Text style={styles.metaText}>€{item.deliveryFee.toFixed(2)}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Page Title */}
            <View style={[styles.titleContainer, { paddingTop: insets.top + 16 }]}>
                <Text style={styles.pageTitle}>Stores</Text>
                <Text style={styles.pageSubtitle}>Everything you need, delivered fast</Text>
            </View>

            {/* Promo Banner */}
            <View style={styles.promoContainer}>
                <LinearGradient
                    colors={['#FF5F6D', '#FFC371']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.promoBanner}
                >
                    <View style={styles.promoContent}>
                        <Text style={styles.promoTitle}>Wolt Market</Text>
                        <Text style={styles.promoSubtitle}>Your weekly groceries delivered in minutes</Text>
                        <TouchableOpacity style={styles.promoButton}>
                            <Text style={styles.promoButtonText}>Shop now</Text>
                        </TouchableOpacity>
                    </View>
                    <Ionicons name="basket" size={80} color="rgba(255,255,255,0.2)" style={styles.promoIcon} />
                </LinearGradient>
            </View>

            {/* Shop by Category */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Shop by category</Text>
                <FlatList
                    horizontal
                    data={storeCategories}
                    renderItem={renderStoreCategory}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />
            </View>

            {/* Featured Stores */}
            <View style={styles.section}>
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Featured shops</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAll}>See all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    horizontal
                    data={stores}
                    renderItem={renderStoreCard}
                    keyExtractor={(item) => item.id}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.horizontalList}
                />
            </View>

            {/* All Stores / Nearby */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>All stores nearby</Text>
                {stores.map((store) => (
                    <TouchableOpacity key={store.id} style={styles.listStoreCard} activeOpacity={0.8}>
                        <Image source={store.image} style={styles.listStoreImage} />
                        <View style={styles.listStoreInfo}>
                            <View style={styles.listStoreHeader}>
                                <Text style={styles.listStoreName}>{store.name}</Text>
                                <View style={styles.listRating}>
                                    <Ionicons name="star" size={14} color="#F59E0B" />
                                    <Text style={styles.listRatingText}>{store.rating}</Text>
                                </View>
                            </View>
                            <Text style={styles.listStoreDesc} numberOfLines={1}>{store.description}</Text>
                            <View style={styles.listStoreMeta}>
                                <Ionicons name="bicycle-outline" size={16} color={Colors.muted} />
                                <Text style={styles.metaText}>€{store.deliveryFee.toFixed(2)}</Text>
                                <Text style={styles.metaDot}>•</Text>
                                <Text style={styles.metaText}>{store.deliveryTime}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
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
    section: {
        marginTop: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 16,
    },
    sectionTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 20,
        color: '#000',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    seeAll: {
        fontFamily: Fonts.brandBold,
        fontSize: 14,
        color: Colors.primary,
        marginBottom: 16,
    },
    horizontalList: {
        paddingHorizontal: 16,
        gap: 16,
    },

    // Categories
    categoryCard: {
        alignItems: 'center',
        width: 80,
    },
    categoryIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
        boxShadow: '0px 2px 4px rgba(0,0,0,0.05)',
        elevation: 2,
    },
    categoryName: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
    },

    // Featured Stores
    storeCard: {
        width: 260,
        borderRadius: 16,
        backgroundColor: '#fff',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
        overflow: 'hidden',
        boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
        elevation: 3,
    },
    storeImage: {
        width: '100%',
        height: 140,
        backgroundColor: '#f0f0f0',
    },
    storeInfo: {
        padding: 12,
    },
    storeName: {
        fontFamily: Fonts.brandBold,
        fontSize: 16,
        color: '#000',
        marginBottom: 4,
    },
    storeDescription: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        color: Colors.muted,
        marginBottom: 8,
    },
    storeMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: '#FFFBEB',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 6,
    },
    ratingText: {
        fontFamily: Fonts.brandBold,
        fontSize: 12,
        color: '#92400E',
    },

    // List Stores
    listStoreCard: {
        flexDirection: 'row',
        padding: 16,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: Colors.light,
        alignItems: 'center',
    },
    listStoreImage: {
        width: 80,
        height: 80,
        borderRadius: 12,
        backgroundColor: '#f0f0f0',
    },
    listStoreInfo: {
        flex: 1,
        marginLeft: 16,
    },
    listStoreHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    listStoreName: {
        fontFamily: Fonts.brandBold,
        fontSize: 16,
        color: '#000',
    },
    listRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    listRatingText: {
        fontFamily: Fonts.brandBold,
        fontSize: 13,
    },
    listStoreDesc: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        color: Colors.muted,
        marginBottom: 8,
    },
    listStoreMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    metaDot: {
        color: Colors.muted,
        fontSize: 12,
    },
    metaText: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        color: Colors.muted,
    },

    // Promo Banner
    promoContainer: {
        paddingHorizontal: 16,
        marginTop: 8,
    },
    promoBanner: {
        borderRadius: 20,
        padding: 24,
        height: 160,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    promoContent: {
        flex: 1,
        zIndex: 1,
    },
    promoTitle: {
        fontFamily: Fonts.brandBlack,
        fontSize: 24,
        color: '#fff',
        marginBottom: 4,
    },
    promoSubtitle: {
        fontFamily: Fonts.brand,
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
        marginBottom: 16,
        maxWidth: '70%',
    },
    promoButton: {
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    promoButtonText: {
        fontFamily: Fonts.brandBold,
        fontSize: 14,
        color: '#FF5F6D',
    },
    promoIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
        transform: [{ rotate: '-15deg' }],
    },
});