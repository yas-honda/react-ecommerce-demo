
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';
import { useCart } from './hooks/useCart';
import { products } from './data/products';

const App: React.FC = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, cartItemCount, cartTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header cartItemCount={cartItemCount} />
      <main>
        <Routes>
          <Route 
            path="/" 
            element={<ProductListPage products={products} addToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <CartPage 
                cart={cart} 
                removeFromCart={removeFromCart} 
                updateQuantity={updateQuantity}
                cartTotal={cartTotal}
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
