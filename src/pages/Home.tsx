import React, { useState } from 'react';
import { StyleSheet, View,Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface TaskEdit {
  id:number;
  title:string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskFound = tasks.find(task => task.title === newTaskTitle);

    if(!!taskFound){
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
    } else {
      let newTask = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(tasks => [...tasks,newTask]);

    }


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
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        { 
          text: "Sim", onPress: () =>
          {
            let newTasks = tasks.filter(task => task.id !== id);
            setTasks(newTasks);
          } 
      
        }
      ]
    );
   
  }

  function handleEditTask(editTask:TaskEdit){
    const taskFound = tasks.find(task => task.id === editTask.id);
    if(!!taskFound){
      let taskUpdate = tasks.map(task => {
        if(task.id === taskFound.id){
          task.title = editTask.title;
        }

        return task
      });
      setTasks(taskUpdate);
    }

  }
  

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
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