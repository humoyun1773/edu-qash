import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();
  const [key, setKey] = useState(location.pathname);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(false);
    const t = setTimeout(() => {
      setKey(location.pathname);
      setIsVisible(true);
    }, 60); // minimal delay for re-mount trigger
    return () => clearTimeout(t);
  }, [location.pathname]);

  return (
    <div
      key={key}
      className={isVisible ? 'page-enter' : 'opacity-0'}
      style={{ minHeight: 'inherit' }}
    >
      {children}
    </div>
  );
};
