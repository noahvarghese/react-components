import { SyntheticEvent, MouseEvent } from "react";

export const stopBubbling = (
    e: SyntheticEvent | MouseEvent<unknown, unknown>
) => {
    e.preventDefault();
    e.stopPropagation();
};
