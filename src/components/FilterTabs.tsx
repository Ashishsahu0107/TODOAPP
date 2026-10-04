import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { FilterType } from '@/types/todo';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';

interface FilterTabsProps {
  currentFilter: FilterType;
  onSelectFilter: (filter: FilterType) => void;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ currentFilter, onSelectFilter }) => {
  const { colors } = useAppTheme();
  const { stats } = useTodos();

  const tabs: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.total },
    { key: 'incomplete', label: 'Incomplete', count: stats.incomplete },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.tabBar, { backgroundColor: colors.backgroundSecondary, borderColor: colors.cardBorder }]}>
        {tabs.map((tab) => {
          const isActive = currentFilter === tab.key;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onSelectFilter(tab.key)}
              style={({ pressed }) => [
                styles.tabButton,
                isActive && [styles.activeTabButton, { backgroundColor: colors.card }],
                { opacity: pressed ? 0.8 : 1 },
              ]}
              hitSlop={4}>
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.text : colors.textMuted },
                  isActive && styles.activeTabLabel,
                ]}>
                {tab.label}
              </Text>
              <View
                style={[
                  styles.counterBadge,
                  {
                    backgroundColor: isActive ? colors.primaryLight : colors.badgeBackground,
                  },
                ]}>
                <Text
                  style={[
                    styles.counterText,
                    {
                      color: isActive ? colors.primary : colors.textSecondary,
                    },
                  ]}>
                  {tab.count}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 6,
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 14,
    padding: 4,
    borderWidth: 1,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 10,
    gap: 6,
  },
  activeTabButton: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabLabel: {
    fontWeight: '700',
  },
  counterBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
