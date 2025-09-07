import React, { type ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};