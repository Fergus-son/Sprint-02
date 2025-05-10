import { ChangeEvent, useState } from "react";

type EditableSpantype = {
    value: string 
    onChange: (title: string) => void
}

export const EditableSpan = ({ value, onChange }: EditableSpantype) => {

    const [isEditMode, setisEditMode] = useState(false)
    const [title, setTitle] = useState(value)


    const changeTitle = ( event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const turnOnEditMode = () => {
        setisEditMode(true)
    }

    const turnOffEditMode = () => {
        setisEditMode(false)
        onChange(title)
    }

    return (
        <>
        {isEditMode ? (
            <input value={title} onChange={changeTitle} onBlur={turnOffEditMode} autoFocus/>
        ) : (
            <span onDoubleClick={turnOnEditMode}>{value}</span>
        )}
        </>
    );
};
