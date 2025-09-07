import { useState, useEffect } from 'react';
import { type ResearchOpsData, type LoadingState } from '../types';
import { airtableService } from '../lib/airtable';

export const useResearchOpsData = () => {
  const [researchOpsData, setResearchOpsData] = useState<ResearchOpsData | null>(null);
  const [loading, setLoading] = useState<LoadingState>({ isLoading: true, error: null });

  useEffect(() => {
    const fetchResearchOpsData = async () => {
      try {
        setLoading({ isLoading: true, error: null });
        const data = await airtableService.fetchResearchOpsData();
        setResearchOpsData(data);
        setLoading({ isLoading: false, error: null });
      } catch (error) {
        console.error('Error fetching research ops data:', error);
        setLoading({ 
          isLoading: false, 
          error: error instanceof Error ? error.message : 'Failed to fetch research ops data' 
        });
        setResearchOpsData(null);
      }
    };

    fetchResearchOpsData();
  }, []);

  return { researchOpsData, loading };
};