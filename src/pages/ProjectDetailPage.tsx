import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useProject } from '../hooks/useProjects';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { getCategoryFromProject, getProjectImageUrl } from '../types';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { project, loading } = useProject(slug || '');

  if (loading.isLoading) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (loading.error || !project) {
    return (
      <div className="min-h-screen py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-4">😞</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            {loading.error || 'The project you are looking for could not be found.'}
          </p>
          <Link to="/projects" className="btn-primary">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const category = getCategoryFromProject(project);
  const imageUrl = getProjectImageUrl(project);
  const formattedDate = project.createdTime 
    ? new Date(project.createdTime).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/projects"
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-8 group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          Back to Projects
        </Link>

        {/* Hero Image */}
        {imageUrl && (
          <div className="w-full h-64 md:h-96 mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={imageUrl}
              alt={project.fields.title || 'Project image'}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span 
              className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                category === 'UX Research' 
                  ? 'badge-research' 
                  : 'badge-ops'
              }`}
            >
              {category}
            </span>
            {formattedDate && (
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Calendar size={16} className="mr-1" />
                {formattedDate}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {project.fields.title || 'Untitled Project'}
          </h1>

          {project.fields.description && (
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {project.fields.description}
            </p>
          )}

          {/* External Link */}
          {project.fields.url && (
            <a
              href={project.fields.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mb-8"
            >
              View Live Project
              <ExternalLink size={20} className="ml-2" />
            </a>
          )}

          {/* Tags */}
          {project.fields.tags && project.fields.tags.length > 0 && (
            <div className="flex items-start gap-2 mb-8">
              <Tag size={20} className="text-gray-500 dark:text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-2">
                {project.fields.tags
                  .filter(tag => !['UX Research', 'UX Research Operations'].includes(tag))
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none 
                        prose-headings:font-semibold 
                        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl 
                        prose-p:leading-relaxed prose-p:mb-4
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-white
                        prose-ul:list-disc prose-ul:ml-6 prose-li:mb-2
                        prose-img:rounded-lg prose-img:shadow-md">
          {project.fields.content ? (
            <ReactMarkdown>{project.fields.content}</ReactMarkdown>
          ) : (
            <p className="text-gray-500 italic">No content available for this project.</p>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Link
              to="/projects"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group"
            >
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
              All Projects
            </Link>
            
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Interested in working together?
              </p>
              <Link to="/contact" className="btn-primary">
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};