import { useState, useRef, useEffect } from 'react';
import Movies from '../Movies/Movies';

const Carousel = ({ items, title }) => {
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const containerRef = useRef(null);

  const checkScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -containerRef.current.offsetWidth : containerRef.current.offsetWidth;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="relative group">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors duration-300">
          {title}
          <div className="h-1 w-20 bg-emerald-500 mt-2 rounded-full transform origin-left group-hover:scale-x-110 transition-transform duration-300" />
        </h2>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        {showLeftButton && (
          <button
            onClick={() => scroll('left')}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-900/90 text-white 
            opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-500 transform hover:scale-110
            shadow-lg hover:shadow-emerald-500/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        {showRightButton && (
          <button
            onClick={() => scroll('right')}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-900/90 text-white 
            opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-500 transform hover:scale-110
            shadow-lg hover:shadow-emerald-500/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        {/* Carousel Content */}
        <div
          ref={containerRef}
          className="flex gap-6 overflow-x-auto hide-scroll-bar scroll-smooth pb-4"
          onScroll={checkScroll}
        >
          {items.map((item) => (
            <div key={item.id} className="flex-shrink-0 w-[280px] transform transition-transform duration-300 hover:scale-105">
              <Movies filme={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
