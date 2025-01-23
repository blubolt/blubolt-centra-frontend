import React from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;

  // Example subcategories - in a real app, these would come from your data/API
  const subcategories = [
    { name: 'New Arrivals', slug: 'new-arrivals' },
    { name: 'Trending', slug: 'trending' },
    { name: 'Best Sellers', slug: 'best-sellers' },
    { name: 'Sale', slug: 'sale' },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <span className="mx-2 text-gray-500">/</span>
            </li>
            <li className="text-gray-900 capitalize">{category}</li>
          </ol>
        </nav>

        <h1 className="text-3xl font-medium mb-8 capitalize">{category}</h1>

        {/* Subcategories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/category/${category}/${subcategory.slug}`}
              className="group block"
            >
              <div className="aspect-square bg-gray-100 mb-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-200" />
              </div>
              <h2 className="text-lg font-medium text-gray-900">{subcategory.name}</h2>
              <p className="text-gray-600 mt-1">Shop Now →</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
