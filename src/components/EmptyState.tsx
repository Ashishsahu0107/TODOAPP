import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterType } from '@/types/todo';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';

interface EmptyStateProps {
  filterType: FilterType;
  onAddTask?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filterType, onAddTask }) => {
  const { colors, isDark } = useAppTheme();
  const { searchQuery, setSearchQuery } = useTodos();

  const isSearching = searchQuery.trim().length > 0;

  let iconName: any = 'checkbox-outline';
  let title = 'No Tasks Yet';
  let description = 'Start organizing your day by tapping the button below to add your first task.';
  let showAddBtn = true;
  let showClearSearchBtn = false;

  if (isSearching) {
    iconName = 'search-outline';
    title = 'No Matching Tasks';
    description = `We couldn't find any tasks matching "${searchQuery}". Try a different keyword or reset search.`;
    showAddBtn = false;
    showClearSearchBtn = true;
  } else if (filterType === 'completed') {
    iconName = 'checkmark-done-circle-outline';
    title = 'No Completed Tasks';
    description = 'Tasks you complete will appear here. Keep going and check off your goals!';
    showAddBtn = false;
  } else if (filterType === 'incomplete') {
    iconName = 'sparkles-outline';
    title = 'All Caught Up! 🎉';
    description = 'You have cleared all pending tasks. Take a break or plan something new.';
    showAddBtn = true;
  }

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.iconCircle,
          {
            backgroundColor: isDark ? colors.backgroundSecondary : colors.card,
            borderColor: colors.cardBorder,
          },
        ]}>
        <Ionicons name={iconName} size={48} color={colors.primary} />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.textSecondary }]}>{description}</Text>

      {showClearSearchBtn && (
        <Pressable
          onPress={() => setSearchQuery('')}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.backgroundSecondary, borderColor: colors.cardBorder, opacity: pressed ? 0.8 : 1 },
          ]}>
          <Ionicons name="close-circle-outline" size={16} color={colors.text} style={{ marginRight: 6 }} />
          <Text style={[styles.buttonText, { color: colors.text }]}>Clear Search</Text>
        </Pressable>
      )}

      {showAddBtn && onAddTask && (
        <Pressable
          onPress={onAddTask}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.primary, borderColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}>
          <Ionicons name="add" size={18} color="#FFFFFF" style={{ marginRight: 4 }} />
          <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Create New Task</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingVertical: 50,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
