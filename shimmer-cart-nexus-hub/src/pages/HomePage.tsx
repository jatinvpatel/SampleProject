
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ProductGrid from '@/components/ProductGrid';
import { getFeaturedProducts, categories } from '@/data/products';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-100 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
              Discover Amazing Products For Your Lifestyle
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Shop the latest trends and find exactly what you need. Free shipping on orders over $50!
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-shop-primary hover:bg-shop-primary-dark text-white px-8 py-6"
                size="lg"
                asChild
              >
                <Link to="/products">Shop Now</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-6"
                asChild
              >
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decoration */}
        <div className="hidden lg:block absolute right-0 bottom-0 w-1/3 h-full">
          <svg
            className="absolute bottom-0 right-0 text-purple-200 opacity-20"
            viewBox="0 0 800 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="400" cy="400" r="400" fill="currentColor" />
          </svg>
          <svg
            className="absolute top-0 right-0 text-blue-200 opacity-20"
            viewBox="0 0 600 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="300" cy="300" r="300" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2 text-center">Featured Products</h2>
          <p className="text-gray-600 mb-10 text-center">Discover our most popular items</p>
          
          <ProductGrid products={featuredProducts} />
          
          <div className="mt-12 text-center">
            <Button asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-2 text-center">Shop by Category</h2>
          <p className="text-gray-600 mb-10 text-center">Find exactly what you're looking for</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="aspect-video bg-gray-100 flex items-center justify-center">
                  <span className="text-4xl text-gray-300 group-hover:text-shop-primary transition-colors">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-center group-hover:text-shop-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="bg-shop-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h2 className="text-2xl font-semibold mb-2">Subscribe & Get 10% Off</h2>
              <p>Sign up for our newsletter and receive 10% off your first order!</p>
            </div>
            
            <div className="w-full md:w-auto">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-md w-full md:w-64 text-gray-800 focus:outline-none"
                />
                <Button type="submit" className="bg-shop-dark hover:bg-black rounded-l-none">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We source only the best products that meet our quality standards.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Get your orders delivered quickly with our expedited shipping.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 mx-auto rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-shop-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Shop with confidence using our secure payment options.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
