import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronUp } from 'lucide-react';

// Component that scrolls to top on route changes
export const ScrollToTopOnRouteChange: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Component that shows scroll to top button
export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-50"
      aria-label="Scroll to top"
    >
      <ChevronUp size={24} />
    </button>
  );
};

// Export both components
export const ScrollToTop = ScrollToTopButton;