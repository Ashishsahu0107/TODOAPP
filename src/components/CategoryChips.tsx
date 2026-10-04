import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Category } from '@/types/todo';
import { CategoryConfig } from '@/constants/theme';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';

const ALL_CATEGORIES: (Category | 'All')[] = [
  'All',
  'Work',
  'Personal',
  'Shopping',
  'Health',
  'Finance',
  'Other',
];

export const CategoryChips: React.FC = () => {
  const { colors, isDark } = useAppTheme();
  const { selectedCategory, setSelectedCategory } = useTodos();

  return (
    <ScrollView
      horizontal
      nestedScrollEnabled={true}
      directionalLockEnabled={true}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.container}>
      {ALL_CATEGORIES.map((cat) => {
        const isSelected = selectedCategory === cat;
        const config = cat === 'All' ? null : CategoryConfig[cat];

        // Clean icon: use layers-outline for 'All' so it renders crisp vector icon without dot artifacts
        const iconName = cat === 'All' ? 'layers-outline' : (config?.icon as any);
        const brandColor = config ? config.color : colors.primary;

        let chipBg = isDark ? colors.card : '#FFFFFF';
        let chipBorder = colors.cardBorder;
        let textColor = colors.textSecondary;
        let iconColor = brandColor;

        if (isSelected) {
          chipBg = colors.primary;
          chipBorder = colors.primary;
          textColor = '#FFFFFF';
          iconColor = '#FFFFFF';
        }

        return (
          <Pressable
            key={cat}
            onPress={() => setSelectedCategory(cat)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: chipBg,
                borderColor: chipBorder,
                opacity: pressed ? 0.75 : 1,
              },
            ]}
            hitSlop={6}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={`Filter by ${cat}`}>
            <Ionicons
              name={iconName}
              size={15}
              color={iconColor}
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                { color: textColor },
                isSelected && styles.selectedLabel,
              ]}>
              {cat}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
  },
  selectedLabel: {
    fontWeight: '700',
  },
});
