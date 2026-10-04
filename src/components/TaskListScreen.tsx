import React, { useState, useCallback } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
  Text,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Task, FilterType, TaskFormData } from '@/types/todo';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { CategoryChips } from '@/components/CategoryChips';
import { FilterTabs } from '@/components/FilterTabs';
import { StatsCard } from '@/components/StatsCard';
import { TaskItem } from '@/components/TaskItem';
import { TaskModal } from '@/components/TaskModal';
import { EmptyState } from '@/components/EmptyState';
import { FloatingAddButton } from '@/components/FloatingAddButton';

interface TaskListScreenProps {
  filterType: FilterType;
  title: string;
  subtitle?: string;
  showStats?: boolean;
  showTopSegmentTabs?: boolean;
}

export const TaskListScreen: React.FC<TaskListScreenProps> = ({
  filterType,
  title,
  subtitle,
  showStats = true,
  showTopSegmentTabs = true,
}) => {
  const insets = useSafeAreaInsets();
  const { colors, isDark } = useAppTheme();
  const {
    isLoading,
    getTasksByFilter,
    addTask,
    editTask,
    deleteTask,
    toggleTask,
  } = useTodos();

  const [activeTabFilter, setActiveTabFilter] = useState<FilterType>(filterType);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // If this screen is tied to a specific filter (e.g. Incomplete or Completed screen),
  // we use that screen's filter; on the "All" screen, user can also toggle the top segment tabs.
  const currentFilter = showTopSegmentTabs ? activeTabFilter : filterType;
  const tasksToDisplay = getTasksByFilter(currentFilter);

  const handleOpenAddModal = useCallback(() => {
    setEditingTask(null);
    setModalVisible(true);
  }, []);

  const handleOpenEditModal = useCallback((task: Task) => {
    setEditingTask(task);
    setModalVisible(true);
  }, []);

  const handleSaveTask = useCallback(
    (formData: TaskFormData) => {
      if (editingTask) {
        editTask(editingTask.id, formData);
      } else {
        addTask(formData);
      }
    },
    [editingTask, editTask, addTask]
  );

  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => (
      <TaskItem
        task={item}
        colors={colors}
        isDark={isDark}
        onToggle={toggleTask}
        onEdit={handleOpenEditModal}
        onDelete={deleteTask}
      />
    ),
    [colors, isDark, toggleTask, handleOpenEditModal, deleteTask]
  );

  const keyExtractor = useCallback((item: Task) => item.id, []);

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}>
      {/* Header */}
      <Header title={title} subtitle={subtitle} />

      {/* Main List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
            Loading your tasks...
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasksToDisplay}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListHeaderComponent={
            <View>
              {showStats && <StatsCard />}
              <SearchBar />
              {showTopSegmentTabs && (
                <FilterTabs
                  currentFilter={activeTabFilter}
                  onSelectFilter={setActiveTabFilter}
                />
              )}
              <CategoryChips />
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
                  {currentFilter === 'all'
                    ? 'ALL TASKS'
                    : currentFilter === 'incomplete'
                    ? 'PENDING TASKS'
                    : 'COMPLETED TASKS'}{' '}
                  ({tasksToDisplay.length})
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <EmptyState
              filterType={currentFilter}
              onAddTask={handleOpenAddModal}
            />
          }
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: insets.bottom + 90 },
          ]}
          // Optimizations for low-end Android devices
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          updateCellsBatchingPeriod={50}
          initialNumToRender={8}
          windowSize={5}
        />
      )}

      {/* Floating Action Button */}
      <FloatingAddButton onPress={handleOpenAddModal} />

      {/* Add / Edit Task Modal */}
      <TaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  sectionHeader: {
    paddingHorizontal: 22,
    paddingTop: 10,
    paddingBottom: 6,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
