import React, { useCallback } from 'react';
import "./index.scss";

// Need to add in datalist capabilities

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
    readonly?: boolean;
    state: {
        value: any;
        setState: (val: any) => void;
    },
    validationOptions?: {
        validator: (input: any) => { success: true; } | { success: false; errorMessage: string };
        runOnComplete: boolean;
        runOnInput: boolean;
    },
    dropdownOptions?: {
        dataList: { id: number; value: string }[];
        strict: boolean;
    },
    errorState?: {
        value: string | undefined;
        setError?: (val?: string | undefined) => void;
    }
}

const Input: React.FC<InputProps> = (props) => {
    const validate = useCallback(
        (value: any, run: boolean | undefined) => {
            if (props.validationOptions && props.errorState && props.errorState.setError && run) {
                const res = props.validationOptions.validator(value);
                if (!res.success) {
                    props.errorState.setError(res.errorMessage);
                }
                else {
                    props.errorState.setError("");
                }
            }
            props.state.setState(value);
        },
        [props.validationOptions],
    )
    return (
        <div className="Input">
            <input
                type={props.type}
                readOnly={props.readonly}
                name={props.name}
                // placeholder={props.placeholder}
                required={true}
                id={props.name}
                onChange={(e) => {
                    validate(e.currentTarget.value, props.validationOptions?.runOnInput);
                    console.log("input")
                }}
                onBlur={(e) => {
                    validate(e.currentTarget.value, props.validationOptions?.runOnComplete);
                    console.log("blur");
                }}
                className={props.errorState && props.errorState.value ? "error" : ""}
                value={props.state.value}
            />
            <label htmlFor={props.name} className={props.errorState && props.errorState.value ? "error" : ""}>
                <span>{(props.required && "* ") + props.placeholder}</span>
            </label>
            {props.errorState && props.errorState.value && <div className="error-message">
                <p>{props.errorState.value}</p>
            </div>}
        </div>
    );
};

export default Input;
