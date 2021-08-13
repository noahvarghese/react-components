import React, { useCallback } from 'react';
import { ErrorProps } from '../../types/error';
import { StateProps } from '../../types/state';
import { ValidationProps } from '../../types/validation';
import "./index.scss";

// Need to add in datalist capabilities
// Need to keep label span on top when there is an error and content and focus is off the element

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
    readonly?: boolean;
    state: StateProps,
    validationOptions?: ValidationProps,
    errorState?: ErrorProps,
    formatter?: (input: any) => any;
}

const Input: React.FC<InputProps> = (props) => {
    const validate = useCallback(
        (input: any, run: boolean | undefined) => {
            const value = props.formatter ? props.formatter(input) : input;

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
    );


    return (
        <div className="Input">
            <input
                type={props.type}
                readOnly={props.readonly}
                name={props.name}
                // this is hardcoded so the animation works
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
                className={(props.errorState && props.errorState.value ? "error" : "") + (props.state.value !== "" ? " has-input" : "")}
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
