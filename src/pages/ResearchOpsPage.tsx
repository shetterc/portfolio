import React from 'react';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useResearchOpsData } from '../hooks/useResearchOpsData';
import { PDFCarousel } from '../components/PDFCarousel';

export const ResearchOpsPage: React.FC = () => {
  const { researchOpsData, loading } = useResearchOpsData();

  if (loading.isLoading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Loading Skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-8"></div>
            <div className="h-96 bg-gray-300 dark:bg-gray-600 rounded mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Research Operations
            </h1>
            <p className="text-red-600 dark:text-red-400 mb-8">
              Error loading Research Operations data: {loading.error}
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-ops-600 hover:text-ops-700 dark:text-ops-400 dark:hover:text-ops-300 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!researchOpsData) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Research Operations
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Research Operations portfolio data is not available at the moment.
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-ops-600 hover:text-ops-700 dark:text-ops-400 dark:hover:text-ops-300 font-medium"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-ops-600 hover:text-ops-700 dark:text-ops-400 dark:hover:text-ops-300 font-medium transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-ops-500 to-teal-500 bg-clip-text text-transparent font-bold text-lg tracking-wide uppercase">
              Research Operations Portfolio
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
            {researchOpsData.fields.name || 'Research Operations'}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Systematic approaches to scaling user research impact through processes, tools, and frameworks 
            that enable teams to make user-centered decisions efficiently.
          </p>
        </div>

        {/* PDF Portfolio Section */}
        {researchOpsData.fields.pdf && researchOpsData.fields.pdf.length > 0 && (
          <section className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Portfolio Documentation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Interactive portfolio showcase with detailed case studies, frameworks, and process documentation.
              </p>
            </div>
            
            <PDFCarousel 
              pdfs={researchOpsData.fields.pdf}
              className="mb-8"
            />
          </section>
        )}

        {/* External Portfolio Link */}
        {researchOpsData.fields.url && (
          <section className="mb-16">
            <div className="bg-gradient-to-br from-ops-50 via-white to-teal-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-12 text-center">
              <div className="inline-block mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-ops-100 to-ops-200 dark:from-ops-900 dark:to-ops-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <ExternalLink className="w-10 h-10 text-ops-600 dark:text-ops-400" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Full Portfolio Experience
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Explore the complete Research Operations portfolio with interactive case studies, 
                detailed process documentation, and comprehensive framework resources.
              </p>
              
              <a
                href={researchOpsData.fields.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-ops-600 to-teal-600 text-white font-bold rounded-lg hover:from-ops-700 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View Complete Portfolio
                <ExternalLink size={20} className="ml-2" />
              </a>
            </div>
          </section>
        )}

        {/* Capabilities Overview */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ops-100 dark:bg-ops-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-ops-600 dark:bg-ops-400 rounded-sm"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Process Design
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Standardized workflows and templates that ensure research consistency and quality across teams.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ops-100 dark:bg-ops-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-ops-600 dark:bg-ops-400 rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Tool Implementation
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Research tool evaluation, setup, and optimization to maximize team productivity and insights.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-ops-100 dark:bg-ops-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-ops-600 dark:bg-ops-400 rounded-lg rotate-45"></div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Knowledge Management
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Research repositories and systems that make insights discoverable and actionable for product teams.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-gradient-to-br from-research-50 via-white to-ops-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Interested in Research Operations?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss how research operations can scale your team's impact and improve decision-making processes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-primary text-lg px-8 py-4"
              >
                Get In Touch
              </Link>
              <Link
                to="/projects"
                className="btn-secondary text-lg px-8 py-4"
              >
                View Case Studies
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};