
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { MinusCircle, PlusCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import ProductGrid from '@/components/ProductGrid';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const product = id ? getProductById(id) : undefined;
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discountPercentage = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100) 
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row mb-16">
        {/* Product Image */}
        <div className="lg:w-1/2 mb-8 lg:mb-0">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover" 
            />
          </div>
        </div>
        
        {/* Product Details */}
        <div className="lg:w-1/2 lg:pl-12">
          <nav className="mb-4">
            <ol className="flex text-sm text-gray-500">
              <li><Link to="/" className="hover:text-shop-primary">Home</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link to="/products" className="hover:text-shop-primary">Products</Link></li>
              <li><span className="mx-2">/</span></li>
              <li><Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-shop-primary">{product.category}</Link></li>
            </ol>
          </nav>
          
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <div className="mr-4">
              <span className="text-2xl font-bold text-shop-primary">
                ${product.price.toFixed(2)}
              </span>
              
              {product.compareAtPrice && (
                <span className="ml-2 text-gray-500 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
            
            {discountPercentage > 0 && (
              <div className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                Save {discountPercentage}%
              </div>
            )}
          </div>

          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'} mr-2`}></span>
              <span className={product.inStock ? 'text-green-700' : 'text-red-700'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            
            {product.inStock && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10" 
                    onClick={() => handleQuantityChange(quantity - 1)} 
                    disabled={quantity <= 1}
                  >
                    <MinusCircle className="h-5 w-5" />
                  </Button>
                  
                  <span className="mx-4 w-8 text-center">{quantity}</span>
                  
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-10 w-10" 
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <PlusCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <div className="mb-6">
            <Button 
              className="w-full bg-shop-primary hover:bg-shop-primary-dark py-6"
              disabled={!product.inStock}
              onClick={handleAddToCart} 
              size="lg"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
          
          {/* Product details */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-2">Product Details:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Category: {product.category}</li>
              <li>ID: {product.id}</li>
              {product.syncedTo.length > 0 && (
                <li>
                  Also available on: {product.syncedTo.join(', ')}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
          <ProductGrid products={relatedProducts} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
