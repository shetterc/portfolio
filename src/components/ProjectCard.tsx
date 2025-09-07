import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Calendar } from 'lucide-react';
import { type PortfolioProject, getCategoryFromProject, getProjectThumbnailUrl } from '../types';

interface ProjectCardProps {
  project: PortfolioProject;
  showCategory?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  showCategory = true 
}) => {
  const category = getCategoryFromProject(project);
  const imageUrl = getProjectThumbnailUrl(project);
  const formattedDate = project.createdTime 
    ? new Date(project.createdTime).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
    : null;

  return (
    <div className="card group relative">
      {/* Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt={project.fields.title || 'Project image'}
              className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-research-50 to-ops-50 dark:from-research-900/20 dark:to-ops-900/20"></div>
            <div className="text-center relative z-10">
              <div className="text-5xl mb-3 opacity-60">🔍</div>
              <div className="text-sm font-medium">Research Preview</div>
            </div>
          </div>
        )}
        
        {/* Overlay with external link */}
        {project.fields.url && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
            <a
              href={project.fields.url}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-gray-900 p-3 rounded-full shadow-xl transition-all duration-300 hover:bg-white hover:scale-110 border border-white/20"
              onClick={(e) => e.stopPropagation()}
              aria-label="Open external link"
            >
              <ExternalLink size={20} />
            </a>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-7">
        {/* Category Badge */}
        {showCategory && (
          <div className="flex items-center justify-between mb-4">
            <span 
              className={`inline-flex transition-all duration-200 group-hover:scale-105 ${
                category === 'UX Research' 
                  ? 'badge-research' 
                  : 'badge-ops'
              }`}
            >
              {category}
            </span>
            {formattedDate && (
              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                <Calendar size={12} className="mr-1.5" />
                {formattedDate}
              </div>
            )}
          </div>
        )}

        {/* Title & Description */}
        <Link to={`/projects/${project.fields.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-research-600 dark:group-hover:text-research-400 transition-colors duration-300 leading-tight">
            {project.fields.title || 'Untitled Project'}
          </h3>
        </Link>
        
        {project.fields.description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3 leading-relaxed">
            {project.fields.description}
          </p>
        )}

        {/* Tags */}
        {project.fields.tags && project.fields.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.fields.tags
              .filter(tag => !['UX Research', 'UX Research Operations'].includes(tag))
              .slice(0, 3)
              .map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600 hover:scale-105 transition-transform duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            {project.fields.tags.filter(tag => !['UX Research', 'UX Research Operations'].includes(tag)).length > 3 && (
              <span className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 text-gray-500 dark:text-gray-400 rounded-full text-xs font-medium border border-gray-200 dark:border-gray-600">
                +{project.fields.tags.filter(tag => !['UX Research', 'UX Research Operations'].includes(tag)).length - 3} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};