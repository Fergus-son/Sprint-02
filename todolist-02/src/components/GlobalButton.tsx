import { Fragment } from "react/jsx-runtime";

type GlobalButtonType = {
    title: string
    onClick: () => void
    className?: string
}

export const GlobalButton = ({title, onClick, className}: GlobalButtonType) => {
    return (
        <Fragment>
            <button className={className} onClick={onClick}>{title}</button>
        </Fragment>
    );
};
