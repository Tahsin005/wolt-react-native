import { Colors, Fonts } from '@/constants/theme';
import useUserStore from '@/hooks/use-userstore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = () => {
    const insets = useSafeAreaInsets();
    const { setIsGuest, user } = useUserStore();

    const onLogout = () => {
        console.log('logout');
        setIsGuest(false);
    };

    const MenuItem = ({ icon, title, subtitle, showChevron = true, onPress }: any) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
            <View style={styles.menuItemLeft}>
                <View style={[styles.menuIconContainer, { backgroundColor: Colors.primaryLight }]}>
                    <Ionicons name={icon} size={20} color={Colors.secondary} />
                </View>
                <View style={styles.menuTextContainer}>
                    <Text style={styles.menuItemTitle}>{title}</Text>
                    {subtitle && <Text style={styles.menuItemSubtitle}>{subtitle}</Text>}
                </View>
            </View>
            {showChevron && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
        </TouchableOpacity>
    );

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={[styles.content, { paddingBottom: 40 }]}
            showsVerticalScrollIndicator={false}
        >
            {/* Page Title */}
            <View style={[styles.titleContainer, { paddingTop: insets.top + 16 }]}>
                <Text style={styles.pageTitle}>Profile</Text>
                <Text style={styles.pageSubtitle}>
                    {user?.name || 'Welcome back!'}
                </Text>
            </View>

            {/* User Hero Card */}
            <View style={styles.heroCard}>
                <View style={styles.heroContent}>
                    <View style={styles.avatarContainer}>
                        <Text style={styles.avatarText}>
                            {user?.name?.charAt(0) || 'U'}
                        </Text>
                    </View>
                    <View style={styles.heroInfo}>
                        <Text style={styles.userName}>{user?.name || 'Wolt User'}</Text>
                        <Text style={styles.userEmail}>{user?.email || 'No email set'}</Text>
                    </View>
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.editButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Account Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <View style={styles.card}>
                    <MenuItem
                        icon="receipt-outline"
                        title="Order history"
                        subtitle="No orders yet"
                    />
                    <View style={styles.separator} />
                    <MenuItem
                        icon="card-outline"
                        title="Gift cards"
                    />
                    <View style={styles.separator} />
                    <MenuItem
                        icon="gift-outline"
                        title="Buy gift card"
                    />
                </View>
            </View>

            {/* Your Favorites */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Your favorites</Text>
                <View style={styles.favoritesCard}>
                    <View style={styles.favoritesContent}>
                        <Text style={styles.favoritesText}>
                            Tap the heart icon on any restaurant or store to see it here!
                        </Text>
                        <View style={styles.favBadge}>
                            <Ionicons name="heart" size={16} color="#FF3B30" />
                            <Text style={styles.favBadgeText}>Collect them all</Text>
                        </View>
                    </View>
                    <View style={styles.favoritesIllustration}>
                        <View style={styles.storeIcon}>
                            <View style={styles.awning} />
                            <View style={styles.storeFront} />
                        </View>
                        <View style={styles.heartIcon}>
                            <Ionicons name="heart" size={18} color="#FF3B30" />
                        </View>
                    </View>
                </View>
            </View>

            {/* Help & Support */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick links</Text>
                <View style={styles.card}>
                    <MenuItem icon="people-outline" title="Invite friends" />
                    <View style={styles.separator} />
                    <MenuItem icon="barcode-outline" title="Redeem code" />
                    <View style={styles.separator} />
                    <MenuItem icon="help-buoy-outline" title="Contact Support" />
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
                <Ionicons name="log-out-outline" size={20} color="#ff4646" style={{ marginRight: 8 }} />
                <Text style={styles.logoutButtonText}>Sign out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    titleContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
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
    content: {
        paddingTop: 8,
    },

    // Hero Card
    heroCard: {
        marginHorizontal: 16,
        marginBottom: 24,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
        boxShadow: '0px 4px 6px rgba(0,0,0,0.05)',
        elevation: 2,
    },
    heroContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarText: {
        fontSize: 24,
        fontFamily: Fonts.brandBold,
        color: '#fff',
    },
    heroInfo: {
        flex: 1,
        marginLeft: 16,
    },
    userName: {
        fontFamily: Fonts.brandBold,
        fontSize: 18,
        color: '#000',
    },
    userEmail: {
        fontFamily: Fonts.brand,
        fontSize: 13,
        color: Colors.muted,
        marginTop: 2,
    },
    editButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: Colors.primaryLight,
    },
    editButtonText: {
        fontFamily: Fonts.brandBold,
        fontSize: 13,
        color: Colors.secondary,
    },

    // Sections
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 18,
        color: '#000',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    card: {
        marginHorizontal: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
        overflow: 'hidden',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.light,
        marginLeft: 60,
    },

    // Menu Item
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    menuIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuTextContainer: {
        marginLeft: 12,
    },
    menuItemTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 15,
        color: '#333',
    },
    menuItemSubtitle: {
        fontFamily: Fonts.brand,
        fontSize: 12,
        color: Colors.muted,
        marginTop: 2,
    },

    // Favorites Card
    favoritesCard: {
        flexDirection: 'row',
        marginHorizontal: 16,
        padding: 20,
        backgroundColor: Colors.primaryLight,
        borderRadius: 20,
        alignItems: 'center',
        gap: 16,
    },
    favoritesContent: {
        flex: 1,
    },
    favoritesText: {
        fontFamily: Fonts.brand,
        fontSize: 14,
        color: '#444',
        lineHeight: 20,
        marginBottom: 12,
    },
    favBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        gap: 6,
    },
    favBadgeText: {
        fontFamily: Fonts.brandBold,
        fontSize: 12,
        color: '#444',
    },
    favoritesIllustration: {
        width: 80,
        height: 80,
    },
    storeIcon: {
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    awning: {
        width: 50,
        height: 15,
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        position: 'absolute',
        top: 15,
    },
    storeFront: {
        width: 50,
        height: 30,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 30,
    },
    heartIcon: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
        elevation: 2,
    },

    // Logout
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 16,
        marginHorizontal: 16,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#fbe9e9',
        boxShadow: '0px 2px 4px rgba(255, 70, 70, 0.05)',
        elevation: 1,
    },
    logoutButtonText: {
        fontFamily: Fonts.brandBold,
        fontSize: 16,
        color: '#ff4646',
    },
});

export default Profile;
