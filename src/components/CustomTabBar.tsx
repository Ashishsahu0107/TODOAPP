import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/context/ThemeContext';
import { useTodos } from '@/context/TodoContext';

interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const { stats } = useTodos();

  const getTabInfo = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case 'index':
        return {
          label: 'All Tasks',
          icon: focused ? 'list' : 'list-outline',
          badge: stats.total > 0 ? stats.total : null,
          badgeColor: colors.primary,
        };
      case 'incomplete':
        return {
          label: 'Pending',
          icon: focused ? 'time' : 'time-outline',
          badge: stats.incomplete > 0 ? stats.incomplete : null,
          badgeColor: colors.warning,
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: focused ? 'checkmark-done-circle' : 'checkmark-done-circle-outline',
          badge: stats.completed > 0 ? stats.completed : null,
          badgeColor: colors.success,
        };
      case 'settings':
        return {
          label: 'Settings',
          icon: focused ? 'settings' : 'settings-outline',
          badge: null,
          badgeColor: colors.primary,
        };
      default:
        return {
          label: routeName,
          icon: 'ellipse-outline',
          badge: null,
          badgeColor: colors.primary,
        };
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          paddingBottom: Math.max(insets.bottom, 12),
        },
      ]}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;
        const { label, icon, badge, badgeColor } = getTabInfo(route.name, isFocused);
        const itemColor = isFocused ? colors.tabBarActive : colors.tabBarInactive;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={({ pressed }) => [
              styles.tabButton,
              { opacity: pressed ? 0.75 : 1 },
            ]}
            accessibilityRole="tab"
            accessibilityState={{ selected: isFocused }}
            accessibilityLabel={label}>
            <View style={styles.iconWrapper}>
              <Ionicons name={icon as any} size={23} color={itemColor} />
              {badge !== null && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor: badgeColor,
                      borderColor: colors.tabBar,
                    },
                  ]}>
                  <Text style={styles.badgeText}>
                    {badge > 99 ? '99+' : badge}
                  </Text>
                </View>
              )}
            </View>
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                {
                  color: itemColor,
                  fontWeight: isFocused ? '700' : '500',
                },
              ]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    paddingTop: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  iconWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 34,
    height: 26,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    zIndex: 10,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '800',
    lineHeight: 12,
  },
  label: {
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});
