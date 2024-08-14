"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { removeFromCart, clearCart } from '@/redux/slices/cartSlice';

const CartClient: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200">
        Your Cart
      </h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map(item => (
              <li key={item.id} className="border p-4 mb-4 bg-white dark:bg-gray-700 rounded">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{`$${item.price}`}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{`Quantity: ${item.quantity}`}</p>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClearCart}
            className="mt-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
};

export default CartClient;
