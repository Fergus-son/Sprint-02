import { FilterValues } from "../../App";
import { GlobalButton } from "../GlobalButton";

type ButtonsType = {
    changeFilter: (filter: FilterValues) => void
}

export const Buttons = ({changeFilter}: ButtonsType) => {
    return (
        <div>
            <GlobalButton title="All" onClick={() => changeFilter('all')} />
            <GlobalButton title="Active" onClick={() => changeFilter('active')}/>
            <GlobalButton title="Completed" onClick={() =>changeFilter('completed')}/>
        </div>
    );
};
