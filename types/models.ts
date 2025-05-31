/**
 * Application data models and interfaces
 * These types represent the data structures used throughout the application.
 */

import { ApiResponse, PaginatedResponse } from './common';

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'admin' | 'editor' | 'author' | 'subscriber' | 'guest';

export interface UserProfile extends Omit<User, 'password'> {
  socialLinks?: SocialLink[];
  preferences?: UserPreferences;
}

export interface SocialLink {
  platform: string;
  url: string;
  username: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    newsletter: boolean;
  };
  privacy: {
    showEmail: boolean;
    showLastSeen: boolean;
  };
}

// Blog related types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  author: User;
  categories: Category[];
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  updatedAt: string;
  readingTime: number;
  viewCount: number;
  seo?: SeoMetadata;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  children?: Category[];
  postCount?: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  postId: string;
  parentId?: string;
  replies: Comment[];
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  updatedAt: string;
}

// SEO related types
export interface SeoMetadata {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonicalUrl?: string;
  noindex?: boolean;
  nofollow?: boolean;
  ogType?: 'website' | 'article' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

// Service related types
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  content: string;
  icon: string;
  featuredImage?: string;
  featured: boolean;
  price?: number;
  priceUnit?: 'hour' | 'project' | 'month' | 'year';
  features: string[];
  seo?: SeoMetadata;
  createdAt: string;
  updatedAt: string;
}

// Portfolio related types
export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage: string;
  images: string[];
  client?: string;
  website?: string;
  startDate?: string;
  endDate?: string;
  status: 'completed' | 'in-progress' | 'on-hold' | 'planned';
  technologies: string[];
  categories: Category[];
  featured: boolean;
  seo?: SeoMetadata;
  createdAt: string;
  updatedAt: string;
}

// Testimonial related types
export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

// Contact form types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
  company?: string;
}

// API response types
export type UserResponse = ApiResponse<User>;
export type UsersResponse = PaginatedResponse<User>;
export type BlogPostResponse = ApiResponse<BlogPost>;
export type BlogPostsResponse = PaginatedResponse<BlogPost>;
export type CategoryResponse = ApiResponse<Category>;
export type CategoriesResponse = PaginatedResponse<Category>;
export type CommentResponse = ApiResponse<Comment>;
export type CommentsResponse = PaginatedResponse<Comment>;
export type ServiceResponse = ApiResponse<Service>;
export type ServicesResponse = PaginatedResponse<Service>;
export type ProjectResponse = ApiResponse<Project>;
export type ProjectsResponse = PaginatedResponse<Project>;
export type TestimonialResponse = ApiResponse<Testimonial>;
export type TestimonialsResponse = PaginatedResponse<Testimonial>;
