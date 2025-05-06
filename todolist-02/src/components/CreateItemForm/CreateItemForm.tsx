import { ChangeEvent, KeyboardEvent, useState } from "react";
import { GlobalButton } from "../GlobalButton";
// import { Todolist } from "../../App";

type CreateItemFormType = {
    onCreateItem: (title: string) => void
    // todolist: Todolist
    // deleteTodolist: (todolistId: string) => void
    // createTask: (todolisId: string, title: string) => void
}

export const CreateItemForm = ({ onCreateItem }: CreateItemFormType) => {

    // const deleteTodolistHandler = () => {
    //     deleteTodolist(todolist.id)
    // }

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const createItemHandler = () => {
        const trimmedTask = taskTitle.trim()
        if (trimmedTask !== '') {
            onCreateItem(trimmedTask)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }

    const changeItemTitleOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''} value={taskTitle}
                onChange={changeItemTitleHandler}
                onKeyDown={changeItemTitleOnEnterHandler} />
            <GlobalButton title="+" onClick={createItemHandler} />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
