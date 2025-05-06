import { ChangeEvent } from "react";
import { Task, Todolist } from "../../App";
import { GlobalButton } from "../GlobalButton";

type Taskstype = {
    tasks: Task[]
    todolist: Todolist
    deleteTask: (todolistId: string, taskId: string) => void
    changeTaskStatus: (todolisId: string, taskId: string, isDone: boolean) => void
}

export const Tasks = ({todolist, tasks, deleteTask, changeTaskStatus }: Taskstype) => {

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

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler} />
                                <span>{task.title}</span>
                                <GlobalButton onClick={() => deleteTaskStatusHandler()} title="x"></GlobalButton>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    );
};
