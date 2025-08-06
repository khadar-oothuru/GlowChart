import React from 'react';
import { StatusBar } from 'react-native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {useAppContext} from '../context/AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {width} = Dimensions.get('window');

const pastelColors = [
  // Muted browns
  '#BFA6A0', '#A89F91', '#C9B7A7',
  // Muted pinks
  '#E7C6C2', '#D8A7B1', '#CDB4C5',
  // Muted grays
  '#D3D3D3', '#B0A8B9', '#B8B8B8',
  // Muted gradients (as fallback solid colors, since gradients need extra work)
  'linear-gradient(135deg, #BFA6A0 0%, #E7C6C2 100%)',
  'linear-gradient(135deg, #C9B7A7 0%, #B8B8B8 100%)',
  'linear-gradient(135deg, #D8A7B1 0%, #B0A8B9 100%)',
];

function getPastelColor(title: string) {
  // Pick a color based on product title hash
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + (hash * 32 - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
}

const ProductDetailScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {product} = route.params as {product: any};
  const {dispatch} = useAppContext();

  const handleAddToBag = () => {
    dispatch({type: 'ADD_TO_CART', payload: product});
    Alert.alert('Success', 'Product added to bag!');
  };

  // Get pastel background color for the product
  let bgColor = getPastelColor(product.title);
  // If the color is a gradient string, use a fallback muted color
  if (bgColor.startsWith('linear-gradient')) {
    bgColor = '#CDB4C5'; // fallback muted pink
  }

  const mockReviews = [
    {
      id: 1,
      name: 'Eleanor Collins',
      email: 'eleanor.collins@gmail.com',
      rating: 3,
      comment: 'Would not recommend...',
    },
    {
      id: 2,
      name: 'Lucas Gordon',
      email: 'lucas.gordon@gmail.com',
      rating: 3,
      comment: 'Very satisfied!',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDEAE7" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageSectionWrapper}>
          <View style={[styles.imageContainer, { backgroundColor: bgColor }]}> 
            {/* Back icon button */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Icon name="arrow-left" size={32} color="#111" />
            </TouchableOpacity>
            <Image source={{uri: product.thumbnail}} style={styles.productImage} />
            <TouchableOpacity style={styles.wishlistButton} activeOpacity={0.7}>
              <Icon name="shopping-outline" size={32}  />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewSimilarContainer}>
          <TouchableOpacity style={styles.viewSimilarButton}>
            <Text style={styles.viewSimilarText}>View Similar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-variant-outline" size={28} color="#111" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>
            {product.description || 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Acheive dramatic lashes with this long lasting and cruelty free formula'}
          </Text>

          <View style={styles.ratingRow}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text 
                  key={star} 
                  style={[
                    styles.star, 
                    star <= Math.round(product.rating) ? styles.filledStar : styles.emptyStar
                  ]}
                >
                  ★
                </Text>
              ))}
            </View>
            <Text style={styles.ratingValue}>{product.rating.toFixed(2)}/5</Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.brandText}>Sold by : <Text style={styles.brandBold}>{product.brand || 'Essence'}</Text></Text>

          <View style={styles.priceRow}>
            <View style={{flex: 1}}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <Text style={styles.originalPrice}>${(product.price * 1.05).toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.addToBagPill} onPress={handleAddToBag}>
              <Text style={styles.addToBagPillText}>Add to Bag</Text>
            </TouchableOpacity>
          </View>

          <View style={{height: 18}} />

          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>Highlights</Text>
            <View style={styles.highlightRow}>
              <View style={styles.highlightItemCol}>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Width</Text>
                  <Text style={styles.highlightValue}>15.14</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Warranty</Text>
                  <Text style={styles.highlightValue}>1 week</Text>
                </View>
              </View>
              <View style={styles.verticalDivider} />
              <View style={styles.highlightItemCol}>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Height</Text>
                  <Text style={styles.highlightValue}>13.08</Text>
                </View>
                <View style={styles.highlightItem}>
                  <Text style={styles.highlightLabel}>Shipping</Text>
                  <Text style={styles.highlightValue}>In 3-5 business days</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Ratings & Reviews</Text>
            {mockReviews.map((review, idx) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewCardHeader}>
                  <View style={styles.reviewCardUserInfo}>
                    <View style={styles.avatarContainer}>
                      <Image
                        source={{
                          uri: idx === 0
                            ? 'https://randomuser.me/api/portraits/women/44.jpg'
                            : 'https://randomuser.me/api/portraits/men/32.jpg',
                        }}
                        style={styles.avatarImage}
                      />
                    </View>
                    <View>
                      <Text style={styles.reviewCardName}>{review.name}</Text>
                      <Text style={styles.reviewCardEmail}>{review.email}</Text>
                    </View>
                  </View>
                  <View style={styles.reviewCardStars}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Text
                        key={star}
                        style={[
                          styles.reviewCardStar,
                          star <= review.rating ? styles.filledStar : styles.emptyStar
                        ]}
                      >
                        ★
                      </Text>
                    ))}
                  </View>
                </View>
                <Text style={styles.reviewCardComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageSectionWrapper: {
    paddingTop: 38,
    paddingHorizontal: 18,
    paddingBottom: 0,
    backgroundColor: '#FFEDE8',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  backButton: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FFEDE8',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  imageContainer: {
    width: width - 36,
    height: (width - 36) * 1.15, // Increased height
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 16, // Reduced border radius
    overflow: 'hidden',
  },
  productImage: {
    width: (width - 36) * 0.85,
    height: (width - 36), // Increased image height
    resizeMode: 'contain',
    borderRadius: 8, // Reduced border radius
  },
  wishlistButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFEDE8',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  viewSimilarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  viewSimilarButton: {
    backgroundColor: '#FFEDE8',
    borderWidth: 1,
    borderColor: '#B84953',
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  viewSimilarText: {
    fontSize: 16,
    color: '#B84953',
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  shareButton: {
    padding: 8,
  },
  contentContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    marginBottom: 8,
    fontFamily: 'Italiana-Regular',
    letterSpacing: 0.2,
  },
  productDescription: {
    fontSize: 18,
    color: '#444',
    marginBottom: 14,
    lineHeight: 24,
    fontFamily: 'Ubuntu-Regular',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
    marginTop: 2,
  },
  star: {
    fontSize: 28,
    marginRight: 1,
    marginTop: 0,
  },
  filledStar: {
    color: '#111',
  },
  emptyStar: {
    color: '#222',
    opacity: 0.3,
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: '500',
    color: '#222',
    marginLeft: 8,
    marginTop: 2,
  },
  brandText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '400',
  },
  brandBold: {
    fontWeight: '700',
    color: '#222',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    marginTop: 8,
  },
  price: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  originalPrice: {
    fontSize: 22,
    color: '#888',
    textDecorationLine: 'line-through',
    marginBottom: 2,
    marginTop: 2,
    fontWeight: '400',
  },
  addToBagPill: {
    backgroundColor: '#B84953',
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    minWidth: 200,
    elevation: 0,
    shadowColor: 'transparent',
  },
  addToBagPillText: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '600',
    letterSpacing: 0.2,
    fontFamily: 'Ubuntu-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: '#111',
    marginVertical: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    marginBottom: 16,
    fontFamily: 'Ubuntu-Regular',
  },
  highlightsSection: {
    marginBottom: 32,
  },
  highlightRow: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'stretch',
  },
  highlightItemCol: {
    flex: 1,
    justifyContent: 'space-between',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#999',
    marginHorizontal: 12,
    height: '100%',
    alignSelf: 'stretch',
  },
  highlightItem: {
    marginBottom: 24,
  },
  price: {
    fontSize: 30,
    fontWeight: '700',
    color: '#111',
    marginBottom: 2,
    marginTop: 2,
    letterSpacing: 0.2,
  },
  highlightLabel: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
  },
  highlightValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#111', // Changed to black
    marginBottom: 18,
    padding: 18,
    // Removed shadow for flat look
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
    resizeMode: 'cover',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewCardUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
  },
  reviewCardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
    marginBottom: 1,
    fontFamily: 'Ubuntu-Regular',
  },
  reviewCardEmail: {
    fontSize: 13,
    color: '#888',
    fontFamily: 'Italiana-Regular',
  },
  reviewCardStars: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  reviewCardStar: {
    fontSize: 22,
    marginLeft: 2,
    fontFamily: 'Italiana-Regular',
  },
  reviewCardComment: {
    fontSize: 18,
    color: '#222',
    marginTop: 8,
    lineHeight: 26,
    fontWeight: '400',
    fontFamily: 'Italiana-Regular',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  addToBagButton: {
    width: '100%',
    backgroundColor: '#B8524C',
  },
});

export default ProductDetailScreen;
