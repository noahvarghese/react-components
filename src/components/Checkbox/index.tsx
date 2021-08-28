import React from "react";
import { StateProps } from "../../types/state";
import "./index.scss";

export interface CheckboxProps {
    name: string;
    label?: string;
    state: StateProps<boolean>;
    readonly?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                checked={props.state.value}
                onChange={() =>
                    !props.readonly
                        ? props.state.setState(!props.state.value)
                        : null
                }
                readOnly={props.readonly}
            />
            <label htmlFor={props.name}>{props.label ?? props.name}</label>
        </div>
    );
};

export default Checkbox;
