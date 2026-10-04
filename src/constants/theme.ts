import { Priority, Category } from '@/types/todo';

export interface ThemeColors {
  background: string;
  backgroundSecondary: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  success: string;
  successLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
  tabBar: string;
  tabBarBorder: string;
  tabBarActive: string;
  tabBarInactive: string;
  inputBackground: string;
  inputBorder: string;
  modalOverlay: string;
  divider: string;
  badgeBackground: string;
}

export const lightColors: ThemeColors = {
  background: '#F8FAFC',
  backgroundSecondary: '#F1F5F9',
  card: '#FFFFFF',
  cardBorder: '#E2E8F0',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  primary: '#2563EB',
  primaryLight: '#EFF6FF',
  primaryDark: '#1D4ED8',
  accent: '#7C3AED',
  success: '#059669',
  successLight: '#ECFDF5',
  warning: '#D97706',
  warningLight: '#FFFBEB',
  danger: '#DC2626',
  dangerLight: '#FEF2F2',
  tabBar: '#FFFFFF',
  tabBarBorder: '#E2E8F0',
  tabBarActive: '#2563EB',
  tabBarInactive: '#94A3B8',
  inputBackground: '#F1F5F9',
  inputBorder: '#CBD5E1',
  modalOverlay: 'rgba(15, 23, 42, 0.45)',
  divider: '#E2E8F0',
  badgeBackground: '#E2E8F0',
};

export const darkColors: ThemeColors = {
  background: '#090D16',
  backgroundSecondary: '#111827',
  card: '#151D30',
  cardBorder: '#1F293D',
  text: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  primary: '#38BDF8',
  primaryLight: 'rgba(56, 189, 248, 0.15)',
  primaryDark: '#0284C7',
  accent: '#A78BFA',
  success: '#34D399',
  successLight: 'rgba(52, 211, 153, 0.15)',
  warning: '#FBBF24',
  warningLight: 'rgba(251, 191, 36, 0.15)',
  danger: '#F87171',
  dangerLight: 'rgba(248, 113, 113, 0.15)',
  tabBar: '#101626',
  tabBarBorder: '#1F293D',
  tabBarActive: '#38BDF8',
  tabBarInactive: '#64748B',
  inputBackground: '#161F33',
  inputBorder: '#29374E',
  modalOverlay: 'rgba(0, 0, 0, 0.75)',
  divider: '#1F293D',
  badgeBackground: '#1F293D',
};

export const PriorityConfig: Record<Priority, { label: string; color: string; bgLight: string; bgDark: string; icon: string }> = {
  high: {
    label: 'High',
    color: '#EF4444',
    bgLight: '#FEE2E2',
    bgDark: 'rgba(239, 68, 68, 0.2)',
    icon: 'alert-circle',
  },
  medium: {
    label: 'Medium',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    bgDark: 'rgba(245, 158, 11, 0.2)',
    icon: 'time',
  },
  low: {
    label: 'Low',
    color: '#10B981',
    bgLight: '#D1FAE5',
    bgDark: 'rgba(16, 185, 129, 0.2)',
    icon: 'arrow-down-circle',
  },
};

export const CategoryConfig: Record<Category, { label: string; color: string; bgLight: string; bgDark: string; icon: string }> = {
  Work: {
    label: 'Work',
    color: '#3B82F6',
    bgLight: '#DBEAFE',
    bgDark: 'rgba(59, 130, 246, 0.2)',
    icon: 'briefcase-outline',
  },
  Personal: {
    label: 'Personal',
    color: '#8B5CF6',
    bgLight: '#EDE9FE',
    bgDark: 'rgba(139, 92, 246, 0.2)',
    icon: 'person-outline',
  },
  Shopping: {
    label: 'Shopping',
    color: '#EC4899',
    bgLight: '#FCE7F3',
    bgDark: 'rgba(236, 72, 153, 0.2)',
    icon: 'cart-outline',
  },
  Health: {
    label: 'Health',
    color: '#10B981',
    bgLight: '#D1FAE5',
    bgDark: 'rgba(16, 185, 129, 0.2)',
    icon: 'fitness-outline',
  },
  Finance: {
    label: 'Finance',
    color: '#F59E0B',
    bgLight: '#FEF3C7',
    bgDark: 'rgba(245, 158, 11, 0.2)',
    icon: 'wallet-outline',
  },
  Other: {
    label: 'Other',
    color: '#6366F1',
    bgLight: '#E0E7FF',
    bgDark: 'rgba(99, 102, 241, 0.2)',
    icon: 'bookmark-outline',
  },
};
