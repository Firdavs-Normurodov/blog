import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import useAuthStore from '../store/authStore';
import useScrollToSection from '../hooks/useScrollToSection';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const scrollToSection = useScrollToSection();

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (sectionId) => {
    if (isOpen) {
      toggleMenu();
    }
    scrollToSection(sectionId);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-colorT">
            Blogs
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home')}
              className="text-gray-600 hover:text-colorT transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('blogs')}
              className="text-gray-600 hover:text-colorT transition-colors"
            >
              Blogs
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-gray-600 hover:text-colorT transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-gray-600 hover:text-colorT transition-colors"
            >
              Contact
            </button>
            
            {/* Auth Links */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/user/profile"
                    className="flex items-center text-gray-600 hover:text-colorT transition-colors"
                  >
                    <User className="h-5 w-5 mr-1" />
                    {user?.username}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-colorT transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-gray-600 hover:text-colorT transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 bg-colorT text-white rounded-md hover:bg-colorT/90 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-600 hover:text-colorT transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavClick('home')}
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('blogs')}
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                Blogs
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="text-gray-600 hover:text-colorT transition-colors"
              >
                Contact
              </button>
             
              {/* Auth Links */}
              {isAuthenticated ? (
                <>
                  <Link
                    to="/user/profile"
                    className="flex items-center text-gray-600 hover:text-colorT transition-colors"
                    onClick={toggleMenu}
                  >
                    <User className="h-5 w-5 mr-1" />
                    {user?.username}
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center text-gray-600 hover:text-colorT transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-1" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-gray-600 hover:text-colorT transition-colors"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 bg-colorT text-white rounded-md hover:bg-colorT/90 transition-colors inline-block text-center"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
