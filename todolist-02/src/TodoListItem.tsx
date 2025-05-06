import { FilterValues, Task, Todolist } from "./App";
import { Buttons } from "./components/Buttons/Buttons";
import { CreateItemForm } from "./components/CreateItemForm/CreateItemForm";
import { GlobalButton } from "./components/GlobalButton";
import { Tasks } from "./components/Tasks/Tasks";

type TodoListItemType = {
    todolist: Todolist
    tasks: Task[]
    deleteTask: (todolistId: string, taskId: string) => void
    deleteTodolist: (todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValues) => void
    createTask: (todolistId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
}

export const TodoListItem = (props: TodoListItemType) => {

    const {
        todolist,
        tasks,
        deleteTask,
        changeFilter,
        createTask,
        changeTaskStatus,
        deleteTodolist
    } = props

    const createTaskHandler = (title: string) => {
        createTask(todolist.id, title)
    }

    const deleteTodolistHandler = () => {
        deleteTodolist(todolist.id)
    }

    return (
        <div>
            <div className="container">
                <h3>{todolist.title}</h3>
                <GlobalButton title="x" onClick={deleteTodolistHandler} />
            </div>
            <CreateItemForm onCreateItem={createTaskHandler} />
            <Tasks deleteTask={deleteTask} tasks={tasks} changeTaskStatus={changeTaskStatus} todolist={todolist} />
            <Buttons changeFilter={changeFilter} todolist={todolist} />
        </div>
    );
};
