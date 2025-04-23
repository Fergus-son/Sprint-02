import { FilterValues, Task } from "./App";
import { AddTask } from "./components/AddTask/AddTask";
import { Buttons } from "./components/Buttons/Buttons";
import { Tasks } from "./components/Tasks/Tasks";

type TodoListItemType ={
    title: string
    tasks: Task[]
    deleteTask: (taskId: string) => void
    changeFilter: (filter: FilterValues) => void
    createTask: (title: string) => void
}

export const TodoListItem = ({title, tasks, deleteTask, changeFilter, createTask}: TodoListItemType) => {
    return (
        <div>
            <AddTask title={title} createTask={createTask}/>
            <Tasks deleteTask={deleteTask} tasks={tasks} />
            <Buttons changeFilter={changeFilter}/>
        </div>
    );
};
