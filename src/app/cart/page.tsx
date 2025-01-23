import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { MinusIcon, PlusIcon, XIcon } from '@heroicons/react/outline';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export default function CartPage() {
  // Mock cart data - in a real app, this would come from your cart state management
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Cotton Blend Sweater',
      price: 89.99,
      quantity: 1,
      size: 'M',
      color: 'Black',
      image: '/images/placeholder.jpg',
    },
    {
      id: 2,
      name: 'Relaxed Fit Jeans',
      price: 79.99,
      quantity: 1,
      size: '32',
      color: 'Blue',
      image: '/images/placeholder.jpg',
    },
  ];

  const subtotal: number = cartItems.reduce<number>((sum, item) => sum + item.price * item.quantity, 0);
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
            {cartItems.length > 0 ? (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-6 border-b">
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
                        <button className="text-gray-800 hover:text-gray-900">
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
                          >
                            <MinusIcon className="h-4 w-4" />
                          </button>
                          <span className="px-6 py-2 text-gray-700 font-medium min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="p-2 hover:bg-gray-50 text-gray-500 hover:text-gray-700 transition-colors duration-150 ease-in-out border-l border-gray-200"
                            aria-label="Increase quantity"
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
                <p className="text-gray-600 mb-8 text-gray-700">Add some items to your cart to continue shopping</p>
                <Link
                  href="/shop"
                  className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-medium mb-6 text-gray-900">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-600">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-600">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-600">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors">
                Proceed to Checkout
              </button>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Accepted Payment Methods</h3>
                <div className="flex gap-2">
                  {/* Add payment method icons here */}
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
