
import React from 'react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductListPageProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ products, addToCart }) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">商品一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default ProductListPage;
