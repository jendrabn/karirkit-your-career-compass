export interface PortfolioMedia {
  id: string;
  portfolio_id: string;
  path: string;
  caption: string;
}

export interface PortfolioTool {
  id: string;
  portfolio_id: string;
  name: string;
}

export type ProjectType = "work" | "personal" | "freelance" | "academic";

export interface Portfolio {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  sort_description: string;
  description: string;
  role_title: string;
  project_type: ProjectType;
  industry: string;
  month: number;
  year: number;
  live_url: string;
  repo_url: string;
  cover: string;
  created_at: string;
  updated_at: string;
  medias: PortfolioMedia[];
  tools: PortfolioTool[];
}

export type SocialPlatform = "linkedin" | "github" | "twitter" | "instagram" | "facebook" | "youtube" | "dribbble" | "behance" | "website";

export interface SocialLink {
  id: string;
  user_id: string;
  platform: SocialPlatform;
  url: string;
  created_at: string;
  updated_at: string;
}

export interface PortfolioUser {
  id: string;
  name: string;
  username: string;
  headline: string;
  bio: string;
  location: string;
  avatar: string;
  social_links: SocialLink[];
}

export interface PortfolioListResponse {
  user: PortfolioUser;
  portfolios: Portfolio[];
}

export interface PortfolioDetailResponse {
  user: PortfolioUser;
  portfolio: Portfolio;
}

export const projectTypeLabels: Record<ProjectType, string> = {
  work: "Pekerjaan",
  personal: "Personal",
  freelance: "Freelance",
  academic: "Akademik",
};

export const socialPlatformLabels: Record<SocialPlatform, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  twitter: "Twitter",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  dribbble: "Dribbble",
  behance: "Behance",
  website: "Website",
};
