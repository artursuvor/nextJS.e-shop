'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '@/redux/slices/cartSlice';
import { RootState } from '@/redux/store';
import { Product } from '@/utils/data';

const ProductCard: React.FC<Product> = ({ id, title, price, category, image, rating }) => {
  const dispatch = useDispatch();
  const cartItemQuantity = useSelector((state: RootState) =>
    state.cart.items.find(item => item.id === id)?.quantity || 0
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, quantity: 1 }));
  };

  const handleRemoveFromCart = () => {
    if (cartItemQuantity > 0) {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div
      key={id}
      className="border p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <div className="relative w-full h-48 mb-3">
      <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'contain' }}
          className="rounded-lg"
          priority
          sizes="(max-width: 640px)"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{`$${price}`}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{`Category: ${category}`}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{`Rating: ${rating.rate} (${rating.count} reviews)`}</p>
      <div className="mt-3 flex items-center space-x-3">
        {cartItemQuantity > 0 ? (
          <>
            <button
              onClick={handleRemoveFromCart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-300"
            >
              −
            </button>
            <Link href="/cart" className="bg-blue-500 px-2 py-1 rounded text-white">{`In Cart (${cartItemQuantity})`}</Link> 
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors duration-300"
            >
              +
            </button>
          </>
        ) : (
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
