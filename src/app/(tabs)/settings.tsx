import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';
import { ThemeMode } from '@/types/todo';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, themeMode, setThemeMode } = useAppTheme();
  const { stats, clearCompletedTasks } = useTodos();

  const themeOptions: { mode: ThemeMode; label: string; icon: string }[] = [
    { mode: 'system', label: 'System Default', icon: 'phone-portrait-outline' },
    { mode: 'light', label: 'Light Mode', icon: 'sunny-outline' },
    { mode: 'dark', label: 'Dark Mode', icon: 'moon-outline' },
  ];

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top + 10,
        },
      ]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Settings & Stats</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Preferences & storage management
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 80 }]}>
        {/* Appearance Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>APPEARANCE</Text>
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}>
          {themeOptions.map((opt, idx) => {
            const isSelected = themeMode === opt.mode;
            return (
              <Pressable
                key={opt.mode}
                onPress={() => setThemeMode(opt.mode)}
                style={({ pressed }) => [
                  styles.optionRow,
                  idx < themeOptions.length - 1 && [
                    styles.rowBorder,
                    { borderBottomColor: colors.divider },
                  ],
                  { opacity: pressed ? 0.7 : 1 },
                ]}>
                <View style={styles.optionLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      {
                        backgroundColor: isSelected
                          ? colors.primaryLight
                          : colors.backgroundSecondary,
                      },
                    ]}>
                    <Ionicons
                      name={opt.icon as any}
                      size={18}
                      color={isSelected ? colors.primary : colors.textSecondary}
                    />
                  </View>
                  <Text
                    style={[
                      styles.optionLabel,
                      { color: colors.text },
                      isSelected && { fontWeight: '700' },
                    ]}>
                    {opt.label}
                  </Text>
                </View>
                {isSelected && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Task Statistics Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>TASK OVERVIEW</Text>
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total Created Tasks</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>{stats.total}</Text>
          </View>
          <View style={[styles.statRow, styles.rowBorder, { borderBottomColor: colors.divider }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Pending Tasks</Text>
            <Text style={[styles.statValue, { color: colors.warning }]}>{stats.incomplete}</Text>
          </View>
          <View style={[styles.statRow, styles.rowBorder, { borderBottomColor: colors.divider }]}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed Tasks</Text>
            <Text style={[styles.statValue, { color: colors.success }]}>{stats.completed}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Overall Completion Rate</Text>
            <Text style={[styles.statValue, { color: colors.primary }]}>{stats.completionRate}%</Text>
          </View>
        </View>

        {/* Storage Management Section */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>STORAGE & DATA</Text>
        <View
          style={[
            styles.sectionCard,
            { backgroundColor: colors.card, borderColor: colors.cardBorder },
          ]}>
          <Pressable
            onPress={clearCompletedTasks}
            style={({ pressed }) => [
              styles.optionRow,
              styles.rowBorder,
              { borderBottomColor: colors.divider, opacity: pressed ? 0.7 : 1 },
            ]}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.dangerLight }]}>
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </View>
              <View>
                <Text style={[styles.optionLabel, { color: colors.danger, fontWeight: '700' }]}>
                  Clear Completed Tasks
                </Text>
                <Text style={[styles.optionHelp, { color: colors.textMuted }]}>
                  Permanently remove {stats.completed} finished task{stats.completed === 1 ? '' : 's'}
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <View style={[styles.iconCircle, { backgroundColor: colors.primaryLight }]}>
                <Ionicons name="save-outline" size={18} color={colors.primary} />
              </View>
              <View>
                <Text style={[styles.optionLabel, { color: colors.text }]}>Local AsyncStorage</Text>
                <Text style={[styles.optionHelp, { color: colors.textMuted }]}>
                  All tasks are stored offline on your device
                </Text>
              </View>
            </View>
            <Ionicons name="checkmark-done" size={18} color={colors.success} />
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Text style={[styles.appVersionText, { color: colors.textMuted }]}>
            TodoApp Mobile • React Native + Expo Router
          </Text>
          <Text style={[styles.appVersionSub, { color: colors.textMuted }]}>
            Built with TypeScript & AsyncStorage
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 22,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  sectionCard: {
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowBorder: {
    borderBottomWidth: 1,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  optionHelp: {
    fontSize: 12,
    marginTop: 2,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 15,
    fontWeight: '800',
  },
  appInfoContainer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  appVersionText: {
    fontSize: 12,
    fontWeight: '600',
  },
  appVersionSub: {
    fontSize: 11,
    marginTop: 2,
  },
});
