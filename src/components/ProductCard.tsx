
import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Product, useAppContext } from '../context/AppContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}


const CARD_WIDTH = 179;
const CARD_HEIGHT = 237;

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
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { state, dispatch } = useAppContext();
  
  // Check if product is in wishlist
  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  
  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  let bgColor = getPastelColor(product.title);
  // If the color is a gradient string, use a fallback muted color (since RN View doesn't support gradients directly)
  if (bgColor.startsWith('linear-gradient')) {
    bgColor = '#CDB4C5'; // fallback muted pink
  }
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={[styles.imageContainer, { backgroundColor: bgColor }]}> 
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {product.title}
        </Text>
        <View style={styles.priceHeartRow}>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.heartSpacer} />
          <TouchableOpacity onPress={handleWishlistToggle}>
            <Icon 
              name={isInWishlist ? "heart" : "heart-outline"} 
              size={22} 
              color={isInWishlist ? "#B84953" : "#888"} 
              style={styles.heartIcon} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    opacity: 1,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    // Removed absolute positioning so cards flow in grid/list
  },
  imageContainer: {
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDE2E4',
    margin: 12,
  },
  image: {
    width: 127,
    height: 128,
    resizeMode: 'contain',
    borderRadius: 8,
    backgroundColor: 'transparent',
    opacity: 1,
  },
  contentContainer: {
    padding: 14,
    backgroundColor: 'transparent',
  },
  title: {
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#222',
    marginBottom: 6,
    lineHeight: 21,
    letterSpacing: -0.32,
    textAlign: 'center',
  },
  price: {
    fontFamily: 'Ubuntu-Regular',
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 16,
    color: '#333',
    lineHeight: 21,
    letterSpacing: -0.32,
    textAlign: 'center',
    marginBottom: 0,
    marginRight: 8,
  },
  priceHeartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
    marginTop: 0,
    width: '100%',
    paddingHorizontal: 2,
  },
  heartSpacer: {
    flex: 1,
  },
  heartIcon: {
    marginTop: -8,
    marginRight: 2,
  },
});

export default ProductCard;
