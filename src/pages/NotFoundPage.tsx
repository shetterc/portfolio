import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-8">🔍</div>
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn-primary inline-flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn-secondary inline-flex items-center justify-center"
          >
            <ArrowLeft size={20} className="mr-2" />
            Go Back
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/projects"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
            >
              View Projects
            </Link>
            <Link
              to="/about"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
            >
              About Me
            </Link>
            <Link
              to="/contact"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};