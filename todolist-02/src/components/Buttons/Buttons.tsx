import { FilterValues, Todolist } from "../../App";
import { GlobalButton } from "../GlobalButton";

type ButtonsType = {
    changeFilter: (taskId: string, filter: FilterValues) => void
    todolist: Todolist
}

export const Buttons = (props: ButtonsType) => {

    const {
        todolist: {id, title, filter},
        changeFilter
    } = props

    const changeFilterHandler = (filter: FilterValues) => {
        changeFilter(id, filter)
    }

    return (
        <div>
            <GlobalButton className={filter === 'all' ? 'active-filter' : ''} title="All" onClick={() => changeFilterHandler('all')} />
            <GlobalButton className={filter === 'active' ? 'active-filter' : ''} title="Active" onClick={() => changeFilterHandler('active')}/>
            <GlobalButton className={filter === 'completed' ? 'active-filter' : ''} title="Completed" onClick={() =>changeFilterHandler('completed')}/>
        </div>
    );
};
