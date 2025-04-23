import { useState } from 'react'
import './App.css'
import { TodoListItem } from './TodoListItem'
import { v1 } from 'uuid'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

  const [filter, setFilter] = useState <FilterValues> ('all')

  const [tasks, setTasks] = useState <Task[]> ([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: false },
    { id: v1(), title: 'RTK query', isDone: false },
  ])

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  let filteredTask = tasks
  if (filter === 'active') {
    filteredTask = tasks.filter(task => !task.isDone)
  }

  if (filter === 'completed') {
    filteredTask = tasks.filter(task => task.isDone)
  }

  const createTask = (title: string) => {
    const newTask = {id: v1(), title, isDone: false}
    const newTasks = [newTask, ...tasks]
    setTasks(newTasks)
  }

  const deleteTask = (taskId: string) => {
    const filteredTask = tasks.filter(task => {
      return task.id !== taskId
    })
    setTasks(filteredTask)
  }

  return (
    <div className="app">
      <TodoListItem title='What to learn' 
      tasks={filteredTask} 
      deleteTask={deleteTask} 
      changeFilter={changeFilter} 
      createTask={createTask}/>
    </div>
  )
}

