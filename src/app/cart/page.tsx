'use client';

import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { MinusIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCart();
  const subtotal = getTotal();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 bg-white">
        <h1 className="text-3xl font-medium mb-8 text-gray-900">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {items.length > 0 ? (
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-6 pb-6 border-b">
                    <div className="w-24 h-24 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <Link href={`/product/${item.id}`} className="font-medium hover:underline text-gray-900">
                          {item.name}
                        </Link>
                        <button 
                          className="text-gray-800 hover:text-gray-900"
                          onClick={() => removeItem(item.id, item.color, item.size)}
                        >
                          <XIcon className="h-5 w-5" />
                        </button>
                      </div>
                      <p className="text-gray-600 mt-1">
                        Size: {item.size} | Color: {item.color}
                      </p>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center border rounded-lg overflow-hidden border-gray-200 shadow-sm">
                          <button
                            className="p-2 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors duration-150 ease-in-out border-r border-gray-200"
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(item.id, item.color, item.size, Math.max(0, item.quantity - 1))}
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-6 py-2 text-gray-700 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="p-2 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors duration-150 ease-in-out border-l border-gray-200"
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-4 text-gray-900">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some products to your cart to see them here.</p>
                <Link
                  href="/"
                  className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-150 ease-in-out"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
                <h2 className="text-lg font-medium mb-6 text-gray-900">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-medium text-gray-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors duration-150 ease-in-out"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
