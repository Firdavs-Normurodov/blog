import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';
import useScrollToSection from '../hooks/useScrollToSection';

const Footer = () => {
  const scrollToSection = useScrollToSection();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-colorT mb-4 inline-block">
              BlogApp
            </Link>
            <p className="text-gray-600 mb-4">
              A modern blogging platform where you can share your thoughts, stories,
              and experiences with the world. Join our community of writers and readers.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'home')}
                  className="text-gray-600 hover:text-colorT transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="text-gray-600 hover:text-colorT transition-colors"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'blogs')}
                  className="text-gray-600 hover:text-colorT transition-colors"
                >
                  Blogs
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-gray-600 hover:text-colorT transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">
                Email: contact@blogapp.com
              </li>
              <li className="text-gray-600">
                Phone: +1 (555) 123-4567
              </li>
              <li className="text-gray-600">
                Address: 123 Blog Street, CA 94105, USA
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} BlogApp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
