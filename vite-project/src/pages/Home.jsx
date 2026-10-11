import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Home({ viewDetails }) {
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [query, setQuery] = useState('');

  const filtered = products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  if (loading) return <div className="text-center py-24 text-gray-500 font-medium">Loading items...</div>;
  if (error) return <div className="text-center text-red-600 py-24 bg-red-50 rounded-2xl max-w-md mx-auto p-4">{error}</div>;

  return (
    <div className="space-y-8">
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col p-4">
            <div className="h-44 bg-gray-50 rounded-xl flex items-center justify-center p-2 mb-4">
              <img src={product.thumbnail} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
            </div>
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">{product.category}</span>
            <h3 className="font-bold text-gray-900 truncate mb-1">{product.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">{product.description}</p>
            <div className="flex items-center justify-between pt-2 border-t border-gray-50">
              <span className="text-lg font-extrabold text-gray-900">${product.price}</span>
              <button onClick={() => viewDetails(product.id)} className="bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
