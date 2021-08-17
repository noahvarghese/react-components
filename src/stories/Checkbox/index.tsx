import React, { useState } from "react";
import "./index.scss";

export interface CheckboxProps {
    name: string;
    label?: string;
    checked?: boolean;
    readonly?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const [checked, setChecked] = useState(props.checked);
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                id={props.name}
                name={props.name}
                checked={checked}
                onChange={() => (!props.readonly ? setChecked(!checked) : null)}
                readOnly={props.readonly}
            />
            <label htmlFor={props.name}>{props.label ?? props.name}</label>
        </div>
    );
};

export default Checkbox;
