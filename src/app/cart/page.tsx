"use client";

import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { removeFromCart, clearCart } from '@/redux/slices/cartSlice';
import { db, auth } from '@/firebase/firebaseConfig';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = auth.currentUser; 
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = useMemo(() => {
    return (id: number) => {
      dispatch(removeFromCart(id));
    };
  }, [dispatch]);

  const handleClearCart = useMemo(() => {
    return () => {
      dispatch(clearCart());
    };
  }, [dispatch]);

  const calculateTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  }, [cartItems]);

  const handleCreateOrder = async () => {
    if (!user) {
      alert('Please log in to place an order.');
      return;
    }

    try {
      const order = {
        items: cartItems,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        totalAmount: calculateTotal,
      };

      await addDoc(collection(db, 'orders'), order);

      alert('Order placed successfully!');
      dispatch(clearCart());
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const cartItemsList = useMemo(() => {
    return cartItems.map((item) => (
      <li
        key={item.id}
        className="border p-4 mb-4 bg-white dark:bg-gray-700 rounded"
      >
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          {item.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{`$${item.price}`}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{`Quantity: ${item.quantity}`}</p>
        <button
          onClick={() => handleRemoveFromCart(item.id)}
          className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300"
        >
          Remove
        </button>
      </li>
    ));
  }, [cartItems, handleRemoveFromCart]);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItemsList}
          </ul>
          <div className="mt-5 text-lg font-semibold text-gray-800 dark:text-gray-200">
            <p>Total: ${calculateTotal}</p>
          </div>
          <button
            onClick={handleClearCart}
            className="mt-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            Clear Cart
          </button>
          <button
            onClick={handleCreateOrder}
            disabled={!user} 
            className={`mt-5 mx-8 px-4 py-2 rounded transition-colors duration-300 ${user ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-400 text-gray-300 cursor-not-allowed'}`}
            title={!user ? 'You must log in' : ''} 
          >
            Create Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
