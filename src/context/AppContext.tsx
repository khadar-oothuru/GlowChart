import React, {createContext, useContext, useReducer, ReactNode, useEffect, useState, useMemo} from 'react';
import { STORAGE_KEYS, getStorageItem, setStorageItem, clearAllAppData } from '../utils/storage';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  name: string;
  email: string;
}

interface AppState {
  isLoggedIn: boolean;
  user: User | null;
  products: Product[];
  cart: Product[];
  wishlist: Product[];
  loading: boolean;
  error: string | null;
}

type AppAction =
  | {type: 'SET_LOADING'; payload: boolean}
  | {type: 'SET_ERROR'; payload: string | null}
  | {type: 'SET_PRODUCTS'; payload: Product[]}
  | {type: 'LOGIN'; payload: User}
  | {type: 'LOGOUT'}
  | {type: 'ADD_TO_CART'; payload: Product}
  | {type: 'REMOVE_FROM_CART'; payload: number}
  | {type: 'UPDATE_CART_QUANTITY'; payload: {productId: number; quantity: number}}
  | {type: 'CLEAR_CART'}
  | {type: 'SET_CART'; payload: Product[]}
  | {type: 'ADD_TO_WISHLIST'; payload: Product}
  | {type: 'REMOVE_FROM_WISHLIST'; payload: number}
  | {type: 'SET_WISHLIST'; payload: Product[]};

const initialState: AppState = {
  isLoggedIn: false,
  user: null,
  products: [],
  cart: [],
  wishlist: [],
  loading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {...state, loading: action.payload};
    case 'SET_ERROR':
      return {...state, error: action.payload, loading: false};
    case 'SET_PRODUCTS':
      return {...state, products: action.payload, loading: false};
    case 'LOGIN':
      return {...state, isLoggedIn: true, user: action.payload};
    case 'LOGOUT':
      return {...state, isLoggedIn: false, user: null, cart: [], wishlist: []};
    case 'ADD_TO_CART':
      return {...state, cart: [...state.cart, action.payload]};
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_CART_QUANTITY': {
      // Remove all instances of the product first
      const filteredCart = state.cart.filter(item => item.id !== action.payload.productId);
      // Find the product to add back
      const productToUpdate = state.cart.find(item => item.id === action.payload.productId);
      if (productToUpdate && action.payload.quantity > 0) {
        // Add the product back with the new quantity
        const newItems = Array(action.payload.quantity).fill(productToUpdate);
        return {...state, cart: [...filteredCart, ...newItems]};
      }
      return {...state, cart: filteredCart};
    }
    case 'CLEAR_CART':
      return {...state, cart: []};
    case 'SET_CART':
      return {...state, cart: action.payload};
    case 'ADD_TO_WISHLIST':
      return {...state, wishlist: [...state.wishlist, action.payload]};
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
    case 'SET_WISHLIST':
      return {...state, wishlist: action.payload};
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  clearAllData: () => Promise<void>;
} | null>(null);


export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [appLoading, setAppLoading] = useState(true);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    const loadAppData = async () => {
      try {
        // Load user data
        const user = await getStorageItem<User>(STORAGE_KEYS.USER);
        if (user) {
          dispatch({type: 'LOGIN', payload: user});
        }

        // Load cart data
        const cart = await getStorageItem<Product[]>(STORAGE_KEYS.CART);
        if (cart) {
          dispatch({type: 'SET_CART', payload: cart});
        }

        // Load wishlist data
        const wishlist = await getStorageItem<Product[]>(STORAGE_KEYS.WISHLIST);
        if (wishlist) {
          dispatch({type: 'SET_WISHLIST', payload: wishlist});
        }
      } catch (e) {
        console.error('Error loading app data:', e);
      } finally {
        setAppLoading(false);
      }
    };
    loadAppData();
  }, []);

  // Save cart to AsyncStorage whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      try {
        await setStorageItem(STORAGE_KEYS.CART, state.cart);
      } catch (e) {
        console.error('Error saving cart:', e);
      }
    };
    
    if (!appLoading) {
      saveCart();
    }
  }, [state.cart, appLoading]);

  // Save wishlist to AsyncStorage whenever it changes
  useEffect(() => {
    const saveWishlist = async () => {
      try {
        await setStorageItem(STORAGE_KEYS.WISHLIST, state.wishlist);
      } catch (e) {
        console.error('Error saving wishlist:', e);
      }
    };
    
    if (!appLoading) {
      saveWishlist();
    }
  }, [state.wishlist, appLoading]);

  // Save user data to AsyncStorage whenever login state changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (state.isLoggedIn && state.user) {
          await setStorageItem(STORAGE_KEYS.USER, state.user);
        } else {
          // Clear all data when user logs out
          await clearAllAppData();
        }
      } catch (e) {
        console.error('Error saving user data:', e);
      }
    };
    
    if (!appLoading) {
      saveUser();
    }
  }, [state.isLoggedIn, state.user, appLoading]);

  // Helper function to clear all app data
  const clearAllData = async (): Promise<void> => {
    try {
      await clearAllAppData();
      dispatch({type: 'LOGOUT'});
    } catch (error) {
      console.error('Error clearing all data:', error);
      throw error;
    }
  };

  const contextValue = useMemo(() => ({
    state,
    dispatch,
    clearAllData
  }), [state, dispatch]);

  if (appLoading) {
    // You can customize this loading UI
    return null;
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
