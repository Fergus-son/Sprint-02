import { Fragment } from "react/jsx-runtime";

type GlobalButtonType = {
    title: string
    onClick: () => void
}

export const GlobalButton = ({title, onClick}: GlobalButtonType) => {
    return (
        <Fragment>
            <button onClick={onClick}>{title}</button>
        </Fragment>
    );
};
