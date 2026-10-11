import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export const PRODUCT_DETAILS_URL = (id) => `https://dummyjson.com/products/${id}`;

function ProductDetails({ id, setPage }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isInCart = cartItems.some(item => item.id === id);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(PRODUCT_DETAILS_URL(id))
      .then((res) => { if (!res.ok) throw new Error('Item extraction failure'); return res.json(); })
      .then((data) => { setProduct(data); setLoading(false); })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [id]);

  if (loading) return <div className="text-center py-24 text-gray-500 font-medium">Loading details...</div>;
  if (error || !product) return <div className="text-center py-24 text-red-500">{error || 'Data missing'}</div>;

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 max-w-4xl mx-auto shadow-sm">
      <button onClick={() => setPage('home')} className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-600 mb-6">
        &larr; Back to gallery
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="bg-gray-50 rounded-2xl p-6 flex items-center justify-center h-80 md:h-96">
          <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{product.category}</span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mt-3 mb-2">{product.title}</h1>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">{product.description}</p>
          </div>
          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 text-sm">Total Unit Price</span>
              <span className="text-3xl font-extrabold text-gray-900">\${product.price}</span>
            </div>
            <button
              onClick={() => !isInCart && dispatch(addToCart(product))}
              disabled={isInCart}
              className={`w-full py-4 rounded-2xl font-semibold text-sm transition-all ${
                isInCart 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-100'
              }`}
            >
              {isInCart ? '✓ Item Saved In Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
