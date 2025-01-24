'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingBagIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This will be replaced with actual auth state

  const menuItems = [
    {
      title: 'Women',
      submenu: ['New Arrivals', 'Clothing', 'Shoes', 'Accessories', 'Sale'],
    },
    {
      title: 'Men',
      submenu: ['New Arrivals', 'Clothing', 'Shoes', 'Accessories', 'Sale'],
    },
    {
      title: 'Kids',
      submenu: ['Girls', 'Boys', 'Baby', 'Sale'],
    },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            STORE
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <div key={item.title} className="relative group">
                <button className="text-gray-700 hover:text-gray-900 px-3 py-2">
                  {item.title}
                </button>
                <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg py-2 z-50">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem}
                      href={`/category/${item.title.toLowerCase()}/${subItem.toLowerCase().replace(' ', '-')}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Cart, User Account, and Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <Link href={isLoggedIn ? '/account' : '/login'} className="p-2 hover:bg-gray-100 rounded-full">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </Link>
            <Link href="/cart" className="p-2 relative">
              <ShoppingBagIcon className="h-6 w-6 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          {menuItems.map((item) => (
            <div key={item.title} className="px-4 pt-2 pb-3 space-y-1">
              <div className="font-medium text-gray-900 py-2">{item.title}</div>
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem}
                  href={`/category/${item.title.toLowerCase()}/${subItem.toLowerCase().replace(' ', '-')}`}
                  className="block pl-3 pr-4 py-2 text-base text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  {subItem}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
