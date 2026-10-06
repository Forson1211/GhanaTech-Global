export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceItem {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  capabilities: string[] | ServiceCapability[];
  image?: string;
  icon?: string;
  status: 'published' | 'draft';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface TechnologyCategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  rolesCount?: number;
  icon?: string;
  status: 'published' | 'draft';
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}
