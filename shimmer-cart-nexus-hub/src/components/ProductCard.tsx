
import React from 'react';
import { Product } from '../types/product';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-md transition-shadow">
      <Link to={`/product/${product.id}`} className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
          />
        </div>
        
        {/* Sale badge */}
        {product.compareAtPrice && product.compareAtPrice > product.price && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
            Sale
          </Badge>
        )}
        
        {/* Sold out badge */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center">
            <Badge variant="outline" className="text-gray-800 border-gray-800 font-semibold px-4 py-2 text-sm">
              Sold Out
            </Badge>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <Link to={`/product/${product.id}`} className="mb-1 hover:text-shop-primary">
          <h3 className="font-medium text-gray-800">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-4 flex-1">
          {product.description.length > 60
            ? product.description.substring(0, 60) + '...'
            : product.description}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <span className="font-semibold text-shop-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="ml-2 text-gray-400 text-sm line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <Button 
            className="w-full bg-shop-primary hover:bg-shop-primary-dark"
            disabled={!product.inStock}
            onClick={(e) => {
              e.preventDefault();
              if (product.inStock) {
                addToCart(product);
              }
            }}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {product.inStock ? 'Add to Cart' : 'Sold Out'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
