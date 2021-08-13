import React from 'react';
import { useState } from 'react';
import { ErrorProps } from '../../types/error';
import { StateProps } from '../../types/state';
import DropdownArrow from "../DropdownArrow";
import "./index.scss";

interface SelectProps {
    name: string;
    placeholder: string;
    items: { id: number; value: any }[];
    required: boolean;
    errorState?: ErrorProps;
    state: StateProps;
}

const Select: React.FC<SelectProps> = (props) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="select">
            {/* <div className="select-container"> */}
            <select
                onSelect={(e) => props.state.setState(e.currentTarget.value)}
                onBlur={() => { setOpen(false) }}
                onFocus={() => { setOpen(true); }}
                className={(props.errorState && props.errorState.value ? "error" : "") + (props.state.value ? " selected" : "")}>
                {
                    [{ id: undefined, value: "" }, ...props.items].map(({ id, value }, index) => <option key={id} value={value} selected={index === 0} disabled={index === 0} hidden={index === 0}>{value}</option>)
                }
            </select>
            <label htmlFor={props.name} className={props.errorState && props.errorState.value ? "error" : ""}>
                <span>{(props.required && "* ") + props.placeholder}</span>
            </label>
            {/* </div> */}
            <DropdownArrow show={open} onClick={(_) => setOpen(!open)} />
            {props.errorState && props.errorState.value && <div className="error-message">
                <p>{props.errorState.value}</p>
            </div>}
        </div>
    )
}

export default Select;
