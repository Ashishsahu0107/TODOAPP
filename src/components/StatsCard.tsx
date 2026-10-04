import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';

export const StatsCard: React.FC = () => {
  const { colors } = useAppTheme();
  const { stats } = useTodos();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
        },
      ]}>
      {/* Top progress overview */}
      <View style={styles.topRow}>
        <View style={styles.titleWithIcon}>
          <View style={[styles.sparkleIconBox, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="sparkles" size={16} color={colors.primary} />
          </View>
          <View>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Daily Productivity</Text>
            <Text style={[styles.cardSubtitle, { color: colors.textSecondary }]}>
              {stats.total === 0
                ? 'No tasks created yet'
                : stats.completed === stats.total
                ? 'All tasks completed! Great job! 🎉'
                : `${stats.completed} of ${stats.total} tasks completed`}
            </Text>
          </View>
        </View>

        <View style={[styles.percentageBadge, { backgroundColor: colors.primaryLight }]}>
          <Text style={[styles.percentageText, { color: colors.primary }]}>
            {stats.completionRate}%
          </Text>
        </View>
      </View>

      {/* Progress track */}
      <View style={[styles.progressTrack, { backgroundColor: colors.backgroundSecondary }]}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor: colors.primary,
              width: `${stats.completionRate}%`,
            },
          ]}
        />
      </View>

      {/* Counters bottom row */}
      <View style={[styles.countersRow, { borderTopColor: colors.divider }]}>
        <View style={styles.counterItem}>
          <Text style={[styles.counterValue, { color: colors.text }]}>{stats.total}</Text>
          <Text style={[styles.counterLabel, { color: colors.textSecondary }]}>Total</Text>
        </View>

        <View style={[styles.counterDivider, { backgroundColor: colors.divider }]} />

        <View style={styles.counterItem}>
          <Text style={[styles.counterValue, { color: colors.warning }]}>{stats.incomplete}</Text>
          <Text style={[styles.counterLabel, { color: colors.textSecondary }]}>Pending</Text>
        </View>

        <View style={[styles.counterDivider, { backgroundColor: colors.divider }]} />

        <View style={styles.counterItem}>
          <Text style={[styles.counterValue, { color: colors.success }]}>{stats.completed}</Text>
          <Text style={[styles.counterLabel, { color: colors.textSecondary }]}>Done</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    // Subtle elevation
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  titleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  sparkleIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '500',
  },
  percentageBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  percentageText: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 14,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  countersRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  counterItem: {
    alignItems: 'center',
    flex: 1,
  },
  counterValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  counterLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  counterDivider: {
    width: 1,
    height: 22,
  },
});
