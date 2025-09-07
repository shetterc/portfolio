import { useState, useEffect } from 'react';
import { type AboutData, type LoadingState } from '../types';
import { airtableService } from '../lib/airtable';

export const useAboutData = (page: string) => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setLoading({ isLoading: true, error: null });
        const data = await airtableService.fetchAboutDataByPage(page);
        setAboutData(data);
        setLoading({ isLoading: false, error: null });
      } catch (error) {
        console.error(`Error fetching about data for page ${page}:`, error);
        setLoading({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch about data' 
        });
        setAboutData(null);
      }
    };

    fetchAboutData();
  }, [page]);

  return { aboutData, loading };
};

export const useHeroData = () => useAboutData('hero');
export const useAboutPageData = () => useAboutData('about');