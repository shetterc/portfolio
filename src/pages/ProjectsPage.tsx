import React from 'react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSkeleton } from '../components/LoadingSpinner';

export const ProjectsPage: React.FC = () => {
  const { projects, loading } = useProjects();

  if (loading.isLoading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (loading.error) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Projects
          </h1>
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">
              Error loading projects: {loading.error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Case Studies
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of UX research case studies and research methodologies.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No case studies available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Case studies will appear here when they are published.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};