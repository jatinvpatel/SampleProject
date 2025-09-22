
import React, { useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import { products, categories } from '@/data/products';
import { Button } from '@/components/ui/button';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('featured');

  const filteredProducts = selectedCategory
    ? products.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;
  
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default:
        return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-medium">Categories:</span>
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className={selectedCategory === null ? "bg-shop-primary hover:bg-shop-primary-dark" : ""}
              size="sm"
            >
              All
            </Button>
            
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "bg-shop-primary hover:bg-shop-primary-dark" : ""}
                size="sm"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <span className="mr-2 whitespace-nowrap">Sort by:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border rounded p-2 focus:outline-none focus:border-shop-primary"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-gray-600">{sortedProducts.length} products</p>
      </div>
      
      <ProductGrid products={sortedProducts} />
    </div>
  );
};

export default ProductsPage;
