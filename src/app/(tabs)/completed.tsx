import React from 'react';
import { TaskListScreen } from '@/components/TaskListScreen';

export default function CompletedTasksScreen() {
  return (
    <TaskListScreen
      filterType="completed"
      title="Completed"
      subtitle="Celebrate your accomplishments"
      showStats={false}
      showTopSegmentTabs={false}
    />
  );
}
