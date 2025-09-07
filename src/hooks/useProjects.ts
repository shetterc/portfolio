import { useState, useEffect } from 'react';
import { type PortfolioProject, type LoadingState } from '../types';
import { airtableService } from '../lib/airtable';

export const useProjects = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading({ isLoading: true, error: null });
        const data = await airtableService.fetchProjects();
        setProjects(data);
        setLoading({ isLoading: false, error: null });
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch projects' 
        });
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading };
};

export const useProject = (slug: string) => {
  const [project, setProject] = useState<PortfolioProject | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

  useEffect(() => {
    if (!slug) {
      setLoading({ isLoading: false, error: 'No slug provided' });
      return;
    }

    const fetchProject = async () => {
      try {
        setLoading({ isLoading: true, error: null });
        const data = await airtableService.fetchProjectBySlug(slug);
        setProject(data);
        setLoading({ isLoading: false, error: data ? null : 'Project not found' });
      } catch (error) {
        console.error('Error fetching project:', error);
        setLoading({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch project' 
        });
      }
    };

    fetchProject();
  }, [slug]);

  return { project, loading };
};

export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setLoading({ isLoading: true, error: null });
        const data = await airtableService.fetchFeaturedProjects();
        setProjects(data);
        setLoading({ isLoading: false, error: null });
      } catch (error) {
        console.error('Error fetching featured projects:', error);
        setLoading({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch featured projects' 
        });
      }
    };

    fetchFeaturedProjects();
  }, []);

  return { projects, loading };
};

// Deprecated: Categories are no longer used
// export const useProjectsByCategory = (category: ProjectCategory) => { ... }