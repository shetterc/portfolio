import Airtable from 'airtable';
import { type PortfolioProject } from '../types';

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
  private cache: Map<string, { data: PortfolioProject[]; timestamp: number }> = new Map();
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
        console.log('Missing Airtable credentials, using mock data');
        // Return mock data for development
        return this.getMockProjects();
      }

      console.log('Fetching from Airtable with Base ID:', AIRTABLE_BASE_ID?.substring(0, 8) + '...');
      
      const records = await base('Case Studies').select({
        view: 'Grid view',
        sort: [
          { field: 'featured_id', direction: 'desc' }
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
      
      // Return cached data if available, otherwise return mock data
      if (cached) {
        return cached.data;
      }
      
      return this.getMockProjects();
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
      return projects.filter(project => Boolean(project.fields.featured_id));
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      return [];
    }
  }

  async fetchProjectsByCategory(category: 'UX Research' | 'UX Research Operations'): Promise<PortfolioProject[]> {
    try {
      const projects = await this.fetchProjects();
      return projects.filter(project => {
        if (project.fields.category) {
          return project.fields.category === category;
        }
        return project.fields.tags.includes(category);
      });
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      return [];
    }
  }

  private getMockProjects(): PortfolioProject[] {
    return [
      {
        id: '1',
        fields: {
          title: 'Banking App User Research',
          slug: 'banking-app-user-research',
          content: '# Banking App User Research\n\nThis project involved comprehensive user research for a mobile banking application, including user interviews, usability testing, and behavioral analysis.\n\n## Key Findings\n\n- Users prioritize security and trust indicators\n- Simple navigation is crucial for daily banking tasks\n- Mobile-first approach needed for younger demographics\n\n## Methodology\n\n- 15 user interviews\n- 3 rounds of usability testing\n- Quantitative survey with 200+ responses',
          tags: ['UX Research', 'User Interviews', 'Usability Testing', 'Mobile'],
          category: 'UX Research',
          featured_id: 1,
          description: 'Comprehensive user research study for a mobile banking application focusing on user behavior and trust factors.',
          url: 'https://example.com/banking-research',
        },
        createdTime: '2024-01-15T10:00:00.000Z',
      },
      {
        id: '2',
        fields: {
          title: 'Research Operations Framework',
          slug: 'research-ops-framework',
          content: '# Research Operations Framework\n\nDeveloped a comprehensive research operations framework to scale user research across multiple product teams.\n\n## Framework Components\n\n- Research repository and knowledge management\n- Standardized research processes and templates\n- Participant recruitment and management system\n- Research tools evaluation and implementation\n\n## Impact\n\n- 40% reduction in research setup time\n- Improved research quality and consistency\n- Better cross-team collaboration',
          tags: ['UX Research Operations', 'Process Design', 'Tool Implementation', 'Knowledge Management'],
          category: 'UX Research Operations',
          featured_id: 2,
          description: 'Framework for scaling user research operations across multiple product teams with improved efficiency.',
        },
        createdTime: '2024-02-01T10:00:00.000Z',
      },
      {
        id: '3',
        fields: {
          title: 'E-commerce Checkout Optimization',
          slug: 'ecommerce-checkout-optimization',
          content: '# E-commerce Checkout Optimization\n\nA/B testing and user research study to optimize the checkout flow for an e-commerce platform.\n\n## Research Methods\n\n- Comparative usability testing\n- Analytics analysis\n- Post-purchase surveys\n- Heat map analysis\n\n## Results\n\n- 23% increase in conversion rate\n- 15% reduction in cart abandonment\n- Improved user satisfaction scores',
          tags: ['UX Research', 'A/B Testing', 'Conversion Optimization', 'E-commerce'],
          category: 'UX Research',
          description: 'Optimization study for e-commerce checkout flow resulting in significant conversion improvements.',
        },
        createdTime: '2024-03-10T10:00:00.000Z',
      }
    ];
  }

  clearCache(): void {
    this.cache.clear();
  }
}

// Export singleton instance
export const airtableService = AirtableService.getInstance();