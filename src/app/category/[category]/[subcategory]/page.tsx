'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';
import { ChevronDownIcon, XIcon, FilterIcon } from '@heroicons/react/outline';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
  material: string;
}

interface SubcategoryPageProps {
  params: {
    category: string;
    subcategory: string;
  };
}

export default function SubcategoryPage({ params }: SubcategoryPageProps) {
  const { category, subcategory } = params;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [quickshopProduct, setQuickshopProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<{
    'Price Range': string[];
    'Colors': string[];
    'Sizes': string[];
    'Material': string[];
  }>({
    'Price Range': [],
    'Colors': [],
    'Sizes': [],
    'Material': [],
  });

  // Handle ESC key for modals
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFilterOpen(false);
        setQuickshopProduct(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isFilterOpen || quickshopProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFilterOpen, quickshopProduct]);

  // Mock products data
  const products: Product[] = [
    {
      id: 1,
      name: 'Classic Cotton T-Shirt',
      price: 29.99,
      image: '/images/placeholder.jpg',
      colors: ['White', 'Black', 'Navy'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      material: 'Cotton',
    },
    {
      id: 2,
      name: 'Slim Fit Jeans',
      price: 79.99,
      image: '/images/placeholder.jpg',
      colors: ['Light Blue', 'Dark Blue', 'Black'],
      sizes: ['28', '30', '32', '34', '36'],
      material: 'Cotton',
    },
  ];

  const filters = {
    'Price Range': ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'],
    'Colors': ['Black', 'White', 'Blue', 'Red', 'Green'],
    'Sizes': ['XS', 'S', 'M', 'L', 'XL'],
    'Material': ['Cotton', 'Linen', 'Silk', 'Wool', 'Synthetic'],
  };

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
  ];

  const handleQuickshop = (product: Product) => {
    setQuickshopProduct(product);
    setSelectedColor('');
    setSelectedSize('');
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      alert('Please select both color and size');
      return;
    }
    // Add to cart logic here
    console.log('Added to cart:', { ...quickshopProduct, color: selectedColor, size: selectedSize });
    setQuickshopProduct(null);
  };

  const handleFilterChange = (category: string, option: string) => {
    setSelectedFilters(prev => {
      const currentFilters = [...prev[category as keyof typeof prev]];
      const optionIndex = currentFilters.indexOf(option);
      
      if (optionIndex === -1) {
        currentFilters.push(option);
      } else {
        currentFilters.splice(optionIndex, 1);
      }

      return {
        ...prev,
        [category]: currentFilters
      };
    });
  };

  const getPriceRange = (priceStr: string): [number, number] => {
    switch(priceStr) {
      case 'Under $50':
        return [0, 50];
      case '$50 - $100':
        return [50, 100];
      case '$100 - $200':
        return [100, 200];
      case 'Over $200':
        return [200, Infinity];
      default:
        return [0, Infinity];
    }
  };

  // Helper function to get filtered products excluding the current filter category
  const getFilteredProductsExcludingCategory = (categoryToExclude: string) => {
    let filtered = [...products];
    
    Object.entries(selectedFilters).forEach(([category, selectedOptions]) => {
      if (category !== categoryToExclude && selectedOptions.length > 0) {
        filtered = filtered.filter(product => {
          if (category === 'Price Range') {
            return selectedOptions.some(range => {
              const [min, max] = getPriceRange(range);
              return product.price >= min && product.price <= max;
            });
          } else if (category === 'Colors') {
            return product.colors.some(color => selectedOptions.includes(color));
          } else if (category === 'Sizes') {
            return product.sizes.some(size => selectedOptions.includes(size));
          } else if (category === 'Material') {
            return selectedOptions.includes(product.material);
          }
          return true;
        });
      }
    });
    
    return filtered;
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply filters
    if (selectedFilters['Price Range'].length > 0) {
      filtered = filtered.filter(product => {
        return selectedFilters['Price Range'].some(range => {
          const [min, max] = getPriceRange(range);
          return product.price >= min && product.price <= max;
        });
      });
    }

    if (selectedFilters['Colors'].length > 0) {
      filtered = filtered.filter(product =>
        product.colors.some(color => selectedFilters['Colors'].includes(color))
      );
    }

    if (selectedFilters['Sizes'].length > 0) {
      filtered = filtered.filter(product =>
        product.sizes.some(size => selectedFilters['Sizes'].includes(size))
      );
    }

    if (selectedFilters['Material'].length > 0) {
      filtered = filtered.filter(product =>
        selectedFilters['Material'].includes(product.material)
      );
    }

    // Apply sorting
    return filtered.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return b.id - a.id;
        default: // 'featured'
          return 0;
      }
    });
  }, [products, selectedFilters, sortOption]);

  // Calculate available facet options based on current products and filters
  const availableFacets = useMemo(() => {
    // Calculate available options for each filter category
    const priceRanges = ['Under $50', '$50 - $100', '$100 - $200', 'Over $200'];
    const availableOptions: Record<string, string[]> = {
      'Price Range': [],
      'Colors': [],
      'Sizes': [],
      'Material': [],
    };

    // Price Range
    const productsForPrice = getFilteredProductsExcludingCategory('Price Range');
    availableOptions['Price Range'] = priceRanges.filter(range => {
      const [min, max] = getPriceRange(range);
      return productsForPrice.some(product => product.price >= min && product.price <= max);
    });

    // Colors
    const productsForColors = getFilteredProductsExcludingCategory('Colors');
    const uniqueColors = new Set<string>();
    productsForColors.forEach(product => {
      product.colors.forEach(color => uniqueColors.add(color));
    });
    availableOptions['Colors'] = Array.from(uniqueColors);

    // Sizes
    const productsForSizes = getFilteredProductsExcludingCategory('Sizes');
    const uniqueSizes = new Set<string>();
    productsForSizes.forEach(product => {
      product.sizes.forEach(size => uniqueSizes.add(size));
    });
    availableOptions['Sizes'] = Array.from(uniqueSizes);

    // Material
    const productsForMaterial = getFilteredProductsExcludingCategory('Material');
    const uniqueMaterials = new Set<string>();
    productsForMaterial.forEach(product => {
      uniqueMaterials.add(product.material);
    });
    availableOptions['Material'] = Array.from(uniqueMaterials);

    return availableOptions;
  }, [products, selectedFilters]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link href={`/category/${category}`} className="text-gray-600 hover:text-gray-900 transition-colors capitalize">
                {category}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-medium capitalize">{subcategory}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            className="lg:hidden flex items-center justify-center gap-2 w-full py-2 px-4 border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all"
            onClick={() => setIsFilterOpen(true)}
          >
            <FilterIcon className="h-5 w-5" />
            Filters
          </button>

          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
              {Object.entries(availableFacets).map(([category, options]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-medium text-gray-800 mb-3">{category}</h3>
                  <div className="space-y-2">
                    {options.map((option) => (
                      <label key={option} className="flex items-center group">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          checked={selectedFilters[category as keyof typeof selectedFilters].includes(option)}
                          onChange={() => handleFilterChange(category, option)}
                        />
                        <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors">
                          {option}
                          {/* Show count of products for each option */}
                          {` (${getFilteredProductsExcludingCategory(category).filter(product => {
                            if (category === 'Price Range') {
                              const [min, max] = getPriceRange(option);
                              return product.price >= min && product.price <= max;
                            } else if (category === 'Colors') {
                              return product.colors.includes(option);
                            } else if (category === 'Sizes') {
                              return product.sizes.includes(option);
                            } else if (category === 'Material') {
                              return product.material === option;
                            }
                            return false;
                          }).length})`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Filters Sidebar */}
          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity"
                onClick={() => setIsFilterOpen(false)}
              />

              {/* Sidebar */}
              <div className={`fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <XIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="overflow-y-auto h-full p-4">
                  {Object.entries(availableFacets).map(([category, options]) => (
                    <div key={category} className="mb-6">
                      <h3 className="font-medium text-gray-800 mb-3">{category}</h3>
                      <div className="space-y-2">
                        {options.map((option) => (
                          <label key={option} className="flex items-center group">
                            <input
                              type="checkbox"
                              className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              checked={selectedFilters[category as keyof typeof selectedFilters].includes(option)}
                              onChange={() => handleFilterChange(category, option)}
                            />
                            <span className="ml-2 text-gray-600 group-hover:text-gray-900 transition-colors">
                              {option}
                              {/* Show count of products for each option */}
                              {` (${getFilteredProductsExcludingCategory(category).filter(product => {
                                if (category === 'Price Range') {
                                  const [min, max] = getPriceRange(option);
                                  return product.price >= min && product.price <= max;
                                } else if (category === 'Colors') {
                                  return product.colors.includes(option);
                                } else if (category === 'Sizes') {
                                  return product.sizes.includes(option);
                                } else if (category === 'Material') {
                                  return product.material === option;
                                }
                                return false;
                              }).length})`}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Dropdown */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 capitalize">
                {category} - {subcategory}
              </h1>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredAndSortedProducts.map((product) => (
                <Link
                  href={`/product/${product.id}`}
                  key={product.id}
                  className="group rounded-lg shadow-lg block"
                >
                  <div className="relative aspect-square bg-gray-50 mb-4 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleQuickshop(product);
                      }}
                      className="absolute bottom-4 left-4 right-4 bg-white text-gray-900 py-2 opacity-0 group-hover:opacity-100 transition-all duration-200 text-sm font-medium rounded shadow-lg hover:bg-gray-50"
                    >
                      Quick Shop
                    </button>
                  </div>
                  <h3 className="p-2 text-sm font-medium text-gray-900 group-hover:text-gray-700 transition-colors">{product.name}</h3>
                  <p className="p-2 mt-1 text-gray-600 font-medium">${product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Quickshop Modal */}
        {quickshopProduct && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-25 z-40 transition-opacity"
              onClick={() => setQuickshopProduct(null)}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl transform transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {quickshopProduct.name}
                    </h3>
                    <button
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      onClick={() => setQuickshopProduct(null)}
                    >
                      <XIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="aspect-square bg-gray-50 mb-6 rounded-lg overflow-hidden">
                    <img
                      src={quickshopProduct.image}
                      alt={quickshopProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickshopProduct.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 border rounded-full text-sm transition-all ${
                            selectedColor === color
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickshopProduct.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 flex items-center justify-center border rounded-lg text-sm transition-all ${
                            selectedSize === size
                              ? 'border-indigo-600 bg-indigo-600 text-white'
                              : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Add to Cart - ${quickshopProduct.price}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
