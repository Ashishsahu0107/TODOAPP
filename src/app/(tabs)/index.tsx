import React from 'react';
import { TaskListScreen } from '@/components/TaskListScreen';

export default function AllTasksScreen() {
  return (
    <TaskListScreen
      filterType="all"
      title="My Tasks"
      subtitle="Keep track of your daily goals"
      showStats={true}
      showTopSegmentTabs={true}
    />
  );
}
