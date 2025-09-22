
import { Product } from '../types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    compareAtPrice: 249.99,
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    category: 'Electronics',
    inStock: true,
    featured: true,
    syncedTo: ['amazon', 'ebay']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 149.99,
    compareAtPrice: 179.99,
    description: 'Track your fitness goals with this smart watch featuring heart rate monitoring, GPS, and sleep tracking.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
    category: 'Electronics',
    inStock: true,
    featured: true,
    syncedTo: ['amazon']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    description: 'Comfortable and eco-friendly t-shirt made from 100% organic cotton.',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000',
    category: 'Clothing',
    inStock: true,
    featured: false,
    syncedTo: ['ebay']
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    compareAtPrice: 34.99,
    description: 'Eco-friendly, double-walled insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000',
    category: 'Accessories',
    inStock: true,
    featured: false,
    syncedTo: []
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    price: 39.99,
    description: 'Fast wireless charging for all Qi-enabled smartphones and accessories.',
    imageUrl: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?q=80&w=1000',
    category: 'Electronics',
    inStock: true,
    featured: true,
    syncedTo: ['amazon']
  },
  {
    id: '6',
    name: 'Leather Wallet',
    price: 49.99,
    description: 'Handcrafted genuine leather wallet with multiple card slots and RFID protection.',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000',
    category: 'Accessories',
    inStock: false,
    featured: false,
    syncedTo: ['ebay']
  },
  {
    id: '7',
    name: 'Ceramic Coffee Mug',
    price: 14.99,
    compareAtPrice: 19.99,
    description: 'Artisan-made ceramic coffee mug with unique glaze finish, microwave and dishwasher safe.',
    imageUrl: 'https://images.unsplash.com/photo-1570957923360-77fe1fed5bda?q=80&w=1000',
    category: 'Home',
    inStock: true,
    featured: false,
    syncedTo: []
  },
  {
    id: '8',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    description: 'Waterproof portable speaker with 20-hour battery life and extraordinary sound quality.',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000',
    category: 'Electronics',
    inStock: true,
    featured: true,
    syncedTo: ['amazon', 'ebay']
  }
];

export const categories = [
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'home', name: 'Home' }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};
