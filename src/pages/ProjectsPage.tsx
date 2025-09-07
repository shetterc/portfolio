import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSkeleton } from '../components/LoadingSpinner';
import { type ProjectCategory, type PortfolioProject, getCategoryFromProject } from '../types';

export const ProjectsPage: React.FC = () => {
  const { projects, loading } = useProjects();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProjects, setFilteredProjects] = useState<PortfolioProject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>(
    (searchParams.get('category') as ProjectCategory) || 'All'
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = Array.from(
    new Set(
      projects
        .flatMap(project => project.fields.tags)
        .filter(tag => !['UX Research', 'UX Research Operations'].includes(tag))
    )
  ).sort();

  // Filter projects based on current filters
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(project => getCategoryFromProject(project) === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(project =>
        project.fields.title?.toLowerCase().includes(searchLower) ||
        project.fields.description?.toLowerCase().includes(searchLower) ||
        project.fields.content.toLowerCase().includes(searchLower) ||
        project.fields.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(project =>
        selectedTags.every(tag => project.fields.tags.includes(tag))
      );
    }

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm, selectedTags]);

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSelectedTags([]);
    setSearchParams({});
  };

  const categories: ProjectCategory[] = ['All', 'UX Research', 'UX Research Operations'];

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
            Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore my portfolio of UX research projects and research operations initiatives.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center mb-3">
                <Filter className="h-4 w-4 text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by skills:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                      selectedTags.includes(tag)
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Filters & Clear */}
          {(selectedCategory !== 'All' || searchTerm || selectedTags.length > 0) && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span>Active filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {selectedCategory}
                  </span>
                )}
                {selectedTags.map(tag => (
                  <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
                {searchTerm && (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                    "{searchTerm}"
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your filters or search terms.
            </p>
            <button onClick={clearFilters} className="btn-primary">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};