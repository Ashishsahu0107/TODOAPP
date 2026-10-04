import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, ThemeMode } from '@/types/todo';

const TASKS_STORAGE_KEY = '@todoapp_tasks_v2';
const LEGACY_STORAGE_KEY = '@todoapp_tasks_v1';
const THEME_STORAGE_KEY = '@todoapp_theme_mode_v1';

export async function loadStoredTasks(): Promise<Task[]> {
  try {
    // Check current storage key
    let rawData = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    
    // Check legacy storage key and clean it up if needed
    if (rawData === null) {
      const legacyData = await AsyncStorage.getItem(LEGACY_STORAGE_KEY);
      if (legacyData !== null) {
        rawData = legacyData;
        await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
      }
    }

    if (rawData !== null) {
      const parsed = JSON.parse(rawData);
      if (Array.isArray(parsed)) {
        // Strip out any previous sample/dummy tasks
        const userTasks = parsed.filter(
          (t: Task) => t && t.id && !t.id.startsWith('sample-task')
        );
        await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(userTasks));
        return userTasks;
      }
    }

    // Default: completely empty list (no dummy data)
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify([]));
    return [];
  } catch (error) {
    console.error('Error loading tasks from AsyncStorage:', error);
    return [];
  }
}

export async function saveStoredTasks(tasks: Task[]): Promise<boolean> {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
    return true;
  } catch (error) {
    console.error('Error saving tasks to AsyncStorage:', error);
    return false;
  }
}

export async function loadStoredTheme(): Promise<ThemeMode> {
  try {
    const raw = await AsyncStorage.getItem(THEME_STORAGE_KEY);
    if (raw === 'light' || raw === 'dark' || raw === 'system') {
      return raw;
    }
    return 'system';
  } catch (error) {
    console.error('Error loading theme from AsyncStorage:', error);
    return 'system';
  }
}

export async function saveStoredTheme(mode: ThemeMode): Promise<boolean> {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    return true;
  } catch (error) {
    console.error('Error saving theme to AsyncStorage:', error);
    return false;
  }
}

export async function clearStorage(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TASKS_STORAGE_KEY);
    await AsyncStorage.removeItem(LEGACY_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
}
