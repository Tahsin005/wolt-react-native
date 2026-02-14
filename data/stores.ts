export interface StoreCategory {
    id: string;
    name: string;
    icon: string; // Ionicons name
    backgroundColor: string;
}

export interface Store {
    id: string;
    name: string;
    description: string;
    rating: number;
    deliveryTime: string;
    deliveryFee: number;
    image: any;
    category: string;
    tags: string[];
}

export const storeCategories: StoreCategory[] = [
    { id: 'sc_grocery', name: 'Grocery', icon: 'cart-outline', backgroundColor: '#E8F5E9' },
    { id: 'sc_pharmacy', name: 'Pharmacy', icon: 'medical-outline', backgroundColor: '#FFEBEE' },
    { id: 'sc_pets', name: 'Pets', icon: 'paw-outline', backgroundColor: '#FFF3E0' },
    { id: 'sc_electronics', name: 'Electronics', icon: 'laptop-outline', backgroundColor: '#E3F2FD' },
    { id: 'sc_flowers', name: 'Flowers', icon: 'rose-outline', backgroundColor: '#F3E5F5' },
    { id: 'sc_gifts', name: 'Gifts', icon: 'gift-outline', backgroundColor: '#FFFDE7' },
];

export const stores: Store[] = [
    {
        id: 'store_001',
        name: 'Wolt Market Münster',
        description: 'Weekly essentials delivered fast',
        rating: 4.8,
        deliveryTime: '15-25 min',
        deliveryFee: 1.9,
        image: require('@/assets/images/dummy/categories/street_food.png'), // placeholder
        category: 'Grocery',
        tags: ['Reliable', 'Express'],
    },
    {
        id: 'store_002',
        name: 'Apotheke am Dom',
        description: 'Pharmacy essentials & medicine',
        rating: 4.9,
        deliveryTime: '20-30 min',
        deliveryFee: 2.5,
        image: require('@/assets/images/dummy/categories/burger.png'), // placeholder
        category: 'Pharmacy',
        tags: ['Health', 'Quick'],
    },
    {
        id: 'store_003',
        name: 'Pet Shop Lucky',
        description: 'Food & toys for your best friend',
        rating: 4.7,
        deliveryTime: '30-45 min',
        deliveryFee: 3.5,
        image: require('@/assets/images/dummy/categories/american.png'), // placeholder
        category: 'Pets',
        tags: ['Pets', 'Wide Choice'],
    },
    {
        id: 'store_004',
        name: 'Tech Haven',
        description: 'Cables, chargers and gadgets',
        rating: 4.5,
        deliveryTime: '25-40 min',
        deliveryFee: 4.0,
        image: require('@/assets/images/dummy/categories/chicken.png'), // placeholder
        category: 'Electronics',
        tags: ['Gadgets', 'Tech'],
    },
];
