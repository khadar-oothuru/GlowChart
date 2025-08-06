import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width: screenWidth} = Dimensions.get('window');

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  discount: string;
  backgroundColor: string;
  image?: string;
}

interface OfferCategory {
  id: string;
  title: string;
  icon: string;
  discount: string;
  backgroundColor: string;
}

interface DealOfDay {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  image: string;
  timeLeft: string;
}

const OffersScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<any>();

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  // Sample banners data
  const banners: Banner[] = [
    {
      id: '1',
      title: 'Summer Sale',
      subtitle: 'Up to 70% Off on Fashion',
      discount: '70% OFF',
      backgroundColor: '#FFB6C1',
    },
    {
      id: '2',
      title: 'Electronics Deal',
      subtitle: 'Best Prices on Tech',
      discount: '50% OFF',
      backgroundColor: '#DDA0DD',
    },
    {
      id: '3',
      title: 'Beauty Bonanza',
      subtitle: 'Glow Up with Amazing Deals',
      discount: '60% OFF',
      backgroundColor: '#F0E68C',
    },
  ];

  // Sample offer categories
  const offerCategories: OfferCategory[] = [
    {
      id: '1',
      title: 'Flash Sale',
      icon: 'flash',
      discount: 'Up to 80%',
      backgroundColor: '#FFE4E1',
    },
    {
      id: '2',
      title: 'Buy 1 Get 1',
      icon: 'gift',
      discount: 'BOGO',
      backgroundColor: '#E0FFFF',
    },
    {
      id: '3',
      title: 'Clearance',
      icon: 'tag',
      discount: 'Up to 90%',
      backgroundColor: '#F0FFF0',
    },
    {
      id: '4',
      title: 'New Arrivals',
      icon: 'star',
      discount: '30% OFF',
      backgroundColor: '#FFF8DC',
    },
  ];

  // Sample deals of the day
  const dealsOfDay: DealOfDay[] = [
    {
      id: '1',
      title: 'Wireless Headphones',
      originalPrice: 199.99,
      discountedPrice: 99.99,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
      timeLeft: '2h 30m',
    },
    {
      id: '2',
      title: 'Smart Watch',
      originalPrice: 299.99,
      discountedPrice: 179.99,
      discount: '40% OFF',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
      timeLeft: '4h 15m',
    },
    {
      id: '3',
      title: 'Laptop Bag',
      originalPrice: 79.99,
      discountedPrice: 39.99,
      discount: '50% OFF',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
      timeLeft: '6h 45m',
    },
  ];

  const renderBanner = ({item}: {item: Banner}) => (
    <TouchableOpacity style={[styles.bannerCard, {backgroundColor: item.backgroundColor}]}>
      <View style={styles.bannerContent}>
        <View style={styles.bannerTextContainer}>
          <Text style={styles.bannerDiscount}>{item.discount}</Text>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
          <TouchableOpacity style={styles.shopNowButton}>
            <Text style={styles.shopNowText}>Shop Now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bannerImageContainer}>
          <Icon name="shopping" size={60} color="#FFF" style={styles.bannerIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOfferCategory = ({item}: {item: OfferCategory}) => (
    <TouchableOpacity style={[styles.categoryCard, {backgroundColor: item.backgroundColor}]}>
      <Icon name={item.icon} size={32} color="#B84953" />
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <Text style={styles.categoryDiscount}>{item.discount}</Text>
    </TouchableOpacity>
  );

  const renderDealOfDay = ({item}: {item: DealOfDay}) => (
    <TouchableOpacity style={styles.dealCard}>
      <View style={styles.dealImageContainer}>
        <Image source={{uri: item.image}} style={styles.dealImage} />
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>{item.discount}</Text>
        </View>
      </View>
      <View style={styles.dealContent}>
        <Text style={styles.dealTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${item.originalPrice}</Text>
          <Text style={styles.discountedPrice}>${item.discountedPrice}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Icon name="clock-outline" size={14} color="#B84953" />
          <Text style={styles.timeLeft}>{item.timeLeft} left</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        onCartPress={handleCartPress}
      />
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Main Banners */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
          <FlatList
            data={banners}
            renderItem={renderBanner}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannerList}
          />
        </View>

        {/* Offer Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FlatList
            data={offerCategories}
            renderItem={renderOfferCategory}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.categoryRow}
            contentContainerStyle={styles.categoryGrid}
          />
        </View>

        {/* Deals of the Day */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Deals of the Day</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={dealsOfDay}
            renderItem={renderDealOfDay}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dealsList}
          />
        </View>

        {/* Limited Time Offers */}
        <View style={styles.section}>
          <View style={styles.limitedOfferCard}>
            <View style={styles.limitedOfferHeader}>
              <Icon name="flash" size={24} color="#FF6B35" />
              <Text style={styles.limitedOfferTitle}>Limited Time Offer!</Text>
            </View>
            <Text style={styles.limitedOfferSubtitle}>
              Get 25% off on your first order with code WELCOME25
            </Text>
            <TouchableOpacity style={styles.claimButton}>
              <Text style={styles.claimButtonText}>Claim Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Free Shipping Banner */}
        <View style={styles.section}>
          <View style={styles.freeShippingCard}>
            <Icon name="truck-delivery" size={32} color="#4CAF50" />
            <View style={styles.freeShippingText}>
              <Text style={styles.freeShippingTitle}>Free Shipping</Text>
              <Text style={styles.freeShippingSubtitle}>On orders above $50</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#B84953',
    fontWeight: '600',
  },
  // Banner Styles
  bannerList: {
    paddingRight: 16,
  },
  bannerCard: {
    width: screenWidth - 40,
    height: 160,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  bannerTextContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  bannerDiscount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 4,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  shopNowButton: {
    backgroundColor: '#B84953',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 12,
  },
  bannerImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerIcon: {
    opacity: 0.3,
  },
  // Category Styles
  categoryGrid: {
    gap: 12,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  categoryCard: {
    width: (screenWidth - 44) / 2,
    height: 100,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  categoryDiscount: {
    fontSize: 12,
    color: '#B84953',
    fontWeight: '600',
    marginTop: 2,
  },
  // Deals Styles
  dealsList: {
    paddingRight: 16,
  },
  dealCard: {
    width: 160,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dealImageContainer: {
    position: 'relative',
  },
  dealImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  discountBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  dealContent: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  discountedPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#B84953',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLeft: {
    fontSize: 11,
    color: '#B84953',
    marginLeft: 4,
    fontWeight: '500',
  },
  // Limited Offer Styles
  limitedOfferCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  limitedOfferHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  limitedOfferTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  limitedOfferSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  claimButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  // Free Shipping Styles
  freeShippingCard: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  freeShippingText: {
    marginLeft: 16,
    flex: 1,
  },
  freeShippingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  freeShippingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});

export default OffersScreen;
