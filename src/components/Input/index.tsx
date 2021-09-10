import React, { useCallback } from "react";
import { ErrorProps } from "../../types/error";
import { StateProps } from "../../types/state";
import { ValidationProps } from "../../types/validation";
import validators, { ValidatorFunction } from "../../util/validators";
import "./index.scss";

// Need to add in datalist capabilities
// Need to keep label span on top when there is an error and content and focus is off the element

interface InputProps {
    type: string;
    name: string;
    placeholder: string;
    required: boolean;
    readonly?: boolean;
    state: StateProps<string>;
    validationOptions?: ValidationProps;
    errorState?: ErrorProps;
    formatter?: (input: any) => any;
    autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
    validationOptions: { runOnInput, runOnComplete, validatorFn } = {
        runOnInput: true,
        runOnComplete: true,
        validatorFn: undefined,
    },
    ...props
}) => {
    let chosenValidator: ValidatorFunction | undefined = validatorFn;

    const validatorKeys = Object.keys(validators);

    if (!chosenValidator) {
        if (validatorKeys.includes(props.type)) {
            chosenValidator = validators[props.type];
        } else if (
            props.autoComplete &&
            validatorKeys.includes(props.autoComplete.split("-").join("_"))
        ) {
            chosenValidator =
                validators[props.autoComplete.split("-").join("_")];
        } else if (props.required) {
            chosenValidator = validators.required;
        }
    }

    const validate = useCallback(
        (input: any, run: boolean | undefined) => {
            const value = props.formatter ? props.formatter(input) : input;

            if (
                props.errorState &&
                props.errorState.setError &&
                run &&
                chosenValidator
            ) {
                const res = chosenValidator(value, props.name);
                if (!res.success) {
                    props.errorState.setError(res.errorMessage);
                } else {
                    props.errorState.setError("");
                }
            }
            props.state.setState(value);
        },
        [chosenValidator, props]
    );

    return (
        <div
            className={
                (props.errorState && props.errorState.error ? "error " : "") +
                "Input input-container"
            }
        >
            <input
                autoComplete={props.autoComplete}
                type={props.type}
                readOnly={props.readonly}
                name={props.name}
                // this is hardcoded so the animation works
                required={true}
                id={props.name}
                onChange={(e) => {
                    validate(e.currentTarget.value, runOnInput);
                }}
                // This is here for date change tests
                onInput={(e) => {
                    validate(e.currentTarget.value, runOnInput);
                }}
                onBlur={(e) => {
                    validate(e.currentTarget.value, runOnComplete);
                }}
                className={
                    (props.errorState && props.errorState.error
                        ? "error"
                        : "") + (props.state.state !== "" ? " has-input" : "")
                }
                value={props.state.state}
            />
            <label
                htmlFor={props.name}
                className={
                    props.errorState && props.errorState.error ? "error" : ""
                }
            >
                <span>{(props.required && "* ") + props.placeholder}</span>
            </label>
            {props.errorState && props.errorState.error && (
                <div className="error-message">
                    <p>{props.errorState.error}</p>
                </div>
            )}
        </div>
    );
};

export default Input;
