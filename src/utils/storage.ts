import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  USER: 'user',
  CART: 'cart',
  WISHLIST: 'wishlist',
} as const;

export const clearAllAppData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.USER,
      STORAGE_KEYS.CART,
      STORAGE_KEYS.WISHLIST,
    ]);
  } catch (error) {
    console.error('Error clearing app data:', error);
    throw error;
  }
};

export const getStorageItem = async <T>(key: string): Promise<T | null> => {
  try {
    const item = await AsyncStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting storage item ${key}:`, error);
    return null;
  }
};

export const setStorageItem = async <T>(key: string, value: T): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting storage item ${key}:`, error);
    throw error;
  }
};
