import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, LogOut, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-500';
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:space-x-10">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <BookOpen className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TutorMatch</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`text-base ${isActive('/')}`}>Главная</Link>
            <Link to="/tutors" className={`text-base ${isActive('/tutors')}`}>Найти репетиторов</Link>
            <Link to="/subjects" className={`text-base ${isActive('/subjects')}`}>Предметы</Link>
            <Link to="/how-it-works" className={`text-base ${isActive('/how-it-works')}`}>Как это работает</Link>
          </nav>
          
          {/* Desktop Authentication */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/dashboard" 
                  className="flex items-center text-gray-600 hover:text-blue-500"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>{user?.name}</span>
                </Link>
                <button 
                  onClick={logout}
                  className="flex items-center text-gray-600 hover:text-red-500"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  <span>Выйти</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-base font-medium text-gray-600 hover:text-blue-500"
                >
                  Войти
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Регистрация
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Открыть главное меню</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/')}`}
              onClick={closeMenu}
            >
              Главная
            </Link>
            <Link 
              to="/tutors" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/tutors')}`}
              onClick={closeMenu}
            >
              Найти репетиторов
            </Link>
            <Link 
              to="/subjects" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/subjects')}`}
              onClick={closeMenu}
            >
              Предметы
            </Link>
            <Link 
              to="/how-it-works" 
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive('/how-it-works')}`}
              onClick={closeMenu}
            >
              Как это работает
            </Link>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  Панель управления
                </Link>
                <button 
                  onClick={() => { logout(); closeMenu(); }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-red-500 hover:bg-gray-50"
                >
                  Выйти
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  Войти
                </Link>
                <Link 
                  to="/register" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={closeMenu}
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;