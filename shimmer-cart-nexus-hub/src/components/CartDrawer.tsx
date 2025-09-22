
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${isCartOpen ? 'block' : 'hidden'}`}>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl overflow-hidden flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Cart</h2>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X size={20} />
          </Button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-4 space-y-4 scroll-hidden">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Your cart is empty</p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCartOpen(false);
                }}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex border-b pb-4">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img 
                    src={item.product.imageUrl} 
                    alt={item.product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-gray-500 hover:text-red-500"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <p className="text-shop-primary font-medium mt-1">
                    ${item.product.price.toFixed(2)}
                  </p>
                  
                  <div className="flex items-center mt-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="mx-3 text-sm w-6 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm">Shipping and taxes calculated at checkout</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                Continue Shopping
              </Button>
              <Button 
                className="bg-shop-primary hover:bg-shop-primary-dark"
                onClick={() => {
                  setIsCartOpen(false);
                }}
                asChild
              >
                <Link to="/checkout">
                  Checkout
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
