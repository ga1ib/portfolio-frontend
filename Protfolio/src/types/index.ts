export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Array<{ msg: string; path: string }>;
}

export interface AuthUser {
  id: string;
  email: string;
}
