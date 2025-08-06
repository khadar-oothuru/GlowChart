import React, {createContext, useContext, useReducer, ReactNode} from 'react';

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

export interface User {
  name: string;
  email: string;
}

interface AppState {
  isLoggedIn: boolean;
  user: User | null;
  products: Product[];
  cart: Product[];
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
  | {type: 'REMOVE_FROM_CART'; payload: number};

const initialState: AppState = {
  isLoggedIn: false,
  user: null,
  products: [],
  cart: [],
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
      return {...state, isLoggedIn: false, user: null};
    case 'ADD_TO_CART':
      return {...state, cart: [...state.cart, action.payload]};
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
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
