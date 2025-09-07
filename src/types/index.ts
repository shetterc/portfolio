export interface AirtableAttachment {
  id: string;
  url: string;
  filename: string;
  size: number;
  type: string;
  width?: number;
  height?: number;
  thumbnails?: {
    small: { url: string; width: number; height: number };
    large: { url: string; width: number; height: number };
    full: { url: string; width: number; height: number };
  };
}

export interface PortfolioProject {
  id: string;
  fields: {
    image?: AirtableAttachment[];
    content: string; // markdown
    slug: string;
    url?: string; // external link
    tags: string[]; // includes categories and skills
    featured_id?: number; // for featured projects
    category?: 'UX Research' | 'UX Research Operations'; // optional dedicated field
    title?: string; // project title
    description?: string; // short description
    created_time?: string;
  };
  createdTime: string;
}

export type ProjectCategory = 'UX Research' | 'UX Research Operations' | 'All';

export interface ProjectFilters {
  category: ProjectCategory;
  tags: string[];
  search: string;
}

export interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Helper function to determine category if using tags approach
export const getProjectCategory = (tags: string[]): ProjectCategory => {
  if (tags.includes('UX Research Operations')) return 'UX Research Operations';
  if (tags.includes('UX Research')) return 'UX Research';
  return 'UX Research'; // default fallback
};

// Helper function to get category from project
export const getCategoryFromProject = (project: PortfolioProject): ProjectCategory => {
  if (project.fields.category) {
    return project.fields.category;
  }
  return getProjectCategory(project.fields.tags);
};

// Helper function to check if project is featured
export const isProjectFeatured = (project: PortfolioProject): boolean => {
  return Boolean(project.fields.featured_id);
};

// Helper function to get project image URL
export const getProjectImageUrl = (project: PortfolioProject): string | null => {
  if (project.fields.image && project.fields.image.length > 0) {
    return project.fields.image[0].url;
  }
  return null;
};

// Helper function to get project thumbnail URL
export const getProjectThumbnailUrl = (project: PortfolioProject): string | null => {
  if (project.fields.image && project.fields.image.length > 0) {
    const image = project.fields.image[0];
    return image.thumbnails?.large?.url || image.url;
  }
  return null;
};