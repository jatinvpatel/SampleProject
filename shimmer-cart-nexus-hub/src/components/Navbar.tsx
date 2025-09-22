
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User } from 'lucide-react';
import CartDrawer from './CartDrawer';

const Navbar = () => {
  const { itemCount, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-shop-primary">
              ShopVerse
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-shop-primary transition-colors">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-shop-primary transition-colors">
                Products
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-shop-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-shop-primary transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/account">
                <Button variant="ghost" size="icon" className="relative">
                  <User size={20} />
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-shop-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {itemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer />
    </>
  );
};

export default Navbar;
