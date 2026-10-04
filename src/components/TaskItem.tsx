import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task } from '@/types/todo';
import { PriorityConfig, CategoryConfig, ThemeColors } from '@/constants/theme';
import { formatTaskDate } from '@/utils/date';

interface TaskItemProps {
  task: Task;
  colors: ThemeColors;
  isDark: boolean;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItemComponent: React.FC<TaskItemProps> = ({
  task,
  colors,
  isDark,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const priorityInfo = PriorityConfig[task.priority] || PriorityConfig.medium;
  const categoryInfo = CategoryConfig[task.category] || CategoryConfig.Other;

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      `Are you sure you want to delete "${task.title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: task.completed ? colors.divider : colors.cardBorder,
          opacity: task.completed ? 0.75 : 1,
        },
      ]}>
      {/* Checkbox button */}
      <Pressable
        onPress={() => onToggle(task.id)}
        style={({ pressed }) => [
          styles.checkbox,
          {
            borderColor: task.completed ? colors.success : colors.cardBorder,
            backgroundColor: task.completed
              ? colors.success
              : isDark
              ? colors.backgroundSecondary
              : '#FFFFFF',
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        hitSlop={10}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.completed }}
        accessibilityLabel={`Mark "${task.title}" as ${task.completed ? 'incomplete' : 'complete'}`}>
        {task.completed ? (
          <Ionicons name="checkmark-sharp" size={16} color="#FFFFFF" />
        ) : null}
      </Pressable>

      {/* Task Content */}
      <Pressable
        onPress={() => onToggle(task.id)}
        style={styles.contentArea}>
        <View style={styles.topInfoRow}>
          {/* Category badge */}
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isDark ? categoryInfo.bgDark : categoryInfo.bgLight,
              },
            ]}>
            <Ionicons
              name={categoryInfo.icon as any}
              size={12}
              color={categoryInfo.color}
              style={{ marginRight: 4 }}
            />
            <Text style={[styles.badgeText, { color: categoryInfo.color }]}>
              {categoryInfo.label}
            </Text>
          </View>

          {/* Priority badge */}
          <View
            style={[
              styles.badge,
              {
                backgroundColor: isDark ? priorityInfo.bgDark : priorityInfo.bgLight,
              },
            ]}>
            <Ionicons
              name={priorityInfo.icon as any}
              size={12}
              color={priorityInfo.color}
              style={{ marginRight: 3 }}
            />
            <Text style={[styles.badgeText, { color: priorityInfo.color }]}>
              {priorityInfo.label}
            </Text>
          </View>

          {/* Date */}
          <Text style={[styles.dateText, { color: colors.textMuted }]}>
            {formatTaskDate(task.createdAt)}
          </Text>
        </View>

        {/* Task Title */}
        <Text
          numberOfLines={2}
          style={[
            styles.title,
            {
              color: task.completed ? colors.textMuted : colors.text,
              textDecorationLine: task.completed ? 'line-through' : 'none',
            },
          ]}>
          {task.title}
        </Text>

        {/* Task Description (if any) */}
        {task.description ? (
          <Text
            numberOfLines={2}
            style={[
              styles.description,
              {
                color: task.completed ? colors.textMuted : colors.textSecondary,
                textDecorationLine: task.completed ? 'line-through' : 'none',
              },
            ]}>
            {task.description}
          </Text>
        ) : null}
      </Pressable>

      {/* Actions (Edit and Delete) */}
      <View style={styles.actionButtons}>
        <Pressable
          onPress={() => onEdit(task)}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          hitSlop={8}
          accessibilityLabel={`Edit ${task.title}`}>
          <Ionicons name="create-outline" size={18} color={colors.textSecondary} />
        </Pressable>

        <Pressable
          onPress={handleDelete}
          style={({ pressed }) => [
            styles.actionButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
          hitSlop={8}
          accessibilityLabel={`Delete ${task.title}`}>
          <Ionicons name="trash-outline" size={18} color={colors.danger} />
        </Pressable>
      </View>
    </View>
  );
};

// Optimized React.memo for low-end device rendering efficiency
export const TaskItem = React.memo(TaskItemComponent, (prev, next) => {
  return (
    prev.task.id === next.task.id &&
    prev.task.title === next.task.title &&
    prev.task.description === next.task.description &&
    prev.task.completed === next.task.completed &&
    prev.task.priority === next.task.priority &&
    prev.task.category === next.task.category &&
    prev.isDark === next.isDark &&
    prev.colors === next.colors
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 16,
    borderWidth: 1,
    // Low performance overhead shadow
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 8,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contentArea: {
    flex: 1,
    justifyContent: 'center',
  },
  topInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  dateText: {
    fontSize: 11,
    fontWeight: '500',
    marginLeft: 'auto',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingLeft: 10,
  },
  actionButton: {
    padding: 2,
  },
});
