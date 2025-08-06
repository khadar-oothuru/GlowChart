import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Screens
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WishlistScreen from '../screens/WishlistScreen';
import CartScreen from '../screens/CartScreen';
import OffersScreen from '../screens/OffersScreen';

// Context
import {useAppContext} from '../context/AppContext';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app screens
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF',
          borderTopWidth: 1,
          borderTopColor: '#000',
          height: 95,
          paddingBottom: 25,
          paddingTop: 18,
        },
        tabBarActiveTintColor: '#B84953',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <MaterialIcon
              name={focused ? 'home' : 'home-outline'}
              size={32}
              color={focused ? '#B84953' : '#888'}
            />
          ),
          tabBarLabelStyle: { marginTop: 4 },
        }}
      />
      <Tab.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <MaterialIcon
              name={focused ? 'tag' : 'tag-outline'}
              size={32}
              color={focused ? '#B84953' : '#888'}
            />
          ),
          tabBarLabelStyle: { marginTop: 4 },
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <MaterialIcon
              name={focused ? 'heart' : 'heart-outline'}
              size={32}
              color={focused ? '#B84953' : '#888'}
            />
          ),
          tabBarLabelStyle: { marginTop: 4 },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <MaterialIcon
              name={focused ? 'account-circle' : 'account-circle-outline'}
              size={32}
              color={focused ? '#B84953' : '#888'}
            />
          ),
          tabBarLabelStyle: { marginTop: 4 },
        }}
      />
    </Tab.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const {state} = useAppContext();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={state.isLoggedIn ? 'MainTabs' : 'Onboarding'}>
        {!state.isLoggedIn ? (
          // Auth screens
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // App screens
          <>
            <Stack.Screen name="MainTabs" component={MainTabNavigator} />
            <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
            <Stack.Screen name="Cart" component={CartScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
