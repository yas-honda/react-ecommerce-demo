
import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl flex flex-col">
      <div className="relative">
        <img className="w-full h-48 object-cover" src={product.image} alt={product.name} />
        {isOutOfStock && (
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-2 py-1 m-2 rounded-md">
            売り切れ
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 truncate">{product.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">在庫: {product.stock}個</p>
        <div className="mt-auto flex justify-between items-center">
          <p className="text-xl font-bold text-primary-600 dark:text-primary-400">${product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className="flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400 disabled:cursor-not-allowed dark:disabled:bg-gray-600 transition-colors duration-200"
          >
            <Plus size={16} className="mr-1" />
            追加
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
