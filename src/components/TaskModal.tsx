import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, Priority, Category, TaskFormData } from '@/types/todo';
import { PriorityConfig, CategoryConfig } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';

interface TaskModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  initialTask?: Task | null;
}

const ALL_PRIORITIES: Priority[] = ['low', 'medium', 'high'];
const ALL_CATEGORIES: Category[] = ['Work', 'Personal', 'Shopping', 'Health', 'Finance', 'Other'];

interface TaskModalContentProps {
  onClose: () => void;
  onSave: (data: TaskFormData) => void;
  initialTask?: Task | null;
}

const TaskModalContent: React.FC<TaskModalContentProps> = ({
  onClose,
  onSave,
  initialTask,
}) => {
  const { colors, isDark } = useAppTheme();

  const [title, setTitle] = useState(initialTask ? initialTask.title : '');
  const [priority, setPriority] = useState<Priority>(initialTask ? initialTask.priority : 'medium');
  const [category, setCategory] = useState<Category>(initialTask ? initialTask.category : 'Work');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) {
      setErrorMessage('Task title is required');
      return;
    }
    onSave({
      title: title.trim(),
      priority,
      category,
    });
    onClose();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.overlay, { backgroundColor: colors.modalOverlay }]}>
      <View style={[styles.sheet, { backgroundColor: colors.card, borderColor: colors.cardBorder }]}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.modalTitle, { color: colors.text }]}>
            {initialTask ? 'Edit Task' : 'New Task'}
          </Text>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              { backgroundColor: colors.backgroundSecondary, opacity: pressed ? 0.7 : 1 },
            ]}
            hitSlop={8}>
            <Ionicons name="close" size={20} color={colors.textSecondary} />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.formScroll}>
          {/* Title Input */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>Title *</Text>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              if (errorMessage) setErrorMessage('');
            }}
            placeholder="What needs to be done?"
            placeholderTextColor={colors.textMuted}
            style={[
              styles.textInput,
              {
                backgroundColor: colors.inputBackground,
                borderColor: errorMessage ? colors.danger : colors.inputBorder,
                color: colors.text,
              },
            ]}
            autoFocus={!initialTask}
          />
          {errorMessage ? (
            <Text style={[styles.errorText, { color: colors.danger }]}>{errorMessage}</Text>
          ) : null}

          {/* Priority Selector */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>Priority</Text>
          <View style={styles.priorityRow}>
            {ALL_PRIORITIES.map((p) => {
              const config = PriorityConfig[p];
              const isSelected = priority === p;
              return (
                <Pressable
                  key={p}
                  onPress={() => setPriority(p)}
                  style={({ pressed }) => [
                    styles.priorityOption,
                    {
                      backgroundColor: isSelected
                        ? isDark
                          ? config.bgDark
                          : config.bgLight
                        : colors.inputBackground,
                      borderColor: isSelected ? config.color : colors.inputBorder,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}>
                  <Ionicons
                    name={config.icon as any}
                    size={16}
                    color={isSelected ? config.color : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.priorityText,
                      { color: isSelected ? config.color : colors.textSecondary },
                      isSelected && { fontWeight: '700' },
                    ]}>
                    {config.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Category Selector */}
          <Text style={[styles.label, { color: colors.textSecondary }]}>Category</Text>
          <View style={styles.categoryWrap}>
            {ALL_CATEGORIES.map((c) => {
              const config = CategoryConfig[c];
              const isSelected = category === c;
              return (
                <Pressable
                  key={c}
                  onPress={() => setCategory(c)}
                  style={({ pressed }) => [
                    styles.categoryOption,
                    {
                      backgroundColor: isSelected
                        ? isDark
                          ? config.bgDark
                          : config.bgLight
                        : colors.inputBackground,
                      borderColor: isSelected ? config.color : colors.inputBorder,
                      opacity: pressed ? 0.8 : 1,
                    },
                  ]}>
                  <Ionicons
                    name={config.icon as any}
                    size={14}
                    color={isSelected ? config.color : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      { color: isSelected ? config.color : colors.textSecondary },
                      isSelected && { fontWeight: '700' },
                    ]}>
                    {config.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Action Footer */}
        <View style={[styles.footer, { borderTopColor: colors.divider }]}>
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.cancelButton,
              { backgroundColor: colors.backgroundSecondary, opacity: pressed ? 0.7 : 1 },
            ]}>
            <Text style={[styles.cancelText, { color: colors.textSecondary }]}>Cancel</Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            style={({ pressed }) => [
              styles.submitButton,
              { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
            ]}>
            <Ionicons
              name={initialTask ? 'checkmark-circle-outline' : 'add-circle-outline'}
              size={18}
              color="#FFFFFF"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.submitText}>
              {initialTask ? 'Save Changes' : 'Create Task'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export const TaskModal: React.FC<TaskModalProps> = ({
  visible,
  onClose,
  onSave,
  initialTask,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <TaskModalContent
        key={initialTask ? `edit-${initialTask.id}` : 'new-task'}
        onClose={onClose}
        onSave={onSave}
        initialTask={initialTask}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheet: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    maxHeight: '88%',
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 14,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formScroll: {
    paddingHorizontal: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textInput: {
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
  },
  priorityOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 6,
  },
  priorityText: {
    fontSize: 13,
    fontWeight: '600',
  },
  categoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingTop: 14,
    gap: 12,
    borderTopWidth: 1,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    fontSize: 15,
    fontWeight: '700',
  },
  submitButton: {
    flex: 2,
    flexDirection: 'row',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
