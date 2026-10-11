import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';

function Cart({ viewDetails }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-24 max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Your cart is empty</h2>
        <p className="text-sm text-gray-400">Add products from your dashboard gallery views.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Cart Lineup ({cartItems.length})</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center space-x-4 shadow-sm">
            <div className="bg-gray-50 rounded-xl w-20 h-20 flex-shrink-0 flex items-center justify-center p-2">
              <img src={item.thumbnail} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-gray-900 text-sm md:text-base truncate">{item.title}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm font-extrabold text-gray-900">${item.price}</span>
                <button onClick={() => viewDetails(item.id)} className="text-xs font-semibold text-blue-600 hover:underline">Inspect</button>
              </div>
            </div>
            <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition-colors">
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm h-fit sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
        <div className="flex justify-between items-center py-4 border-t border-b border-gray-100 mb-6">
          <span className="font-bold text-gray-900">Total Price</span>
          <span className="text-2xl font-extrabold text-gray-900">${total}</span>
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl transition-colors text-sm shadow-md shadow-blue-100">
          Complete Purchase Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
