import { ChangeEvent } from "react"
import { FilterValues, Task, TodolistsType } from "../App"
import { Button } from "./Button"
import { CreateItemForm } from "./CreateItemForm"
import { EditableSpan } from "./EditableSpan"

type TodolistItemType = {
  todolist: TodolistsType
  tasks: Task[]
  deleteTask: (todolistId: string, taskId: string) => void
  changeFilter: (filter: FilterValues, todolistId: string) => void
  createTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, title: string, isDone: boolean) => void
  deleteTodoList: (todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
  // createTodolist: (title: string) => void
}

export const TodolistItem = ({ tasks, deleteTask, changeFilter, createTask, changeTaskStatus, todolist, deleteTodoList, changeTaskTitle, changeTodolistTitle }: TodolistItemType) => {

  const createTaskHandler = (title: string) => {
    createTask(todolist.id, title);
  }


  // const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTaskTitle(event.currentTarget.value)
  //   setError(null)
  // }

  // const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     createTaskHandler()
  //   }
  // }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(filter, todolist.id)
  }

  const deleteTodoListHandler = (todoListId: string) => {
    deleteTodoList(todoListId)
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todolist.id, title)
  }

  return (

    <div>
      <div className="container">
        <h3>
          <EditableSpan value={todolist.title} onChange={changeTodolistTitleHandler}/>
        </h3>
        <Button onClick={() => { deleteTodoListHandler(todolist.id) }} title="x" ></Button>
      </div>
      <CreateItemForm createItem={createTaskHandler} />
      {/* <div>
        <input className={error ? 'error' : ''}
        value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={createTaskOnEnterHandler} />
        <Button onClick={() => { createTaskHandler() }} title="+" />
        {error && <div className={'error-message'}>{error}</div>}
        </div> */}
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const changeTaskTitleHandler = (title: string) => {
              changeTaskTitle(todolist.id, task.id, title)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const newStatusValue = e.currentTarget.checked
              changeTaskStatus(todolist.id, task.id, newStatusValue)
            }
            return (
              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
                <Button title="x" onClick={() => { deleteTask(todolist.id, task.id) }} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button className={todolist.filter === 'all' ? 'active-filter' : ''} onClick={() => { changeFilterHandler('all') }} title="All" />
        <Button className={todolist.filter === 'active' ? 'active-filter' : ''} onClick={() => { changeFilterHandler('active') }} title="Active" />
        <Button className={todolist.filter === 'completed' ? 'active-filter' : ''} onClick={() => { changeFilterHandler('completed') }} title="Completed" />
      </div>
    </div>
  )

}
