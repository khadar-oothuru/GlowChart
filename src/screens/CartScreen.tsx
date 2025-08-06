import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useAppContext, Product} from '../context/AppContext';

const pastelColors = [
  // Muted browns
  '#BFA6A0', '#A89F91', '#C9B7A7',
  // Muted pinks
  '#E7C6C2', '#D8A7B1', '#CDB4C5',
  // Muted grays
  '#D3D3D3', '#B0A8B9', '#B8B8B8',
];

function getPastelColor(title: string) {
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + (hash * 32 - hash);
  }
  return pastelColors[Math.abs(hash) % pastelColors.length];
}

interface CartItemProps {
  product: Product;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, quantity: number) => void;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({
  product,
  onRemove,
  onQuantityChange,
  quantity,
}) => {
  const bgColor = getPastelColor(product.title);

  const handleIncrease = () => {
    onQuantityChange(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Remove', style: 'destructive', onPress: () => onRemove(product.id)},
      ]
    );
  };

  return (
    <View style={styles.cartItem}>
      <View style={[styles.itemImageContainer, {backgroundColor: bgColor}]}>
        <Image source={{uri: product.thumbnail}} style={styles.itemImage} />
      </View>
      
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.itemBrand}>{product.brand}</Text>
        <Text style={styles.itemPrice}>${product.price}</Text>
        
        <View style={styles.itemActions}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrease}
              disabled={quantity <= 1}>
              <Icon name="minus" size={26} color={quantity <= 1 ? '#ccc' : '#333'} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Icon name="plus" size={26} color="#333" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
            <Icon name="trash-can-outline" size={20} color="#B84953" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const CartScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const {state, dispatch} = useAppContext();

  // Group cart items by product ID and count quantities
  const cartItemsWithQuantity = React.useMemo(() => {
    const itemMap = new Map<number, {product: Product; quantity: number}>();
    
    state.cart.forEach(product => {
      if (itemMap.has(product.id)) {
        itemMap.get(product.id)!.quantity += 1;
      } else {
        itemMap.set(product.id, {product, quantity: 1});
      }
    });
    
    return Array.from(itemMap.values());
  }, [state.cart]);

  const handleRemoveFromCart = (productId: number) => {
    // Remove all instances of this product from cart
    const currentItem = cartItemsWithQuantity.find(item => item.product.id === productId);
    if (currentItem) {
      for (let i = 0; i < currentItem.quantity; i++) {
        dispatch({type: 'REMOVE_FROM_CART', payload: productId});
      }
    }
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      handleRemoveFromCart(productId);
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: {productId, quantity: newQuantity}
      });
    }
  };

  const calculateTotal = () => {
    return cartItemsWithQuantity.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total: $${calculateTotal().toFixed(2)}\n\nProceed to checkout?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Checkout', onPress: () => {
          // Here you would navigate to checkout screen
          Alert.alert('Success', 'Checkout functionality coming soon!');
        }},
      ]
    );
  };

  const renderCartItem = ({item}: {item: {product: Product; quantity: number}}) => (
    <CartItem
      product={item.product}
      quantity={item.quantity}
      onRemove={handleRemoveFromCart}
      onQuantityChange={handleQuantityChange}
    />
  );

  if (cartItemsWithQuantity.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FDEAE7" />
        {/* Header Row with Back Arrow and My Cart */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Icon name="arrow-left" size={32} color="#111" />
          </TouchableOpacity>
          <Text style={styles.headerCartText}>My Cart</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Icon name="shopping-outline" size={80} color="#ccc" />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some products to get started</Text>
          <TouchableOpacity
            style={styles.continueShoppingButton}
            onPress={() => navigation.navigate('MainTabs')}>
            <Text style={styles.continueShoppingText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FDEAE7" />
      {/* Header Row with Back Arrow and My Cart */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Icon name="arrow-left" size={32} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerCartText}>My Cart</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.itemCount}>
            {cartItemsWithQuantity.length} {cartItemsWithQuantity.length === 1 ? 'item' : 'items'}
          </Text>
        </View>

        <FlatList
          data={cartItemsWithQuantity}
          renderItem={renderCartItem}
          keyExtractor={item => item.product.id.toString()}
          contentContainerStyle={styles.cartList}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.checkoutContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalAmount}>${calculateTotal().toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Icon name="arrow-right" size={20} color="#FFF" style={styles.checkoutIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44, // Increased top padding for more space
    paddingBottom: 16, // Slightly more bottom padding
    backgroundColor: '#FFEDE8',
    zIndex: 20,
    paddingHorizontal: 16,
    gap: 12,
    position: 'relative',
  },
  headerCartText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    fontFamily: 'Ubuntu-Regular',
    marginLeft: 0,
    letterSpacing: 0.2,
    flex: 1,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFEDE8',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 44,
    backgroundColor: '#FFEDE8',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderWidth: 1,
    borderColor: '#111',
    marginRight: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40, // Reduced top padding for tighter layout
  },
  headerSection: {
    paddingVertical: 20,
    paddingHorizontal: 4,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#111',
    fontFamily: 'Ubuntu-Regular',
    marginBottom: 4,
    letterSpacing: 0.2,
  },
  itemCount: {
    fontSize: 18,
    color: '#444',
    fontWeight: '400',
    fontFamily: 'Italiana-Regular',
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#111',
    padding: 18,
    marginBottom: 18,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
    lineHeight: 22,
    fontFamily: 'Italiana-Regular',
  },
  itemBrand: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
    fontFamily: 'Ubuntu-Regular',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#B84953',
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B84953',
  },
  quantityText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 28,
    textAlign: 'center',
    fontFamily: 'Italiana-Regular',
  },
  removeButton: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#B84953',
  },
  checkoutContainer: {
    backgroundColor: 'transparent',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 0,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    marginHorizontal: 0,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginBottom: 44,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  totalLabel: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Ubuntu-Regular',
    marginRight: 16,
  },
  totalAmount: {
    fontSize: 28,
    fontWeight: '700',
    color: '#B84953',
    letterSpacing: 0.2,
    fontFamily: 'Ubuntu-Regular',
  },
  checkoutButton: {
    backgroundColor: '#B84953',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
    shadowColor: 'transparent',
  },
  checkoutButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '600',
    marginRight: 8,
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: 0.2,
  },
  checkoutIcon: {
    marginLeft: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginTop: 20,
    marginBottom: 8,
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: 0.2,
  },
  emptySubtitle: {
    fontSize: 18,
    color: '#444',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
    fontFamily: 'Ubuntu-Regular',
  },
  continueShoppingButton: {
    backgroundColor: '#B84953',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 0,
    shadowColor: 'transparent',
  },
  continueShoppingText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Ubuntu-Regular',
    letterSpacing: 0.2,
  },
});

export default CartScreen;
