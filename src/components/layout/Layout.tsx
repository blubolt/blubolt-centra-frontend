import { ReactNode } from 'react';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-800">Your trusted fashion destination for quality clothing and accessories.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><a href="/contact" className="text-gray-800 hover:text-white">Contact Us</a></li>
                <li><a href="/shipping" className="text-gray-800 hover:text-white">Shipping Information</a></li>
                <li><a href="/returns" className="text-gray-800 hover:text-white">Returns & Exchanges</a></li>
                <li><a href="/faq" className="text-gray-800 hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="/track-order" className="text-gray-800 hover:text-white">Track Order</a></li>
                <li><a href="/size-guide" className="text-gray-800 hover:text-white">Size Guide</a></li>
                <li><a href="/gift-cards" className="text-gray-800 hover:text-white">Gift Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-800 hover:text-white">Facebook</a></li>
                <li><a href="#" className="text-gray-800 hover:text-white">Instagram</a></li>
                <li><a href="#" className="text-gray-800 hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-800">
            <p>&copy; {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
