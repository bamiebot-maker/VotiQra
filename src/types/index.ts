// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

// Organization Types
export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  createdAt: string;
  updatedAt: string;
}

// Election Types
export interface Election {
  id: string;
  organizationId: string;
  title: string;
  description?: string;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'cancelled';
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
