import { Colors, Fonts } from '@/constants/theme';
import { categories } from '@/data/categories';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const recentSearches = ['Pizza', 'Sushi', 'Burger', 'Pasta', 'Kebab'];
const popularSearches = ['McDonald\'s', 'Burger King', 'Subway', 'Starbucks', 'KFC'];

export default function SearchPage() {
    const insets = useSafeAreaInsets();
    const [searchQuery, setSearchQuery] = useState('');

    const renderCategory = ({ item }: { item: typeof categories[0] }) => (
        <TouchableOpacity style={styles.categoryCard} activeOpacity={0.8}>
            <View style={[styles.categoryImageContainer, { backgroundColor: item.backgroundColor }]}>
                <Image source={item.image} style={styles.categoryImage} />
            </View>
            <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{item.name}</Text>
                <Text style={styles.categoryPlaces}>{item.placesCount} places</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Page Title */}
            <View style={[styles.titleContainer, { paddingTop: insets.top + 16 }]}>
                <Text style={styles.pageTitle}>Search</Text>
                <Text style={styles.pageSubtitle}>Find your favorites</Text>
            </View>

            {/* Search Bar Row */}
            <View style={styles.searchRow}>
                <View style={styles.searchBarContainer}>
                    <Ionicons name="search" size={20} color={Colors.muted} style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Restaurants, stores, dishes"
                        placeholderTextColor={Colors.muted}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={18} color={Colors.muted} />
                        </TouchableOpacity>
                    )}
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={22} color={Colors.primary} />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }}
            >
                {/* Recent Searches */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent searches</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipContainer}>
                        {recentSearches.map((term) => (
                            <TouchableOpacity key={term} style={styles.chip} activeOpacity={0.7}>
                                <Text style={styles.chipText}>{term}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Popular Searches */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Popular searches</Text>
                    <View style={styles.popularList}>
                        {popularSearches.map((term, index) => (
                            <TouchableOpacity key={term} style={styles.popularItem} activeOpacity={0.7}>
                                <Ionicons name="trending-up" size={18} color={Colors.muted} />
                                <Text style={styles.popularText}>{term}</Text>
                                <Ionicons name="chevron-forward" size={16} color="#ccc" style={{ marginLeft: 'auto' }} />
                                {index < popularSearches.length - 1 && <View style={styles.separator} />}
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* All Categories */}
                <View style={[styles.section, { paddingBottom: 20 }]}>
                    <Text style={styles.sectionTitle}>All categories</Text>
                    <View style={styles.grid}>
                        {categories.map((category) => (
                            <TouchableOpacity key={category.id} style={styles.gridCard} activeOpacity={0.8}>
                                <View style={[styles.gridImageContainer, { backgroundColor: category.backgroundColor }]}>
                                    <Image source={category.image} style={styles.gridImage} />
                                </View>
                                <Text style={styles.gridName}>{category.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
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
    searchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
        backgroundColor: '#fff',
        gap: 12,
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontFamily: Fonts.brand,
        fontSize: 15,
        color: '#000',
    },
    filterButton: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: Colors.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 18,
        color: '#000',
        marginBottom: 16,
    },

    // Chips
    chipContainer: {
        gap: 8,
    },
    chip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
    },
    chipText: {
        fontFamily: Fonts.brand,
        fontSize: 14,
        color: '#333',
    },

    // Popular Searches
    popularList: {
        backgroundColor: '#fff',
        borderRadius: 12,
    },
    popularItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 12,
    },
    popularText: {
        fontFamily: Fonts.brand,
        fontSize: 15,
        color: '#000',
    },
    separator: {
        position: 'absolute',
        bottom: 0,
        left: 30,
        right: 0,
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.light,
    },

    // Grid
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    gridCard: {
        width: '48%',
        marginBottom: 8,
    },
    gridImageContainer: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        marginBottom: 8,
    },
    gridImage: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    gridName: {
        fontFamily: Fonts.brandBold,
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },

    // Reused Category styles (if needed)
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
    },
    categoryImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryImage: {
        width: 40,
        height: 40,
    },
    categoryInfo: {
        marginLeft: 12,
    },
    categoryName: {
        fontFamily: Fonts.brandBold,
        fontSize: 16,
        color: '#000',
    },
    categoryPlaces: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        color: Colors.muted,
    },
});
