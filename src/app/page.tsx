import React from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';

export default function Home() {
  const newArrivals = [
    {
      id: 1,
      name: 'Cotton Blend Sweater',
      price: 89.99,
      image: '/images/placeholder.jpg',
    },
    {
      id: 2,
      name: 'Relaxed Fit Jeans',
      price: 79.99,
      image: '/images/placeholder.jpg',
    },
    {
      id: 3,
      name: 'Oversized T-Shirt',
      price: 39.99,
      image: '/images/placeholder.jpg',
    },
    {
      id: 4,
      name: 'Linen Blend Dress',
      price: 129.99,
      image: '/images/placeholder.jpg',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="w-full h-screen relative">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white text-center">
          <h1 className="text-5xl md:text-7xl font-portrait mb-6 font-bold">
            blubolt x Centra
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-100">
          Welcome to the blubolt Centra accelerator
          </p>
          <Link
            href="/category/shop"
            className="bg-white text-gray-900 px-8 py-3 text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-portrait text-center mb-12 text-gray-900 font-semibold">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Women', 'Men', 'Kids'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="group relative aspect-square overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors z-10" />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <span className="text-white text-2xl font-portrait font-medium">{category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-portrait text-center mb-12 text-gray-900 font-semibold">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="aspect-square bg-gray-200 mb-4 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium mb-2 text-gray-900">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/new-arrivals"
              className="inline-block border-2 border-gray-900 px-8 py-3 text-lg text-gray-900 hover:bg-gray-900 hover:text-white transition-colors font-medium"
            >
              View All New Arrivals
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-portrait mb-6 text-gray-900 font-semibold">
            Stay in Touch
          </h2>
          <p className="mb-8 text-lg text-gray-700">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 hover:bg-gray-800 transition-colors font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}