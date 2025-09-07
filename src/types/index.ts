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

export interface ProjectFilters {
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

// Helper function to check if project is a UX Research project
export const isUXResearchProject = (project: PortfolioProject): boolean => {
  if (project.fields.category) {
    return project.fields.category === 'UX Research';
  }
  return project.fields.tags.includes('UX Research') && !project.fields.tags.includes('UX Research Operations');
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

// New About interface for dynamic content
export interface AboutData {
  id: string;
  fields: {
    description: string; // markdown content
    page: string; // "hero" | "about"
    image?: AirtableAttachment[]; // hero/profile image
  };
  createdTime: string;
}

// New Research Ops interface
export interface ResearchOpsData {
  id: string;
  fields: {
    name: string; // portfolio title
    pdf?: AirtableAttachment[]; // PDF file(s) for carousel
    url?: string; // external portfolio link
  };
  createdTime: string;
}

// Helper function to get image URL from About data
export const getAboutImageUrl = (aboutData: AboutData): string | null => {
  if (aboutData.fields.image && aboutData.fields.image.length > 0) {
    return aboutData.fields.image[0].url;
  }
  return null;
};

// Helper function to get Research Ops PDF URLs
export const getResearchOpsPDFUrls = (researchOpsData: ResearchOpsData): string[] => {
  if (researchOpsData.fields.pdf && researchOpsData.fields.pdf.length > 0) {
    return researchOpsData.fields.pdf.map(pdf => pdf.url);
  }
  return [];
};