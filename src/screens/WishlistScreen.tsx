import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import {useAppContext} from '../context/AppContext';

const WishlistScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const navigation = useNavigation<any>();
  const {state} = useAppContext();

  const handleProductPress = (product: any) => {
    navigation.navigate('ProductDetail', {product});
  };

  const handleCartPress = () => {
    navigation.navigate('Cart');
  };

  // Get unique categories from wishlist products
  const categories = ['All', ...Array.from(new Set(state.wishlist.map((p: any) => p.category)))];

  const filteredProducts = state.wishlist.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderProduct = ({item}: {item: any}) => (
    <ProductCard product={item} onPress={() => handleProductPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>My Wishlist</Text>
        <Text style={styles.productCount}>{filteredProducts.length} products</Text>
      </View>
      {state.wishlist.length > 0 && (
        <TouchableOpacity style={styles.filterDropdown} onPress={() => setFilterVisible(true)}>
          <Text style={styles.filterText}>{selectedCategory === 'All' ? 'Apply Filter' : selectedCategory}</Text>
          <Text style={styles.dropdownIcon}>▼</Text>
        </TouchableOpacity>
      )}
      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setFilterVisible(false)}>
          <View style={styles.modalContent}>
            {categories.map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.modalItem,
                  selectedCategory === category && styles.selectedModalItem,
                ]}
                onPress={() => {
                  setSelectedCategory(category);
                  setFilterVisible(false);
                }}
              >
                <Text style={styles.modalItemText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );

  const renderEmptyWishlist = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
      <Text style={styles.emptySubtitle}>Add products to your wishlist by tapping the heart icon</Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.browseButtonText}>Browse Products</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header
        searchQuery={searchQuery}
        onChangeSearch={setSearchQuery}
        onCartPress={handleCartPress}
      />
      <View style={styles.content}>
        {renderHeader()}
        {state.wishlist.length === 0 ? (
          renderEmptyWishlist()
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFEDE8',
    paddingHorizontal: 16,
    marginHorizontal: -16,
  },
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    marginRight: 6,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 16,
    minWidth: 200,
    elevation: 4,
  },
  modalItem: {
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedModalItem: {
    backgroundColor: '#FFEDE8',
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
  },
  row: {
    justifyContent: 'space-between',
  },
  productList: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  browseButton: {
    backgroundColor: '#B84953',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WishlistScreen;
