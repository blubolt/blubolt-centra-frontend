"use client";

import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string>("");
  const [addedToCart, setAddedToCart] = useState(false);

  // Mock product data - in a real app, this would come from an API
  const product: Product = {
    id: parseInt(params.id),
    name: "Cotton Blend Sweater",
    price: 89.99,
    description:
      "A comfortable and stylish sweater made from a premium cotton blend. Perfect for layering during cooler weather, this versatile piece features a classic fit and ribbed details at the cuffs and hem.",
    images: [
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
      "/images/placeholder.jpg",
    ],
    colors: ["Black", "Gray", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
  };

  const handleAddToCart = () => {
    // Validate selections
    if (!selectedColor || !selectedSize) {
      setError("Please select both color and size");
      return;
    }

    // Add to cart
    addItem({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.images[0],
    });

    // Show success message
    setError("");
    setAddedToCart(true);

    // Reset success message after 3 seconds
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <span className="mx-2 text-gray-600">/</span>
            </li>
            <li className="flex items-center">
              <Link
                href="/category/all"
                className="text-gray-600 hover:text-gray-900"
              >
                Products
              </Link>
              <span className="mx-2 text-gray-600">/</span>
            </li>
            <li className="text-gray-900">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl text-gray-900 mb-6">${product.price}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <h2 className="font-medium mb-3 text-gray-900">Color</h2>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`border rounded-lg px-4 py-2 transition-all ${
                      selectedColor === color
                        ? "border-black bg-black text-white"
                        : "border-gray-700 text-gray-700 hover:bg-gray-100 hover:shadow-md hover:border-black hover:text-gray-900"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-medium text-gray-900">Size</h2>
                <button className="text-gray-700 hover:text-gray-900 underline">
                  Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded-lg py-2 transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-700 text-gray-700 hover:bg-gray-100 hover:shadow-md hover:border-black hover:text-gray-900"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <h2 className="font-medium mb-3 text-gray-900">Quantity</h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-100 hover:shadow-md hover:border-black transition-all"
                >
                  -
                </button>
                <span className="w-12 text-center border border-gray-300 rounded-lg px-4 py-2 text-gray-700">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 hover:bg-gray-100 hover:shadow-md hover:border-black transition-all"
                >
                  +
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && <div className="mb-4 text-red-600">{error}</div>}

            {/* Success Message */}
            {addedToCart && (
              <div className="mb-4 text-green-600">
                Added to cart successfully!
              </div>
            )}

            {/* Add to Cart */}
            <div className="mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-black text-white py-4 text-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Add to Cart
              </button>
            </div>

            {/* Product Description */}
            <div className="border-t pt-6">
              <h2 className="font-medium text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Additional Info */}
            <div className="border-t mt-6 pt-6">
              <h2 className="font-medium text-gray-900 mb-4">
                Shipping & Returns
              </h2>
              <ul className="text-gray-700 space-y-2">
                <li>Free standard shipping on orders over $100</li>
                <li>Express shipping available</li>
                <li>Free returns within 30 days</li>
                <li>See our full return policy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-medium text-gray-900 mb-8">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((id) => (
              <Link key={id} href={`/product/${id}`} className="group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <img
                    src="/images/placeholder.jpg"
                    alt="Related product"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">
                  Related Product {id}
                </h3>
                <p className="text-gray-700">$99.99</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
