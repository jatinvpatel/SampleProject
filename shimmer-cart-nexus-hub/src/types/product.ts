
export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  imageUrl: string;
  category: string;
  inStock: boolean;
  featured: boolean;
  syncedTo: ('ebay' | 'amazon')[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
