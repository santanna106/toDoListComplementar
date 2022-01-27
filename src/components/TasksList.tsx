import React from 'react';
import { FlatList,TouchableOpacity, StyleSheet, FlatListProps } from 'react-native';


import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';
export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskEdit {
  id:number;
  title:string;
}

interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskEdit:TaskEdit) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask,editTask }: TasksListProps) {

  function handleToggleTaskDone(id:number){
    toggleTaskDone(id);
  }

  function handleRemoveTask(id:number){
    removeTask(id);
  }

  function handleEditTask(item:TaskEdit){
    editTask(item);
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
           <TaskItem  
            index={index}
            item={item}
            handleTaskDone={handleToggleTaskDone}
            handleTaskRemove={handleRemoveTask}
            handleEditTaskItem={handleEditTask}
      />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

