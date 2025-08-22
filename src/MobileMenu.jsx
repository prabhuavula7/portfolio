// src/components/MobileMenu.jsx
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const MobileMenu = ({ onClose, ThemeToggleButton, scrollToSection }) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'projects', label: 'Projects' },
    { id: 'values', label: 'Values' },
    { id: 'contact', label: 'Contact' }
  ];

  // Debug: Check scroll state when menu opens
  useEffect(() => {
    console.log('Mobile menu opened - checking scroll state:');
    console.log('Body overflow:', document.body.style.overflow);
    console.log('HTML overflow:', document.documentElement.style.overflow);
    console.log('Body scrollHeight:', document.body.scrollHeight);
    console.log('Window scrollY:', window.scrollY);
    
    // Ensure scrolling is enabled
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.position = '';
    document.documentElement.style.position = '';
    
    console.log('After reset - Body overflow:', document.body.style.overflow);
    console.log('After reset - HTML overflow:', document.documentElement.style.overflow);
  }, []);

  const handleNavClick = (section) => {
    // Close menu first
    onClose();
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      scrollToSection(section);
    }, 100);
  };

  return (
    <div
      className="mobile-menu-overlay fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose} // Click outside closes the menu
    >
      <div
        className="mobile-menu-content md:hidden absolute top-0 left-0 w-full bg-white text-black dark:bg-black dark:text-white shadow-2xl transform transition-transform duration-300 ease-in-out"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {/* Header with close button */}
        <div className="w-full flex justify-between items-center px-6 py-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-header-link">Menu</h2>
          <button
            onClick={onClose}
            className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none p-2 rounded-lg transition-colors"
            aria-label="Close Mobile Menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left text-header-link hover:text-header-link-hover font-medium transition-all duration-300 w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Theme Toggle Button */}
        <div className="w-full flex justify-center py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="px-6">
            {ThemeToggleButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
