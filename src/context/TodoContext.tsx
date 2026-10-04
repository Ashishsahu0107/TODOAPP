import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { Alert } from 'react-native';
import { Task, TaskFormData, FilterType, Category, TaskStats } from '@/types/todo';
import { loadStoredTasks, saveStoredTasks } from '@/utils/storage';

interface TodoContextValue {
  tasks: Task[];
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: FilterType;
  setActiveFilter: (filter: FilterType) => void;
  selectedCategory: Category | 'All';
  setSelectedCategory: (category: Category | 'All') => void;
  stats: TaskStats;
  addTask: (data: TaskFormData) => void;
  editTask: (id: string, data: TaskFormData) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  clearCompletedTasks: () => void;
  getTasksByFilter: (filter: FilterType) => Task[];
  filteredTasks: Task[];
}

const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');

  // Load tasks on mount
  useEffect(() => {
    let isMounted = true;
    loadStoredTasks()
      .then((loaded) => {
        if (isMounted) {
          setTasks(loaded);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to load tasks', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Sync to AsyncStorage on task updates
  const updateTasks = useCallback((updater: (prev: Task[]) => Task[]) => {
    setTasks((prev) => {
      const next = updater(prev);
      saveStoredTasks(next);
      return next;
    });
  }, []);

  const addTask = useCallback((data: TaskFormData) => {
    const trimmedTitle = data.title.trim();
    if (!trimmedTitle) {
      Alert.alert('Required', 'Please enter a task title.');
      return;
    }

    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: trimmedTitle,
      description: data.description?.trim() || undefined,
      completed: false,
      priority: data.priority,
      category: data.category,
      createdAt: Date.now(),
    };

    updateTasks((prev) => [newTask, ...prev]);
  }, [updateTasks]);

  const editTask = useCallback((id: string, data: TaskFormData) => {
    const trimmedTitle = data.title.trim();
    if (!trimmedTitle) {
      Alert.alert('Required', 'Please enter a task title.');
      return;
    }

    updateTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: trimmedTitle,
              description: data.description?.trim() || undefined,
              priority: data.priority,
              category: data.category,
            }
          : t
      )
    );
  }, [updateTasks]);

  const deleteTask = useCallback((id: string) => {
    updateTasks((prev) => prev.filter((t) => t.id !== id));
  }, [updateTasks]);

  const toggleTask = useCallback((id: string) => {
    updateTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? Date.now() : undefined,
          };
        }
        return t;
      })
    );
  }, [updateTasks]);

  const clearCompletedTasks = useCallback(() => {
    const completedCount = tasks.filter((t) => t.completed).length;
    if (completedCount === 0) {
      Alert.alert('No Completed Tasks', 'There are no completed tasks to clear.');
      return;
    }

    Alert.alert(
      'Clear Completed Tasks',
      `Are you sure you want to permanently delete ${completedCount} completed task${
        completedCount > 1 ? 's' : ''
      }?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            updateTasks((prev) => prev.filter((t) => !t.completed));
          },
        },
      ]
    );
  }, [tasks, updateTasks]);

  const stats = useMemo<TaskStats>(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const incomplete = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return {
      total,
      completed,
      incomplete,
      completionRate,
    };
  }, [tasks]);

  const getTasksByFilter = useCallback(
    (filter: FilterType): Task[] => {
      let result = tasks;

      // Filter by completion status
      if (filter === 'incomplete') {
        result = result.filter((t) => !t.completed);
      } else if (filter === 'completed') {
        result = result.filter((t) => t.completed);
      }

      // Filter by category
      if (selectedCategory !== 'All') {
        result = result.filter((t) => t.category === selectedCategory);
      }

      // Filter by search query
      if (searchQuery.trim().length > 0) {
        const query = searchQuery.trim().toLowerCase();
        result = result.filter(
          (t) =>
            t.title.toLowerCase().includes(query) ||
            (t.description && t.description.toLowerCase().includes(query))
        );
      }

      return result;
    },
    [tasks, selectedCategory, searchQuery]
  );

  const filteredTasks = useMemo(() => {
    return getTasksByFilter(activeFilter);
  }, [getTasksByFilter, activeFilter]);

  const value = useMemo(
    () => ({
      tasks,
      isLoading,
      searchQuery,
      setSearchQuery,
      activeFilter,
      setActiveFilter,
      selectedCategory,
      setSelectedCategory,
      stats,
      addTask,
      editTask,
      deleteTask,
      toggleTask,
      clearCompletedTasks,
      getTasksByFilter,
      filteredTasks,
    }),
    [
      tasks,
      isLoading,
      searchQuery,
      activeFilter,
      selectedCategory,
      stats,
      addTask,
      editTask,
      deleteTask,
      toggleTask,
      clearCompletedTasks,
      getTasksByFilter,
      filteredTasks,
    ]
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export function useTodos(): TodoContextValue {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
