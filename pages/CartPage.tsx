
import React from 'react';
import { CartItem } from '../types';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CartPageProps {
  cart: CartItem[];
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number) => void;
  cartTotal: number;
}

const CartPage: React.FC<CartPageProps> = ({ cart, removeFromCart, updateQuantity, cartTotal }) => {
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">ショッピングカート</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">カートは空です。</p>
        <Link to="/" className="mt-6 inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
            お買い物を続ける
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">ショッピングカート</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 p-4 font-semibold text-gray-600 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-2">商品</div>
            <div>価格</div>
            <div>数量</div>
            <div>合計</div>
            <div></div>
        </div>
        
        {cart.map((item) => (
          <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 items-center border-b border-gray-200 dark:border-gray-700">
            <div className="col-span-1 md:col-span-2 flex items-center space-x-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">在庫: {item.stock}</p>
              </div>
            </div>
            <div className="text-gray-800 dark:text-gray-200">${item.price.toFixed(2)}</div>
            <div className="flex items-center space-x-2">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                <Minus size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
              <span className="w-10 text-center font-semibold text-gray-800 dark:text-gray-200">{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <Plus size={16} className="text-gray-700 dark:text-gray-300" />
              </button>
            </div>
            <div className="font-semibold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</div>
            <div className="flex justify-end">
              <button onClick={() => removeFromCart(item.id)} className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
                <Trash2 size={20} className="text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-end">
        <div className="w-full md:w-1/3 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="flex justify-between items-center text-lg font-semibold text-gray-700 dark:text-gray-300">
                <span>合計金額</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full mt-6 px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors text-lg font-semibold">
                レジに進む
            </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
