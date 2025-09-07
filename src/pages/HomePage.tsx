import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Settings } from 'lucide-react';
import { useFeaturedProjects } from '../hooks/useProjects';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSkeleton } from '../components/LoadingSpinner';
import { getCategoryFromProject } from '../types';

export const HomePage: React.FC = () => {
  const { projects: featuredProjects, loading } = useFeaturedProjects();

  const researchProjects = featuredProjects.filter(
    project => getCategoryFromProject(project) === 'UX Research'
  );
  
  const opsProjects = featuredProjects.filter(
    project => getCategoryFromProject(project) === 'UX Research Operations'
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white dark:bg-gray-900 py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <div className="mb-8">
            <img 
              src="/profile-photo.jpg" 
              alt="Clark - UX Researcher"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto object-cover shadow-lg"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Hi, I'm Clark
          </h1>
          
          <p className="text-xl md:text-2xl text-research-600 dark:text-research-400 font-medium mb-8">
            UX Researcher
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            I help organizations make better user-centered decisions through strategic research and scalable operations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projects"
              className="btn-primary inline-flex items-center justify-center group px-6 py-3"
            >
              View Projects
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link
              to="/about"
              className="btn-secondary inline-flex items-center justify-center px-6 py-3"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-research-500 to-ops-500 bg-clip-text text-transparent font-bold text-lg tracking-wide uppercase">
                Portfolio Showcase
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Featured <span className="text-research-600 dark:text-research-400">Work</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Selected projects that demonstrate impact across diverse problem spaces,
              <span className="block mt-2 opacity-90">from user insights to operational improvements.</span>
            </p>
          </div>

          {loading.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <LoadingSkeleton key={i} />
              ))}
            </div>
          ) : loading.error ? (
            <div className="text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">
                Error loading featured projects: {loading.error}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="btn-primary"
              >
                Retry
              </button>
            </div>
          ) : featuredProjects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No featured projects found.
              </p>
              <Link to="/projects" className="btn-primary">
                View All Projects
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Category Highlights */}
      <section className="relative bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-gray-800 py-24 px-4 section-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Research <span className="text-ops-600 dark:text-ops-400">&</span> Operations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dual expertise in discovery and systematic enablement
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* UX Research */}
            <div className="relative group">
              <div className="card p-8 text-center h-full">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-research-100 to-research-200 dark:from-research-900 dark:to-research-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <BookOpen className="w-10 h-10 text-research-600 dark:text-research-400" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-research-400 to-research-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  UX Research
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Uncovering user needs and behaviors through qualitative and quantitative research methods 
                  to drive product decisions.
                </p>
                {researchProjects.length > 0 && (
                  <div className="space-y-3 mb-8">
                    <p className="text-sm font-bold text-research-700 dark:text-research-300 uppercase tracking-wide">
                      Featured Projects:
                    </p>
                    {researchProjects.slice(0, 3).map(project => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.fields.slug}`}
                        className="block text-research-600 dark:text-research-400 hover:text-research-700 dark:hover:text-research-300 font-medium transition-colors duration-200 hover:translate-x-2"
                      >
                        → {project.fields.title}
                      </Link>
                    ))}
                  </div>
                )}
                
                <Link
                  to="/projects?category=UX Research"
                  className="inline-flex items-center text-research-600 dark:text-research-400 hover:text-research-700 dark:hover:text-research-300 font-bold group transition-all duration-200"
                >
                  View All Research Projects
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Research Operations */}
            <div className="relative group">
              <div className="card p-8 text-center h-full">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-ops-100 to-ops-200 dark:from-ops-900 dark:to-ops-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Settings className="w-10 h-10 text-ops-600 dark:text-ops-400" />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-ops-400 to-ops-600 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-all duration-300"></div>
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Research Operations
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto text-lg leading-relaxed">
                  Scaling research impact through systematic processes, tools, and frameworks 
                  that enable teams to make user-centered decisions.
                </p>
                
                {opsProjects.length > 0 && (
                  <div className="space-y-3 mb-8">
                    <p className="text-sm font-bold text-ops-700 dark:text-ops-300 uppercase tracking-wide">
                      Featured Projects:
                    </p>
                    {opsProjects.slice(0, 3).map(project => (
                      <Link
                        key={project.id}
                        to={`/projects/${project.fields.slug}`}
                        className="block text-ops-600 dark:text-ops-400 hover:text-ops-700 dark:hover:text-ops-300 font-medium transition-colors duration-200 hover:translate-x-2"
                      >
                        → {project.fields.title}
                      </Link>
                    ))}
                  </div>
                )}
                
                <Link
                  to="/projects?category=UX Research Operations"
                  className="inline-flex items-center text-ops-600 dark:text-ops-400 hover:text-ops-700 dark:hover:text-ops-300 font-bold group transition-all duration-200"
                >
                  View All Operations Projects
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-research-50 via-white to-ops-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 section-pattern opacity-30"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <div className="glass-card p-12 mx-4">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-research-500 to-ops-500 bg-clip-text text-transparent font-bold text-lg tracking-wide uppercase">
                Ready to Collaborate?
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
              Let's Work <span className="text-accent-600 dark:text-accent-400">Together</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              Interested in collaborating or learning more about my approach to UX research?
              <span className="block mt-2 opacity-90">Let's discuss how research can drive your product decisions.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                Get In Touch
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};