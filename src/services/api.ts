import axios from 'axios';
import {Product} from '../context/AppContext';

const API_BASE_URL = 'https://dummyjson.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const apiService = {
  // Fetch all products and filter cosmetic-like products
  fetchProducts: async (): Promise<Product[]> => {
    try {
      const response = await api.get('/products');
      const allProducts = response.data.products;

      // Filter products that could be cosmetic/beauty related
      const cosmeticKeywords = [
        'beauty',
        'cosmetic',
        'mascara',
        'lipstick',
        'foundation',
        'perfume',
        'cream',
        'oil',
        'serum',
        'powder',
        'lotion',
        'essence',
        'skincare',
        'moisturizer',
        'cleanser',
        'sunscreen',
        'fragrance',
      ];

      const cosmeticProducts = allProducts.filter((product: any) => {
        const title = product.title.toLowerCase();
        const description = product.description.toLowerCase();
        const category = product.category.toLowerCase();

        return cosmeticKeywords.some(
          keyword =>
            title.includes(keyword) ||
            description.includes(keyword) ||
            category.includes(keyword) ||
            category === 'beauty' ||
            category === 'fragrances' ||
            category === 'skin-care',
        );
      });

      // If no cosmetic products found, create mock data with existing product structure
      if (cosmeticProducts.length === 0) {
        return allProducts.slice(0, 10).map((product: any, index: number) => ({
          ...product,
          title: [
            'Essence Mascara Lash Princess',
            'Chanel Rouge Lipstick',
            'Maybelline Foundation',
            'L\'Oreal Paris Perfume',
            'Nivea Face Cream',
            'Olay Moisturizing Lotion',
            'MAC Ruby Lipstick',
            'Clinique Skin Serum',
            'Revlon Powder Compact',
            'Dior Beauty Essence',
          ][index],
          description: `Premium beauty product for your skincare and makeup needs. ${product.description}`,
          category: 'beauty',
        }));
      }

      return cosmeticProducts;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  },

  // Fetch single product by ID
  fetchProductById: async (id: number): Promise<Product> => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Failed to fetch product');
    }
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    try {
      const response = await api.get(`/products/search?q=${query}`);
      return response.data.products;
    } catch (error) {
      console.error('Error searching products:', error);
      throw new Error('Failed to search products');
    }
  },
};
