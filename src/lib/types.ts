import type { Timestamp } from 'firebase/firestore';

export type UserProfile = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  purchasedCourses?: string[];
  role?: 'user' | 'admin';
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
  };
};

export type Lesson = {
  id: string;
  title: string;
  duration: number; // in minutes
  videoUrl?: string; // will be a signed URL
  youtubeVideoId?: string; // For YouTube videos
  content: string; // markdown content
  isPreview: boolean;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  imageId: string; // references placeholder-images.json
  teaserVideoUrl: string; // Path to a local teaser video
  category: 'Investing' | 'Debt' | 'Budgeting' | 'Advanced';
  duration: string;
  modules: Module[];
  instructor: {
    name: string;
    avatarId: string;
  };
  rating: number;
  studentsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  purchased?: boolean;
};
