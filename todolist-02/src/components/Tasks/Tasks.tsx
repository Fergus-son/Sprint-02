import { ChangeEvent } from "react";
import { Task, Todolist } from "../../App";
import { GlobalButton } from "../GlobalButton";
import { EditableSpan } from "../EditableSpan";

type Taskstype = {
    tasks: Task[]
    todolist: Todolist
    deleteTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolisId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
}

export const Tasks = ({todolist, tasks, deleteTask, changeTaskStatus, changeTaskTitle }: Taskstype) => {

    return (
        <div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(todolist.id, task.id, newStatusValue)
                        }

                        const deleteTaskStatusHandler = () => {
                            deleteTask(todolist.id, task.id)
                        }

                        const changeTaskTitleHandler = (title: string) => {
                            changeTaskTitle(todolist.id, task.id, title)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                <GlobalButton onClick={() => deleteTaskStatusHandler()} title="x"></GlobalButton>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};
