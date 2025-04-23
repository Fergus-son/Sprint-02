import { ChangeEvent, KeyboardEvent, useState } from "react";
import { GlobalButton } from "../GlobalButton";

type AddTaskType = {
    title: string
    createTask: (title: string) => void
}

export const AddTask = ({title, createTask}: AddTaskType) => {

    const [taskTitle, setTaskTitle] = useState('')

    const createTaskHandler = () => {
        createTask(taskTitle)
        setTaskTitle('')
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const changeTaskTitleOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createTaskHandler()
        }
    } 

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={taskTitle} onChange={changeTaskTitleHandler} onKeyDown={changeTaskTitleOnEnterHandler}/>
                <GlobalButton title="+" onClick={createTaskHandler}/>
            </div>
        </div>
    );
};
