export type Priority = 'low' | 'medium' | 'high';

export type Category = 'Work' | 'Personal' | 'Shopping' | 'Health' | 'Finance' | 'Other';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  createdAt: number;
  completedAt?: number;
}

export type FilterType = 'all' | 'incomplete' | 'completed';

export type ThemeMode = 'system' | 'light' | 'dark';

export interface TaskStats {
  total: number;
  completed: number;
  incomplete: number;
  completionRate: number; // 0 to 100
}

export interface TaskFormData {
  title: string;
  description?: string;
  priority: Priority;
  category: Category;
}
