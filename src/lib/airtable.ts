import Airtable from 'airtable';
import { type PortfolioProject, type AboutData, type ResearchOpsData } from '../types';

// Initialize Airtable
const AIRTABLE_PAT = import.meta.env.VITE_AIRTABLE_PAT;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;

if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
  console.warn('Airtable configuration missing. Please check your environment variables.');
}

// Configure Airtable with PAT
// Note: For newer Airtable SDK versions, PAT is passed as apiKey
const base = new Airtable({ 
  apiKey: AIRTABLE_PAT 
}).base(AIRTABLE_BASE_ID);

export class AirtableService {
  private static instance: AirtableService;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  public static getInstance(): AirtableService {
    if (!AirtableService.instance) {
      AirtableService.instance = new AirtableService();
    }
    return AirtableService.instance;
  }

  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  async fetchProjects(): Promise<PortfolioProject[]> {
    const cacheKey = 'all_projects';
    const cached = this.cache.get(cacheKey);

    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    try {
      if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
        console.log('Missing Airtable credentials');
        return [];
      }

      console.log('Fetching from Airtable with Base ID:', AIRTABLE_BASE_ID?.substring(0, 8) + '...');
      
      const records = await base('Case Studies').select({
        view: 'Grid view',
        sort: [
          { field: 'featured_id', direction: 'asc' }
        ]
      }).all();

      const projects: PortfolioProject[] = records.map(record => ({
        id: record.id,
        fields: {
          image: record.fields.image as any,
          content: record.fields.content as string || '',
          slug: record.fields.slug as string || '',
          url: record.fields.url as string,
          tags: Array.isArray(record.fields.tags) ? record.fields.tags as string[] : [],
          featured_id: record.fields.featured_id as number,
          category: record.fields.category as 'UX Research' | 'UX Research Operations',
          title: record.fields.title as string,
          description: record.fields.description as string,
        },
        createdTime: record._rawJson.createdTime || new Date().toISOString(),
      }));

      // Cache the results
      this.cache.set(cacheKey, { data: projects, timestamp: Date.now() });

      return projects;
    } catch (error) {
      console.error('Error fetching projects from Airtable:', error);
      
      // Return cached data if available, otherwise return empty array
      if (cached) {
        return cached.data;
      }
      
      return [];
    }
  }

  async fetchProjectBySlug(slug: string): Promise<PortfolioProject | null> {
    try {
      const projects = await this.fetchProjects();
      return projects.find(project => project.fields.slug === slug) || null;
    } catch (error) {
      console.error('Error fetching project by slug:', error);
      return null;
    }
  }

  async fetchFeaturedProjects(): Promise<PortfolioProject[]> {
    try {
      const projects = await this.fetchProjects();
      return projects
        .filter(project => Boolean(project.fields.featured_id))
        .sort((a, b) => (a.fields.featured_id || 0) - (b.fields.featured_id || 0))
        .slice(0, 3);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  }

  async fetchUXResearchProjects(): Promise<PortfolioProject[]> {
    try {
      const projects = await this.fetchProjects();
      return projects.filter(project => {
        if (project.fields.category) {
          return project.fields.category === 'UX Research';
        }
        return project.fields.tags.includes('UX Research') && !project.fields.tags.includes('UX Research Operations');
      });
    } catch (error) {
      console.error('Error fetching UX Research projects:', error);
      return [];
    }
  }

  // Deprecated: Research Operations projects are now handled separately via Research Ops table
  async fetchProjectsByCategory(category: 'UX Research' | 'UX Research Operations'): Promise<PortfolioProject[]> {
    console.warn('fetchProjectsByCategory is deprecated. Use fetchUXResearchProjects() instead.');
    if (category === 'UX Research') {
      return this.fetchUXResearchProjects();
    }
    // Return empty array for Research Operations as they're now in separate table
    return [];
  }

  // New method to fetch About data by page
  async fetchAboutDataByPage(page: string): Promise<AboutData | null> {
    const cacheKey = `about_${page}`;
    const cached = this.cache.get(cacheKey);

    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    try {
      if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
        console.log('Missing Airtable credentials for About data');
        return null;
      }

      console.log('Fetching About data for page:', page);
      
      const records = await base('About').select({
        filterByFormula: `{page} = '${page}'`,
        view: 'Grid view'
      }).all();

      if (records.length === 0) {
        console.log(`No About data found for page: ${page}`);
        return null;
      }

      const record = records[0];
      const aboutData: AboutData = {
        id: record.id,
        fields: {
          description: record.fields.description as string || '',
          page: record.fields.page as string || page,
          image: record.fields.image as any,
        },
        createdTime: record._rawJson.createdTime || new Date().toISOString(),
      };

      // Cache the results
      this.cache.set(cacheKey, { data: aboutData, timestamp: Date.now() });

      return aboutData;
    } catch (error) {
      console.error('Error fetching About data from Airtable:', error);
      
      // Return cached data if available, otherwise return null
      if (cached) {
        return cached.data;
      }
      
      return null;
    }
  }

  // New method to fetch Research Ops data
  async fetchResearchOpsData(): Promise<ResearchOpsData | null> {
    const cacheKey = 'research_ops';
    const cached = this.cache.get(cacheKey);

    if (cached && this.isCacheValid(cached.timestamp)) {
      return cached.data;
    }

    try {
      if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID) {
        console.log('Missing Airtable credentials for Research Ops data');
        return null;
      }

      console.log('Fetching Research Ops data');
      
      const records = await base('Research Ops').select({
        view: 'Grid view'
      }).all();

      if (records.length === 0) {
        console.log('No Research Ops data found');
        return null;
      }

      const record = records[0]; // Taking first record as it's expected to be a single row
      const researchOpsData: ResearchOpsData = {
        id: record.id,
        fields: {
          name: record.fields.name as string || '',
          pdf: record.fields.pdf as any,
          url: record.fields.url as string,
        },
        createdTime: record._rawJson.createdTime || new Date().toISOString(),
      };

      // Cache the results
      this.cache.set(cacheKey, { data: researchOpsData, timestamp: Date.now() });

      return researchOpsData;
    } catch (error) {
      console.error('Error I from Airtable:', error);
      
      // Return cached data if available, otherwise return null
      if (cached) {
        return cached.data;
      }
      
      return null;
    }
  }


  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const airtableService = AirtableService.getInstance();