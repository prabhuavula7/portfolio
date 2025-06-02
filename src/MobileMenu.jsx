// src/components/MobileMenu.jsx
import React from 'react';

const MobileMenu = ({ onClose, ThemeToggleButton, scrollToSection }) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      onClick={onClose} // Click outside closes the menu
    >
      <div
        className="md:hidden absolute top-0 left-0 w-full bg-white text-black dark:bg-black dark:text-white"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {/* Close Button */}
        <div className="w-full flex justify-end px-6 pt-6">
          <button
            onClick={onClose}
            className="text-black dark:text-white focus:outline-none"
            aria-label="Close Mobile Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col items-center py-4 space-y-4">
          {['about', 'experience', 'education', 'projects', 'values', 'contact'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={() => {
                scrollToSection(section);
                onClose();
              }}
              className="text-header-link hover:text-header-link-hover font-medium transition-colors w-full text-center py-2"
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </a>
          ))}

          {/* Theme Toggle Button */}
          <div className="w-full flex justify-center py-2">
            {ThemeToggleButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
