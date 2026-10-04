import React from 'react';
import { TaskListScreen } from '@/components/TaskListScreen';

export default function IncompleteTasksScreen() {
  return (
    <TaskListScreen
      filterType="incomplete"
      title="Pending"
      subtitle="Tasks to focus on right now"
      showStats={false}
      showTopSegmentTabs={false}
    />
  );
}
