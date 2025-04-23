import { Task } from "../../App";
import { GlobalButton } from "../GlobalButton";

type Taskstype = {
    tasks: Task[]
    deleteTask: (taskId: string) => void
}

export const Tasks = ({ tasks, deleteTask }: Taskstype) => {
    return (
        <div>
            {tasks.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
            <ul>
                {tasks.map(task => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" defaultChecked={task.isDone} /> 
                            <span>{task.title}</span>
                            <GlobalButton onClick={() => deleteTask(task.id)} title="x"></GlobalButton>
                        </li>
                    )
                })}
            </ul>
            )}
        </div>
    );
};
