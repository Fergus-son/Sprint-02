import { useState } from 'react'
import './App.css'
import { TodolistItem } from './components/TodolistItem'
import { v1 } from 'uuid'
import { CreateItemForm } from './components/CreateItemForm'

export type Task = {
  id: string
  title: string
  isDone: boolean
}
export type TasksState = {
  [key: string]: Task[]
}

export type TodolistsType = {
  id: string,
  title: string,
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export const App = () => {

  const todoListId1 = v1()
  const todoListId2 = v1()

  const [todolists, setTodolists] = useState<TodolistsType[]>([
    { id: todoListId1, title: "What to learn", filter: 'all' },
    { id: todoListId2, title: "What to buy", filter: 'all' }
  ])
  const [tasks, setTasks] = useState<TasksState>({
    [todoListId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todoListId2]: [
      { id: v1(), title: 'Redux', isDone: true },
      { id: v1(), title: 'Biba', isDone: false },
      { id: v1(), title: 'Boba', isDone: false },
    ]
  })

  const changeFilter = (filter: FilterValues, todolistId: string) => {
    const newTodolists = todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist)
    setTodolists(newTodolists)
  }

  // let filteredTasks = tasks
  // if (filter === 'active') {
  //  filteredTasks = tasks.filter(task => !task.isDone)
  // }
  // if (filter === 'completed') {
  //  filteredTasks = tasks.filter(task => task.isDone)
  // }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }
  //Оставить в массиве только те задачи, у которых id НЕ равен переданному taskId

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task) })
  }
  // const changeTaskStatus = (taskId: string, isDone: boolean) => {
  //   const newTaskStatus = tasks.find(task =>  task.id === taskId)
  //   if (newTaskStatus) {
  //     newTaskStatus.isDone = isDone
  //     setTasks([...tasks])
  //   }
  // }

  const deleteTodoList = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
  }

  const createTodolist = (title: string) => {
    const todoListId = v1()
    const newTodolist: TodolistsType = { id: todoListId, title: title, filter: 'all' }
    setTodolists([newTodolist, ...todolists])
    setTasks({ ...tasks, [todoListId]: [] })
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? { ...task, title } : task) })
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodolists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, title } : todolist))
  }

  return (
    <div className="app">
      <CreateItemForm createItem={createTodolist} />
      {todolists.map(todolist => {
        const todolistTasks = tasks[todolist.id]
        let filteredTasks = todolistTasks
        if (todolist.filter === 'active') {
          filteredTasks = todolistTasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = todolistTasks.filter(task => task.isDone)
        }
        return (
          <TodolistItem key={todolist.id}
            changeTaskStatus={changeTaskStatus}
            todolist={todolist}
            createTask={createTask}
            tasks={filteredTasks}
            deleteTask={deleteTask}
            changeFilter={changeFilter}
            deleteTodoList={deleteTodoList}
            changeTaskTitle={changeTaskTitle}
            changeTodolistTitle={changeTodolistTitle}
          // createTodolist={createTodolist}
          />

        )
      })}
    </div>
  )
}

