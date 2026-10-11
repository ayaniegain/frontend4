import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import { fetchProducts } from './redux/productSlice';

function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState('home'); // Routing state: 'home' | 'details' | 'cart'
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const viewDetails = (id) => {
    setSelectedId(id);
    setPage('details');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Navbar setPage={setPage} page={page} />
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 py-8">
        {page === 'home' && <Home viewDetails={viewDetails} />}
        {page === 'details' && <ProductDetails id={selectedId} setPage={setPage} />}
        {page === 'cart' && <Cart viewDetails={viewDetails} />}
      </main>
    </div>
  );
}

export default App;
