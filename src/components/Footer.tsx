import React from 'react';
import { Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Clark
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              UX Researcher helping organizations make better user-centered decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/projects" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="/about" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="/contact" 
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
              Connect
            </h4>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@example.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://linkedin.com/in/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} Clark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};