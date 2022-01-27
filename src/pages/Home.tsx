import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTask = {
        id: new Date().getTime(),
     title: newTaskTitle,
      done: false
    }
    setTasks(tasks => [...tasks,newTask]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const taskFound = tasks.find(task => task.id === id);
    if(!!taskFound){
      let taskUpdate = tasks.map(task => {
        if(task.id === taskFound.id){
          task.done = !task.done
        }

        return task
      });
      setTasks(taskUpdate);
    }

  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    let newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }
  

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})