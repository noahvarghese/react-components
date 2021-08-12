import React from 'react';
import "./index.scss";

// Need to add in datalist capabilities

interface InputProps {
    type: string;
    readonly?: boolean;
    name: string;
    placeholder: string;
    required: boolean;
}

const Input: React.FC<InputProps> = (props) => {
    return (
        <div className="Input">
            <input
                type={props.type}
                readOnly={props.readonly}
                name={props.name}
                // placeholder={props.placeholder}
                required={props.required}
                id={props.name}
            />
            <label htmlFor={props.name}>
                <span>{(props.required && "*") + props.placeholder}</span>
            </label>
        </div>
    );
};

export default Input;
