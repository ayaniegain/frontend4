import React from 'react';
import { useSelector } from 'react-redux';

function Navbar({ setPage, page }) {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
        <span onClick={() => setPage('home')} className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent cursor-pointer">
          TrendShop
        </span>
        <div className="flex space-x-8 text-sm font-medium">
          <button onClick={() => setPage('home')} className={`pb-1 border-b-2 transition-colors ${page === 'home' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Home
          </button>
          <button onClick={() => setPage('cart')} className={`pb-1 border-b-2 transition-colors relative flex items-center ${page === 'cart' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Cart
            {cartItems.length > 0 && (
              <span className="ml-1.5 bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
