export interface CuratedCollection {
    id: string;
    title: string;
    icon: string; // Ionicons name
    subtitle: string;
    backgroundColor: string;
    textColor: string;
}

export interface TrendingCuisine {
    id: string;
    name: string;
    icon: string; // Ionicons name
    backgroundColor: string;
}

export interface TodaysDeal {
    restaurantId: string;
    discountText: string;
    badgeColor: string;
    badgeTextColor: string;
}

export const curatedCollections: CuratedCollection[] = [
    {
        id: 'col_popular',
        title: 'Popular right now',
        icon: 'flame',
        subtitle: 'Most ordered this week',
        backgroundColor: '#FFF0E6',
        textColor: '#E65100',
    },
    {
        id: 'col_new',
        title: 'New on Wolt',
        icon: 'sparkles',
        subtitle: 'Recently added',
        backgroundColor: '#E8F5E9',
        textColor: '#2E7D32',
    },
    {
        id: 'col_quick',
        title: 'Quick delivery',
        icon: 'flash',
        subtitle: 'Under 25 min',
        backgroundColor: '#FFF9C4',
        textColor: '#F57F17',
    },
    {
        id: 'col_budget',
        title: 'Budget-friendly',
        icon: 'wallet',
        subtitle: 'Great value meals',
        backgroundColor: '#E3F2FD',
        textColor: '#1565C0',
    },
    {
        id: 'col_healthy',
        title: 'Healthy picks',
        icon: 'nutrition',
        subtitle: 'Feel-good food',
        backgroundColor: '#F1F8E9',
        textColor: '#558B2F',
    },
];

export const trendingCuisines: TrendingCuisine[] = [
    { id: 'tc_italian', name: 'Italian', icon: 'pizza-outline', backgroundColor: '#FFECB3' },
    { id: 'tc_japanese', name: 'Japanese', icon: 'fish-outline', backgroundColor: '#FFE0E0' },
    { id: 'tc_thai', name: 'Thai', icon: 'flame-outline', backgroundColor: '#C8E6C9' },
    { id: 'tc_burgers', name: 'Burgers', icon: 'fast-food-outline', backgroundColor: '#FFE0B2' },
    { id: 'tc_indian', name: 'Indian', icon: 'restaurant-outline', backgroundColor: '#F3E5F5' },
    { id: 'tc_mexican', name: 'Mexican', icon: 'leaf-outline', backgroundColor: '#DCEDC8' },
    { id: 'tc_healthy', name: 'Healthy', icon: 'nutrition-outline', backgroundColor: '#B2EBF2' },
    { id: 'tc_bakery', name: 'Bakery', icon: 'cafe-outline', backgroundColor: '#D7CCC8' },
];

export const todaysDeals: TodaysDeal[] = [
    {
        restaurantId: 'rest_001',
        discountText: '20% off first order',
        badgeColor: '#E8F5E9',
        badgeTextColor: '#2E7D32',
    },
    {
        restaurantId: 'rest_004',
        discountText: 'Free delivery',
        badgeColor: '#E3F2FD',
        badgeTextColor: '#1565C0',
    },
    {
        restaurantId: 'rest_005',
        discountText: '2-for-1 mains',
        badgeColor: '#FFF3E0',
        badgeTextColor: '#E65100',
    },
    {
        restaurantId: 'rest_009',
        discountText: '€5 off over €20',
        badgeColor: '#FCE4EC',
        badgeTextColor: '#C62828',
    },
];
