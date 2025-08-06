
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext} from '../context/AppContext';




interface HeaderProps {
  showBackButton?: boolean;
  onCartPress?: () => void;
  onNotificationPress?: () => void;
  searchQuery?: string;
  onChangeSearch?: (text: string) => void;
}


const Header: React.FC<HeaderProps> = ({
  showBackButton = false,
  onCartPress,
  onNotificationPress,
  searchQuery,
  onChangeSearch,
}) => {
  const navigation = useNavigation<any>();
  const {state} = useAppContext();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleCartPress = () => {
    if (onCartPress) {
      onCartPress();
    } else {
      navigation.navigate('Cart');
    }
  };

  // Calculate cart items count
  const cartItemsCount = state.cart.length;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.content}>
        <View style={styles.leftSection}>
          {showBackButton ? (
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
              <Icon name="arrow-back" size={24} color="#222" />
            </TouchableOpacity>
          ) : (
            <Text style={styles.brandName}>Viorra</Text>
          )}
        </View>
        <View style={styles.rightSection}>
          <TouchableOpacity style={styles.iconButton} onPress={onNotificationPress}>
            <Icon name="notifications-outline" size={26} color="#222" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleCartPress}>
            <MaterialIcon name="shopping-outline" size={26} color="#222" />
            {cartItemsCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartItemsCount > 99 ? '99+' : cartItemsCount.toString()}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      {/* Search Bar */}
      {typeof searchQuery === 'string' && typeof onChangeSearch === 'function' && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for all products"
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={onChangeSearch}
              underlineColorAndroid="transparent"
              returnKeyType="search"
            />
          </View>
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 56 : 20, // More top space for both platforms
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.04,
    shadowRadius: 4,
    zIndex: 10,
    // Increased height for header area
    paddingBottom: 12,
  },
  content: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // Add right margin to separate brand text from icons
    marginRight: 16,
  },
  brandName: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 32,
    color: '#C94F5C',
    fontWeight: Platform.OS === 'ios' ? '400' : undefined, // Android custom fonts ignore fontWeight
    fontStyle: 'normal',
    letterSpacing: -0.32,
    lineHeight: 36,
    textAlign: 'center',
    includeFontPadding: false, // Android: better vertical alignment
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    // Add left margin to separate icons from brand text
    marginLeft: 16,
  },
  iconButton: {
    marginLeft: 10,
    padding: 6,
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C94F5C',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#C94F5C',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 2,
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    marginTop: 6, // Reduced top margin
    alignItems: 'center', // Center content horizontally
    alignSelf: 'center', // Center the container itself
    width: '92%', // Use percentage for better responsiveness
    height: 38, // Slightly reduced height
    left: 0, // Remove left offset for true centering
    paddingHorizontal: 0,
    borderRadius: 24,
    opacity: 1,
    marginBottom: 12, // Add space below the search bar
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 24,
    borderWidth: 0.6,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    height: 42,
    // Center vertically
    marginTop: 0,
    shadowColor: 'transparent',
  },
  searchIcon: {
    marginRight: 10,
    marginLeft: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
    paddingVertical: 0,
    paddingLeft: 0,
    backgroundColor: 'transparent',
  },
});

export default Header;
