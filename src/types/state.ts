import React, { SetStateAction } from "react";

export interface StateProps<T> {
    state: T;
    setState: (val: T) => void | React.Dispatch<SetStateAction<T>>;
}
