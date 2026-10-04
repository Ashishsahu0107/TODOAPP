import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';

interface HeaderProps {
  title: string;
  subtitle?: string;
  showClearCompleted?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, showClearCompleted = true }) => {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const { stats, clearCompletedTasks } = useTodos();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
        ) : null}
      </View>

      <View style={styles.actionsRow}>
        {showClearCompleted && stats.completed > 0 && (
          <Pressable
            onPress={clearCompletedTasks}
            style={({ pressed }) => [
              styles.iconButton,
              {
                backgroundColor: colors.dangerLight,
                borderColor: colors.danger,
                opacity: pressed ? 0.7 : 1,
              },
            ]}
            hitSlop={8}
            accessibilityLabel="Clear completed tasks">
            <Ionicons name="trash-outline" size={19} color={colors.danger} />
          </Pressable>
        )}

        <Pressable
          onPress={toggleTheme}
          style={({ pressed }) => [
            styles.iconButton,
            {
              backgroundColor: colors.card,
              borderColor: colors.cardBorder,
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          hitSlop={8}
          accessibilityLabel="Toggle Light and Dark Mode">
          <Ionicons
            name={isDark ? 'sunny' : 'moon'}
            size={19}
            color={isDark ? '#FBBF24' : colors.primary}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
