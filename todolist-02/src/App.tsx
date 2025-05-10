import { useState } from 'react'
import './App.css'
import { TodoListItem } from './TodoListItem'
import { v1 } from 'uuid'
import { CreateItemForm } from './components/CreateItemForm/CreateItemForm'

export type Task = {
  id: string
  title: string
  isDone: boolean
}

export type Todolist = {
  id: string
  title: string
  filter: FilterValues
}

export type FilterValues = 'all' | 'active' | 'completed'

export type TaskState = {
  [key: string]: Task[]
}


export const App = () => {

  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodoLists] = useState<Todolist[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' }
  ])

  const [tasks, setTasks] = useState<TaskState>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Redux', isDone: false },
      { id: v1(), title: 'Typescript', isDone: false },
      { id: v1(), title: 'RTK query', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Bread', isDone: true },
      { id: v1(), title: 'Milk', isDone: false },
      { id: v1(), title: 'Sausage', isDone: false },
    ]
  })

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodoLists(todolists.map(todolist => todolist.id === todolistId ? { ...todolist, filter } : todolist))
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), title, isDone: false }
    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].map(task => task.id == taskId ? { ...task, isDone } : task) })
  }

  const deleteTodolist = (todolistId: string) => {
    setTodoLists(todolists.filter(todo => todo.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const createTodolist = (title: string) => {
    const todolistId = v1()
    const newTodolist: Todolist = {id: todolistId, title, filter: 'all'}
    setTodoLists([newTodolist, ...todolists])
    setTasks({ ...tasks, [todolistId]: []})
    // const newTodolist: Todolist = {id: v1(), title, filter: 'all'}
    // setTodoLists([newTodolist, ...todolists])
  }

  const changeTaskTitle = (todolistId: string, taskId: string, title: string ) => {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)})
  }

  const changeTodolistTitle = (todolistId: string, title: string) => {
    setTodoLists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, title} : todolist))
  }

  // console.log(todolistId1)
  // console.log(todolistId2)
  return (
    <div className="app">
      <CreateItemForm onCreateItem={createTodolist} />
      {todolists.map(todolist => {
        const todolistTask = tasks[todolist.id]
        let filteredTask = todolistTask
        if (todolist.filter === 'active') {
          filteredTask = todolistTask.filter(task => !task.isDone)
        }

        if (todolist.filter === 'completed') {
          filteredTask = todolistTask.filter(task => task.isDone)
        }

        return (
          <div>
            <TodoListItem key={todolist.id}
              todolist={todolist}
              tasks={filteredTask}
              deleteTask={deleteTask}
              changeFilter={changeFilter}
              createTask={createTask}
              changeTaskStatus={changeTaskStatus}
              deleteTodolist={deleteTodolist} 
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}/>
          </div>
        )
      })}
    </div>
  )
}

