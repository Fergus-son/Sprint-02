import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "./Button";

type ItemFormType = {
    createItem: (title: string) => void
}

export const CreateItemForm = ({createItem}: ItemFormType) => {

const [itemTitle, setItemTitle] = useState('')
const [error, setError] = useState<string | null>(null)

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }

    const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            createItemHandler()
        }
    }

    const createItemHandler = () => {
        const trimmedTitle = itemTitle.trim()
        if (trimmedTitle.trim() !== '') {
            createItem(trimmedTitle);
            setItemTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input className={error ? 'error' : ''}
                value={itemTitle} onChange={changeItemTitleHandler} onKeyDown={createTaskOnEnterHandler} />
            <Button onClick={() => { createItemHandler() }} title="+" />
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
