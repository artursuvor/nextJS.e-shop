'use client';

import React from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/slices/cartSlice';
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

  return (
    <div
      key={id}
      className="border p-5 rounded-lg shadow-md bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
    >
      <div className="relative w-full h-48 mb-3">
        <Image
          src={image}
          alt={title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{`$${price}`}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{`Category: ${category}`}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">{`Rating: ${rating.rate} (${rating.count} reviews)`}</p>
      <button
        onClick={handleAddToCart}
        className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300"
      >
        {cartItemQuantity > 0 ? `In Cart (${cartItemQuantity})` : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductCard;
