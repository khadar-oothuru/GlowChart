import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Header from '../components/Header';
import Button from '../components/Button';
import {useAppContext} from '../context/AppContext';

const {width} = Dimensions.get('window');

const ProductDetailScreen: React.FC = () => {
  const route = useRoute();
  const {product} = route.params as {product: any};
  const {dispatch} = useAppContext();

  const handleAddToBag = () => {
    dispatch({type: 'ADD_TO_CART', payload: product});
    Alert.alert('Success', 'Product added to bag!');
  };

  const mockReviews = [
    {
      id: 1,
      name: 'Sarah J.',
      rating: 5,
      comment: 'Amazing product! Highly recommend.',
    },
    {
      id: 2,
      name: 'Emma K.',
      rating: 4,
      comment: 'Great quality, fast delivery.',
    },
    {
      id: 3,
      name: 'Lisa M.',
      rating: 5,
      comment: 'Perfect for daily use. Love it!',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Product Details" showBackButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{uri: product.thumbnail}} style={styles.productImage} />
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>★ {product.rating.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.brandText}>{product.brand}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price}</Text>
            {product.discountPercentage && (
              <View style={styles.discountContainer}>
                <Text style={styles.discount}>
                  -{product.discountPercentage.toFixed(0)}% OFF
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>Product Highlights</Text>
            <View style={styles.highlightItem}>
              <Text style={styles.highlightIcon}>📦</Text>
              <Text style={styles.highlightText}>Free shipping on orders over $50</Text>
            </View>
            <View style={styles.highlightItem}>
              <Text style={styles.highlightIcon}>🔒</Text>
              <Text style={styles.highlightText}>1 year warranty included</Text>
            </View>
            <View style={styles.highlightItem}>
              <Text style={styles.highlightIcon}>🚚</Text>
              <Text style={styles.highlightText}>Same day delivery available</Text>
            </View>
          </View>

          <View style={styles.reviewsSection}>
            <Text style={styles.sectionTitle}>Customer Reviews</Text>
            {mockReviews.map(review => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewRating}>
                    {'★'.repeat(review.rating)}
                  </Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Button
          title="Add to Bag"
          onPress={handleAddToBag}
          size="large"
          style={styles.addToBagButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    position: 'relative',
    width: width,
    height: width * 0.8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  contentContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  brandText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF69B4',
    marginRight: 12,
  },
  discountContainer: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discount: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  highlightsSection: {
    marginBottom: 24,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  highlightIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  highlightText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  reviewsSection: {
    marginBottom: 24,
  },
  reviewItem: {
    backgroundColor: '#F8F8F8',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  addToBagButton: {
    width: '100%',
  },
});

export default ProductDetailScreen;
