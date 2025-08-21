import React from 'react';

const ScrollToTop = ({ showScrollTop }) => {
  if (!showScrollTop) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 p-3 bg-black/40 text-white backdrop-blur-sm rounded-full shadow-lg hover:bg-orange-500 hover:text-black transition-all duration-300 opacity-90 hover:opacity-100"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTop;
